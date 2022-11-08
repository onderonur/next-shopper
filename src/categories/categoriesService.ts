import 'server-only';
import dbJson from '@src/db/db.json';
import { wait } from '@src/common/CommonUtils';
import { Category } from './CategoriesTypes';

export const categoriesService = {
  getManyCategories: async (): Promise<Category[]> => {
    await wait();
    return dbJson.categories;
  },
};
