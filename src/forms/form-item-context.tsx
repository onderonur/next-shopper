import { Maybe } from '@/common/common-types';
import { createSafeContext } from '@/common/safe-context';

type FormItemContextValue = {
  errorMessages: Maybe<string[]>;
};

const [FormItemContext, useFormItemContext] =
  createSafeContext<FormItemContextValue>({
    displayName: 'FormItemContext',
  });

export { useFormItemContext };

export type FormItemProviderProps =
  React.PropsWithChildren<FormItemContextValue>;

export function FormItemProvider({ children, ...rest }: FormItemProviderProps) {
  return (
    <FormItemContext.Provider value={rest}>{children}</FormItemContext.Provider>
  );
}
