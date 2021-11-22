import { request } from '../../utils/request';

export async function checkAvailableBalance() {
  const { data: accounts } = await request({ requestMethod: 'GET', requestPath: '/accounts' });

  const usdAccount = accounts.find((account: any) => account.currency === 'USD');

  const availableBalance = parseInt(usdAccount.available);

  return availableBalance;
}
