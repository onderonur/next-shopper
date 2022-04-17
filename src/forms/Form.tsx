type FormProps = React.ComponentPropsWithoutRef<'form'>;

function Form(props: FormProps) {
  return <form autoComplete="off" {...props} />;
}

export default Form;
