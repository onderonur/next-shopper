'use client';

import type { Maybe } from '@/core/shared/types';
import { AnimatedNumber } from './animated-number';

type BadgeProps = {
  value: Maybe<number>;
  children: React.ReactNode;
};

export function Badge({ value, children }: BadgeProps) {
  const didExceedThreshold = (value ?? 0) > 99;

  return (
    <div className="relative">
      {children}
      {!!value && (
        <div className="bg-primary text-primary-foreground absolute -top-1 right-1/2 min-w-4 translate-x-6 rounded-full px-1 text-center text-xs select-none">
          <AnimatedNumber
            value={didExceedThreshold ? 9 : value}
            suffix={didExceedThreshold ? '+' : undefined}
          />
        </div>
      )}
    </div>
  );
}
