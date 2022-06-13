import React from 'react';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import Input, { InputProps } from './Input';

export type NumberInputProps = Pick<
  NumberFormatPropsBase<typeof Input>,
  'format' | 'mask' | 'value'
> &
  Pick<
    InputProps,
    'id' | 'placeholder' | 'onFocus' | 'onBlur' | 'onChange' | 'name'
  >;

const NumberInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  NumberInputProps
>(function NumberInput(props, ref) {
  return <NumberFormat getInputRef={ref} {...props} customInput={Input} />;
});

export default NumberInput;
