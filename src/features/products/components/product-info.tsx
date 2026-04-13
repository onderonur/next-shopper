import { routes } from '@/core/routing/utils';
import { SKELETON_IMAGE } from '@/core/shared/utils';
import {
  BetterSkeleton,
  SkeletonText,
} from '@/core/ui/components/better-skeleton';
import { ButtonLink } from '@/core/ui/components/button-link';
import { Price } from '@/core/ui/components/price';
import { AddProductToCartButton } from '@/features/cart/components/add-to-cart-button';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { ProductDetailsData } from '@/features/products/types';
import Image from 'next/image';

type ProductInfoProps = {
  product: ProductDetailsData;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
        <Image
          className="rounded-sm bg-white object-contain p-6"
          src={product.image}
          alt={product.title}
          priority
          fill
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">
            <SkeletonText>{product.title}</SkeletonText>
          </div>
          <Price
            className="text-primary text-2xl font-semibold"
            value={product.price}
          />
        </div>
        <p className="text-sm">
          <SkeletonText>{product.description}</SkeletonText>
        </p>
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
          <SkeletonText>{product.category.title}</SkeletonText>
        </ButtonLink>
      </div>
    </div>
  );
}

const mockProduct: ProductDetailsData = {
  id: '0',
  title: 'Placeholder title for the product name with multiple lines',
  price: 99.99,
  image: SKELETON_IMAGE,
  description:
    'Placeholder description text that spans multiple lines to simulate real product content. This should be long enough to fill the description area properly.',
  categoryId: '0',
  createdAt: new Date(),
  updatedAt: new Date(),
  isInFavorites: false,
  category: {
    id: '0',
    title: 'Category',
    value: '',
    image: '',
    color: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export function ProductInfoSkeleton() {
  return (
    <BetterSkeleton>
      <ProductInfo product={mockProduct} />
    </BetterSkeleton>
  );
}
