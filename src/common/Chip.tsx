import classNames from 'classnames';

type ChipProps = React.PropsWithChildren<{
  className?: string;
  variant: 'primary' | 'secondary';
  filled?: boolean;
}>;

function Chip({ className, variant, filled, children }: ChipProps) {
  return (
    <div
      className={classNames(
        'flex justify-center items-center text-center',
        'border-2 px-2 py-1 rounded-md text-sm',
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

export default Chip;
