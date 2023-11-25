import classNames from 'classnames';
import type { ButtonProps } from './button';
import { Button } from './button';
import { CloseIcon } from './icons';

type ChipProps = React.PropsWithChildren<{
  className?: string;
  textAlign?: 'center' | 'left';
  variant?: 'primary' | 'secondary';
  filled?: boolean;
}>;

export function Chip({
  className,
  textAlign,
  variant,
  filled,
  children,
}: ChipProps) {
  return (
    <div
      className={classNames(
        'flex select-none items-center gap-1',
        'rounded-md border-2 px-2 py-1 text-sm',
        textAlign === 'left' ? 'text-left' : 'text-center',
        variant === 'primary' && [
          'border-primary-main text-primary-dark',
          filled && 'bg-primary-lighter',
        ],
        variant === 'secondary' && [
          'border-secondary-main text-secondary-dark',
          filled && 'bg-secondary-lighter',
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}

type ChipCloseProps = ButtonProps;

export function ChipClose({ className, ...rest }: ChipCloseProps) {
  return (
    <Button
      {...rest}
      className={classNames(className, '!h-6 !w-6')}
      variant="transparent"
      icon={<CloseIcon size="1.2rem" />}
    />
  );
}

type ChipContentProps = React.PropsWithChildren;

export function ChipContent({ children }: ChipContentProps) {
  return <span className="flex-1">{children}</span>;
}
