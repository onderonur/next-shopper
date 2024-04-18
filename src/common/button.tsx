import { forwardRef } from 'react';
import type { GetButtonBasePropsArgs } from './button-base-utils';
import { getButtonBaseProps } from './button-base-utils';
import type { Omit } from './common-types';

export type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'disabled'
> &
  GetButtonBasePropsArgs;

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
    return (
      <button
        {...rest}
        {...getButtonBaseProps({
          className,
          isDisabled,
          isLoading,
          variant,
          circle,
          icon,
          iconAlignment,
          children,
        })}
        ref={ref}
        type={type}
      />
    );
  },
);
