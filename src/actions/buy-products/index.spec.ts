jest.mock('../../utils/request', () => {
  return {
    request: jest.fn(),
  };
});
import * as requestModule from '../../utils/request';
import { buyProducts } from '.';

describe('postOrders', () => {
  let requestSpy: jest.SpyInstance;
  const productsToBuy = ['ETH-USD', 'AVAX-USD', 'SOL-USD'];
  const availableBalance = 15;

  beforeAll(() => {
    requestSpy = jest.spyOn(requestModule, 'request');
  });

  afterEach(() => {
    requestSpy.mockReset();
  });

  it('should make the right number of deposits', async () => {
    await buyProducts({ productsToBuy, availableBalance });

    expect(requestSpy).toHaveBeenCalledTimes(3);
  });

  it('should deposit the right amounts', async () => {
    await buyProducts({ productsToBuy, availableBalance });

    requestSpy.mock.calls.forEach((call) => expect(call[0].body.size).toEqual(5));
  });
});
