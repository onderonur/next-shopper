import { createHandler } from '@src/api/ApiUtils';
import { Product } from '@src/products/ProductsTypes';
import { StatusCodes } from 'http-status-codes';
import createHttpError from 'http-errors';

export default createHandler<{ GET: Product }>({
  GET: (req, res) => {
    const productId = Number(req.query.productId);

    if (!productId) {
      throw new createHttpError.BadRequest();
    }

    const response = req.services.productsService.getOneProductById({
      productId,
    });

    res.status(StatusCodes.OK).json(response);
  },
});
