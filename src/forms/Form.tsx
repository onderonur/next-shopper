type FormProps = React.PropsWithChildren<{}> &
  Pick<React.ComponentProps<'form'>, 'onSubmit'>;

function Form({ children, onSubmit }: FormProps) {
  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
