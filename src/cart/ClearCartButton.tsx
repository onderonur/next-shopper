import { useCartContext } from './CartContext';
import Button from '@src/common/Button';
import { useConfirm } from '@src/common/ConfirmContext';

function ClearCartButton() {
  const { cartItems, clearCart } = useCartContext();
  const { askConfirm } = useConfirm();

  if (!cartItems.length) {
    return null;
  }

  return (
    <Button
      variant="transparent"
      onClick={() => {
        askConfirm({
          title: 'Clear cart?',
          body: 'Are you sure to clear your cart?',
          confirmText: 'Clear',
          onConfirm: clearCart,
        });
      }}
    >
      Clear cart
    </Button>
  );
}

export default ClearCartButton;
