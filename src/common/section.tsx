'use client';

import { useId } from 'react';
import { MobilePadding } from './mobile-padding';
import { createSafeContext } from './safe-context';

type SectionContextValue = { headingId: string };

const [SectionContext, useSectionContext] =
  createSafeContext<SectionContextValue>({
    displayName: 'SectionContext',
  });

type SectionAs = keyof Pick<React.JSX.IntrinsicElements, 'section' | 'aside'>;

type SectionProps<As extends SectionAs = 'section'> =
  React.ComponentPropsWithoutRef<As> & {
    as?: SectionAs;
  };

export function Section<As extends SectionAs = 'section'>({
  as = 'section',
  ...rest
}: SectionProps<As>) {
  const As = as;
  const headingId = useId();

  return (
    <SectionContext.Provider value={{ headingId }}>
      <As {...rest} aria-labelledby={headingId} />
    </SectionContext.Provider>
  );
}

type SectionTitleAs = keyof Pick<
  React.JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type SectionTitleProps = React.PropsWithChildren<{
  as: SectionTitleAs;
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
      <As id={headingId} className="sr-only">
        {children}
      </As>
    );
  }

  return (
    <MobilePadding className={className}>
      <header className="mb-1 flex items-center justify-between">
        <As
          id={headingId}
          className="text-lg font-semibold text-muted-foreground"
        >
          {children}
        </As>
        {actions ? <div>{actions}</div> : null}
      </header>
    </MobilePadding>
  );
}
