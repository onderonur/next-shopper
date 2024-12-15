'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Maybe } from '@/core/shared/types';
import {
  AlertModal,
  AlertModalBody,
  AlertModalFooter,
  AlertModalTitle,
  AlertModalTrigger,
} from '@/core/ui/components/alert-modal';
import { Button } from '@/core/ui/components/button';
import { useAutoClosable } from '@/core/ui/hooks';
import { clearCart } from '@/features/cart/actions';
import type { CartDetails } from '@/features/cart/types';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';

type ClearCartButtonProps = { cart: Maybe<CartDetails> };

export function ClearCartButton({ cart }: ClearCartButtonProps) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useAutoClosable({
    closeOnRouteChange: true,
  });
  const [state, formAction] = useActionState(clearCart, null);
  const { success } = state ?? {};

  useEffect(() => {
    if (success) {
      setIsAlertModalOpen(false);
    }
  }, [setIsAlertModalOpen, success]);

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
        <Form action={formAction}>
          <SubmitButton variant="primary">Clear</SubmitButton>
        </Form>
      </AlertModalFooter>
    </AlertModal>
  );
}
