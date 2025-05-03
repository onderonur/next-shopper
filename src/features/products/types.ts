import type { Prisma, Product } from '@/generated/prisma';

export type ProductDetails = Prisma.ProductGetPayload<{
  include: { category: true };
}> & { isInFavorites: boolean };

export type ProductListItem = Product & {
  isInFavorites: boolean;
};
