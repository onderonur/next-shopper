import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { AsChildProps } from './slot';
import { Slot } from './slot';

type Size = 'default' | 'icon';

const buttonVariants = cva(
  [
    'select-none font-semibold inline-flex justify-center items-center gap-2 text-center relative',
    'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground',
        transparent:
          'hover:bg-accent-hover active:bg-accent-active text-accent-foreground',
        accent:
          'bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-foreground',
        default:
          'border-2 bg-background hover:bg-accent-hover active:bg-accent-active border',
      },
      size: {
        icon: 'rounded-md size-9',
        default: 'rounded-md px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = AsChildProps &
  React.ComponentProps<'button'> & {
    variant?: 'default' | 'primary' | 'transparent' | 'accent';
    size?: Size;
    children?: React.ReactNode;
  };

export const Button = forwardRef<React.ComponentRef<'button'>, ButtonProps>(
  function Button(
    {
      asChild,
      className,
      disabled,
      size = 'default',
      variant = 'default',
      type = 'button',
      children,
      ...rest
    },
    ref,
  ) {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        className={twMerge(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
      >
        {children}
      </Component>
    );
  },
);
