import { createHandler } from '@src/api/ApiUtils';
import { productsService } from '@src/products/productsService';
import { ProductFilterResponse } from '@src/products/ProductsTypes';
import { ProductFilterKey } from '@src/products/ProductsUtils';
import { parseToSearchParams } from '@src/routing/RoutingUtils';

export default createHandler<{ GET: ProductFilterResponse }>({
  GET: async (req, res) => {
    const searchParams = parseToSearchParams(req.query);
    const response = await productsService.filterProducts({
      sorting: searchParams.get(ProductFilterKey.SORTING) ?? undefined,
      categories: searchParams.getAll(ProductFilterKey.CATEGORIES),
      priceRanges: searchParams.getAll(ProductFilterKey.PRICE_RANGES),
    });
    res.json(response);
  },
});
