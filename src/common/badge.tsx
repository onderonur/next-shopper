import type { Maybe } from './common-types';

type BadgeProps = React.PropsWithChildren<{
  value: Maybe<number>;
}>;

export function Badge({ value, children }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {!!value && (
        <div className="absolute -top-1 left-1/2 translate-x-2 select-none rounded-full bg-primary px-2 text-xs text-primary-foreground">
          {value}
        </div>
      )}
    </div>
  );
}
