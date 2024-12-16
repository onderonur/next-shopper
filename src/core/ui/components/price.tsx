import type { Maybe } from '@/core/shared/types';
import NumberFlow from '@number-flow/react';

const format = {
  style: 'currency',
  currency: 'USD',
} as const;

const priceFormatter = new Intl.NumberFormat('en', format);

type PriceProps = {
  className?: string;
  value: Maybe<number>;
  isAnimated?: boolean;
};

export function Price({ className, value, isAnimated }: PriceProps) {
  if (isAnimated) {
    return (
      <span className={className}>
        <NumberFlow value={value ?? 0} format={format} continuous />
      </span>
    );
  }

  return <span className={className}>{priceFormatter.format(value ?? 0)}</span>;
}
