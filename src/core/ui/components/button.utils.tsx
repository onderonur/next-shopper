import { Loading } from '@/core/ui/components/loading';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type Shape = 'circle' | 'iconOnly' | 'default';

const buttonVariants = cva(
  [
    'select-none font-semibold inline-grid place-items-center text-center',
    'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground',
        transparent:
          'hover:bg-accent-hover active:bg-accent-active text-accent-foreground',
        accent:
          'bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-foreground',
        default:
          'border-2 bg-background hover:bg-accent-hover active:bg-accent-active border',
      },
      shape: {
        circle: 'rounded-full h-9 w-9',
        iconOnly: 'rounded-md h-9 w-9',
        default: 'rounded-md px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'default',
    },
  },
);

export type GetButtonBasePropsArgs = {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'transparent' | 'accent';
  circle?: boolean;
  icon?: React.ReactNode;
  iconAlignment?: 'left' | 'right' | 'top';
  children?: React.ReactNode;
};

export function getButtonBaseProps({
  className,
  isDisabled,
  isLoading,
  variant = 'default',
  circle,
  icon,
  iconAlignment = 'left',
  children,
}: GetButtonBasePropsArgs) {
  const shouldBeDisabled = isDisabled || isLoading;

  let buttonIcon = icon;

  if (isLoading) {
    buttonIcon = <Loading size="small" isLoading={isLoading} />;
  }

  const content = (
    <span
      className={twMerge(
        'flex items-center gap-2',
        iconAlignment === 'top' && 'flex-col gap-1',
      )}
    >
      {['left', 'top'].includes(iconAlignment) && buttonIcon}
      <span className="empty:hidden">{children}</span>
      {iconAlignment === 'right' && buttonIcon}
    </span>
  );

  let shape: Shape = 'default';

  if (circle) {
    shape = 'circle';
  } else if (icon && !children) {
    shape = 'iconOnly';
  }

  return {
    disabled: shouldBeDisabled,
    className: twMerge(
      buttonVariants({
        variant,
        shape,
        className,
      }),
    ),
    children: content,
  };
}
