import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import { CloseIcon } from './Icons';

type ChipProps = React.PropsWithChildren<{
  className?: string;
  textAlign?: 'center' | 'left';
  variant?: 'primary' | 'secondary';
  filled?: boolean;
  closeButtonProps?: ButtonProps;
}>;

export default function Chip({
  className,
  textAlign,
  variant,
  filled,
  closeButtonProps,
  children,
}: ChipProps) {
  return (
    <div
      className={classNames(
        'flex items-center gap-1 select-none',
        'border-2 px-2 py-1 rounded-md text-sm',
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
      <span className="flex-1">{children}</span>
      {closeButtonProps && (
        <Button
          {...closeButtonProps}
          className={classNames(closeButtonProps.className, 'h-6 w-6')}
          variant="transparent"
          icon={<CloseIcon />}
        />
      )}
    </div>
  );
}
