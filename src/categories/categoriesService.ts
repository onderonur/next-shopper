import { getDb } from '@src/db/DbUtils';
import 'server-only';
import { Category } from './CategoriesTypes';

export const categoriesService = {
  getManyCategories: async (): Promise<Category[]> => {
    const db = await getDb();
    return db.categories;
  },
};
