import Drawer from '@/common/drawer';
import DrawerButton from '@/common/drawer-button';
import DrawerProvider from '@/common/drawer-context';
import { FilterIcon } from '@/common/icons';

type FilterDrawerProps = React.PropsWithChildren;

export default function FilterDrawer({ children }: FilterDrawerProps) {
  return (
    <DrawerProvider closeOnRouteChange={false}>
      <div className="md:hidden flex justify-end">
        <DrawerButton variant="transparent" icon={<FilterIcon />}>
          Filter
        </DrawerButton>
        <Drawer title="Product Filter">{children}</Drawer>
      </div>
    </DrawerProvider>
  );
}
