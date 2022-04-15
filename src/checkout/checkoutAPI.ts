import { httpClient } from '@src/http-client/httpClient';
import { DoCheckoutArgs } from './CheckoutUtils';

export const checkoutAPI = {
  doCheckout: async (args: DoCheckoutArgs) => {
    await httpClient.post(`/api/checkout`, args);
  },
};
