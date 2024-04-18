import type { NextLinkProps } from '@/routing/next-link';
import { NextLink } from '@/routing/next-link';
import type { GetButtonBasePropsArgs } from './button-base-utils';
import { getButtonBaseProps } from './button-base-utils';
import type { Omit } from './common-types';

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
