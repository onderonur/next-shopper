import type { Maybe } from '@/core/shared/shared.types';

type BadgeProps = {
  value: Maybe<number>;
  children: React.ReactNode;
};

export function Badge({ value, children }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {!!value && (
        <div className="absolute -top-1 right-1/2 min-w-4 translate-x-6 select-none rounded-full bg-primary px-1 text-center text-xs text-primary-foreground">
          {value > 99 ? '99+' : value}
        </div>
      )}
    </div>
  );
}
