type FormItemLabelProps = React.ComponentPropsWithoutRef<'label'>;

export default function FormItemLabel(props: FormItemLabelProps) {
  return (
    <label className="text-text-light font-semibold text-sm block" {...props} />
  );
}
