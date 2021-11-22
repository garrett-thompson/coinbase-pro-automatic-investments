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
    'FUNDS_TO_DEPOSIT',
  ]);

  const primaryPaymentMethod = await getPrimaryPaymentMethod();

  await depositFunds(primaryPaymentMethod);

  await buyProducts();
}

if (require.main === module) {
  invest()
    .then(() => {
      console.log(`✅ Investments made successfully.`);
      process.exit(0);
    })
    .catch((err) => {
      console.trace('Error: ', err);
      process.exit(1);
    });
}
