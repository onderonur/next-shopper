'use server';

import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/shared.types';
import { redirectToSignIn } from '@/features/auth/auth.actions';
import { getUser } from '@/features/auth/auth.data';
import { getUserCart } from '@/features/cart/cart.data';
import { revalidatePath } from 'next/cache';

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

  revalidatePath('/');
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

  revalidatePath('/');
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

  revalidatePath('/');
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

  revalidatePath('/');

  return { success: true };
}
