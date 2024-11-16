import { createMockArray } from '@/core/shared/utils';
import {
  ProductCard,
  ProductCardSkeleton,
} from '@/features/products/components/product-card';
import type { ProductListItem } from '@/features/products/types';

type ProductGridShellProps = {
  children: React.ReactNode;
};

function ProductGridShell({ children }: ProductGridShellProps) {
  return (
    <ul className="grid gap-2 grid-cols-autofill-44 md:gap-4">{children}</ul>
  );
}

type ProductGridProps = {
  products: ProductListItem[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) return <p>Nothing has been found...</p>;

  return (
    <ProductGridShell>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ProductGridShell>
  );
}

type ProductGridSkeletonProps = {
  itemCount: number;
};

export function ProductGridSkeleton({ itemCount }: ProductGridSkeletonProps) {
  return (
    <ProductGridShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        );
      })}
    </ProductGridShell>
  );
}
