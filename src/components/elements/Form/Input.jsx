import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

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
      autocomplete,
      className = '',
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual input type
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Base styling
    const baseStyle =
      'w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2';

    // Color styling
    const colorStyle = isDarkMode
      ? 'bg-slate-800 text-slate-100 placeholder-slate-400'
      : 'bg-white text-gray-900 placeholder-gray-500';

    // Border styling berdasarkan state
    const getBorderStyle = () => {
      if (error) {
        return isDarkMode
          ? 'border-red-500 focus:ring-red-500/20'
          : 'border-red-500 focus:ring-red-500/20';
      }

      return isDarkMode
        ? 'border-slate-600 focus:border-green-500 focus:ring-green-500/20'
        : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20';
    };

    // Disabled styling
    const disabledStyle = disabled
      ? isDarkMode
        ? 'opacity-50 cursor-not-allowed bg-slate-900'
        : 'opacity-50 cursor-not-allowed bg-gray-100'
      : '';

    const inputClasses = `${baseStyle} ${colorStyle} ${getBorderStyle()} ${disabledStyle} ${className}`;

    // Handle change
    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    // Toggle password visibility
    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    // Gunakan id dari prop, jika tidak ada fallback ke name
    const inputId = id || name;
    return (
      <div className='space-y-2'>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium ${
              error
                ? 'text-red-500'
                : isDarkMode
                ? 'text-slate-200'
                : 'text-gray-700'
            }`}
          >
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className='relative'>
          <input
            ref={ref}
            type={inputType}
            name={name}
            id={inputId}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            autoComplete={autocomplete}
            className={inputClasses}
            {...props}
          />

          {/* Password Toggle */}
          {type === 'password' && showPasswordToggle && (
            <button
              type='button'
              onClick={togglePassword}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode
                  ? 'text-slate-400 hover:text-slate-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={disabled}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
