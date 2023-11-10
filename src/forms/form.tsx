import classNames from 'classnames';
import { forwardRef } from 'react';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

const Form = forwardRef<React.ElementRef<'form'>, FormProps>(function Form(
  { className, ...rest },
  ref,
) {
  return (
    <form
      ref={ref}
      autoComplete="off"
      className={classNames(className, 'flex flex-col gap-3')}
      {...rest}
    />
  );
});

export default Form;
