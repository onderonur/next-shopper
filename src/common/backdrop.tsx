'use client';

import { useOnRouteChange } from '@/routing/routing-hooks';
import FadeIn from '@/transitions/fade-in';
import classNames from 'classnames';
import { useState, useCallback } from 'react';
import { Maybe } from './common-types';
import RemoveBodyScroll from './remove-body-scroll';

export const useBackdrop = (
  args: { closeOnRouteChange: boolean } = { closeOnRouteChange: true },
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnRouteChange(() => {
    if (args.closeOnRouteChange) {
      close();
    }
  });

  return { isOpen, open, close };
};

type BackdropProps = Pick<React.DOMAttributes<HTMLDivElement>, 'onClick'> &
  React.PropsWithChildren<{
    className?: string;
    isOpen: Maybe<boolean>;
  }>;

function Backdrop({ className, isOpen, children, onClick }: BackdropProps) {
  return (
    <>
      <FadeIn isIn={!!isOpen} className={'fixed z-10'}>
        <div
          className={classNames('fixed inset-0 bg-gray-700/70', className)}
          onClick={(e) => {
            // Ignoring click events of children of Backdrop.
            // Just clicking Backdrop will work here.
            if (e.currentTarget === e.target) {
              onClick?.(e);
            }
          }}
        >
          {children}
        </div>
      </FadeIn>
      {isOpen && <RemoveBodyScroll />}
    </>
  );
}

export default Backdrop;
