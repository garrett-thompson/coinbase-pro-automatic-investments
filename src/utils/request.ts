import axios from 'axios';
import { getEnvVariable } from './get-env-variable';
import { signMessage } from './sign-message';

const httpClient = axios.create({
  baseURL: 'https://api.exchange.coinbase.com',
  headers: {
    'CB-ACCESS-KEY': getEnvVariable('CB_ACCESS_KEY'),

    'CB-ACCESS-PASSPHRASE': getEnvVariable('CB_ACCESS_PASSPHRASE'),
    'CB-VERSION': '2021-11-21',
  },
});

interface RequestParams {
  body?: Record<any, any>;
  requestPath: string;
  requestMethod: 'POST' | 'GET';
}

export async function request({ body, requestPath, requestMethod }: RequestParams) {
  const { signedMessage, timestamp } = signMessage({ body, requestPath, requestMethod });

  return httpClient.request({
    method: requestMethod,
    data: body,
    url: requestPath,
    headers: {
      'CB-ACCESS-SIGN': signedMessage,
      'CB-ACCESS-TIMESTAMP': timestamp,
    },
  });
}
