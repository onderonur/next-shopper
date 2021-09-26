type FormItemLabelProps = React.PropsWithChildren<{}>;

function FormItemLabel({ children }: FormItemLabelProps) {
  return (
    <label className="text-text-light font-semibold text-sm block">
      {children}
    </label>
  );
}

export default FormItemLabel;
