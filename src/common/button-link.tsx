import type { Omit } from './common-types';
import type { NextLinkProps } from '@/routing/next-link';
import NextLink from '@/routing/next-link';
import type { UseButtonBasePropsArgs } from './button-hooks';
import { useButtonBaseProps } from './button-hooks';

type ButtonLinkProps = NextLinkProps &
  Omit<UseButtonBasePropsArgs, 'isDisabled' | 'isLoading'>;

export default function ButtonLink({
  className,
  icon,
  iconAlignment,
  circle,
  variant,
  children,
  ...rest
}: ButtonLinkProps) {
  const buttonBaseProps = useButtonBaseProps({
    className,
    variant,
    circle,
    icon,
    iconAlignment,
    children,
  });

  return <NextLink {...rest} {...buttonBaseProps} />;
}
