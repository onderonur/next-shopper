import 'server-only';
import { goTry } from 'go-try';
import createHttpError from 'http-errors';
import {
  CompleteCheckoutArgs,
  completeCheckoutArgsSchema,
} from './CheckoutUtils';
import { wait } from '@src/common/CommonUtils';

export const checkoutService = {
  completeCheckout: async (args: CompleteCheckoutArgs) => {
    await wait();

    const [error] = await goTry(() =>
      completeCheckoutArgsSchema.validate(args),
    );

    if (error) {
      let errorMessage = 'Invalid input';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new createHttpError.BadRequest(errorMessage);
    }
  },
};
