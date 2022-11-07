import { createHandler } from '@src/api/ApiUtils';
import {
  FilterProductsArgs,
  ProductFilterResponse,
} from '@src/products/ProductsTypes';
import { ProductFilterKey } from '@src/products/ProductsUtils';
import { parseRouteParams } from '@src/routing/RoutingUtils';
import { StatusCodes } from 'http-status-codes';

export default createHandler<{
  GET: ProductFilterResponse;
}>({
  GET: (req, res) => {
    const parsedQuery = parseRouteParams<FilterProductsArgs>(req.query);
    const response = req.services.productsService.filterProducts({
      sorting: parsedQuery.get(ProductFilterKey.SORTING),
      categories: parsedQuery.getMany(ProductFilterKey.CATEGORIES),
      priceRanges: parsedQuery.getMany(ProductFilterKey.PRICE_RANGES),
    });
    res.status(StatusCodes.OK).json(response);
  },
});
