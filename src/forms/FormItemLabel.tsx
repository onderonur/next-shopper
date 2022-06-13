type FormItemLabelProps = React.ComponentPropsWithoutRef<'label'>;

function FormItemLabel(props: FormItemLabelProps) {
  return (
    <label className="text-text-light font-semibold text-sm block" {...props} />
  );
}

export default FormItemLabel;
