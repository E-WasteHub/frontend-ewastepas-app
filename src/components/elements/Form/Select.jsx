import { ChevronDown } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import Label from './Label';

const InputSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih opsi...',
  required = false,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Base styling yang selalu ada
  const baseStyle =
    'w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2 appearance-none';

  // Color styling
  const colorStyle = isDarkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-gray-900';

  // Border styling berdasarkan state
  const getBorderStyle = () => {
    if (error) {
      return isDarkMode
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
        : 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    }
    if (disabled) {
      return isDarkMode
        ? 'border-slate-700 opacity-60 cursor-not-allowed'
        : 'border-gray-200 opacity-60 cursor-not-allowed';
    }
    return isDarkMode
      ? 'border-slate-600 focus:border-green-400 focus:ring-green-400/20 hover:border-slate-500'
      : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20 hover:border-gray-400';
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <Label
          htmlFor={props.name || props.id}
          required={required}
          error={error}
        >
          {label}
        </Label>
      )}

      <div className='relative'>
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`${baseStyle} ${colorStyle} ${getBorderStyle()} pr-10`}
          {...props}
        >
          {!value && placeholder && (
            <option
              value=''
              disabled
              className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}
            >
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className={
                isDarkMode
                  ? 'bg-slate-800 text-slate-100'
                  : 'bg-white text-gray-900'
              }
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div
          className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
            disabled ? 'opacity-50' : ''
          }`}
        >
          <ChevronDown
            size={16}
            className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}
          />
        </div>
      </div>

      {error && (
        <p
          className={`mt-1 text-xs ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputSelect;
