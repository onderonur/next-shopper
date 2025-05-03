import type { Prisma } from '@/generated/prisma';

export type ProductsOnCartsWithProduct = Prisma.ProductsOnCartsGetPayload<{
  include: {
    product: true;
  };
}>;

type CartWithProducts = Prisma.CartGetPayload<{
  include: { productsOnCarts: { include: { product: true } } };
}>;

export type CartDetails = {
  cart: CartWithProducts;
  totalPrice: number;
  totalCount: number;
};
