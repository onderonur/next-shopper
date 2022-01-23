import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { Control, FieldPath, useController } from 'react-hook-form';
import FormItem from './FormItem';
import BaseInput, { BaseInputProps } from './BaseInput';

type NumberInputProps<FieldValues> = Pick<
  NumberFormatPropsBase<typeof BaseInput>,
  'format' | 'mask'
> &
  Pick<BaseInputProps, 'placeholder' | 'onFocus' | 'onBlur'> & {
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
  } = useController<FieldValues>({ name, control });

  return (
    <FormItem label={label} error={error}>
      <NumberFormat<typeof BaseInput>
        {...field}
        {...rest}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={field.value as any}
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
