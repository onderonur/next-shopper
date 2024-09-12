'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Id } from '@/core/shared/shared.types';
import { HeartOutlineIcon } from '@/core/ui/components/icons';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/features/favorites/favorites.actions';
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

  return (
    <form
      action={
        isInFavorites
          ? removeFromFavoritesWithProductId
          : addToFavoritesWithProductId
      }
    >
      <SubmitButton
        className={className}
        aria-label="Add product to favorites"
        icon={
          <HeartOutlineIcon
            className={twJoin(
              'text-sm',
              isInFavorites && 'fill-favorite stroke-favorite',
            )}
          />
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </form>
  );
}
