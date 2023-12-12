import { twMerge } from 'tailwind-merge';
import { Loading } from './loading';

export type UseButtonBasePropsArgs = React.PropsWithChildren<{
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'transparent';
  circle?: boolean;
  icon?: React.ReactNode;
  iconAlignment?: 'left' | 'right';
}>;

export function useButtonBaseProps({
  className,
  isDisabled,
  isLoading,
  variant = 'default',
  circle,
  icon,
  iconAlignment = 'left',
  children,
}: UseButtonBasePropsArgs) {
  const classNameArgs: string[] = [
    'select-none font-semibold uppercase border-2 inline-grid place-items-center',
  ];

  if (isDisabled || isLoading) {
    classNameArgs.push(
      'bg-disabled-main text-disabled-dark cursor-not-allowed',
    );
  } else {
    classNameArgs.push('active:scale-95 transform transition ease-in-out');

    switch (variant) {
      case 'default':
        classNameArgs.push(
          'hover:bg-overlay-light active:bg-overlay-main text-primary-main border-primary-main',
        );
        break;
      case 'primary':
        classNameArgs.push(
          'bg-primary-main hover:bg-primary-dark active:bg-primary-darker text-white border-primary-dark',
        );
        break;
      case 'secondary':
        classNameArgs.push(
          'bg-secondary-main hover:bg-secondary-dark active:bg-secondary-darker text-white border-secondary-dark',
        );
        break;
      default:
        classNameArgs.push(
          'hover:bg-overlay-light active:bg-overlay-main text-primary-main border-none',
        );
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
    <span className="flex items-center gap-2">
      {iconAlignment === 'left' && buttonIcon}
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
