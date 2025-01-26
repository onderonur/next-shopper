'use client';

import type { Maybe } from '@/core/shared/types';
import { AnimatedNumber } from './animated-number';

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
        <AnimatedNumber value={value ?? 0} format={format} />
      </span>
    );
  }

  return <span className={className}>{priceFormatter.format(value ?? 0)}</span>;
}
