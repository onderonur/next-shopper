import classNames from 'classnames';
import { forwardRef } from 'react';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

export const Form = forwardRef<React.ElementRef<'form'>, FormProps>(
  function Form({ className, ...rest }, ref) {
    return (
      <form
        ref={ref}
        autoComplete="off"
        className={classNames(className, 'flex flex-col gap-3')}
        {...rest}
      />
    );
  },
);
