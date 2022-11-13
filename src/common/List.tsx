'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ListProvider from './ListContext';

type ListProps = Pick<React.ComponentProps<'ul'>, 'role'> &
  React.PropsWithChildren<{
    className?: string;
    isAnimated?: boolean;
    emptyMessage?: React.ReactNode;
  }>;

export default function List({
  role,
  className,
  isAnimated,
  emptyMessage = 'No results...',
  children,
}: ListProps) {
  if (!React.Children.count(children)) {
    return <div className={className}>{emptyMessage}</div>;
  }

  return (
    <ListProvider isAnimated={isAnimated}>
      <motion.ul layout={isAnimated} role={role} className={className}>
        {isAnimated ? <AnimatePresence>{children}</AnimatePresence> : children}
      </motion.ul>
    </ListProvider>
  );
}
