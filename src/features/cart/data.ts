import { prisma } from '@/core/db/db';
import { getUser } from '@/features/auth/data';
import type { CartDetails } from '@/features/cart/types';
import { cache } from 'react';
import 'server-only';

export const getUserCart = cache(async () => {
  const user = await getUser();
  if (!user?.id) return null;

  const userCart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      productsOnCarts: {
        include: {
          product: true,
        },
      },
    },
  });

  return userCart;
});

export const getCart = cache(async () => {
  const user = await getUser();
  if (!user?.id) return null;

  let userCart = await getUserCart();

  if (!userCart) {
    try {
      userCart = await prisma.cart.create({
        data: { userId: user.id },
        include: {
          productsOnCarts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  let totalPrice = 0;
  let totalCount = 0;

  for (const productsOnCart of userCart.productsOnCarts) {
    totalPrice += productsOnCart.product.price * productsOnCart.count;
    totalCount += productsOnCart.count;
  }

  if (!totalCount) return null;

  const cartDetails: CartDetails = {
    cart: userCart,
    totalCount,
    totalPrice,
  };

  return cartDetails;
});
