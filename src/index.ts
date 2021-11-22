import { checkAvailableBalance } from './actions/check-available-balance';
import { depositFunds } from './actions/deposit-funds';
import { getPrimaryPaymentMethod } from './actions/get-primary-payment-method';
import { buyProducts } from './actions/buy-products';
import { getEnvVariable } from './utils/get-env-variable';

async function invest() {
  try {
    const productsToBuy = JSON.parse(getEnvVariable('PRODUCTS_TO_BUY'));
    const amountToInvest = getEnvVariable('AMOUNT_TO_INVEST');

    const primaryPaymentMethod = await getPrimaryPaymentMethod();

    await depositFunds(primaryPaymentMethod, amountToInvest);

    const availableBalance = await checkAvailableBalance();

    await buyProducts({ productsToBuy, availableBalance });
  } catch (err) {
    console.log('Error: ', err);
  }
}

if (require.main === module) {
  invest();
}
