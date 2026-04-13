import { NextLink } from '@/core/routing/components/next-link';
import { routes } from '@/core/routing/utils';
import { SKELETON_IMAGE } from '@/core/shared/utils';
import {
  BetterSkeleton,
  SkeletonText,
} from '@/core/ui/components/better-skeleton';
import { Price } from '@/core/ui/components/price';
import { Tooltip } from '@/core/ui/components/tooltip';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { ProductListItem } from '@/features/products/types';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type ProductCardProps = {
  product: ProductListItem;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={twMerge('relative', className)}>
      <NextLink
        href={routes.product({ productId: product.id })}
        // To show outline when the link is `focus-visible`.
        className="block"
      >
        <article className="group flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
          <div className="p-2">
            {/* TODO: Removed ViewTransition from here and <ProductInfo> because it moves these images
            in front of favorite buttons. Will look into it later. */}
            <div className="relative aspect-12/10 overflow-hidden rounded-sm">
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
              <div className="min-h-[3lh]">
                <h3 className="line-clamp-3 text-sm font-bold">
                  <SkeletonText>{product.title}</SkeletonText>
                </h3>
              </div>
            </Tooltip>
            <div>
              <Price
                className="text-primary font-semibold"
                value={product.price}
              />
            </div>
          </div>
        </article>
      </NextLink>
      <div className="absolute top-3 right-3">
        <FavoriteButton
          productId={product.id}
          isInFavorites={product.isInFavorites}
          className="size-8"
        />
      </div>
    </div>
  );
}

const mockProduct: ProductCardProps['product'] = {
  id: '0',
  title: 'Placeholder title',
  categoryId: '0',
  description: '',
  image: SKELETON_IMAGE,
  isInFavorites: false,
  price: 9.99,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function ProductCardSkeleton() {
  return (
    <BetterSkeleton>
      <ProductCard product={mockProduct} />
    </BetterSkeleton>
  );
}
