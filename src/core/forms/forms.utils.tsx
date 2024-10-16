import { CheckIcon } from '@/core/ui/components/icons';
import { twJoin } from 'tailwind-merge';

export function getSelectableItemProps() {
  return {
    rootClassName: 'flex items-center gap-1',
    itemClassName: twJoin(
      'size-6 flex-none rounded-md border-2 border-primary',
      'data-[state=checked]:bg-primary',
      'disabled:opacity-50 [&+label]:disabled:opacity-50',
      '[&:not([data-state=checked])]:enabled:hover:bg-accent-hover [&:not([data-state=checked])]:enabled:active:bg-accent-active',
      '[&+label]:enabled:cursor-pointer [&+label]:enabled:hover:bg-accent-hover [&+label]:enabled:active:bg-accent-active',
    ),
    indicatorClassName:
      'flex items-center justify-center text-primary-foreground',
    icon: <CheckIcon className="mt-0.5 text-sm" />,
    labelClassName:
      'w-full select-none rounded-md p-2 text-sm font-semibold text-accent-foreground',
  };
}
