import type { Maybe } from '@/core/shared/shared.types';

type PriceProps = {
  className?: string;
  value: Maybe<number>;
};

const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
});

export function Price({ className, value }: PriceProps) {
  return <span className={className}>{priceFormatter.format(value ?? 0)}</span>;
}
