import createHttpError from 'http-errors';
import { DoCheckoutArgs, doCheckoutArgsSchema } from './CheckoutUtils';

export const checkoutService = {
  doCheckout: async (args: DoCheckoutArgs) => {
    try {
      await doCheckoutArgsSchema.validate(args);
    } catch (err) {
      let errorMessage = 'Invalid input';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      throw new createHttpError.BadRequest(errorMessage);
    }
  },
};
