import * as RadixSeparator from '@radix-ui/react-separator';
import { twMerge } from 'tailwind-merge';

type SeparatorProps = Pick<
  RadixSeparator.SeparatorProps,
  'orientation' | 'className'
>;

export function Separator({ className, ...rest }: SeparatorProps) {
  return (
    <RadixSeparator.Root
      className={twMerge(
        'bg-border h-px w-full data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...rest}
    />
  );
}
