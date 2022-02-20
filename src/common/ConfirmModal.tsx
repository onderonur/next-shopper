import Backdrop from '@src/common/Backdrop';
import Button from '@src/common/Button';
import { useRouterEvent } from '@src/routing/useRouterEvent';
import classNames from 'classnames';
import React from 'react';
import { Maybe } from './CommonTypes';

export type ConfirmModalProps = React.PropsWithChildren<{
  isOpen?: Maybe<boolean>;
  title?: string;
  confirmText?: string;
  onConfirm?: VoidFunction;
  onClose?: VoidFunction;
}>;

function ConfirmModal({
  isOpen,
  title,
  confirmText = 'OK',
  children,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  useRouterEvent('routeChangeStart', onClose);

  return (
    <Backdrop<HTMLDivElement>
      className="flex justify-center items-center"
      isOpen={isOpen}
      onClick={onClose}
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
                onClose?.();
              }
            }}
          >
            <h2 className="font-semibold text-lg">{title}</h2>
            <div>{children}</div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="transparent" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onConfirm?.();
                  onClose?.();
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
