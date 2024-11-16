'use client';

import {
  ProductGrid,
  ProductGridSkeleton,
} from '@/features/products/components/product-grid';
import { useSelectedOptionsContext } from '@/features/search/components/selected-options-context';
import type { ProductFilterResponse } from '@/features/search/types';

type SearchResultsProps = {
  data: ProductFilterResponse;
};

export function SearchResults({ data }: SearchResultsProps) {
  const { isPending } = useSelectedOptionsContext();

  return isPending ? (
    <ProductGridSkeleton itemCount={8} />
  ) : (
    <ProductGrid products={data.products} />
  );
}
