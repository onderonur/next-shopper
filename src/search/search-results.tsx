'use client';

import ProductCard from '@/products/product-card';
import ListItem from '@/common/list-item';
import Paper from '@/common/paper';
import List from '@/common/list';
import { useFilterProducts } from '@/search/search-hooks';
import SearchResultsSkeleton from './search-results-skeleton';

export default function SearchResults() {
  const { data, isValidating } = useFilterProducts();

  return (
    <Paper>
      <List className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
        {isValidating ? (
          <SearchResultsSkeleton />
        ) : (
          data?.products.map((product) => {
            return (
              <ListItem key={product.id}>
                <ProductCard product={product} />
              </ListItem>
            );
          })
        )}
      </List>
    </Paper>
  );
}
