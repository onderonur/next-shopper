import { Maybe } from './CommonTypes';
import { createMockArray } from './CommonUtils';
import Loading from './Loading';
import { AnimatePresence, motion } from 'framer-motion';

type ListProps<Item> = Pick<React.ComponentProps<'ul'>, 'role'> & {
  className?: string;
  isAnimated?: boolean;
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
  isAnimated,
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

  const listContent = isLoading
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
          <motion.li
            key={getItemKey(item, i)}
            className={listItemClassName}
            layout={isAnimated}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderItem(item)}
          </motion.li>
        );
      });

  return (
    <Loading isLoading={isLoading && (!skeletonCount || !itemSkeleton)}>
      <motion.ul layout={isAnimated} role={role} className={className}>
        {isAnimated ? (
          <AnimatePresence>{listContent}</AnimatePresence>
        ) : (
          listContent
        )}
      </motion.ul>
    </Loading>
  );
}

export default List;
