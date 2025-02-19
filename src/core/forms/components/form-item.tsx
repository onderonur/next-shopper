import { Label } from '@/core/forms/components/label';
import type { Maybe, Omit } from '@/core/shared/types';
import { createContext, useContext, useId } from 'react';

type FormItemContextValue = {
  inputId: string;
  isRequired?: boolean;
  isInvalid: boolean | undefined;
  errorMessages: Maybe<string[]>;
  errorMessageId: string | undefined;
};

const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormItemContext() {
  const value = useContext(FormItemContext);
  if (!value) throw new Error('FormItemContext not found');
  return value;
}

type FormItemProps = Pick<
  FormItemContextValue,
  'isRequired' | 'errorMessages'
> & {
  children: React.ReactNode;
};

export function FormItem({
  isRequired,
  errorMessages,
  children,
}: FormItemProps) {
  const inputId = useId();
  const errorMessageId = useId();
  const isInvalid = errorMessages?.length ? true : undefined;

  return (
    <FormItemContext.Provider
      value={{
        inputId,
        isRequired,
        isInvalid,
        errorMessages,
        errorMessageId: isInvalid ? errorMessageId : undefined,
      }}
    >
      <div className="flex w-full flex-col gap-1">{children}</div>
    </FormItemContext.Provider>
  );
}

type FormItemLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof Label>,
  'htmlFor'
>;

export function FormItemLabel({ children, ...rest }: FormItemLabelProps) {
  const { inputId, isRequired } = useFormItemContext();

  return (
    <Label
      {...rest}
      className="text-muted-foreground block text-sm font-semibold"
      htmlFor={inputId}
    >
      {children}
      {isRequired && '*'}
    </Label>
  );
}

export function FormItemErrorMessage() {
  const { errorMessageId, errorMessages } = useFormItemContext();

  if (!errorMessages?.length) return null;

  return (
    <div
      id={errorMessageId}
      aria-live="polite"
      aria-atomic
      className="text-error text-sm"
    >
      {errorMessages.join(', ')}
    </div>
  );
}
