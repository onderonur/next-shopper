import { forwardRef } from 'react';
import type { PatternFormatProps } from 'react-number-format';
import { PatternFormat } from 'react-number-format';
import type { InputProps, InputRef } from './input';
import { Input } from './input';

type PatternFormatInputProps = Pick<
  PatternFormatProps,
  'format' | 'mask' | 'value' | 'type'
> &
  Pick<InputProps, 'placeholder' | 'onFocus' | 'onBlur' | 'onChange' | 'name'>;

export const PatternFormatInput = forwardRef<InputRef, PatternFormatInputProps>(
  function PatternFormatInput(props, ref) {
    return (
      <PatternFormat
        {...props}
        getInputRef={ref}
        customInput={Input}
        allowEmptyFormatting
      />
    );
  },
);
