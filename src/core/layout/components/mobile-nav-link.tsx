'use client';

import { getMobileNavButtonBaseProps } from '@/core/layout/components/mobile-nav-utils';
import type { ButtonLinkProps } from '@/core/ui/components/button-link';
import { ButtonLink } from '@/core/ui/components/button-link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

type MobileNavLinkProps = Pick<
  ButtonLinkProps,
  'href' | 'icon' | 'children'
> & {
  activeIcon: React.ReactNode;
};

export function MobileNavLink({
  icon,
  activeIcon,
  href,
  ...rest
}: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const { className, ...restBaseProps } = getMobileNavButtonBaseProps({
    icon: isActive ? activeIcon : icon,
  });

  return (
    <ButtonLink
      href={href}
      className={twJoin(
        className,
        isActive && 'opacity-100',
        // When there is a `background-color` for `hover`, that color stays until user clicks
        // somewhere else after clicking this link on a mobile device.
        // To prevent that color persistence after a navigation, we added this.
        'hover:bg-transparent',
      )}
      {...restBaseProps}
      {...rest}
    />
  );
}
