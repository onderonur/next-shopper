import Panel from '@src/common/Panel';
import List from '@src/common/List';

type ProductListProps = React.PropsWithChildren;

export default function ProductList({ children }: ProductListProps) {
  return (
    <Panel>
      <List className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
        {children}
      </List>
    </Panel>
  );
}
