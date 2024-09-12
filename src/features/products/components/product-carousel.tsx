import { createMockArray } from '@/core/shared/shared.utils';
import {
  ProductCard,
  ProductCardSkeleton,
} from '@/features/products/components/product-card';
import type { ProductListItem } from '@/features/products/products.types';

type ProductCarouselShellProps = {
  children: React.ReactNode;
};

function ProductCarouselShell({ children }: ProductCarouselShellProps) {
  return (
    <div className="overflow-auto pb-2">
      <ul className="grid auto-cols-[40%] grid-flow-col gap-2 sm:auto-cols-[30%] md:auto-cols-[27%] md:gap-4 lg:auto-cols-[20%]">
        {children}
      </ul>
    </div>
  );
}

type ProductCarouselProps = {
  products: ProductListItem[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  if (!products.length) return <p>Nothing has been found...</p>;

  return (
    <ProductCarouselShell>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ProductCarouselShell>
  );
}

type ProductCarouselSkeletonProps = {
  itemCount: number;
};

export function ProductCarouselSkeleton({
  itemCount,
}: ProductCarouselSkeletonProps) {
  return (
    <ProductCarouselShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        );
      })}
    </ProductCarouselShell>
  );
}
