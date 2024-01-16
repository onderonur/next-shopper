'use client';

import { Paper } from '@/common/paper';
import { ProductGrid, ProductGridSkeleton } from '@/products/product-grid';
import { useFilterProducts } from '@/search/search-hooks';

export function SearchResults() {
  const { data, isValidating } = useFilterProducts();

  return (
    <Paper>
      {isValidating ? (
        <ProductGridSkeleton itemCount={8} />
      ) : (
        <ProductGrid products={data?.products ?? []} />
      )}
    </Paper>
  );
}
