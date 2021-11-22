import { request } from './utils/request';

async function main() {
  const data = await request({ requestMethod: 'GET', requestPath: '/payment-methods' })
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data));
  console.log({ data });
}

if (require.main === module) {
  main();
}
