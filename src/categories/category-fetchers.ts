import { getDb } from '@/db/db-utils';
import { cache } from 'react';
import { Category } from './category-types';

export const getManyCategories = cache(async (): Promise<Category[]> => {
  const db = await getDb();
  return db.categories;
});
