import { twMerge } from 'tailwind-merge';

type MobilePaddingProps = React.PropsWithChildren<{
  className?: string;
}>;

export function MobilePadding({ className, children }: MobilePaddingProps) {
  return <div className={twMerge('px-2 md:px-0', className)}>{children}</div>;
}
