import type { Prisma } from '@/generated/prisma';

export type OrderWithProducts = Prisma.OrderGetPayload<{
  include: {
    productsOnOrders: {
      include: {
        product: true;
      };
    };
  };
}>;

export type OrderDetails = OrderWithProducts & {
  totalPrice: number;
};
