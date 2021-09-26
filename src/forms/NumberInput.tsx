import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { Control, FieldPath, useController } from 'react-hook-form';
import FormItem from './FormItem';
import BaseInput from './BaseInput';

type NumberInputProps<FieldValues> = Pick<
  NumberFormatPropsBase,
  'format' | 'mask' | 'placeholder' | 'onFocus' | 'onBlur'
> & {
  label: string;
  name: FieldPath<FieldValues>;
  control: Control<FieldValues>;
};

function NumberInput<FieldValues>({
  label,
  name,
  control,
  onBlur,
  ...rest
}: NumberInputProps<FieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormItem label={label} error={error}>
      <NumberFormat
        {...field}
        {...rest}
        onBlur={(e) => {
          onBlur?.(e);
          field.onBlur();
        }}
        customInput={BaseInput}
      />
    </FormItem>
  );
}

export default NumberInput;
