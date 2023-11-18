'use client';

import { useId } from 'react';
import { MobilePadding } from './mobile-padding';
import { createSafeContext } from './safe-context';

type SectionContextValue = { headingId: string };

const [SectionContext, useSectionContext] =
  createSafeContext<SectionContextValue>({
    displayName: 'SectionContext',
  });

type SectionProps = React.ComponentPropsWithoutRef<'section'>;

export function Section(props: SectionProps) {
  const headingId = useId();

  return (
    <SectionContext.Provider value={{ headingId }}>
      <section {...props} aria-labelledby={headingId} />
    </SectionContext.Provider>
  );
}

type SectionTitleProps = React.PropsWithChildren<{
  as: keyof Pick<
    React.JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >;
  srOnly?: boolean;
  actions?: React.ReactNode;
  className?: string;
}>;

export function SectionTitle({
  as,
  srOnly,
  actions,
  className,
  children,
}: SectionTitleProps) {
  const { headingId } = useSectionContext();
  const As = as;

  if (srOnly) {
    return (
      <As className="sr-only" id={headingId}>
        {children}
      </As>
    );
  }

  return (
    <MobilePadding className={className}>
      <header className="mb-1 flex items-center justify-between">
        <As className="text-lg font-semibold text-text-light">{children}</As>
        {actions ? <div>{actions}</div> : null}
      </header>
    </MobilePadding>
  );
}
