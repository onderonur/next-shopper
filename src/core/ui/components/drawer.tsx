'use client';

import { AnimatePresence } from '@/core/animations/components/animate-presence';
import { fadeIn } from '@/core/animations/utils';
import { useIsMobile } from '@/core/styles/hooks';
import { Button } from '@/core/ui/components/button';
import { CloseIcon } from '@/core/ui/components/icons';
import type { UseAutoClosableArgs } from '@/core/ui/hooks';
import { useAutoClosable } from '@/core/ui/hooks';
import * as RadixDialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { twJoin, twMerge } from 'tailwind-merge';

type DrawerBodyProps = {
  className?: string;
  children: React.ReactNode;
};

export function DrawerBody({ className, children }: DrawerBodyProps) {
  return (
    <motion.div
      className={twMerge('flex-1 overflow-auto px-4 py-3', className)}
      // To prevent drag gestures to swipe drawer inside `DrawerBody`.
      // https://www.framer.com/motion/gestures/##propagation
      onPointerDownCapture={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </motion.div>
  );
}

type DrawerHeaderProps = {
  children: React.ReactNode;
};

export function DrawerHeader({ children }: DrawerHeaderProps) {
  return (
    <div>
      <div className="mx-auto max-w-[4rem] pt-3 md:hidden">
        <div className="h-1.5 rounded-md bg-accent" />
      </div>
      <div className="flex items-center justify-between px-4 py-3 shadow-sm">
        <RadixDialog.Title className="text-lg font-semibold" asChild>
          {children}
        </RadixDialog.Title>
        <RadixDialog.Close asChild>
          <Button size="icon" variant="transparent" aria-label="Close">
            <CloseIcon />
          </Button>
        </RadixDialog.Close>
      </div>
    </div>
  );
}

type DrawerProps = {
  from?: 'left' | 'right';
  trigger: React.ReactNode;
  closeOnRouteChange?: boolean;
  children: React.ReactNode;
} & UseAutoClosableArgs;

export function Drawer({
  from = 'left',
  trigger,
  closeOnRouteChange,
  closeOnPathnameChange,
  children,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useAutoClosable({
    closeOnPathnameChange,
    closeOnRouteChange,
  });

  const isMobile = useIsMobile();

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <RadixDialog.Portal
            // To make `motion/react` exit animation work.
            forceMount
          >
            <RadixDialog.Overlay asChild>
              <motion.div
                {...fadeIn}
                className="fixed inset-0 z-10 bg-overlay/20 backdrop-blur"
              />
            </RadixDialog.Overlay>
            <RadixDialog.Content
              asChild
              // https://www.radix-ui.com/primitives/docs/components/dialog#description
              aria-describedby={undefined}
            >
              <motion.div
                className={twJoin(
                  'fixed bottom-0 z-10 flex w-full flex-col border bg-background focus:outline-none',
                  'max-h-[80%] rounded-t-2xl md:top-0 md:max-h-none md:max-w-xs md:rounded-none md:rounded-l-2xl',
                  'after:absolute after:inset-x-0 after:top-full after:h-screen after:bg-background md:after:hidden',
                  '[--x-from:0] [--x-to:0] [--y-from:100%] [--y-to:0%] md:[--x-to:0%] md:[--y-from:0] md:[--y-to:0]',
                  from === 'left'
                    ? 'md:left-0 md:[--x-from:-100%]'
                    : 'md:right-0 md:[--x-from:100%]',
                )}
                // Normally we can use `motion/react` in a responsive way,
                // by using CSS variables.
                // Responsive Framer Motion with Tailwind CSS:
                // https://www.youtube.com/watch?v=xSuxsfn13xg
                // But, since there is a bug about using CSS variables with drag event,
                // we used `useMediaQuery` hook and handled this in TSX instead of CSS.
                // https://github.com/framer/motion/issues/2390
                initial={isMobile ? { y: '100%' } : { x: '100%' }}
                animate={isMobile ? { y: 0 } : { x: 0 }}
                exit={isMobile ? { y: '100%' } : { x: '100%' }}
                transition={{ duration: 0.3 }}
                // To swipe to dismiss
                drag={isMobile ? 'y' : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.y >= 100 || info.velocity.y >= 10) {
                    setIsOpen(false);
                  }
                }}
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
