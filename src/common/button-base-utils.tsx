import { twMerge } from 'tailwind-merge';
import { Loading } from './loading';

export type GetButtonBasePropsArgs = React.PropsWithChildren<{
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'transparent';
  circle?: boolean;
  icon?: React.ReactNode;
  iconAlignment?: 'left' | 'right' | 'top';
}>;

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
  const classNameArgs: string[] = [
    'select-none font-semibold inline-grid place-items-center',
  ];

  if (isDisabled || isLoading) {
    classNameArgs.push('bg-muted text-muted-foreground cursor-not-allowed');
  } else {
    switch (variant) {
      case 'default': {
        classNameArgs.push(
          'border-2 hover:bg-accent-hover active:bg-accent-active border',
        );
        break;
      }
      case 'primary': {
        classNameArgs.push(
          'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground',
        );
        break;
      }
      default: {
        classNameArgs.push(
          'hover:bg-accent-hover active:bg-accent-active text-accent-foreground',
        );
      }
    }
  }

  if (circle) {
    classNameArgs.push('rounded-full h-9 w-9');
  } else if (icon && !children) {
    classNameArgs.push('rounded-md h-9 w-9');
  } else {
    classNameArgs.push('rounded-md px-4 py-2');
  }

  let buttonIcon = icon;

  if (isLoading) {
    buttonIcon = <Loading size="small" isLoading={isLoading} />;
  }

  const content = (
    <span
      className={twMerge(
        'flex items-center gap-2',
        iconAlignment === 'top' && 'flex-col gap-0.5',
      )}
    >
      {['left', 'top'].includes(iconAlignment) && buttonIcon}
      <span className="empty:hidden">{children}</span>
      {iconAlignment === 'right' && buttonIcon}
    </span>
  );

  return {
    disabled: isDisabled,
    className: twMerge(classNameArgs, className),
    children: content,
  };
}
