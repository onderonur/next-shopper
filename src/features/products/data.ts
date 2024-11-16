import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/types';
import { getUser } from '@/features/auth/data';
import { filterProducts } from '@/features/search/data';
import { cache } from 'react';
import 'server-only';

export const getOneProductById = cache(async (productId: Id) => {
  const user = await getUser();

  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      category: true,
      favorites: user?.id ? { where: { userId: user.id } } : false,
    },
  });

  if (!product) return null;

  const { favorites, ...rest } = product;

  return {
    ...rest,
    // Prisma can not infer conditional `include` cases.
    // So, we disable the ESLint rule here to check if `favorites` is `undefined` or not.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    isInFavorites: !!favorites?.length,
  };
});

export const getRelatedProducts = cache(async (productId: Id) => {
  const product = await getOneProductById(productId);

  if (!product) return [];

  const { products } = await filterProducts({
    categories: [product.category.value],
  });

  const relatedProducts = products.filter(
    (relatedProduct) => relatedProduct.id !== product.id,
  );

  return relatedProducts;
});
