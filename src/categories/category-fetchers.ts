import { cache } from 'react';
import { db } from '../../db/drizzle';
import type { Category } from './category-types';

// TODO: Category, Product vs tüm type'ları drizzle'dan infer et.
export const getManyCategories = cache(async (): Promise<Category[]> => {
  const categories = await db.query.categories.findMany();
  return categories;
});
