'use client';

import Badge from '@/common/Badge';
import Button from '@/common/Button';
import { useDrawer } from '@/common/Drawer';
import { CartIcon } from '@/common/Icons';
import Price from '@/common/Price';
import { useAppSelector } from '@/store/store';
import CartDrawer from './CartDrawer';
import { selectProductsCount, selectTotalPrice } from './cartSlice';

export default function CartInfo() {
  const totalPrice = useAppSelector(selectTotalPrice);
  const productsCount = useAppSelector(selectProductsCount);

  const { isOpen, open, close } = useDrawer();

  return (
    <>
      <Badge value={productsCount}>
        <Button aria-label="Open Cart Info" icon={<CartIcon />} onClick={open}>
          <Price value={totalPrice} />
        </Button>
      </Badge>
      <CartDrawer isOpen={isOpen} onClose={close} />
    </>
  );
}
