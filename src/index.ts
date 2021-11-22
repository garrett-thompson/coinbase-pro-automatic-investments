import { checkAvailableBalance } from './actions/check-available-balance';
import { depositFunds } from './actions/deposit-funds';
import { getPrimaryPaymentMethod } from './actions/get-primary-payment-method';
import { buyProducts } from './actions/buy-products';
import { getEnvVariable } from './utils/get-env-variable';

async function invest() {
  const productsToBuy = JSON.parse(getEnvVariable('PRODUCTS_TO_BUY'));
  const amountToInvest = getEnvVariable('AMOUNT_TO_INVEST');

  const primaryPaymentMethod = await getPrimaryPaymentMethod();

  await depositFunds(primaryPaymentMethod, amountToInvest);

  const availableBalance = await checkAvailableBalance();

  await buyProducts({ productsToBuy, availableBalance });
}

if (require.main === module) {
  invest()
    .then(() => {
      console.log(`✅ Investment made successfully.`);
      process.exit(0);
    })
    .catch((err) => {
      console.log('Error: ', err);
      process.exit(1);
    });
}
