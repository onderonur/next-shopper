import type { Prisma } from '@prisma/client';

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
