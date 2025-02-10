import pandas as pd
from typing import Literal
from requests import Session


class Blockberry:
    base_url = "https://api.blockberry.one/sui/v1"

    def __init__(self, api_key):
        if not api_key:
            raise ValueError("API key is required")
        self.api_key = api_key
        self.session = Session()
        self.session.headers.update(
            {
                "x-api-key": self.api_key,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        )

    def _account_stats(self, wallet_address):
        url = f"{self.base_url}/accounts/stats/{wallet_address}"
        response = self.session.get(url)
        return response.json()

    def account_stats(self, wallet_address):
        stats = self._account_stats(wallet_address)
        stats["suiBalance"] = stats.pop("balance")
        return stats

    def _account_activity(
        self, wallet_address, size=50, order_by="DESC", next_cursor=None
    ):
        url = f"{self.base_url}/accounts/{wallet_address}/activity"
        params = {
            "nextCursor": next_cursor,
            "size": size,
            "orderBy": order_by,
        }
        response = self.session.get(url, params=params)
        return response.json()

    def account_activity(
        self, wallet_address, n=50, order_by: Literal["DESC", "ASC"] = "DESC"
    ):
        next_cursor = None
        activities = []
        while len(activities) < n:
            activity = self._account_activity(
                wallet_address=wallet_address,
                size=50,
                order_by=order_by,
                next_cursor=next_cursor,
            )
            activities.extend(activity["content"])

            if not activity["hasNextPage"]:
                break
            next_cursor = activity["nextCursor"]

        return activities

    def account_activity_parsed(
        self,
        wallet_address,
        n=50,
        order_by: Literal["DESC", "ASC"] = "DESC",
        return_raw=False,
    ):
        activity = self.account_activity(
            wallet_address=wallet_address, n=n, order_by=order_by
        )
        act_df = pd.DataFrame(activity)
        # prepcocess
        act_df = act_df.drop(columns=["activityWith", "digest"])
        act_df.loc[:, "activityType"] = act_df.activityType.apply(
            lambda x: ", ".join(x)
        )
        # extract details
        act_df.loc[:, "details"] = act_df.details.apply(
            lambda x: x["detailsDto"]["coins"]
        )
        act_df = act_df.explode("details")
        act_df = act_df.join(act_df["details"].apply(pd.Series))

        # get coin price
        all_coin_types = act_df.coinType.unique().tolist()
        coin_details = self.coin_details(coin_types=all_coin_types)
        coin_detail_df = pd.DataFrame(coin_details)
        coin_detail_df = coin_detail_df[["coinType", "price"]]

        # merge coin price
        act_df = act_df.merge(coin_detail_df, on="coinType", how="left")
        act_df.loc[:, "amountUsd"] = act_df.amount * act_df.price

        act_df = act_df[
            [
                "activityType",
                "timestamp",
                "txStatus",
                "amount",
                "amountUsd",
                "coinType",
                "symbol",
                "gasFee",
            ]
        ]
        if return_raw:
            return " ".join(act_df.to_markdown().split())
        return act_df.to_dict("records")

    def account_balance(self, wallet_address):
        url = f"{self.base_url}/accounts/{wallet_address}/balance"
        response = self.session.get(url)
        return response.json()

    def coin_details(self, coin_types=[]):
        coin_details = []
        for coin_type in coin_types:
            url = f"{self.base_url}/coins/{coin_type}"
            response = self.session.get(url)
            j = response.json()
            coin_details.append(j)
        return coin_details
