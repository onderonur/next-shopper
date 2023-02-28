import { createMockArray } from '@/common/CommonUtils';
import ListItem from '@/common/ListItem';
import ProductCardSkeleton from '@/products/ProductCardSkeleton';

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
