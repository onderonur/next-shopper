import NextLink, { NextLinkProps } from '@/routing/next-link';
import classNames from 'classnames';
import Loading from './loading';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  Partial<Pick<NextLinkProps, 'href' | 'isExternalUrl'>> & {
    variant?: 'default' | 'primary' | 'secondary' | 'transparent';
    icon?: React.ReactNode;
    iconAlignment?: 'left' | 'right';
    circle?: boolean;
    isLoading?: boolean;
  };

export default function Button({
  href,
  isExternalUrl,
  className,
  variant = 'default',
  icon,
  iconAlignment = 'left',
  circle,
  disabled,
  type = 'button',
  isLoading,
  children,
  ...rest
}: ButtonProps) {
  const isDisabledOrLoading = disabled || isLoading;

  const buttonClassName = classNames(
    'select-none font-semibold uppercase border-2 grid place-items-center transform active:scale-95 transition ease-in-out',
    isDisabledOrLoading
      ? 'bg-disabled-main text-disabled-dark cursor-not-allowed'
      : variant === 'default'
      ? 'hover:bg-overlay-light active:bg-overlay-main text-primary-main border-primary-main'
      : variant === 'primary'
      ? 'bg-primary-main hover:bg-primary-dark active:bg-primary-darker text-white border-primary-dark'
      : variant === 'secondary'
      ? 'bg-secondary-main hover:bg-secondary-dark active:bg-secondary-darker text-white border-secondary-dark'
      : 'hover:bg-overlay-light active:bg-overlay-main text-primary-main border-none',
    circle
      ? 'rounded-full h-10 w-10'
      : icon && !children
      ? 'rounded-md h-8 w-8'
      : 'rounded-md px-4 py-2',
    className,
  );

  let buttonIcon = icon;

  if (isLoading) {
    buttonIcon = (
      <Loading
        size="small"
        className={classNames(children && 'mr-1')}
        isLoading={isLoading}
      />
    );
  }

  const content = (
    <span className="flex items-center gap-2">
      {iconAlignment === 'left' && buttonIcon}
      {children && <span>{children}</span>}
      {iconAlignment === 'right' && buttonIcon}
    </span>
  );

  if (href) {
    return (
      <NextLink
        className={buttonClassName}
        href={href}
        isExternalUrl={isExternalUrl}
        aria-label={rest['aria-label']}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      {...rest}
      type={type}
      className={buttonClassName}
      disabled={isDisabledOrLoading}
    >
      {content}
    </button>
  );
}
