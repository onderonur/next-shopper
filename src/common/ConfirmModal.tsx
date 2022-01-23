import Backdrop from '@src/common/Backdrop';
import Button from '@src/common/Button';
import { useRouterEvent } from '@src/routing/useRouterEvent';
import FadeIn from '@src/transitions/FadeIn';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState<boolean>(!!isOpen);

  // We sync isVisible and isOpen.
  useEffect(() => {
    setIsVisible(!!isOpen);
  }, [isOpen]);

  const startExiting = () => setIsVisible(false);

  useRouterEvent('routeChangeStart', onClose);

  // When some event like clicking the "Cancel" button,
  // or click on backdrop etc occurs, "isVisible" state will be "false" first.
  // After the transitions are over, we call "onClose" function.
  // But when "isOpen" prop is changed from outside and it becomes "false",
  // we don't wait for transitions. We simply remove the whole modal.
  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop<HTMLDivElement>
      className="flex justify-center items-center"
      isOpen={isVisible}
      onClose={startExiting}
    >
      {({ focusRef, contentClassName }) => {
        return (
          <FadeIn isIn={isVisible} onExited={onClose}>
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
                  startExiting();
                }
              }}
            >
              <h2 className="font-semibold text-lg">{title}</h2>
              <div>{children}</div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="transparent" onClick={startExiting}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onConfirm?.();
                    startExiting();
                  }}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </FadeIn>
        );
      }}
    </Backdrop>
  );
}

export default ConfirmModal;
