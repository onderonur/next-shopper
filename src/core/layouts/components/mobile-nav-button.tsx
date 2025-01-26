import type { ButtonProps } from '@/core/ui/components/button';
import { Button } from '@/core/ui/components/button';
import { twMerge } from 'tailwind-merge';

type MobileNavButtonProps = Pick<
  ButtonProps,
  'asChild' | 'aria-label' | 'className' | 'children'
>;

export function MobileNavButton({ className, ...rest }: MobileNavButtonProps) {
  return (
    <Button
      variant="transparent"
      className={twMerge(
        'w-full flex-col py-1 text-xs opacity-60 [&>svg]:text-2xl',
        className,
      )}
      {...rest}
    />
  );
}
