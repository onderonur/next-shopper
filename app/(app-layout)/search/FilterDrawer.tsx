'use client';

import Button from '@src/common/Button';
import Drawer, { useDrawer } from '@src/common/Drawer';
import { FilterIcon } from '@src/common/Icons';
import { useSearchParams } from 'next/navigation';

type FilterDrawerProps = React.PropsWithChildren;

export default function FilterDrawer({ children }: FilterDrawerProps) {
  const { isOpen, open, close } = useDrawer({ closeOnRouteChange: false });

  // TODO: Bu geçici olarak eklendi. Yoksa build alınca param'lar siliniyor.
  // https://github.com/vercel/next.js/issues/42438
  useSearchParams();

  return (
    <div className="md:hidden flex justify-end">
      <Button variant="transparent" icon={<FilterIcon />} onClick={open}>
        Filter
      </Button>
      <Drawer title="Product Filter" isOpen={isOpen} onClose={close}>
        {children}
      </Drawer>
    </div>
  );
}
