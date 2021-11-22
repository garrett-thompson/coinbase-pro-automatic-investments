import { checkAvailableBalance } from './actions/check-available-balance';
import { depositFunds } from './actions/deposit-funds';
import { getPrimaryPaymentMethod } from './actions/get-primary-payment-method';
import { buyProducts } from './actions/buy-products';
import { verifyRequiredEnvVariables } from './utils/verify-required-env-variables';

async function invest() {
  verifyRequiredEnvVariables([
    'CB_ACCESS_KEY',
    'CB_ACCESS_SECRET',
    'CB_ACCESS_PASSPHRASE',
    'PRODUCTS_TO_BUY',
    'AMOUNT_TO_INVEST',
  ]);
  const productsToBuy = JSON.parse(process.env.PRODUCTS_TO_BUY as string);
  const amountToInvest = process.env.AMOUNT_TO_INVEST as string;

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
