import { forwardRef } from 'react';

export type InputRef = React.ElementRef<'input'>;
export type InputProps = React.ComponentPropsWithRef<'input'>;

export const Input = forwardRef<InputRef, InputProps>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className="w-full rounded-md border-2 px-2 py-1 text-lg"
      />
    );
  },
);
