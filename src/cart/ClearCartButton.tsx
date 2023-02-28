import Button from '@/common/Button';
import { useConfirmModal } from '@/modals/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearCart, selectCartItems } from './cartSlice';

export default function ClearCartButton() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const confirmModal = useConfirmModal();

  if (!cartItems.length) {
    return null;
  }

  return (
    <Button
      variant="transparent"
      onClick={async () => {
        const { isConfirmed } = await confirmModal.show({
          title: 'Clear cart?',
          body: 'Are you sure to clear your cart?',
          confirmText: 'Clear',
        });

        if (isConfirmed) {
          dispatch(clearCart());
        }
      }}
    >
      Clear Cart
    </Button>
  );
}
