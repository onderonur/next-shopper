import { Maybe } from './CommonTypes';
import { createMockArray } from './CommonUtils';
import Loading from './Loading';

type ListProps<Item> = Pick<React.ComponentProps<'ul'>, 'role'> & {
  className?: string;
  items: Maybe<Item[]>;
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  skeletonCount?: number;
  itemSkeleton?: React.ReactNode;
  getItemKey: (item: Item, index: number) => string;
  renderItem: (item: Item) => React.ReactNode;
};

function List<Item>({
  role,
  className,
  items,
  isLoading,
  emptyMessage,
  skeletonCount,
  itemSkeleton,
  getItemKey,
  renderItem,
}: ListProps<Item>) {
  if (!isLoading && !items?.length) {
    return <div className={className}>{emptyMessage}</div>;
  }

  const listItemClassName = 'px-1';

  const content = (
    <ul role={role} className={className}>
      {isLoading
        ? createMockArray(skeletonCount ?? 0).map((_, i) => {
            if (!itemSkeleton) {
              return null;
            }

            return (
              <li key={i.toString()} className={listItemClassName}>
                {itemSkeleton}
              </li>
            );
          })
        : items?.map((item, i) => {
            return (
              <li key={getItemKey(item, i)} className={listItemClassName}>
                {renderItem(item)}
              </li>
            );
          })}
    </ul>
  );

  if (!skeletonCount || !itemSkeleton) {
    return <Loading isLoading={isLoading}>{content}</Loading>;
  }

  return <>{content}</>;
}

export default List;
