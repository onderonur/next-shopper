import classNames from 'classnames';
import { CheckIcon } from './Icons';

interface RadioButtonProps<Value> {
  isChecked: boolean;
  label: React.ReactNode;
  value: Value;
  onChange: (value: Value) => void;
}

function RadioButton<Value>({
  isChecked,
  label,
  value,
  onChange,
}: RadioButtonProps<Value>) {
  return (
    <label className="flex items-center cursor-pointer hover:bg-overlay-light active:bg-overlay-main p-1 rounded-md">
      <span>
        <input
          className="sr-only"
          type="radio"
          checked={isChecked}
          value={value as never}
          onChange={() => onChange(value)}
        />
        <div
          className={classNames(
            'w-7 h-7 border-2 border-primary-main rounded-full mr-2 text-white flex items-center justify-center',
            isChecked && 'bg-primary-light',
          )}
        >
          {isChecked && <CheckIcon />}
        </div>
      </span>
      <span>{label}</span>
    </label>
  );
}

export default RadioButton;
