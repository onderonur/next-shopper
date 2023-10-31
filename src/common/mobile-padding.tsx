import classNames from 'classnames';

type MobilePaddingProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function MobilePadding({
  className,
  children,
}: MobilePaddingProps) {
  return <div className={classNames('px-2 md:p-0', className)}>{children}</div>;
}
