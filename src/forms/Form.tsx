type FormProps = React.ComponentPropsWithoutRef<'form'>;

export default function Form(props: FormProps) {
  return <form autoComplete="off" {...props} />;
}
