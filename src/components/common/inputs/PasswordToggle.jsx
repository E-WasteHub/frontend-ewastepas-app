import { Eye, EyeOff } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const PasswordToggle = ({
  showPassword,
  onToggle,
  disabled = false,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const IconComponent = showPassword ? EyeOff : Eye;

  return (
    <button
      type='button'
      onClick={onToggle}
      disabled={disabled}
      className={`p-1 rounded-full transition-colors duration-200 ${
        isDarkMode
          ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      } ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      {...props}
    >
      <IconComponent className='w-5 h-5' />
    </button>
  );
};

export default PasswordToggle;
