'use client';

import { useConfirmModal } from '@/modals/confirm-modal';
import { clearCart } from './cart-actions';
import { CartDetails } from './cart-types';
import { Maybe } from '@/common/common-types';
import SubmitButton from '@/forms/submit-button';

type ClearCartButtonProps = { cart: Maybe<CartDetails> };

export default function ClearCartButton({ cart }: ClearCartButtonProps) {
  const confirmModal = useConfirmModal();

  if (!cart) {
    return null;
  }

  return (
    <form
      action={async () => {
        const { isConfirmed } = await confirmModal.show({
          title: 'Clear cart?',
          body: 'Are you sure to clear your cart?',
          confirmText: 'Clear',
        });

        if (isConfirmed) {
          await clearCart();
        }
      }}
    >
      <SubmitButton className="w-full" variant="transparent">
        Clear Cart
      </SubmitButton>
    </form>
  );
}
