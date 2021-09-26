import { createHandler } from '@src/api/ApiUtils';
import { Product } from '@src/products/ProductsTypes';
import { StatusCodes } from 'http-status-codes';
import createHttpError from 'http-errors';
import { isNil, parseNumber } from '@src/common/CommonUtils';

export default createHandler<{ GET: Product }>({
  GET: (req, res) => {
    const productId = parseNumber(req.query.productId);

    if (isNil(productId)) {
      throw new createHttpError.BadRequest();
    }

    const response = req.services.productsService.getOneProductById({
      productId,
    });

    res.status(StatusCodes.OK).json(response);
  },
});
