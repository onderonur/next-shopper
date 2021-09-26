import Drawer, { DrawerProps } from '@src/common/Drawer';
import CartDrawerContent from './CartDrawerContent';

type CartDrawerProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <Drawer from="right" isOpen={isOpen} title="Cart" onClose={onClose}>
      <CartDrawerContent />
    </Drawer>
  );
}

export default CartDrawer;
