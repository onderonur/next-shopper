import { useCartContext } from './CartContext';
import Button from '@src/common/Button';
import { useModal } from '@src/common/ModalRootContext';
import ConfirmModal, {
  ConfirmModalData,
  ConfirmModalProps,
} from '@src/common/ConfirmModal';

function ClearCartButton() {
  const { cartItems, clearCart } = useCartContext();
  const confirmModal = useModal<ConfirmModalProps, ConfirmModalData>(
    ConfirmModal,
  );

  if (!cartItems.length) {
    return null;
  }

  return (
    <Button
      aria-label="Clear Cart"
      variant="transparent"
      onClick={async () => {
        const { isConfirmed } = await confirmModal.show({
          title: 'Clear cart?',
          body: 'Are you sure to clear your cart?',
          confirmText: 'Clear',
        });

        if (isConfirmed) {
          clearCart();
        }
      }}
    >
      Clear Cart
    </Button>
  );
}

export default ClearCartButton;
