'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Children } from 'react';

type ListProps = React.PropsWithChildren<{
  className?: string;
  layout?: boolean;
  emptyMessage?: React.ReactNode;
}>;

export function List({
  className,
  layout,
  emptyMessage = 'No results...',
  children,
}: ListProps) {
  if (!Children.count(children)) {
    return <div className={className}>{emptyMessage}</div>;
  }

  return (
    <motion.ul layout={layout} className={className}>
      {layout ? <AnimatePresence>{children}</AnimatePresence> : children}
    </motion.ul>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<typeof motion.li>;

export function ListItem(props: ListItemProps) {
  return (
    <motion.li
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      {...props}
    />
  );
}
