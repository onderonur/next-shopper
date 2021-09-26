import { GetManyProductsArgs } from '@src/api/products/productsService';
import { createQuery } from '@src/query-client/QueryClientUtils';
import { useQuery } from 'react-query';
import { productsAPI } from './productsAPI';
import { Product } from './ProductsTypes';

const productsQuery = createQuery<
  [string, GetManyProductsArgs],
  Product[],
  GetManyProductsArgs
>({
  getQueryKey: (args) => args && ['products', args],
  queryFn: ({ queryKey }) => productsAPI.fetchManyProducts(queryKey[1]),
});

export const useProducts = (...args: Parameters<typeof productsQuery>) => {
  return useQuery(productsQuery(...args));
};
