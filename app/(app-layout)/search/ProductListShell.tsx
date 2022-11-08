import List from '@src/common/List';
import Paper from '@src/common/Paper';

type ProductListProps = React.PropsWithChildren;

export default function ProductList({ children }: ProductListProps) {
  return (
    <Paper>
      <List className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
        {children}
      </List>
    </Paper>
  );
}
