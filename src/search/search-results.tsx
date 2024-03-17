import { Paper } from '@/common/paper';
import { ProductGrid, ProductGridSkeleton } from '@/products/product-grid';
import type { ProductFilterResponse } from './search-types';

type SearchResultsProps = {
  data: ProductFilterResponse;
};

export function SearchResults({ data }: SearchResultsProps) {
  return (
    <Paper>
      <div className="hidden group-has-[[data-pending]]/page:block">
        <ProductGridSkeleton itemCount={8} />
      </div>
      <div className="group-has-[[data-pending]]/page:hidden">
        <ProductGrid products={data.products} />
      </div>
    </Paper>
  );
}
