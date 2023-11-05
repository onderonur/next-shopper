import type { NumberInputProps } from '@/forms/number-input';
import NumberInput from '@/forms/number-input';
import type { Omit } from '@/common/common-types';
import { forwardRef } from 'react';

const cardExpiryLimit = (val: string, max: string) => {
  let formattedVal = val;

  if (val.length === 1 && val[0] > max[0]) {
    formattedVal = `0${formattedVal}`;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      formattedVal = '01';

      //this can happen when user paste number
    } else if (val > max) {
      formattedVal = max;
    }
  }

  return formattedVal;
};

const cardExpiryFormat = (val: string) => {
  const month = cardExpiryLimit(val.substring(0, 2), '12');
  const year = val.substring(2, 4);

  return month + (year.length ? `/${year}` : '');
};

type CardExpiryInputProps = Omit<NumberInputProps, 'format' | 'placeholder'>;

const CardExpiryInput = forwardRef<
  React.ComponentRef<typeof NumberInput>,
  CardExpiryInputProps
>(function CardExpiryInput(props, ref) {
  return (
    <NumberInput
      ref={ref}
      format={cardExpiryFormat}
      placeholder="MM/YY"
      {...props}
    />
  );
});

export default CardExpiryInput;
