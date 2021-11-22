import { request } from '../../utils/request';

export async function checkAvailableBalance() {
  const { data: accounts } = await request({ requestMethod: 'GET', requestPath: '/accounts' });

  const defaultCurrency = process.env.CURRENCY || 'USD';

  const usdAccount = accounts.find((account: any) => account.currency === defaultCurrency);

  const availableBalance = parseInt(usdAccount.available);

  return availableBalance;
}
