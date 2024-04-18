import Link from 'next/link';
import { forwardRef } from 'react';

type NextLinkRef = React.ElementRef<typeof Link>;

export type NextLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  isExternalUrl?: boolean;
};

export const NextLink = forwardRef<NextLinkRef, NextLinkProps>(
  function NextLink({ isExternalUrl, ...rest }, ref) {
    return (
      <Link
        {...rest}
        ref={ref}
        target={isExternalUrl ? '_blank' : undefined}
        rel={isExternalUrl ? 'noopener noreferrer' : undefined}
        prefetch={false}
      />
    );
  },
);
