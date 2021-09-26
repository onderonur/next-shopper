import Button, { ButtonProps } from '@src/common/Button';
import Loading from '@src/common/Loading';
import { FormState } from 'react-hook-form';

type SubmitButtonProps<FieldValues> = Pick<ButtonProps, 'children'> & {
  formState: FormState<FieldValues>;
};

function SubmitButton<FieldValues>({
  formState,
  children,
}: SubmitButtonProps<FieldValues>) {
  const { isSubmitting } = formState;

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={isSubmitting}
      icon={<Loading size="small" className="mr-1" isLoading={isSubmitting} />}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
