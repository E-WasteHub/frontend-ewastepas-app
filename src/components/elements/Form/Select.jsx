import { ChevronDown } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import Label from './Label';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih opsi...',
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const styles = {
    base: `
      w-full rounded-lg border transition
      text-base sm:text-sm
      px-3 sm:px-4 py-3 sm:py-2
      focus:outline-none focus:ring-2
      appearance-auto sm:appearance-none
    `,
    color: isDarkMode
      ? 'bg-slate-800 text-slate-100'
      : 'bg-white text-gray-900',
    border: disabled
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
        <Label htmlFor={props.name || props.id} required={required}>
          {label}
        </Label>
      )}

      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={`${styles.base} ${styles.color} ${styles.border}`}
          {...props}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className='absolute inset-y-0 right-0 hidden sm:flex items-center pr-3 pointer-events-none'>
          <ChevronDown
            size={16}
            className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
