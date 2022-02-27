import { services } from '@src/api/ApiServices';
import { IS_SERVER } from '@src/common/CommonUtils';
import { httpClient } from '@src/http-client/httpClient';
import { createQuery } from '@src/query-client/QueryClientUtils';
import { Category } from './CategoriesTypes';

export const categoriesAPI = {
  fetchManyCategories: createQuery<'categories', Category[]>({
    getQueryKey: () => 'categories',
    queryFn: async () => {
      if (IS_SERVER) {
        return services.categoriesService.getManyCategories();
      }
      const response = await httpClient.get<Category[]>('/api/categories');
      return response.data;
    },
  }),
};
