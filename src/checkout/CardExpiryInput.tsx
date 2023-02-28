import NumberInput, { NumberInputProps } from '@/forms/NumberInput';
import { Omit } from '@/common/CommonTypes';
import React from 'react';

const cardExpiryLimit = (val: string, max: string) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';

      //this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
};

const cardExpiryFormat = (val: string) => {
  const month = cardExpiryLimit(val.substring(0, 2), '12');
  const year = val.substring(2, 4);

  return month + (year.length ? '/' + year : '');
};

type CardExpiryInputProps = Omit<NumberInputProps, 'format' | 'placeholder'>;

const CardExpiryInput = React.forwardRef<
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
