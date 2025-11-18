import { routes } from '@/core/routing/utils';
import { ButtonLink } from '@/core/ui/components/button-link';
import { IconButtonSkeleton } from '@/core/ui/components/icon-button-skeleton';
import { Price } from '@/core/ui/components/price';
import { Skeleton } from '@/core/ui/components/skeleton';
import {
  AddProductToCartButton,
  AddProductToCartButtonSkeleton,
} from '@/features/cart/components/add-to-cart-button';
import { FavoriteButton } from '@/features/favorites/components/favorite-button';
import type { ProductDetailsData } from '@/features/products/types';
import Image from 'next/image';

type ProductInfoShellProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  price: React.ReactNode;
  actions: React.ReactNode;
  category: React.ReactNode;
};

function ProductInfoShell({
  image,
  title,
  price,
  description,
  actions,
  category,
}: ProductInfoShellProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
        {image}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {title}
          {price}
        </div>
        {description}
        <div className="flex gap-2">{actions}</div>
        {category}
      </div>
    </div>
  );
}

type ProductInfoProps = {
  product: ProductDetailsData;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <ProductInfoShell
      image={
        <Image
          className="rounded-sm bg-white object-contain p-6"
          src={product.image}
          alt={product.title}
          priority
          fill
        />
      }
      title={<div className="text-2xl font-bold">{product.title}</div>}
      price={
        <Price
          className="text-primary text-2xl font-semibold"
          value={product.price}
        />
      }
      description={<p className="text-sm">{product.description}</p>}
      actions={
        <>
          <AddProductToCartButton productId={product.id} />
          <FavoriteButton
            productId={product.id}
            isInFavorites={product.isInFavorites}
            className="size-10"
          />
        </>
      }
      category={
        <ButtonLink
          variant="accent"
          className="self-start px-2 py-1 text-sm"
          href={routes.search({
            categories: [product.category.value],
          })}
        >
          {product.category.title}
        </ButtonLink>
      }
    />
  );
}

export function ProductInfoSkeleton() {
  return (
    <ProductInfoShell
      image={<Skeleton className="absolute inset-0" />}
      title={
        <div className="grid gap-1">
          <Skeleton className="h-lh text-2xl" />
          <Skeleton className="h-lh w-1/3 text-2xl" />
        </div>
      }
      price={<Skeleton className="h-lh w-20 text-2xl" />}
      description={<Skeleton className="h-48" />}
      actions={
        <>
          <AddProductToCartButtonSkeleton />
          <IconButtonSkeleton className="size-10" />
        </>
      }
      category={<Skeleton className="h-7 w-32 self-start" />}
    />
  );
}
