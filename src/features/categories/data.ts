import { prisma } from '@/core/db/db';
import { cache } from 'react';
import 'server-only';

export const getManyCategories = cache(async () => {
  const categories = await prisma.category.findMany();
  return categories;
});
