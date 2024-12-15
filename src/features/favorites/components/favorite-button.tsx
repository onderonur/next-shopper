'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Id } from '@/core/shared/types';
import { HeartOutlineIcon } from '@/core/ui/components/icons';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/features/favorites/actions';
import Form from 'next/form';
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
    <Form
      action={
        isInFavorites
          ? removeFromFavoritesWithProductId
          : addToFavoritesWithProductId
      }
    >
      <SubmitButton
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
            isInFavorites && 'fill-favorite stroke-favorite',
          )}
        />
      </SubmitButton>
    </Form>
  );
}
