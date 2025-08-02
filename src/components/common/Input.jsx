import { forwardRef } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const Input = forwardRef(
  (
    {
      type = 'text',
      placeholder,
      name,
      error,
      disabled,
      className = '',
      rows,
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();

    // Base styling yang selalu ada
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

    const inputProps = {
      className: `${baseStyle} ${colorStyle} ${getBorderStyle()} ${className}`,
      placeholder,
      name,
      id: name,
      ref,
      disabled,
      ...props,
    };

    return (
      <div>
        {type === 'textarea' ? (
          <textarea {...inputProps} rows={rows || 3} />
        ) : (
          <input type={type} {...inputProps} />
        )}

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
  }
);

Input.displayName = 'Input';

export default Input;
