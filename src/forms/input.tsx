import { forwardRef } from 'react';

export type InputRef = React.ElementRef<'input'>;
export type InputProps = React.ComponentPropsWithRef<'input'>;

const Input = forwardRef<InputRef, InputProps>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="border-2 rounded-md px-2 py-1 text-lg w-full"
    />
  );
});

export default Input;
