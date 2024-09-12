import { NextLink } from '@/core/routing/components/next-link';
import { routes } from '@/core/routing/routing.utils';
import { Price } from '@/core/ui/components/price';
import { Skeleton } from '@/core/ui/components/skeleton';
import { Tooltip } from '@/core/ui/components/tooltip';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { ProductListItem } from '@/features/products/products.types';
import Image from 'next/image';

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative">
      <NextLink
        href={routes.product({ params: { productId: product.id } })}
        // To show outline when the link is `focus-visible`.
        className="block"
      >
        <article className="group flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
          <div className="p-2">
            <div className="relative aspect-[12/10] overflow-hidden rounded">
              <Image
                className="bg-white object-contain p-4 transition duration-500 ease-out group-hover:scale-110"
                src={product.image}
                alt={product.title}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <Tooltip content={product.title}>
              <h3 className="line-clamp-3 min-h-[3lh] text-sm font-bold">
                {product.title}
              </h3>
            </Tooltip>
            <div>
              <Price
                className="font-semibold text-primary"
                value={product.price}
              />
            </div>
          </div>
        </article>
      </NextLink>
      <div className="absolute right-3 top-3">
        <FavoriteButton
          productId={product.id}
          isInFavorites={product.isInFavorites}
          className="h-8 w-8"
        />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
      <div className="p-2">
        <Skeleton className="aspect-[12/10]" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full flex-col items-center gap-1">
          <Skeleton className="h-4 w-full max-w-[theme(spacing.28)]" />
          <Skeleton className="h-4 w-full max-w-[theme(spacing.36)]" />
          <Skeleton className="h-4 w-full max-w-[theme(spacing.28)]" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
