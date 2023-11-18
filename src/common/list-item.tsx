'use client';

import { motion } from 'framer-motion';

type ListItemProps = React.ComponentPropsWithoutRef<typeof motion.li>;

export default function ListItem(props: ListItemProps) {
  return (
    <motion.li
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      {...props}
    />
  );
}
