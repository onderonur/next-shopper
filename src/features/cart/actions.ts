'use server';

import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/types';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import { getUserCart } from '@/features/cart/data';
import { refresh } from 'next/cache';

export async function addProductToCart(productId: Id) {
  const user = await getUser();
  if (!user) await redirectToSignIn();

  const userCart = await getUserCart();
  if (!userCart) return await redirectToSignIn();

  const productsOnCarts = await prisma.productsOnCarts.findFirst({
    where: {
      cartId: userCart.id,
      productId,
    },
  });

  if (productsOnCarts) {
    await prisma.productsOnCarts.update({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId,
        },
      },
      data: {
        count: productsOnCarts.count + 1,
      },
    });
  } else {
    await prisma.productsOnCarts.create({
      data: {
        cartId: userCart.id,
        productId,
        count: 1,
      },
    });
  }

  refresh();
}

export async function decreaseProductInCart(productId: Id) {
  const user = await getUser();
  if (!user) await redirectToSignIn();

  const userCart = await getUserCart();
  if (!userCart) return await redirectToSignIn();

  // These "xOnY" namings may be improved
  const productsOnCart = await prisma.productsOnCarts.findFirst({
    where: {
      cartId: userCart.id,
      productId,
    },
  });

  if (!productsOnCart) return;

  if (productsOnCart.count > 1) {
    await prisma.productsOnCarts.update({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId,
        },
      },
      data: {
        count: productsOnCart.count - 1,
      },
    });
  } else {
    await prisma.productsOnCarts.delete({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId,
        },
      },
    });
  }

  refresh();
}

export async function removeProductFromCart(productId: Id) {
  const user = await getUser();
  if (!user) await redirectToSignIn();

  const userCart = await getUserCart();
  if (!userCart) return await redirectToSignIn();

  await prisma.productsOnCarts.delete({
    where: {
      cartId_productId: {
        cartId: userCart.id,
        productId,
      },
    },
  });

  refresh();
}

export async function clearCart() {
  const user = await getUser();
  if (!user) await redirectToSignIn();

  const userCart = await getUserCart();
  if (!userCart) return await redirectToSignIn();

  await prisma.cart.delete({
    where: {
      id: userCart.id,
    },
  });

  refresh();

  return { success: true };
}
