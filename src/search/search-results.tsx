'use client';

import { ProductCard, ProductCardSkeleton } from '@/products/product-card';
import { Paper } from '@/common/paper';
import { List, ListItem } from '@/common/list';
import { useFilterProducts } from '@/search/search-hooks';
import { createMockArray } from '@/common/common-utils';
import classNames from 'classnames';

export function SearchResults() {
  const { data, isValidating } = useFilterProducts();

  return (
    <Paper>
      <List
        className={classNames(
          'grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        {isValidating
          ? createMockArray(8).map((i) => {
              return (
                <ListItem key={i}>
                  <ProductCardSkeleton />
                </ListItem>
              );
            })
          : data?.products.map((product) => {
              return (
                <ListItem key={product.id}>
                  <ProductCard product={product} />
                </ListItem>
              );
            })}
      </List>
    </Paper>
  );
}
