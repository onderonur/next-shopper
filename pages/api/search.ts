import { createHandler } from '@src/api/ApiUtils';
import { productsService } from '@src/products/productsService';
import { ProductFilterResponse } from '@src/products/ProductsTypes';
import { parseToSearchParams } from '@src/routing/RoutingUtils';

export default createHandler<{ GET: ProductFilterResponse }>({
  GET: async (req, res) => {
    const searchParams = parseToSearchParams(req.query);
    const response = await productsService.filterProducts({
      sorting: searchParams.get('sorting') ?? undefined,
      categories: searchParams.getAll('categories'),
      priceRanges: searchParams.getAll('priceRanges'),
    });
    res.json(response);
  },
});
