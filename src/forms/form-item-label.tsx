import { Label } from './label';

type FormItemLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

export default function FormItemLabel(props: FormItemLabelProps) {
  return (
    <Label className="block text-sm font-semibold text-text-light" {...props} />
  );
}
