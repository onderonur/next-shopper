'use client';

import { createContext, useContext, useId } from 'react';

type SectionContextValue = { headingId: string };

const SectionContext = createContext<SectionContextValue>(
  {} as SectionContextValue,
);

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

type SectionTitleProps = {
  as: SectionTitleAs;
  srOnly?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionTitle({
  as,
  srOnly,
  actions,
  children,
}: SectionTitleProps) {
  const { headingId } = useContext(SectionContext);
  const As = as;

  if (srOnly) {
    return (
      <As id={headingId} className="sr-only">
        {children}
      </As>
    );
  }

  return (
    <header className="mb-1 flex items-end justify-between">
      <As
        id={headingId}
        className="text-lg font-semibold text-muted-foreground"
      >
        {children}
      </As>
      {actions ? <div>{actions}</div> : null}
    </header>
  );
}
