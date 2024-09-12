import type { NextLinkProps } from '@/core/routing/components/next-link';
import { NextLink } from '@/core/routing/components/next-link';
import type { Omit } from '@/core/shared/shared.types';
import type { GetButtonBasePropsArgs } from '@/core/ui/components/button.utils';
import { getButtonBaseProps } from '@/core/ui/components/button.utils';

export type ButtonLinkProps = NextLinkProps &
  Omit<GetButtonBasePropsArgs, 'isDisabled' | 'isLoading'>;

export function ButtonLink({
  className,
  icon,
  iconAlignment,
  circle,
  variant,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <NextLink
      {...rest}
      {...getButtonBaseProps({
        className,
        variant,
        circle,
        icon,
        iconAlignment,
        children,
      })}
    />
  );
}
