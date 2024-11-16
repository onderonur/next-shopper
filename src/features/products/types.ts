import type { Prisma, Product } from '@prisma/client';

export type ProductDetails = Prisma.ProductGetPayload<{
  include: { category: true };
}> & { isInFavorites: boolean };

export type ProductListItem = Product & {
  isInFavorites: boolean;
};
