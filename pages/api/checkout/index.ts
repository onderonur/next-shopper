import { StatusCodes } from 'http-status-codes';
import { createHandler } from '@src/api/ApiUtils';
import { checkoutService } from '@src/checkout/checkoutService';

export default createHandler<{ POST: void }>({
  POST: async (req, res) => {
    await checkoutService.completeCheckout(req.body);
    res.status(StatusCodes.CREATED).send();
  },
});
