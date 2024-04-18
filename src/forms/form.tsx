import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

export const Form = forwardRef<React.ElementRef<'form'>, FormProps>(
  function Form({ className, ...rest }, ref) {
    return (
      <form
        {...rest}
        ref={ref}
        autoComplete="off"
        className={twMerge('flex flex-col gap-3', className)}
      />
    );
  },
);
