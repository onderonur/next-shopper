import { Maybe } from '@src/common/CommonTypes';
import { FieldError } from 'react-hook-form';

type FormItemProps = React.PropsWithChildren<{
  error?: Maybe<FieldError>;
}>;

function FormItem({ error, children }: FormItemProps) {
  return (
    <div className="py-1">
      {children}
      {error && (
        <div role="alert" className="text-error-main">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default FormItem;
