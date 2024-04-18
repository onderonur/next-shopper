import { twMerge } from 'tailwind-merge';
import { Loading } from './loading';

export type GetButtonBasePropsArgs = React.PropsWithChildren<{
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'transparent';
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
    'select-none font-semibold border-2 inline-grid place-items-center',
  ];

  if (isDisabled || isLoading) {
    classNameArgs.push('bg-disabled text-disabled-dark cursor-not-allowed');
  } else {
    classNameArgs.push('active:scale-95 transform transition ease-in-out');

    switch (variant) {
      case 'default': {
        classNameArgs.push(
          'hover:bg-overlay-light active:bg-overlay text-primary border-primary',
        );
        break;
      }
      case 'primary': {
        classNameArgs.push(
          'bg-primary hover:bg-primary-dark active:bg-primary-darker text-white border-primary-dark',
        );
        break;
      }
      case 'secondary': {
        classNameArgs.push(
          'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker text-white border-secondary-dark',
        );
        break;
      }
      default: {
        classNameArgs.push(
          'hover:bg-overlay-light active:bg-overlay text-primary border-none',
        );
      }
    }
  }

  if (circle) {
    classNameArgs.push('rounded-full h-10 w-10');
  } else if (icon && !children) {
    classNameArgs.push('rounded-md h-8 w-8');
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
