import { createMockArray } from '@/common/common-utils';
import ListItem from '@/common/list-item';
import ProductCardSkeleton from '@/products/product-card-skeleton';

export default function SearchResultsSkeleton() {
  return (
    <>
      {createMockArray(8).map((i) => {
        return (
          <ListItem key={i}>
            <ProductCardSkeleton />
          </ListItem>
        );
      })}
    </>
  );
}
