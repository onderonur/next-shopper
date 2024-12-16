import type { Maybe } from '@/core/shared/types';
import NumberFlow from '@number-flow/react';

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
        <div className="absolute -top-1 right-1/2 min-w-4 translate-x-6 select-none rounded-full bg-primary px-1 text-center text-xs text-primary-foreground">
          <NumberFlow
            value={didExceedThreshold ? 9 : value}
            suffix={didExceedThreshold ? '+' : undefined}
          />
        </div>
      )}
    </div>
  );
}
