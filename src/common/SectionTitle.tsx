import classNames from 'classnames';
import MobilePadding from './MobilePadding';

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
      <header className="flex items-center justify-between mb-1">
        <As className="font-semibold text-lg text-text-light">{children}</As>
        {actions && <div>{actions}</div>}
      </header>
    </MobilePadding>
  );
}
