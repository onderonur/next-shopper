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
      aria-label="Clear Cart"
      variant="transparent"
      onClick={async () => {
        const isConfirmed = await askConfirm({
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
