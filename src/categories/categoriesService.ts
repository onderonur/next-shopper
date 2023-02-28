import 'server-only';
import { getDb } from '@/db/DbUtils';
import { cache } from 'react';
import { Category } from './CategoriesTypes';

export const categoriesService = {
  getManyCategories: cache(async (): Promise<Category[]> => {
    const db = await getDb();
    return db.categories;
  }),
};
