'use client';

import ProductCard from '@/products/ProductCard';
import ListItem from '@/common/ListItem';
import Paper from '@/common/Paper';
import List from '@/common/List';
import { useFilterProducts } from '@/search/SearchHooks';
import SearchResultsSkeleton from './SearchResultsSkeleton';

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
