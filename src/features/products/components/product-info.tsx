import { routes } from '@/core/routing/utils';
import { ButtonLink } from '@/core/ui/components/button-link';
import { Price } from '@/core/ui/components/price';
import { AddProductToCartButton } from '@/features/cart/components/add-to-cart-button';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { ProductDetails } from '@/features/products/types';
import Image from 'next/image';
import { unstable_ViewTransition as ViewTransition } from 'react';

type ProductInfoProps = {
  product: ProductDetails;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ViewTransition name={`product-${product.id}`}>
        <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
          <Image
            className="rounded-sm bg-white object-contain p-6"
            src={product.image}
            alt={product.title}
            priority
            fill
          />
        </div>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{product.title}</div>
          <Price
            className="text-primary text-2xl font-semibold"
            value={product.price}
          />
        </div>
        <p className="text-sm">{product.description}</p>
        <div className="flex gap-2">
          <AddProductToCartButton productId={product.id} />
          <FavoriteButton
            productId={product.id}
            isInFavorites={product.isInFavorites}
            className="size-10"
          />
        </div>
        <ButtonLink
          variant="accent"
          className="self-start px-2 py-1 text-sm"
          href={routes.search({
            categories: [product.category.value],
          })}
        >
          {product.category.title}
        </ButtonLink>
      </div>
    </div>
  );
}
