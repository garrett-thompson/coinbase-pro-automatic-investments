import { request } from '../../utils/request';

interface BuyProductsParams {
  productsToBuy: string[];
  availableBalance: number;
}

export async function buyProducts({ productsToBuy, availableBalance }: BuyProductsParams) {
  await Promise.all(
    productsToBuy.map(async (product: string) =>
      request({
        requestMethod: 'POST',
        requestPath: '/orders',
        body: {
          type: 'market',
          product_id: product,
          size: availableBalance / productsToBuy.length,
          side: 'buy',
        },
      })
    )
  );
}
