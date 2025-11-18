import type { Prisma, Product } from '@/generated/prisma';

// TODO: Find a better name
export type ProductDetailsData = Prisma.ProductGetPayload<{
  include: { category: true };
}> & { isInFavorites: boolean };

export type ProductListItem = Product & {
  isInFavorites: boolean;
};
