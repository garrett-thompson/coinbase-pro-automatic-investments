import { request } from '../../utils/request';
import { PaymentMethod } from './types';

export async function getPrimaryPaymentMethod() {
  const { data: paymentMethods } = await request<PaymentMethod[]>({
    requestMethod: 'GET',
    requestPath: '/payment-methods',
  });

  const primaryPaymentMethod = paymentMethods.find((pm) => pm.primary_buy === true);
  if (!primaryPaymentMethod) throw new Error('No primary payment method found');

  return primaryPaymentMethod;
}
