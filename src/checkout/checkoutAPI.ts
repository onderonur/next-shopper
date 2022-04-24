import { httpClient } from '@src/http-client/httpClient';
import { CompleteCheckoutArgs } from './CheckoutUtils';

export const checkoutAPI = {
  completeCheckout: async (args: CompleteCheckoutArgs) => {
    await httpClient.post(`/api/checkout`, args);
  },
};
