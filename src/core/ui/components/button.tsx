import type { Omit } from '@/core/shared/shared.types';
import type { GetButtonBasePropsArgs } from '@/core/ui/components/button.utils';
import { getButtonBaseProps } from '@/core/ui/components/button.utils';
import { forwardRef } from 'react';

export type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'disabled'
> &
  GetButtonBasePropsArgs;

export const Button = forwardRef<React.ComponentRef<'button'>, ButtonProps>(
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
