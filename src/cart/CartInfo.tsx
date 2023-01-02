'use client';

import Badge from '@src/common/Badge';
import Button from '@src/common/Button';
import { useDrawer } from '@src/common/Drawer';
import { CartIcon } from '@src/common/Icons';
import Price from '@src/common/Price';
import { useAppSelector } from '@src/store/store';
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
