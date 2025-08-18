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
    blue:
      variant === 'soft'
        ? isDarkMode
          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          : 'bg-blue-50 text-blue-700 border border-blue-200'
        : variant === 'outline'
        ? isDarkMode
          ? 'border border-blue-500/50 text-blue-300 bg-transparent'
          : 'border border-blue-300 text-blue-700 bg-transparent'
        : isDarkMode
        ? 'bg-blue-900/50 text-blue-300'
        : 'bg-blue-100 text-blue-700',
    yellow:
      variant === 'soft'
        ? isDarkMode
          ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        : variant === 'outline'
        ? isDarkMode
          ? 'border border-yellow-500/50 text-yellow-300 bg-transparent'
          : 'border border-yellow-300 text-yellow-700 bg-transparent'
        : isDarkMode
        ? 'bg-yellow-900/50 text-yellow-300'
        : 'bg-yellow-100 text-yellow-700',
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

  // Mapping untuk variant yang lebih user-friendly
  const variantMapping = {
    success: 'green',
    danger: 'red',
    warning: 'yellow',
    info: 'blue',
    secondary: 'gray',
  };

  // Gunakan mapping jika variant adalah alias
  const finalColor = variantMapping[variant] || color;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        sizes[size]
      } ${colors[finalColor] || colors.gray} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
