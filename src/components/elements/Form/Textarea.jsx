import { forwardRef } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const Textarea = forwardRef(
  (
    {
      label,
      placeholder,
      name,
      value,
      onChange,
      error,
      required = false,
      disabled = false,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();

    // Base styling
    const baseStyle =
      'w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2 resize-vertical';

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

    const textareaClasses = `${baseStyle} ${colorStyle} ${getBorderStyle()} ${disabledStyle} ${className}`;

    // Handle change
    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className='space-y-2'>
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
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

        {/* Textarea */}
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          rows={rows}
          className={textareaClasses}
          {...props}
        />

        {/* Error Message */}
        {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
