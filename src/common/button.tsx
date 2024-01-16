import { forwardRef } from 'react';
import type { UseButtonBasePropsArgs } from './button-base-hooks';
import { useButtonBaseProps } from './button-base-hooks';
import type { Omit } from './common-types';

export type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'disabled'
> &
  UseButtonBasePropsArgs;

export const Button = forwardRef<React.ElementRef<'button'>, ButtonProps>(
  function Button(
    {
      className,
      variant = 'default',
      icon,
      iconAlignment = 'left',
      circle,
      type = 'button',
      isDisabled,
      isLoading,
      children,
      ...rest
    },
    ref,
  ) {
    const buttonBaseProps = useButtonBaseProps({
      className,
      isDisabled,
      isLoading,
      variant,
      circle,
      icon,
      iconAlignment,
      children,
    });

    return <button ref={ref} type={type} {...rest} {...buttonBaseProps} />;
  },
);
