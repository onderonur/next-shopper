'use client';

import type { NumberFormatPropsBase } from 'react-number-format';
import NumberFormat from 'react-number-format';
import type { InputProps } from './input';
import Input from './input';
import { forwardRef } from 'react';

export type NumberInputProps = Pick<
  NumberFormatPropsBase<typeof Input>,
  'format' | 'mask' | 'value'
> &
  Pick<
    InputProps,
    'id' | 'placeholder' | 'onFocus' | 'onBlur' | 'onChange' | 'name'
  >;

const NumberInput = forwardRef<
  React.ComponentRef<typeof Input>,
  NumberInputProps
>(function NumberInput(props, ref) {
  return <NumberFormat getInputRef={ref} {...props} customInput={Input} />;
});

export default NumberInput;
