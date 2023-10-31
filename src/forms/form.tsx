import classNames from 'classnames';
import { forwardRef } from 'react';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, ...rest },
  ref,
) {
  return (
    <form
      ref={ref}
      autoComplete="off"
      className={classNames(className, 'space-y-3')}
      {...rest}
    />
  );
});

export default Form;
