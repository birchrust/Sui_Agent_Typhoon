import os
from loguru import logger
from dotenv import load_dotenv
from fastapi import FastAPI, Body, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


from src.ai import atoma_ai
from src.blockberry import Blockberry
from src.prompt import generate_meme_prompts, SYSTEM_PROMPT

load_dotenv()
app = FastAPI()
security = HTTPBearer()

BLOCKBERRY_API_KEY = os.getenv("BLOCKBERRY_API_KEY")
ATOMA_API_KEY = os.environ.get("ATOMA_API_KEY")
logger.debug(f"{BLOCKBERRY_API_KEY=}")
logger.debug(f"{ATOMA_API_KEY=}")


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != os.environ.get("BACKEND_AUTH_TOKEN"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="unauthorized"
        )
    return credentials.credentials


@app.post("/meme")
async def root(data=Body(...), token: str = Depends(verify_token)):
    logger.info(f"Received data: {data}")

    address = data.get("address")
    if address is None:
        raise HTTPException(status_code=400, detail="Missing 'address' in request data")

    logger.info(f"Fetching address data")
    try:
        blockberry_client = Blockberry(api_key=BLOCKBERRY_API_KEY)
        balance_data = blockberry_client.account_balance(wallet_address=address)
        logger.info(f"{balance_data=}")
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=500, detail="Server failed to fetch address data"
        )

    logger.info(f"Generating meme prompts")
    try:
        prompts = generate_meme_prompts(balance_data=balance_data)
        logger.info(f"{prompts=}")
    except Exception as e:
        logger.error(e)

        raise HTTPException(
            status_code=500, detail="Server failed to generate meme prompt"
        )

    logger.info(f"Generating meme")
    meme_responses = {k: None for k in ["meme1", "meme2"]}
    try:
        for i, prompt in enumerate(prompts):
            meme_responses[f"meme{i+1}"] = atoma_ai(
                model_name="meta-llama/Llama-3.3-70B-Instruct",
                api_key=os.environ.get("ATOMA_API_KEY"),
                system_prompt=SYSTEM_PROMPT,
                user_prompt=prompt["prompt"],
            )
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Server failed to generate meme")

    return meme_responses
