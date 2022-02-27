import { motion } from 'framer-motion';
import { useListContext } from './ListContext';

type ListItemProps = React.ComponentProps<typeof motion.li>;

function ListItem(props: ListItemProps) {
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

export default ListItem;
