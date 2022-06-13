import Button from '@src/common/Button';
import { useModal } from '@src/common/ModalRootContext';
import ConfirmModal, {
  ConfirmModalData,
  ConfirmModalProps,
} from '@src/common/ConfirmModal';
import { cartSelectors, useCartStore } from './cartStore';

function ClearCartButton() {
  const cartItems = useCartStore(cartSelectors.cartItems);
  const clearCart = useCartStore(cartSelectors.clearCart);
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
          clearCart();
        }
      }}
    >
      Clear Cart
    </Button>
  );
}

export default ClearCartButton;
