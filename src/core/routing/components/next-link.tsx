import Link from 'next/link';
import { forwardRef } from 'react';

type NextLinkRef = React.ComponentRef<typeof Link>;

export type NextLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

export const NextLink = forwardRef<NextLinkRef, NextLinkProps>(
  function NextLink({ href, ...rest }, ref) {
    let { target, rel } = rest;

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const hrefString = href.toString();

    if (!hrefString.startsWith('/')) {
      // Adding `target` and `rel` to external links.
      target = '_blank';
      rel = 'noopener noreferrer';
    }

    return (
      <Link
        {...rest}
        ref={ref}
        href={hrefString}
        target={target}
        rel={rel}
        prefetch={false}
      />
    );
  },
);
