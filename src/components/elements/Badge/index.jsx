import useDarkMode from '../../../hooks/useDarkMode';

const Badge = ({
  variant = 'solid',
  intent = 'secondary',
  size = 'md',
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

  const intents = {
    success: {
      solid: isDarkMode
        ? 'bg-green-600/30 text-green-300'
        : 'bg-green-100 text-green-700',
      soft: isDarkMode
        ? 'bg-green-500/10 text-green-400 border border-green-600/30'
        : 'bg-green-50 text-green-700 border border-green-200',
      outline: isDarkMode
        ? 'border border-green-500/50 text-green-300'
        : 'border border-green-300 text-green-700',
    },
    danger: {
      solid: isDarkMode
        ? 'bg-red-600/30 text-red-300'
        : 'bg-red-100 text-red-700',
      soft: isDarkMode
        ? 'bg-red-500/10 text-red-400 border border-red-600/30'
        : 'bg-red-50 text-red-700 border border-red-200',
      outline: isDarkMode
        ? 'border border-red-500/50 text-red-300'
        : 'border border-red-300 text-red-700',
    },
    warning: {
      solid: isDarkMode
        ? 'bg-yellow-600/30 text-yellow-300'
        : 'bg-yellow-100 text-yellow-800',
      soft: isDarkMode
        ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-600/30'
        : 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      outline: isDarkMode
        ? 'border border-yellow-500/50 text-yellow-300'
        : 'border border-yellow-300 text-yellow-800',
    },
    secondary: {
      solid: isDarkMode
        ? 'bg-slate-700 text-slate-300'
        : 'bg-gray-200 text-gray-700',
      soft: isDarkMode
        ? 'bg-slate-600/20 text-slate-300 border border-slate-600/30'
        : 'bg-gray-100 text-gray-700 border border-gray-200',
      outline: isDarkMode
        ? 'border border-slate-500/50 text-slate-300'
        : 'border border-gray-400 text-gray-700',
    },
  };

  const intentStyles = intents[intent]?.[variant] || intents.secondary[variant];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizes[size]} ${intentStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
