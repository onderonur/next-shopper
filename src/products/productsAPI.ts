import { httpClient } from '@src/http-client/httpClient';
import { Product } from './ProductsTypes';
import {
  GetOneProductByIdArgs,
  GetManyProductsArgs,
} from '@src/api/products/productsService';
import { IS_SERVER } from '@src/common/CommonUtils';
import { services } from '@src/api/ApiServices';
import { createQuery } from '@src/query-client/QueryClientUtils';

export const productsAPI = {
  fetchManyProducts: createQuery<
    ['products', GetManyProductsArgs],
    Product[],
    GetManyProductsArgs
  >({
    getQueryKey: (args) => ['products', args],
    queryFn: async (args) => {
      // When on server-side, we don't use `fetch` to get data from our API routes on.
      // We just use server-side code directly.
      // https://nextjs.org/docs/basic-features/data-fetching
      if (IS_SERVER) {
        return services.productsService.getManyProducts(args);
      }
      const response = await httpClient.get<Product[]>(`/api/products`, {
        params: args,
      });
      return response.data;
    },
  }),
  fetchOneProduct: createQuery<
    ['product', GetOneProductByIdArgs],
    Product,
    GetOneProductByIdArgs
  >({
    getQueryKey: (args) => ['product', args],
    queryFn: async (args) => {
      if (IS_SERVER) {
        return services.productsService.getOneProductById(args);
      }
      const response = await httpClient.get<Product>(
        `/api/products/${args.productId}`,
      );
      return response.data;
    },
  }),
};
