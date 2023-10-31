import { FormItemProvider, FormItemProviderProps } from './form-item-context';

type FormItemProps = React.PropsWithChildren<
  Pick<FormItemProviderProps, 'errorMessages'>
>;

export default function FormItem({ errorMessages, children }: FormItemProps) {
  return (
    <FormItemProvider errorMessages={errorMessages}>
      <div className="w-full flex flex-col gap-1">{children}</div>
    </FormItemProvider>
  );
}
