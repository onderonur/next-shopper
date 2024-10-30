'use client';

import { createContext, useContext, useId } from 'react';
import type { AsChildProps } from './slot';
import { Slot } from './slot';

type SectionContextValue = { headingId: string };

const SectionContext = createContext<SectionContextValue>(
  {} as SectionContextValue,
);

type SectionProps = AsChildProps & React.ComponentProps<'section'>;

export function Section({ asChild, ...rest }: SectionProps) {
  const Component = asChild ? Slot : 'section';
  const headingId = useId();

  return (
    <SectionContext.Provider value={{ headingId }}>
      <Component {...rest} aria-labelledby={headingId} />
    </SectionContext.Provider>
  );
}

type SectionTitleProps = AsChildProps & {
  srOnly?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionTitle({
  asChild,
  srOnly,
  actions,
  children,
}: SectionTitleProps) {
  const { headingId } = useContext(SectionContext);
  const Component = asChild ? Slot : 'h1';

  if (srOnly) {
    return (
      <Component id={headingId} className="sr-only">
        {children}
      </Component>
    );
  }

  return (
    <header className="mb-1 flex items-end justify-between">
      <Component
        id={headingId}
        className="text-lg font-semibold text-muted-foreground"
      >
        {children}
      </Component>
      {actions ? <div>{actions}</div> : null}
    </header>
  );
}
