import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

const Input = forwardRef(
  (
    {
      type = 'text',
      label,
      placeholder,
      name,
      id,
      value,
      onChange,
      error,
      required = false,
      disabled = false,
      showPasswordToggle = false,
      autoComplete,
      className = '',
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id || name;
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Base + Variasi style
    const base =
      'w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2';
    const color = isDarkMode
      ? 'bg-slate-800 text-slate-100 placeholder-slate-400'
      : 'bg-white text-gray-900 placeholder-gray-500';
    const border = error
      ? 'border-red-500 focus:ring-red-500/20'
      : isDarkMode
      ? 'border-slate-600 focus:border-green-500 focus:ring-green-500/20'
      : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20';
    const disabledStyle = disabled
      ? 'opacity-50 cursor-not-allowed ' +
        (isDarkMode ? 'bg-slate-900' : 'bg-gray-100')
      : '';

    const inputClasses = `${base} ${color} ${border} ${disabledStyle} ${className}`;

    return (
      <div className='space-y-2'>
        {label && (
          <Label htmlFor={inputId} required={required} error={error}>
            {label}
          </Label>
        )}

        <div className='relative'>
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            autoComplete={autoComplete}
            className={inputClasses}
            {...props}
          />

          {/* Toggle password */}
          {type === 'password' && showPasswordToggle && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isDarkMode
                  ? 'text-slate-400 hover:text-slate-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
