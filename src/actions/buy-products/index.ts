import { request } from '../../utils/request';
import { Order } from './types';

export async function buyProducts() {
  const productsToBuy = JSON.parse(process.env.PRODUCTS_TO_BUY as string);

  await Promise.all(
    productsToBuy.map(async ({ name, amountToInvest }: { name: string; amountToInvest: number }) => {
      const { data: order } = await request<Order>({
        requestMethod: 'POST',
        requestPath: '/orders',
        body: {
          type: 'market',
          product_id: name,
          funds: amountToInvest,
          side: 'buy',
        },
      });

      console.log(`  ➕ Submitted order to buy ${order.funds} ${name}`);
    })
  );
}
