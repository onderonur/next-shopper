import 'server-only';

import { completeCheckoutArgsSchema } from './CheckoutUtils';

export const checkoutService = {
  completeCheckout: async (args: unknown) => {
    await completeCheckoutArgsSchema.parse(args);
  },
};
