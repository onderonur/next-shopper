import { httpClient } from '@src/http-client/httpClient';
import { Product } from './ProductsTypes';
import {
  GetOneProductByIdArgs,
  GetManyProductsArgs,
} from '@src/api/products/productsService';
import { IS_SERVER } from '@src/common/CommonUtils';
import { services } from '@src/api/ApiServices';

export const productsAPI = {
  fetchManyProducts: async (args: GetManyProductsArgs) => {
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
  fetchOneProduct: async (args: GetOneProductByIdArgs) => {
    if (IS_SERVER) {
      return services.productsService.getOneProductById(args);
    }
    const response = await httpClient.get<Product>(
      `/api/products/${args.productId}`,
    );
    return response.data;
  },
};
