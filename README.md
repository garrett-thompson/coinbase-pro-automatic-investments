# Coinbase Pro Investor

Coinbase Pro does not offer automatic investing like the consumer Coinbase app. This script, ran via a cron job, can be used to enable automatic investing in Coinbase Pro.

## How to use

First, you need to [create an API key](https://help.coinbase.com/en/pro/other-topics/api/how-do-i-create-an-api-key-for-coinbase-pro) under your Coinbase Pro account.

This script requires the following environment variables be set:

```
CB_ACCESS_KEY
CB_ACCESS_SECRET
CB_ACCESS_PASSPHRASE
PRODUCTS_TO_BUY
AMOUNT_TO_INVEST
# Optional, defaults to USD if not provided.
DEFAULT_CURRENCY
```

- The top 3 of which you should get when you create your API key.
- `PRODUCTS_TO_BUY` should be a JSON array containing the assets you want to invest in, like `["ETH-USD", "BTC-USD", "SOL-USD"]` for example.
- `AMOUNT_TO_INVEST` will be evenly split among your `PRODUCTS_TO_BUY` (PRs welcome if you want provide a more fine-grained control option).
- `DEFAULT_CURRENCY` is optional and defaults to `USD`.

Install dependencies with `npm install`

Run the script with `npm run start`
