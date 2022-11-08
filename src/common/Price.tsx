import classNames from 'classnames';
import { Maybe } from './CommonTypes';

type PriceProps = {
  className?: string;
  value: Maybe<number>;
};

export default function Price({ className, value }: PriceProps) {
  return (
    <span className={classNames('font-semibold', className)}>
      ${(value ?? 0).toFixed(2).replace('.', ',')}
    </span>
  );
}
