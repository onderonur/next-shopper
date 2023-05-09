'use client';

import Backdrop from '@/common/Backdrop';
import Button from '@/common/Button';
import { CloseIcon } from '@/common/Icons';
import classNames from 'classnames';
import { useId } from 'react';

export type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  className?: string;
  title: string;
  onClose: VoidFunction;
}>;

export default function Modal({
  isOpen,
  className,
  title,
  children,
  onClose,
}: ModalProps) {
  const labelId = useId();

  return (
    <Backdrop<HTMLDivElement>
      isOpen={isOpen}
      onClick={onClose}
      className="grid place-items-center overflow-y-auto p-4"
    >
      {({ focusRef }) => {
        return (
          <div
            ref={focusRef}
            aria-labelledby={labelId}
            className={classNames(
              'rounded-md w-full p-0 bg-background-main backdrop:bg-gray-700/70',
              className,
            )}
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          >
            <div className="flex gap-2 justify-between items-center px-4 py-2  shadow-sm">
              <h2 id={labelId} className="font-semibold text-lg">
                {title}
              </h2>
              <Button
                aria-label="Close Modal"
                variant="transparent"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </div>
            <div className="p-4">{children}</div>
          </div>
        );
      }}
    </Backdrop>
  );
}
