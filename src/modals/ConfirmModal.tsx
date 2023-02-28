import Backdrop from '@/common/Backdrop';
import Button from '@/common/Button';
import { useOnRouteChange } from '@/routing/RoutingHooks';
import React, { useId } from 'react';
import { useModalContext } from './ModalContext';
import { useModal } from './ModalHooks';

type ConfirmModalProps = {
  title: string;
  body: React.ReactNode;
  confirmText?: string;
};

type ConfirmModalData = { isConfirmed: boolean };

export const useConfirmModal = () => {
  const confirmModal = useModal<ConfirmModalProps, ConfirmModalData>(
    ConfirmModal,
  );

  return confirmModal;
};

function ConfirmModal({ title, confirmText = 'OK', body }: ConfirmModalProps) {
  const { isOpen, hide } = useModalContext<ConfirmModalData>();

  function handleCancel() {
    hide({ isConfirmed: false });
  }

  useOnRouteChange(handleCancel);

  const labelId = useId();

  return (
    <Backdrop<HTMLDivElement>
      isOpen={isOpen}
      onClick={handleCancel}
      className="grid place-items-center overflow-y-auto p-4"
    >
      {({ focusRef }) => {
        return (
          <div
            role="dialog"
            aria-modal
            aria-labelledby={labelId}
            ref={focusRef}
            className="rounded-md w-full max-w-sm p-4 bg-background-main"
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCancel();
              }
            }}
          >
            <h2 id={labelId} className="font-semibold text-lg">
              {title}
            </h2>
            <div>{body}</div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="transparent" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  hide({ isConfirmed: true });
                }}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        );
      }}
    </Backdrop>
  );
}
