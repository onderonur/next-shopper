'use client';

import { NextLink } from '@/core/routing/components/next-link';
import { routes } from '@/core/routing/utils';
import type { Maybe } from '@/core/shared/types';
import { Button } from '@/core/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/core/ui/components/dropdown-menu';
import { UserIcon } from '@/core/ui/components/icons';
import { Tooltip } from '@/core/ui/components/tooltip';
import { useAutoClosable } from '@/core/ui/hooks';
import { signOut } from '@/features/auth/actions';
import type { User } from 'next-auth';

type UserMenuProps = {
  user: Maybe<User>;
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useAutoClosable({
    closeOnRouteChange: true,
  });

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="Open user menu">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Tooltip content={user.name}>
          <DropdownMenuLabel className="max-w-36 truncate">
            {user.name}
          </DropdownMenuLabel>
        </Tooltip>
        <DropdownMenuItem asChild>
          <NextLink className="block" href={routes.account()}>
            Account
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NextLink className="block" href={routes.orders()}>
            Orders
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NextLink className="block" href={routes.favorites()}>
            Favorites
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
