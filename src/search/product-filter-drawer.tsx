import Button from '@/common/button';
import { FilterIcon } from '@/common/icons';
import ProductFilter from './product-filter';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/common/drawer';
import MobilePadding from '@/common/mobile-padding';

export default function ProductFilterDrawer() {
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
      <DrawerContent from="left">
        <DrawerHeader>
          <h2>Product Filter</h2>
        </DrawerHeader>
        <DrawerBody>
          <ProductFilter />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
