import type { Maybe } from './common-types';

type BadgeProps = React.PropsWithChildren<{
  value: Maybe<number>;
}>;

export function Badge({ value, children }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {!!value && (
        <div className="absolute -right-2 -top-2 select-none rounded-full bg-secondary-main px-2 text-white">
          {value}
        </div>
      )}
    </div>
  );
}
