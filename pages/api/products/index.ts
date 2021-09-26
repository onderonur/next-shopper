import { createHandler } from '@src/api/ApiUtils';
import { Product } from '@src/products/ProductsTypes';
import { StatusCodes } from 'http-status-codes';

export default createHandler<{ GET: Product[] }>({
  GET: (req, res) => {
    const response = req.services.productsService.getManyProducts(req.query);
    res.status(StatusCodes.OK).json(response);
  },
});
