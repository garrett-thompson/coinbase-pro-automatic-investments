import { postOrders } from './modules/post-orders';
import { PaymentMethod } from './types/payment-method';
import { getEnvVariable } from './utils/get-env-variable';
import { request } from './utils/request';

export async function invest() {
  try {
    const productsToBuy = JSON.parse(getEnvVariable('PRODUCTS_TO_BUY'));
    const amountToInvest = getEnvVariable('AMOUNT_TO_INVEST');

    const { data: paymentMethods } = await request<PaymentMethod[]>({
      requestMethod: 'GET',
      requestPath: '/payment-methods',
    });
    const primaryPaymentMethod = paymentMethods.find((pm) => pm.primary_buy === true);
    if (!primaryPaymentMethod) throw new Error('No primary payment method found');

    const { data: deposit } = await request({
      requestMethod: 'POST',
      requestPath: '/deposits/payment-method',
      body: {
        amount: amountToInvest,
        currency: 'USD',
        payment_method_id: primaryPaymentMethod.id,
      },
    });

    const { data: accounts } = await request({ requestMethod: 'GET', requestPath: '/accounts' });
    const usdAccount = accounts.find((account: any) => account.currency === 'USD');
    const availableBalance = parseInt(usdAccount.available);

    await postOrders({ productsToBuy, availableBalance });
  } catch (err) {
    console.log('Error:');
    console.log(err);
  }
}

if (require.main === module) {
  invest();
}
