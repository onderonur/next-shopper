'use client';

import type { NextLinkProps } from '@/core/routing/components/next-link';
import { NextLink } from '@/core/routing/components/next-link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import { MobileNavButton } from './mobile-nav-button';

type MobileNavLinkProps = Pick<NextLinkProps, 'href' | 'children'>;

export function MobileNavLink({ href, children }: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <MobileNavButton asChild className={twJoin(isActive && 'opacity-100')}>
      <NextLink href={href}>{children}</NextLink>
    </MobileNavButton>
  );
}
