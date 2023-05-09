'use client';

import { useOnRouteChange } from '@/routing/RoutingHooks';
import FadeIn from '@/transitions/FadeIn';
import classNames from 'classnames';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Maybe } from './CommonTypes';
import RemoveBodyScroll from './RemoveBodyScroll';

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

type BackdropProps<Focusable extends HTMLElement> = Pick<
  React.DOMAttributes<HTMLDivElement>,
  'onClick'
> & {
  className?: string;
  isOpen: Maybe<boolean>;
  children: (args: { focusRef: React.RefObject<Focusable> }) => React.ReactNode;
};

function Backdrop<Focusable extends HTMLElement>({
  className,
  isOpen,
  children,
  onClick,
}: BackdropProps<Focusable>) {
  const focusRef = useRef<Focusable>(null);

  // Focusing to the backdrop content to make "esc" key work for closing it.
  useEffect(() => {
    if (isOpen) {
      focusRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <FadeIn isIn={!!isOpen} className={'fixed z-10'}>
        <div
          className={classNames('fixed inset-0 bg-gray-700/70', className)}
          onClick={(e) =>
            // Ignoring click events of children of Backdrop.
            // Just clicking Backdrop will work here.
            e.currentTarget === e.target && onClick?.(e)
          }
        >
          {children({
            focusRef,
          })}
        </div>
      </FadeIn>
      {isOpen && <RemoveBodyScroll />}
    </>
  );
}

export default Backdrop;
