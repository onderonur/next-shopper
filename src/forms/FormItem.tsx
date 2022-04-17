import { Maybe } from '@src/common/CommonTypes';
import { FieldError } from 'react-hook-form';
import FormItemLabel from './FormItemLabel';

type FormItemProps = React.PropsWithChildren<{
  label: string;
  error?: Maybe<FieldError>;
}>;

function FormItem({ label, error, children }: FormItemProps) {
  return (
    <div className="py-1">
      <FormItemLabel>{label}</FormItemLabel>
      {children}
      {error && <div className="text-error-main">{error.message}</div>}
    </div>
  );
}

export default FormItem;
