type FormProps = React.ComponentPropsWithoutRef<'form'>;

export function Form(props: FormProps) {
  return <form {...props} autoComplete="off" />;
}
