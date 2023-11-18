import type { Maybe } from '@/common/common-types';
import { createSafeContext } from '@/common/safe-context';
import { Label } from './label';

type FormItemContextValue = {
  errorMessages: Maybe<string[]>;
};

const [FormItemContext, useFormItemContext] =
  createSafeContext<FormItemContextValue>({
    displayName: 'FormItemContext',
  });

type FormItemProps = React.PropsWithChildren<FormItemContextValue>;

export function FormItem({ errorMessages, children }: FormItemProps) {
  return (
    <FormItemContext.Provider value={{ errorMessages }}>
      <div className="flex w-full flex-col gap-1">{children}</div>
    </FormItemContext.Provider>
  );
}

type FormItemLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

export function FormItemLabel(props: FormItemLabelProps) {
  return (
    <Label className="block text-sm font-semibold text-text-light" {...props} />
  );
}

export function FormItemErrorMessage() {
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
