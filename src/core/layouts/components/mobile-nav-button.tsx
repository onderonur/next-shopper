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
        // When there is a `background-color` for `hover`, that color stays until user clicks
        // somewhere else after clicking this link on a mobile device.
        // To prevent that color persistence after a navigation, we added this.
        'hover:bg-transparent',
        className,
      )}
      {...rest}
    />
  );
}
