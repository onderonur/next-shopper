import { createMockArray } from '@src/common/CommonUtils';
import ListItem from '@src/common/ListItem';
import ImageLinkSkeleton from '@src/common/ImageLinkSkeleton';

export default function CategoriesSkeleton() {
  return (
    <>
      {createMockArray(4).map((i) => {
        return (
          <ListItem key={i}>
            <ImageLinkSkeleton />
          </ListItem>
        );
      })}
    </>
  );
}
