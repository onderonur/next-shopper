'use server';

import { prisma } from '@/core/db/db';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import { refresh } from 'next/cache';
import {
  addToFavoritesInputSchema,
  removeFromFavoritesInputSchema,
  type AddToFavoritesInput,
  type RemoveFromFavoritesInput,
} from './schemas';

export async function addToFavorites(input: AddToFavoritesInput) {
  const parsedInput = addToFavoritesInputSchema.safeParse(input);
  if (!parsedInput.success) return;

  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await prisma.favorite.create({
    data: {
      productId: parsedInput.data.productId,
      userId: user.id,
    },
  });

  refresh();
}

export async function removeFromFavorites(input: RemoveFromFavoritesInput) {
  const parsedInput = removeFromFavoritesInputSchema.safeParse(input);
  if (!parsedInput.success) return;

  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await prisma.favorite.delete({
    where: {
      productId_userId: {
        productId: parsedInput.data.productId,
        userId: user.id,
      },
    },
  });

  refresh();
}
