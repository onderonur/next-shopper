'use client';

import type { PatternFormatProps } from 'react-number-format';
import { PatternFormat } from 'react-number-format';
import type { InputProps, InputRef } from './input';
import Input from './input';
import { forwardRef } from 'react';

type PatterFormatInputProps = Pick<
  PatternFormatProps,
  'format' | 'mask' | 'value' | 'valueIsNumericString'
> &
  Pick<
    InputProps,
    'id' | 'placeholder' | 'onFocus' | 'onBlur' | 'onChange' | 'name'
  >;

const PatterFormatInput = forwardRef<InputRef, PatterFormatInputProps>(
  function PatterFormatInput(props, ref) {
    return <PatternFormat getInputRef={ref} {...props} customInput={Input} />;
  },
);

export default PatterFormatInput;
