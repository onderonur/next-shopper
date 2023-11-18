'use client';

import { fadeIn, slide, type SlideArgs } from '@/transitions/transition-utils';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Button } from './button';
import { CloseIcon } from './icons';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useOnPathnameChange, useOnRouteChange } from '@/routing/routing-hooks';

type DrawerBodyProps = React.PropsWithChildren<{
  className?: string;
}>;

export function DrawerBody({ className, children }: DrawerBodyProps) {
  return (
    <div className={classNames('flex-1 px-4 py-3', className)}>{children}</div>
  );
}

type DrawerHeaderProps = React.PropsWithChildren;

export function DrawerHeader({ children }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-sm">
      <RadixDialog.Title className="text-lg font-semibold" asChild>
        {children}
      </RadixDialog.Title>
      <RadixDialog.Close asChild>
        <Button variant="transparent" icon={<CloseIcon />} aria-label="Close" />
      </RadixDialog.Close>
    </div>
  );
}

type DrawerProps = SlideArgs &
  React.PropsWithChildren<{
    trigger: React.ReactNode;
    closeOnRouteChange?: boolean;
    closeOnPathnameChange?: boolean;
  }>;

export function Drawer({
  from,
  trigger,
  closeOnRouteChange,
  closeOnPathnameChange,
  children,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useOnRouteChange(
    closeOnRouteChange
      ? () => {
          setIsOpen(false);
        }
      : null,
  );

  useOnPathnameChange(
    closeOnPathnameChange
      ? () => {
          setIsOpen(false);
        }
      : null,
  );

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <RadixDialog.Portal
            // To make `framer-motion` exit animation work.
            forceMount
          >
            <RadixDialog.Overlay asChild>
              <motion.div
                {...fadeIn}
                className="fixed inset-0 z-10 bg-black/20 backdrop-blur-md"
              />
            </RadixDialog.Overlay>
            <RadixDialog.Content asChild>
              <motion.div
                {...slide({ from })}
                className={classNames(
                  'fixed bottom-0 top-0 z-10 flex w-full max-w-xs flex-col bg-white focus:outline-none',
                  from === 'left' ? 'left-0' : 'right-0',
                )}
              >
                {children}
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  );
}

export const DrawerTrigger = RadixDialog.Trigger;
