from groq import Groq
from atoma_sdk import AtomaSDK


def groq_ai(model_name, api_key, system_prompt, user_prompt):
    client = Groq(api_key=api_key)

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=model_name,
    )
    return chat_completion.choices[0].message.content


def atoma_ai(model_name, api_key, system_prompt, user_prompt):
    with AtomaSDK(
        bearer_auth=api_key,
    ) as atoma_sdk:
        completion = atoma_sdk.chat.create(
            model=model_name,
            messages=[
                {"role": "developer", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )

        return completion.choices[0].message.content
