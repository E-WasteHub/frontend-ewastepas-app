import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Message from '../Message';

const Input = forwardRef(
  (
    {
      type = 'text',
      placeholder,
      name,
      id,
      value,
      onChange,
      error,
      disabled = false,
      showPasswordToggle = false,
      autoComplete,
      className = '',
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();
    const [lihatPassword, setLihatPassword] = useState(false);

    const inputId = id || name;
    const inputType = type === 'password' && lihatPassword ? 'text' : type;

    // style dasar
    const baseStyle =
      'w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2';
    const colorStyle = isDarkMode
      ? 'bg-slate-800 text-slate-100 placeholder-slate-400'
      : 'bg-white text-gray-900 placeholder-gray-500';
    const borderStyle = error
      ? 'border-red-500 focus:ring-red-500/20'
      : isDarkMode
      ? 'border-slate-600 focus:border-green-500 focus:ring-green-500/20'
      : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20';
    const disabledStyle = disabled
      ? `opacity-50 cursor-not-allowed ${
          isDarkMode ? 'bg-slate-900' : 'bg-gray-100'
        }`
      : '';

    const inputClasses = `${baseStyle} ${colorStyle} ${borderStyle} ${disabledStyle} ${className}`;

    return (
      <div className='space-y-2'>
        {/* Kotak input */}
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

          {/* Tombol show/hide password */}
          {type === 'password' && showPasswordToggle && (
            <button
              type='button'
              onClick={() => setLihatPassword(!lihatPassword)}
              disabled={disabled}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isDarkMode
                  ? 'text-slate-400 hover:text-slate-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {lihatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* Pesan error */}
        <Message variant='error'>{error}</Message>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
