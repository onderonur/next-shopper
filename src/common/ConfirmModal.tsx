import Backdrop from '@src/common/Backdrop';
import Button from '@src/common/Button';
import { useRouterEvent } from '@src/routing/useRouterEvent';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useModalContext } from './ModalContext';

export type ConfirmModalProps = {
  title: string;
  body: React.ReactNode;
  confirmText?: string;
};

export type ConfirmModalData = { isConfirmed: boolean };

function ConfirmModal({ title, confirmText = 'OK', body }: ConfirmModalProps) {
  const { isOpen, hide } = useModalContext<ConfirmModalData>();

  const handleClose = useCallback(() => {
    hide({ isConfirmed: false });
  }, [hide]);

  useRouterEvent('routeChangeStart', handleClose);

  return (
    <Backdrop<HTMLDivElement>
      className="flex justify-center items-center"
      isOpen={isOpen}
      onClick={handleClose}
    >
      {({ focusRef, contentClassName }) => {
        return (
          <div
            ref={focusRef}
            className={classNames(
              'rounded-md w-full max-w-sm mb-10 p-4',
              contentClassName,
            )}
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleClose();
              }
            }}
          >
            <h2 className="font-semibold text-lg">{title}</h2>
            <div>{body}</div>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                aria-label="Cancel"
                variant="transparent"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                aria-label="Confirm text"
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

export default ConfirmModal;
