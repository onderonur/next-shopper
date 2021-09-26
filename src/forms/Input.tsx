import { Control, FieldPath, useController } from 'react-hook-form';
import FormItem from './FormItem';

type InputProps<FieldValues> = React.ComponentProps<'input'> & {
  label: string;
  name: FieldPath<FieldValues>;
  control: Control<FieldValues>;
};

function Input<FieldValues>({
  label,
  name,
  control,
  onBlur,
  ...rest
}: InputProps<FieldValues>) {
  // https://react-hook-form.com/api/usecontroller
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormItem label={label} error={error}>
      <input
        {...rest}
        {...field}
        onBlur={(e) => {
          onBlur?.(e);
          field.onBlur();
        }}
        className="border-2 rounded-md px-2 py-1 text-lg w-full"
      />
    </FormItem>
  );
}

export default Input;
