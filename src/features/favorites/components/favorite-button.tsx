'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Id } from '@/core/shared/types';
import { HeartOutlineIcon } from '@/core/ui/components/icons';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/features/favorites/actions';
import Form from 'next/form';
import { useOptimistic } from 'react';
import { twJoin } from 'tailwind-merge';

type FavoriteButtonProps = {
  productId: Id;
  isInFavorites: boolean;
  className?: string;
};

export function FavoriteButton({
  productId,
  isInFavorites,
  className,
}: FavoriteButtonProps) {
  const addToFavoritesWithProductId = addToFavorites.bind(null, productId);
  const removeFromFavoritesWithProductId = removeFromFavorites.bind(
    null,
    productId,
  );

  const [optimisticIsInFavorites, toggleOptimisticIsInFavorites] =
    useOptimistic(isInFavorites, (state) => {
      return !state;
    });

  return (
    <Form
      action={async () => {
        // Reducer of `useOptimistic` needs an `action` parameter which is `unknown` by default.
        // So, we pass `null` here to make TypeScript happy. We don't use it in the reducer anyway.
        toggleOptimisticIsInFavorites(null);

        if (optimisticIsInFavorites) {
          await removeFromFavoritesWithProductId();
          return;
        }

        await addToFavoritesWithProductId();
      }}
    >
      <SubmitButton
        isOptimistic
        size="icon"
        className={className}
        aria-label="Add product to favorites"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeartOutlineIcon
          className={twJoin(
            'text-sm',
            optimisticIsInFavorites && 'fill-favorite stroke-favorite',
          )}
        />
      </SubmitButton>
    </Form>
  );
}
