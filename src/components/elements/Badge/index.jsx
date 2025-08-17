import useDarkMode from '../../../hooks/useDarkMode';

const Badge = ({
  color = 'gray',
  size = 'md',
  variant = 'solid',
  className = '',
  children,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const colors = {
    green:
      variant === 'soft'
        ? isDarkMode
          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
          : 'bg-green-50 text-green-700 border border-green-200'
        : variant === 'outline'
        ? isDarkMode
          ? 'border border-green-500/50 text-green-300 bg-transparent'
          : 'border border-green-300 text-green-700 bg-transparent'
        : isDarkMode
        ? 'bg-green-900/50 text-green-300'
        : 'bg-green-100 text-green-700',
    red:
      variant === 'soft'
        ? isDarkMode
          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
          : 'bg-red-50 text-red-700 border border-red-200'
        : variant === 'outline'
        ? isDarkMode
          ? 'border border-red-500/50 text-red-300 bg-transparent'
          : 'border border-red-300 text-red-700 bg-transparent'
        : isDarkMode
        ? 'bg-red-900/50 text-red-300'
        : 'bg-red-100 text-red-700',

    gray:
      variant === 'soft'
        ? isDarkMode
          ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
          : 'bg-gray-50 text-gray-700 border border-gray-200'
        : variant === 'outline'
        ? isDarkMode
          ? 'border border-slate-500 text-slate-300 bg-transparent'
          : 'border border-gray-300 text-gray-600 bg-transparent'
        : isDarkMode
        ? 'bg-slate-700 text-slate-300'
        : 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        sizes[size]
      } ${colors[color] || colors.gray} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
