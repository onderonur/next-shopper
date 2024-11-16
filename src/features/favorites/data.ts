import { prisma } from '@/core/db/db';
import { getUser } from '@/features/auth/data';
import type { ProductListItem } from '@/features/products/types';
import { cache } from 'react';

export const getFavorites = cache(async (): Promise<ProductListItem[]> => {
  const user = await getUser();
  if (!user?.id) return [];

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites.map((favorite) => ({
    ...favorite.product,
    isInFavorites: true,
  }));
});
