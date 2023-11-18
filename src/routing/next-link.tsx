import Link from 'next/link';
import { forwardRef } from 'react';

export type NextLinkRef = React.ElementRef<typeof Link>;

export type NextLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  isExternalUrl?: boolean;
};

export const NextLink = forwardRef<NextLinkRef, NextLinkProps>(
  function NextLink({ isExternalUrl, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        {...rest}
        target={isExternalUrl ? '_blank' : undefined}
        rel={isExternalUrl ? 'noopener noreferrer' : undefined}
        prefetch={false}
      />
    );
  },
);
