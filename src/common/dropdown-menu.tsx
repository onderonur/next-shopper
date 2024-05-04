import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
>;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent({ children, className, ...rest }, ref) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        {...rest}
        ref={ref}
        className={twMerge(
          'z-50 min-w-32 rounded-md border bg-background p-1 shadow-md',
          className,
        )}
        asChild
      >
        <motion.div
          initial={{ y: -2, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          {children}
          <RadixDropdownMenu.Arrow className="fill-background" />
        </motion.div>
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
});

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Item
>;

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...rest }, ref) {
  return (
    <RadixDropdownMenu.Item
      ref={ref}
      className={twMerge(
        'cursor-pointer select-none rounded px-2 py-1 text-sm outline-none data-[disabled]:cursor-auto data-[highlighted]:bg-accent-hover data-[disabled]:text-muted',
        className,
      )}
      {...rest}
    />
  );
});
