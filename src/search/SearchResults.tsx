'use client';

import ProductCard from '@src/products/ProductCard';
import ListItem from '@src/common/ListItem';
import Paper from '@src/common/Paper';
import List from '@src/common/List';
import { useFilterProducts } from '@src/products/useFilterProducts';
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
