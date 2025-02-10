SYSTEM_PROMPT = """
You are a legendary crypto meme lord, deeply embedded in blockchain, DeFi, and web3 culture.  
Your job is to generate **short but punchy** crypto memes—longer than one sentence, but not a full paragraph.  

🔥 **Format:**  
- Each meme should be between **2 to 5 sentences**, like a viral tweet or a Discord message.  
- **Do NOT invent numbers, token prices, or details. Always use the values given in the prompt.**  
- **No images. No formatting. Just pure text.**  
- Write in a **casual, sarcastic, and witty tone** that resonates with degens, traders, and Web3 users.  

💰 **Themes:**  
- **Shitcoins, rug pulls, pump & dumps, exit liquidity**  
- **The emotional rollercoaster of crypto trading**  
- **Gas fees being higher than your portfolio**  
- **HODL vs. panic selling moments**  

🚀 **Rules:**  
1. **Strictly use the provided token price, balance, and portfolio value.** No hallucinated numbers.  
2. **Make each meme longer than one sentence but shorter than a paragraph.**  
3. **No bullet points, no formatting, no emojis—just text that feels organic.**  
4. **Imagine posting it in a degen Telegram chat, Twitter thread, or Discord server.**  
5. **Every meme should feel like it belongs on crypto Twitter.**  
6. **Use inside jokes and crypto slang freely (WAGMI, NGMI, exit liquidity, etc.).**  

🎯 **Your Goal:**  
Create **funny, accurate, slightly longer crypto memes** that people would actually copy-paste and share in a Telegram group or tweet.
"""

MEME_PROMPTS = {
    "No Crypto Holdings": """Generate a meme about a trader who talks about crypto all the time but doesn’t actually own any tokens.  
Make it about how they feel like a whale, but in reality, their portfolio is empty.""",
    "Rich but Broke": """Generate a crypto meme about a trader who holds {balance} {coinName} ({symbol}) and thinks he’s a whale, but his total net worth is just ${balanceUsd}. 
Make it about the harsh reality of holding meme coins with no real value.""",
    "Shitcoin / Rug Pull": """Create a meme about {coinName} ({symbol}), a token currently priced at ${coinPrice} per token. 
The meme should joke about how low the price is, making it seem like a guaranteed rug pull.""",
    "Diamond Hands": """Generate a meme about a trader who owns {balance} {coinName} ({symbol}), worth ${balanceUsd}, and refuses to sell. 
Make it about extreme diamond hands, holding even when the market is crashing.""",
    "Gas Fees Higher than Token": """Create a meme about a trader who wants to sell {balance} {coinName} ({symbol}), worth only ${balanceUsd}, 
but the gas fees are ${gasFee}, making it impossible to move without losing money.""",
    "Whale Alert": """Generate a meme about a trader who holds {balance} {coinName} ({symbol}), an amount so high that it looks like he controls the entire supply.
Make the meme reference crypto whales manipulating the market.""",
    "Big Money Moves": """Create a meme about a trader holding {balance} {coinName} ({symbol}), currently worth ${balanceUsd}. 
The meme should joke about how they feel like an elite investor, even though it could crash at any moment.""",
    "Hedge Fund Level": """Generate a meme about a crypto trader who owns {balance} {coinName} ({symbol}), worth ${balanceUsd}, making them richer than most hedge funds.
Make it funny by comparing them to traditional investors.""",
    "Obscure Meme Coin": """Create a meme about a trader discovering {coinName} ({symbol}), an unknown crypto token with a ridiculous name. 
Make it about the confusion of whether it’s a scam or the next big thing.""",
    "Normal Trader": """Generate a meme about a normal trader holding {balance} {coinName} ({symbol}). 
Make it about the everyday struggles of dealing with crypto volatility.""",
}


def select_top_tokens(balance_data):
    """Selects the most valued and least valued tokens based on balanceUsd"""
    if not balance_data:
        return []

    sorted_tokens = sorted(balance_data, key=lambda x: x["balanceUsd"])
    least_valued = sorted_tokens[0]
    most_valued = sorted_tokens[-1]

    return [least_valued, most_valued] if least_valued != most_valued else [most_valued]


def categorize_token(token):
    """Categorizes a single token into one relevant meme category"""
    coin_name = token["coinName"]
    balance = token["balance"]
    balance_usd = token["balanceUsd"]
    price = token["coinPrice"]

    # Meme categories
    if balance > 100000 and balance_usd < 1:
        return "Rich but Broke"

    if price < 0.000001:
        return "Shitcoin / Rug Pull"

    if balance > 1000000 and balance_usd > 1000:
        return "Diamond Hands"

    if balance > 500000000:
        return "Whale Alert"

    if price > 5 and balance_usd > 10000:
        return "Big Money Moves"

    if balance_usd > 1000000:
        return "Hedge Fund Level"

    if "Runner" in coin_name or "Inu" in coin_name:
        return "Obscure Meme Coin"

    return "Normal Trader"


def generate_meme_categories(balance_data):
    """Categorizes only the most valued and least valued tokens"""
    selected_tokens = select_top_tokens(balance_data=balance_data)

    meme_categories = []
    for token in selected_tokens:
        category = categorize_token(token)
        meme_categories.append(
            {
                "coin": token["coinName"],
                "symbol": token["coinSymbol"],
                "balance": token["balance"],
                "balanceUsd": token["balanceUsd"],
                "coinPrice": token["coinPrice"],
                "category": category,
            }
        )

    return meme_categories


def generate_meme_prompts(balance_data):
    """Generates meme prompts based on token categories"""
    if not balance_data:
        return [
            {
                "coin": "No Tokens",
                "symbol": "N/A",
                "category": "No Crypto Holdings",
                "prompt": MEME_PROMPTS["No Crypto Holdings"],
            }
        ]
    categorized_tokens = generate_meme_categories(balance_data=balance_data)

    meme_outputs = []
    for token in categorized_tokens:
        category = token["category"]
        meme_prompt = MEME_PROMPTS[category].format(
            coinName=token["coin"],
            symbol=token["symbol"],
            balance=token["balance"],
            balanceUsd=round(token["balanceUsd"], 2),
            coinPrice=round(token["coinPrice"], 8),
            gasFee=0.5,
        )
        meme_outputs.append(
            {
                "coin": token["coin"],
                "symbol": token["symbol"],
                "category": category,
                "prompt": meme_prompt,
            }
        )

    return meme_outputs
