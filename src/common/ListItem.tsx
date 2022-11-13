'use client';

import { motion } from 'framer-motion';
import { useListContext } from './ListContext';

type ListItemProps = React.ComponentPropsWithoutRef<typeof motion.li>;

export default function ListItem(props: ListItemProps) {
  const { isAnimated } = useListContext();

  return (
    <motion.li
      layout={isAnimated}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      {...props}
    />
  );
}
