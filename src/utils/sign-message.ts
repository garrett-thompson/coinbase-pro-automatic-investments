import { createHmac } from 'crypto';
import { getEnvVariable } from './get-env-variable';

interface SignMessageParams {
  body?: Record<any, any>;
  requestPath: string;
  requestMethod: 'POST' | 'GET';
}

export function signMessage({ body, requestPath, requestMethod }: SignMessageParams) {
  const timestamp = Math.round(Date.now() / 1000).toString();
  const secret = getEnvVariable('CB_ACCESS_SECRET');
  const key = Buffer.from(secret, 'base64');
  const hmac = createHmac('sha256', key);
  let message = timestamp + requestMethod + requestPath;
  if (body) message += JSON.stringify(body);

  const signedMessage = hmac.update(message).digest('base64');

  return { signedMessage, timestamp };
}
