'use server';

import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/types';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import { refresh } from 'next/cache';

export async function addToFavorites(productId: Id) {
  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await prisma.favorite.create({
    data: {
      productId,
      userId: user.id,
    },
  });

  refresh();
}

export async function removeFromFavorites(productId: Id) {
  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await prisma.favorite.delete({
    where: {
      productId_userId: {
        productId,
        userId: user.id,
      },
    },
  });

  refresh();
}
