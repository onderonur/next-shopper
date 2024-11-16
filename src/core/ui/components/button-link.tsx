import type { NextLinkProps } from '@/core/routing/components/next-link';
import { NextLink } from '@/core/routing/components/next-link';
import type { ButtonProps } from './button';
import { Button } from './button';

export type ButtonLinkProps = NextLinkProps &
  Pick<ButtonProps, 'size' | 'variant'>;

export function ButtonLink({ size, variant, ...rest }: ButtonLinkProps) {
  return (
    <Button asChild size={size} variant={variant}>
      <NextLink {...rest} />
    </Button>
  );
}
