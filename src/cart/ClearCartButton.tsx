import Button from '@src/common/Button';
import ConfirmModal, {
  ConfirmModalData,
  ConfirmModalProps,
} from '@src/modals/ConfirmModal';
import { useModal } from '@src/modals/useModal';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { clearCart, selectCartItems } from './cartSlice';

export default function ClearCartButton() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const confirmModal = useModal<ConfirmModalProps, ConfirmModalData>(
    ConfirmModal,
  );

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
