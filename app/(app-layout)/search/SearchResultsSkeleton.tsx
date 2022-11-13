import { createMockArray } from '@src/common/CommonUtils';
import ListItem from '@src/common/ListItem';
import ProductCardSkeleton from '@src/products/ProductCardSkeleton';

export default function ProductListSkeleton() {
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
