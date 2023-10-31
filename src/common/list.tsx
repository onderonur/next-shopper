'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ListProvider from './list-context';
import { Children } from 'react';

type ListProps = React.PropsWithChildren<{
  className?: string;
  isAnimated?: boolean;
  emptyMessage?: React.ReactNode;
}>;

export default function List({
  className,
  isAnimated,
  emptyMessage = 'No results...',
  children,
}: ListProps) {
  if (!Children.count(children)) {
    return <div className={className}>{emptyMessage}</div>;
  }

  return (
    <ListProvider isAnimated={isAnimated}>
      <motion.ul layout={isAnimated} className={className}>
        {isAnimated ? <AnimatePresence>{children}</AnimatePresence> : children}
      </motion.ul>
    </ListProvider>
  );
}
