import { GetOneProductByIdArgs } from '@src/api/products/productsService';
import { createQuery } from '@src/query-client/QueryClientUtils';
import { useQuery } from 'react-query';
import { productsAPI } from './productsAPI';
import { Product } from './ProductsTypes';

export const productQuery = createQuery<
  [string, GetOneProductByIdArgs],
  Product,
  GetOneProductByIdArgs
>({
  getQueryKey: (args) => args && ['product', args],
  queryFn: ({ queryKey }) => productsAPI.fetchOneProduct(queryKey[1]),
});

export const useProduct = (...args: Parameters<typeof productQuery>) => {
  return useQuery(productQuery(...args));
};
