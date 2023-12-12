import type { ButtonProps } from './button';
import { Button } from './button';
import { CloseIcon } from './icons';

type ChipProps = React.PropsWithChildren;

export function Chip({ children }: ChipProps) {
  return (
    <div
      className={
        'flex select-none items-center gap-1 rounded-md border-2 border-secondary-main px-2 py-1 text-sm text-secondary-dark'
      }
    >
      {children}
    </div>
  );
}

type ChipCloseProps = ButtonProps;

export function ChipClose(props: ChipCloseProps) {
  return (
    <Button
      {...props}
      className="h-6 w-6"
      variant="transparent"
      icon={<CloseIcon size="1.2rem" />}
    />
  );
}

type ChipContentProps = React.PropsWithChildren;

export function ChipContent({ children }: ChipContentProps) {
  return <span className="flex-1">{children}</span>;
}
