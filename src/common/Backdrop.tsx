import { useRouterEvent } from '@src/routing/useRouterEvent';
import FadeIn from '@src/transitions/FadeIn';
import classNames from 'classnames';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Maybe } from './CommonTypes';

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

  // Closing the backdrop on route change
  useRouterEvent(
    'routeChangeStart',
    args?.closeOnRouteChange ? close : undefined,
  );

  return { isOpen, open, close };
};

type BackdropProps<Focusable extends HTMLElement> = Pick<
  React.DOMAttributes<HTMLDivElement>,
  'onClick'
> & {
  className?: string;
  isOpen: Maybe<boolean>;
  children: (args: {
    focusRef: React.RefObject<Focusable>;
    contentClassName: string;
  }) => React.ReactNode;
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
        <div className={classNames('fixed inset-0', className)}>
          <div
            className="bg-gray-700 opacity-70 absolute inset-0"
            onClick={onClick}
          />
          {children({
            focusRef,
            contentClassName: 'fixed bg-background-main focus:outline-none',
          })}
        </div>
      </FadeIn>
      {/* Disabling body scroll when the backdrop is visible */}
      <style jsx global>
        {`
          body {
            overflow: ${isOpen ? 'hidden' : 'auto'};
          }
        `}
      </style>
    </>
  );
}

export default Backdrop;
