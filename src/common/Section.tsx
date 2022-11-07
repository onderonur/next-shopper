import classNames from 'classnames';
import React from 'react';

type SectionProps = React.ComponentPropsWithRef<'section'> & {
  title: string;
  titleAs: keyof Pick<
    JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >;
  hideTitle?: boolean;
  headerActions?: React.ReactNode;
  headerClassName?: string;
};

const Section = React.forwardRef<React.ComponentRef<'section'>, SectionProps>(
  function Section(
    {
      title,
      titleAs,
      hideTitle,
      headerActions,
      headerClassName,
      children,
      ...rest
    },
    ref,
  ) {
    const Heading = titleAs;

    return (
      <section ref={ref} {...rest}>
        <header
          className={classNames(
            'flex items-center justify-between text-text-light mb-1',
            headerClassName,
          )}
        >
          <Heading
            className={classNames(
              'font-semibold text-lg',
              hideTitle && 'sr-only',
            )}
          >
            {title}
          </Heading>
          {headerActions && <div>{headerActions}</div>}
        </header>
        {children}
      </section>
    );
  },
);

export default Section;
