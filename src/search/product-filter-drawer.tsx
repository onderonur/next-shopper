import { Button } from '@/common/button';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerTrigger,
} from '@/common/drawer';
import { FilterIcon } from '@/common/icons';
import { MobilePadding } from '@/common/mobile-padding';
import { ProductFilter } from './product-filter';

export function ProductFilterDrawer() {
  return (
    <Drawer
      closeOnPathnameChange
      trigger={
        <MobilePadding className="md:hidden">
          <DrawerTrigger asChild>
            <Button variant="transparent" icon={<FilterIcon />}>
              Filter
            </Button>
          </DrawerTrigger>
        </MobilePadding>
      }
    >
      <DrawerHeader>
        <h2>Product Filter</h2>
      </DrawerHeader>
      <DrawerBody>
        <ProductFilter />
      </DrawerBody>
    </Drawer>
  );
}
