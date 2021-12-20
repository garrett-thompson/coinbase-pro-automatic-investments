import { getUserCurrency } from '../../utils/get-currency';
import { request } from '../../utils/request';
import { wait } from '../../utils/wait';
import { ProductToBuy } from '../buy-products/types';
import { PaymentMethod } from '../get-primary-payment-method/types';
import { Transfer } from './types';

const amountToInvest = getAmountToInvest();
const currency = getUserCurrency();

export async function depositFunds(paymentMethod: PaymentMethod) {
  console.log(`┌ 💰 Starting deposit of ${amountToInvest}${currency}`);

  const { data: deposit } = await request({
    requestMethod: 'POST',
    requestPath: '/deposits/payment-method',
    body: {
      amount: amountToInvest,
      currency,
      payment_method_id: paymentMethod.id,
    },
  });

  await waitUntilTransferIsComplete(deposit.id);
}

async function waitUntilTransferIsComplete(transferId: string) {
  let complete: boolean = false;
  let waitPeriod: number = 500;

  while (complete === false) {
    console.log('│ ...waiting for deposit to complete');
    await wait(waitPeriod);

    const { data: transfer } = await request<Transfer>({
      requestMethod: 'GET',
      requestPath: `/transfers/${transferId}`,
    }).catch(() => {
      return { data: undefined };
    });

    if (transfer?.completed_at) {
      complete = true;
      console.log(`└ ✅ Finished deposit of ${amountToInvest}${currency}`);
    } else {
      waitPeriod = waitPeriod * 2;
    }
  }
}

function getAmountToInvest() {
  let productsToBuy: ProductToBuy[];

  try {
    productsToBuy = JSON.parse(process.env.PRODUCTS_TO_BUY as string);
  } catch (err) {
    throw new Error(
      `There was an error parsing PRODUCTS_TO_BUY. Make sure this environment variable is set and is valid JSON.`
    );
  }

  return productsToBuy.reduce((total, product) => {
    return total + product.amountToInvest;
  }, 0);
}
