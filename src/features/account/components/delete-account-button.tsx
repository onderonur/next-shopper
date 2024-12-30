'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import {
  AlertModal,
  AlertModalBody,
  AlertModalFooter,
  AlertModalTitle,
  AlertModalTrigger,
} from '@/core/ui/components/alert-modal';
import { Button } from '@/core/ui/components/button';
import { useAutoClosable } from '@/core/ui/hooks';
import Form from 'next/form';
import { deleteAccount } from '../actions';

export function DeleteAccountButton() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useAutoClosable();

  return (
    <AlertModal
      trigger={
        <AlertModalTrigger asChild>
          <Button variant="danger">Delete Account</Button>
        </AlertModalTrigger>
      }
      isOpen={isAlertModalOpen}
      onIsOpenChange={setIsAlertModalOpen}
    >
      <AlertModalTitle>Delete account?</AlertModalTitle>
      <AlertModalBody>Are you sure to delete your account?</AlertModalBody>
      <AlertModalFooter>
        <Form action={deleteAccount}>
          <SubmitButton variant="danger">Delete</SubmitButton>
        </Form>
      </AlertModalFooter>
    </AlertModal>
  );
}
