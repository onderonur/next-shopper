import classNames from 'classnames';
import MobilePadding from './mobile-padding';

type SectionTitleProps = React.PropsWithChildren<{
  as: keyof Pick<
    React.JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >;
  srOnly?: boolean;
  actions?: React.ReactNode;
  className?: string;
}>;

export default function SectionTitle({
  as,
  srOnly,
  actions,
  className,
  children,
}: SectionTitleProps) {
  const As = as;

  return (
    <MobilePadding className={classNames(srOnly && 'sr-only', className)}>
      <header className="mb-1 flex items-center justify-between">
        <As className="text-lg font-semibold text-text-light">{children}</As>
        {actions ? <div>{actions}</div> : null}
      </header>
    </MobilePadding>
  );
}
