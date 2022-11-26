import { createMockArray } from '@src/common/CommonUtils';
import ListItem from '@src/common/ListItem';
import CategoryLinkSkeleton from './CategoryLinkSkeleton';

export default function CategoriesSkeleton() {
  return (
    <>
      {createMockArray(4).map((i) => {
        return (
          <ListItem key={i}>
            <CategoryLinkSkeleton />
          </ListItem>
        );
      })}
    </>
  );
}
