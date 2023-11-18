'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Children } from 'react';

type ListProps = React.PropsWithChildren<{
  className?: string;
  layout?: boolean;
  emptyMessage?: React.ReactNode;
}>;

export default function List({
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
