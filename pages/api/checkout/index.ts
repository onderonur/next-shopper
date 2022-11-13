import { StatusCodes } from 'http-status-codes';
import { createHandler } from '@src/api/ApiUtils';
import { checkoutService } from '@src/checkout/checkoutService';
import createHttpError from 'http-errors';

export default createHandler<{ POST: void }>({
  POST: async (req, res) => {
    console.log(req.body);
    throw createHttpError.BadRequest('olmadı olmadı');
    await checkoutService.completeCheckout(req.body);
    res.status(StatusCodes.CREATED).send();
  },
});
