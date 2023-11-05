import classNames from 'classnames';
import type { Maybe } from './common-types';

type PriceProps = {
  className?: string;
  value: Maybe<number>;
};

const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
});

export default function Price({ className, value }: PriceProps) {
  return (
    <span className={classNames('font-semibold', className)}>
      {priceFormatter.format(value ?? 0)}
    </span>
  );
}
