import { Check } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const CheckBox = ({
  id,
  name,
  checked,
  onChange,
  disabled = false,
  label,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange({ target: { checked: !checked, name } });
    }
  };

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className='sr-only'
        {...props}
      />

      <button
        type='button'
        onClick={handleClick}
        disabled={disabled}
        className={`
          flex items-center justify-center w-5 h-5 rounded border-2 transition-all ml-1
          ${
            disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer hover:scale-105'
          }
          ${
            checked
              ? 'bg-green-600 border-green-600 text-white'
              : isDarkMode
              ? 'bg-slate-800 border-slate-600 hover:border-slate-500'
              : 'bg-white border-gray-300 hover:border-gray-400'
          }
        `}
      >
        {checked && <Check className='w-3 h-3' strokeWidth={3} />}
      </button>

      {label && (
        <label
          htmlFor={id}
          onClick={handleClick}
          className={`text-sm cursor-pointer ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
