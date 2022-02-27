import { Maybe } from './CommonTypes';
import { createMockArray } from './CommonUtils';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ListProvider from './ListContext';

type ListProps<Item> = Pick<React.ComponentProps<'ul'>, 'role'> & {
  className?: string;
  isAnimated?: boolean;
  items: Maybe<Item[]>;
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  skeletonCount?: number;
  itemSkeleton?: React.ReactNode;
  getItemKey: (item: Item, index: number) => string;
  renderItem: (item: Item, index: number) => React.ReactNode;
};

function List<Item>({
  role,
  className,
  isAnimated,
  items,
  isLoading,
  emptyMessage = 'No results...',
  skeletonCount,
  itemSkeleton,
  getItemKey,
  renderItem,
}: ListProps<Item>) {
  const isEmpty = !isLoading && !items?.length;
  if (isEmpty) {
    return <div className={className}>{emptyMessage}</div>;
  }

  const listContent = isLoading
    ? createMockArray(skeletonCount ?? 0).map((_, i) => {
        if (!itemSkeleton) {
          return null;
        }

        return <li key={i.toString()}>{itemSkeleton}</li>;
      })
    : items?.map((item, i) => {
        return (
          <React.Fragment key={getItemKey(item, i)}>
            {renderItem(item, i)}
          </React.Fragment>
        );
      });

  return (
    <ListProvider isAnimated={isAnimated}>
      <motion.ul layout={isAnimated} role={role} className={className}>
        {isAnimated ? (
          <AnimatePresence>{listContent}</AnimatePresence>
        ) : (
          listContent
        )}
      </motion.ul>
    </ListProvider>
  );
}

export default List;
