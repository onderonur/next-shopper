'use client';

import {
  AlertModal,
  AlertModalBody,
  AlertModalFooter,
  AlertModalTitle,
  AlertModalTrigger,
} from '@/common/alert-modal';
import { Button } from '@/common/button';
import type { Maybe } from '@/common/common-types';
import { SubmitButton } from '@/forms/submit-button';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { clearCart } from './cart-actions';
import type { CartDetails } from './cart-types';

type ClearCartButtonProps = { cart: Maybe<CartDetails> };

export function ClearCartButton({ cart }: ClearCartButtonProps) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [state, formAction] = useFormState(clearCart, null);
  const { success } = state ?? {};

  useEffect(() => {
    if (success) {
      setIsAlertModalOpen(false);
    }
  }, [success]);

  if (!cart) return null;

  return (
    <AlertModal
      trigger={
        <AlertModalTrigger asChild>
          <Button className="w-full">Clear Cart</Button>
        </AlertModalTrigger>
      }
      isOpen={isAlertModalOpen}
      onIsOpenChange={setIsAlertModalOpen}
    >
      <AlertModalTitle>Clear cart?</AlertModalTitle>
      <AlertModalBody>Are you sure to clear your cart?</AlertModalBody>
      <AlertModalFooter>
        <form action={formAction}>
          <SubmitButton variant="primary">Clear</SubmitButton>
        </form>
      </AlertModalFooter>
    </AlertModal>
  );
}
