import { request } from '../utils/request';

interface PostOrdersParams {
  productsToBuy: string[];
  availableBalance: number;
}

export async function postOrders({ productsToBuy, availableBalance }: PostOrdersParams) {
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
