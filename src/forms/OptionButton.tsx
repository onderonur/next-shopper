import classNames from 'classnames';
import { CheckIcon } from '@/common/Icons';

type OptionButtonProps = {
  type: 'radio' | 'checkbox';
  isChecked: boolean;
  isDisabled?: boolean;
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
};

export default function OptionButton({
  type,
  isChecked,
  isDisabled,
  label,
  value,
  onChange,
}: OptionButtonProps) {
  return (
    <label
      className={classNames(
        'flex items-center p-1 rounded-md select-none',
        isDisabled
          ? 'opacity-50'
          : 'cursor-pointer hover:bg-overlay-light active:bg-overlay-main',
      )}
    >
      <span>
        <input
          className="sr-only"
          type={type}
          checked={isChecked}
          disabled={isDisabled}
          value={value}
          onChange={() => onChange(value)}
        />
        <span
          className={classNames(
            'w-7 h-7 border-2 border-primary-main mr-2 text-white flex items-center justify-center',
            isChecked && 'bg-primary-light',
            type === 'radio' ? 'rounded-full' : 'rounded-md',
          )}
        >
          {isChecked && <CheckIcon />}
        </span>
      </span>
      <span>{label}</span>
    </label>
  );
}
