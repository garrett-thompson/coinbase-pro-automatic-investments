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

export async function request<T = any>({ body, requestPath, requestMethod }: RequestParams) {
  try {
    const { signedMessage, timestamp } = signMessage({ body, requestPath, requestMethod });
    console.log({ body, requestPath, requestMethod });

    const response = await httpClient.request<T>({
      method: requestMethod,
      data: body,
      url: requestPath,
      headers: {
        'CB-ACCESS-SIGN': signedMessage,
        'CB-ACCESS-TIMESTAMP': timestamp,
      },
    });

    return response;
  } catch (err: any) {
    if (err?.response?.data) {
      throw err.response.data;
    }

    throw err;
  }
}
