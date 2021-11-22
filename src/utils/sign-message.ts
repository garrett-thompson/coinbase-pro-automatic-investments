import { createHmac } from 'crypto';
interface SignMessageParams {
  body?: Record<any, any>;
  requestPath: string;
  requestMethod: 'POST' | 'GET';
}

export function signMessage({ body, requestPath, requestMethod }: SignMessageParams) {
  const timestamp = Math.round(Date.now() / 1000).toString();

  const key = Buffer.from(process.env.CB_ACCESS_SECRET as string, 'base64');

  const hmac = createHmac('sha256', key);

  let message = timestamp + requestMethod + requestPath;
  if (body) message += JSON.stringify(body);

  const signedMessage = hmac.update(message).digest('base64');

  return { signedMessage, timestamp };
}
