import { NextLink } from '@/routing/next-link';
import { BaseImage } from '@/common/base-image';
import { Price } from '@/common/price';
import type { Product } from './product-types';
import { routes } from '@/routing/routing-utils';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <NextLink href={routes.product({ params: { productId: product.id } })}>
      <article className="group flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
        <div className="p-2">
          <div className="relative aspect-[12/10] transform bg-transparent transition duration-500 ease-out group-hover:scale-110">
            <BaseImage
              className="object-contain"
              src={product.image}
              alt={product.title}
              fill
            />
          </div>
        </div>
        <div className="text-center">
          <div>
            <Price className="text-primary-dark" value={product.price} />
          </div>
          <h3 className="break-words text-sm font-bold">{product.title}</h3>
        </div>
      </article>
    </NextLink>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-md border-2 p-2 md:p-4">
      <div className="p-2">
        <div className="aspect-[12/10] rounded-md bg-skeleton" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="mx-auto h-6 w-16 rounded-md bg-skeleton" />
        <div className="mx-auto h-4 w-full max-w-[theme(spacing.48)] rounded-md bg-skeleton" />
        <div className="mx-auto h-4 w-full max-w-[theme(spacing.28)] rounded-md bg-skeleton" />
      </div>
    </div>
  );
}
