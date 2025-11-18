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
import type { User } from 'better-auth';
import { useRouter } from 'next/navigation';
import { authClient } from '../auth-client';

type UserMenuProps = {
  user: Maybe<User>;
};

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
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
        <DropdownMenuItem
          onClick={async () => {
            const response = await authClient.signOut();
            if (!response.data?.success) return;
            router.refresh();
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
