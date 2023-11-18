import classNames from 'classnames';

type MobilePaddingProps = React.PropsWithChildren<{
  className?: string;
}>;

export function MobilePadding({ className, children }: MobilePaddingProps) {
  return (
    <div className={classNames('px-2 md:px-0', className)}>{children}</div>
  );
}
