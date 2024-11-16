import { Button } from '@/core/ui/components/button';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerTrigger,
} from '@/core/ui/components/drawer';
import { FilterIcon } from '@/core/ui/components/icons';

type ProductFilterDrawerProps = {
  children: React.ReactNode;
};

export function ProductFilterDrawer({ children }: ProductFilterDrawerProps) {
  return (
    <Drawer
      closeOnPathnameChange
      trigger={
        <div className="flex justify-end md:hidden">
          <DrawerTrigger asChild>
            <Button>
              <FilterIcon />
              Filter
            </Button>
          </DrawerTrigger>
        </div>
      }
    >
      <DrawerHeader>
        <h2>Product Filter</h2>
      </DrawerHeader>
      <DrawerBody>{children}</DrawerBody>
    </Drawer>
  );
}
