import Button, { ButtonProps } from '@/common/Button';
import Loading from '@/common/Loading';
import { FieldValues, FormState } from 'react-hook-form';

type SubmitButtonProps<FormFieldValues extends FieldValues> = Pick<
  ButtonProps,
  'children' | 'aria-label'
> & {
  formState: FormState<FormFieldValues>;
};

export default function SubmitButton<FormFieldValues extends FieldValues>({
  formState,
  children,
  ...rest
}: SubmitButtonProps<FormFieldValues>) {
  const { isSubmitting } = formState;

  return (
    <Button
      aria-label={rest['aria-label']}
      type="submit"
      variant="primary"
      disabled={isSubmitting}
      icon={<Loading size="small" className="mr-1" isLoading={isSubmitting} />}
    >
      {children}
    </Button>
  );
}
