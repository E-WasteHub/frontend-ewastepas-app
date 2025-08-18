import { ChevronDown } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

const Select = ({
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

  const handleChange = (e) => onChange?.(e.target.value);

  const styles = {
    base: 'w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2 appearance-none',
    color: isDarkMode
      ? 'bg-slate-800 text-slate-100'
      : 'bg-white text-gray-900',
    border: error
      ? isDarkMode
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
        : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : disabled
      ? isDarkMode
        ? 'border-slate-700 opacity-60 cursor-not-allowed'
        : 'border-gray-200 opacity-60 cursor-not-allowed'
      : isDarkMode
      ? 'border-slate-600 focus:border-green-400 focus:ring-green-400/20 hover:border-slate-500'
      : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20 hover:border-gray-400',
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
          className={`${styles.base} ${styles.color} ${styles.border} pr-10`}
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
          {options.map((opt, i) => (
            <option
              key={i}
              value={opt.value}
              className={
                isDarkMode
                  ? 'bg-slate-800 text-slate-100'
                  : 'bg-white text-gray-900'
              }
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Icon panah */}
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <ChevronDown
            size={16}
            className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}
          />
        </div>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Select;
