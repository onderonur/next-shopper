export type BaseInputProps = React.ComponentProps<'input'>;

function BaseInput(props: BaseInputProps) {
  return (
    <input
      {...props}
      className="border-2 rounded-md px-2 py-1 text-lg w-full"
    />
  );
}

export default BaseInput;
