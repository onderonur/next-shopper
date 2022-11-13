import classNames from 'classnames';
import React from 'react';

type SectionTitleProps = React.PropsWithChildren<{
  as: keyof Pick<
    JSX.IntrinsicElements,
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
  const Heading = as;

  return (
    <header
      className={classNames(
        'flex items-center justify-between mb-1',
        className,
      )}
    >
      <Heading
        className={classNames(
          'font-semibold text-lg text-text-light',
          srOnly && 'sr-only',
        )}
      >
        {children}
      </Heading>
      {actions && <div>{actions}</div>}
    </header>
  );
}
