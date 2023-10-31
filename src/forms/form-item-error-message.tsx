import { useFormItemContext } from './form-item-context';

export default function FormItemErrorMessage() {
  const { errorMessages } = useFormItemContext();

  if (!errorMessages?.length) {
    return null;
  }

  return (
    <div role="alert" className="text-error-main">
      {errorMessages.join(', ')}
    </div>
  );
}
