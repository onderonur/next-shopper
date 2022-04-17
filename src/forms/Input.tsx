import React from 'react';

export type InputProps = React.ComponentPropsWithRef<'input'>;

const Input = React.forwardRef<React.ComponentRef<'input'>, InputProps>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className="border-2 rounded-md px-2 py-1 text-lg w-full"
      />
    );
  },
);

export default Input;
