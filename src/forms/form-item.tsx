import type { FormItemProviderProps } from './form-item-context';
import { FormItemProvider } from './form-item-context';

type FormItemProps = React.PropsWithChildren<
  Pick<FormItemProviderProps, 'errorMessages'>
>;

export default function FormItem({ errorMessages, children }: FormItemProps) {
  return (
    <FormItemProvider errorMessages={errorMessages}>
      <div className="flex w-full flex-col gap-1">{children}</div>
    </FormItemProvider>
  );
}
