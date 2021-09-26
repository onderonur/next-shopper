import { createQuery } from '@src/query-client/QueryClientUtils';
import { useQuery } from 'react-query';
import { categoriesAPI } from './categoriesAPI';
import { Category } from './CategoriesTypes';

export const categoriesQuery = createQuery<string, Category[]>({
  getQueryKey: () => 'categories',
  queryFn: () => categoriesAPI.fetchManyCategories(),
});

export const useCategories = (...args: Parameters<typeof categoriesQuery>) => {
  return useQuery(categoriesQuery(...args));
};
