import type { Omit } from '@/common/common-types';
import { forwardRef } from 'react';
import { useFormItemContext } from './form-item';

export type InputRef = React.ElementRef<'input'>;
export type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'id'>;

export const Input = forwardRef<InputRef, InputProps>(
  function Input(props, ref) {
    const { inputId, isRequired, isInvalid, errorMessageId } =
      useFormItemContext();

    return (
      <input
        {...props}
        ref={ref}
        id={inputId}
        className="w-full rounded-md border-2 bg-background px-2 py-1 aria-invalid:border-error"
        required={isRequired}
        aria-invalid={isInvalid}
        aria-describedby={errorMessageId}
      />
    );
  },
);
