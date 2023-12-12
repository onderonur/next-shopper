import { createMockArray } from '@/common/common-utils';
import { ProductCard, ProductCardSkeleton } from './product-card';
import type { Product } from './product-types';

type ProductGridShellProps = React.PropsWithChildren;

function ProductGridShell({ children }: ProductGridShellProps) {
  return (
    <ul className="grid gap-2 grid-cols-autofill-44 md:gap-4">{children}</ul>
  );
}

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
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
