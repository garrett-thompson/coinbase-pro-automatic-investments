import { request } from '../../utils/request';
import { PaymentMethod } from '../get-primary-payment-method/types';

export async function depositFunds(paymentMethod: PaymentMethod, amountToInvest: string) {
  await request({
    requestMethod: 'POST',
    requestPath: '/deposits/payment-method',
    body: {
      amount: amountToInvest,
      currency: 'USD',
      payment_method_id: paymentMethod.id,
    },
  });
}
