import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/types';
import { getUser } from '@/features/auth/data';
import { getOrderTotalPrice } from '@/features/orders/utils';
import { cache } from 'react';

export const getManyUserOrders = cache(async () => {
  const user = await getUser();
  if (!user?.id) return [];

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      productsOnOrders: {
        include: {
          product: true,
        },
      },
      city: {
        include: {
          region: {
            include: {
              continent: true,
            },
          },
        },
      },
    },
  });

  return orders.map((order) => ({
    ...order,
    totalPrice: getOrderTotalPrice(order),
  }));
});

export const getOneOrderById = cache(async (orderId: Id) => {
  const user = await getUser();
  if (!user?.id) return null;

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      productsOnOrders: {
        include: {
          product: true,
        },
      },
      city: {
        include: {
          region: {
            include: {
              continent: true,
            },
          },
        },
      },
    },
  });

  if (order?.userId !== user.id) return null;

  return { ...order, totalPrice: getOrderTotalPrice(order) };
});
