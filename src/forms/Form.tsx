import classNames from 'classnames';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

export default function Form({ className, ...rest }: FormProps) {
  return (
    <form
      autoComplete="off"
      className={classNames(className, 'flex flex-col gap-4')}
      {...rest}
    />
  );
}
