import { httpClient } from '@src/http-client/httpClient';
import { DoCheckoutArgs } from '@src/api/checkout/checkoutService';

export const checkoutAPI = {
  doCheckout: async (args: DoCheckoutArgs) => {
    await httpClient.post(`/api/checkout`, args);
  },
};
