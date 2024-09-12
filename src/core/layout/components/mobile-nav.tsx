import { MobileNavLink } from '@/core/layout/components/mobile-nav-link';
import { getMobileNavButtonBaseProps } from '@/core/layout/components/mobile-nav-utils';
import { routes } from '@/core/routing/routing.utils';
import type { ButtonProps } from '@/core/ui/components/button';
import { Button } from '@/core/ui/components/button';
import {
  HeartOutlineIcon,
  HomeOutlineIcon,
  OrderIcon,
  SearchOutlineIcon,
} from '@/core/ui/components/icons';

type MobileNavButtonProps = Pick<
  ButtonProps,
  'aria-label' | 'icon' | 'children'
>;

export function MobileNavButton({ icon, ...rest }: MobileNavButtonProps) {
  return <Button {...getMobileNavButtonBaseProps({ icon })} {...rest} />;
}

const mobileNavLinks = [
  {
    href: routes.home(),
    title: 'Home',
    icon: HomeOutlineIcon,
  },
  {
    href: routes.search(),
    title: 'Search',
    icon: SearchOutlineIcon,
  },
  {
    href: routes.favorites(),
    title: 'Favorites',
    icon: HeartOutlineIcon,
  },
  {
    href: routes.orders(),
    title: 'Orders',
    icon: OrderIcon,
  },
];

type MobileNavProps = {
  children: React.ReactNode;
};

export function MobileNav({ children }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 z-10 w-full border-t bg-background p-1 md:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {mobileNavLinks.map((link) => {
          return (
            <li key={link.href}>
              <MobileNavLink
                href={link.href}
                icon={<link.icon />}
                activeIcon={<link.icon className="fill-foreground" />}
              >
                {link.title}
              </MobileNavLink>
            </li>
          );
        })}
        <li>
          <div>{children}</div>
        </li>
      </ul>
    </nav>
  );
}
