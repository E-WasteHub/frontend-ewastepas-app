import { ChevronDown } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useIsMobile } from '../../../hooks/useResponsive';
import Label from '../Input/Label';

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
  const isMobile = useIsMobile();

  // base style
  const baseStyle = `w-full rounded-lg border transition focus:outline-none focus:ring-2`;

  // ukuran responsif
  const ukuranStyle = isMobile
    ? 'text-base px-3 py-2 appearance-auto'
    : 'text-sm px-4 py-3 appearance-none';

  const warnaStyle = isDarkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-gray-900';

  const borderStyle = disabled
    ? isDarkMode
      ? 'border-slate-700 opacity-60 cursor-not-allowed'
      : 'border-gray-200 opacity-60 cursor-not-allowed'
    : isDarkMode
    ? 'border-slate-600 focus:border-green-400 focus:ring-green-400/20 hover:border-slate-500'
    : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20 hover:border-gray-400';

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <Label htmlFor={props.name || props.id} required={required}>
          {label}
        </Label>
      )}

      {/* Wrapper Select */}
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={`${baseStyle} ${ukuranStyle} ${warnaStyle} ${borderStyle}`}
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

        {/* Chevron hanya di desktop/tablet */}
        {!isMobile && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <ChevronDown
              size={16}
              className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
