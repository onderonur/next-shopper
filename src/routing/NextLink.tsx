import Link, { LinkProps } from 'next/link';
import React from 'react';

export type NextLinkProps = LinkProps &
  React.PropsWithChildren<{
    className?: string;
    'aria-label'?: string;
    isExternalUrl?: boolean;
  }>;

export default function NextLink({ isExternalUrl, ...rest }: NextLinkProps) {
  return (
    <Link
      {...rest}
      target={isExternalUrl ? '_blank' : undefined}
      rel={isExternalUrl ? 'noopener noreferrer' : undefined}
      prefetch={false}
    />
  );
}
