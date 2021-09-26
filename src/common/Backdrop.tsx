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

interface BackdropProps<Focusable extends HTMLElement> {
  className?: string;
  isOpen: Maybe<boolean>;
  onClose: VoidFunction;
  children: (args: {
    focusRef: React.RefObject<Focusable>;
    contentClassName: string;
  }) => React.ReactNode;
}

function Backdrop<Focusable extends HTMLElement>({
  className,
  isOpen,
  children,
  onClose,
}: BackdropProps<Focusable>) {
  const [isHidden, setIsHidden] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false);
    }
  }, [isOpen]);

  const focusRef = useRef<Focusable>(null);

  // Focusing to the backdrop content to make "esc" key work for closing it.
  useEffect(() => {
    if (!isHidden) {
      focusRef.current?.focus();
    }
  }, [isHidden]);

  return (
    <>
      <div
        className={classNames(
          'fixed inset-0 z-40',
          isHidden && 'hidden',
          className,
        )}
      >
        <FadeIn isIn={!!isOpen} onExited={() => setIsHidden(true)}>
          <div
            className="bg-gray-700 opacity-70 absolute inset-0"
            onClick={onClose}
            onKeyDown={onClose}
          />
        </FadeIn>
        {children({
          focusRef,
          contentClassName: 'fixed bg-background-main focus:outline-none',
        })}
      </div>
      {/* Disabling body scroll when the backdrop is visible */}
      <style jsx global>
        {`
          body {
            overflow: ${isHidden ? 'auto' : 'hidden'};
          }
        `}
      </style>
    </>
  );
}

export default Backdrop;
