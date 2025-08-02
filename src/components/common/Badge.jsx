import useDarkMode from '../../hooks/useDarkMode';

const Badge = ({
  variant = 'soft',
  color = 'gray',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs rounded-md',
    md: 'px-3 py-1 text-sm rounded-lg',
    lg: 'px-4 py-1.5 text-base rounded-lg',
  };

  const variants = {
    solid: {
      green: 'bg-green-600 text-white',
      blue: 'bg-blue-600 text-white',
      red: 'bg-red-600 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-600 text-white',
      gray: isDarkMode
        ? 'bg-slate-700 text-slate-200'
        : 'bg-slate-200 text-slate-800',
    },
    outline: {
      green: isDarkMode
        ? 'border border-green-400 text-green-400'
        : 'border border-green-500 text-green-600',
      blue: isDarkMode
        ? 'border border-blue-400 text-blue-400'
        : 'border border-blue-500 text-blue-600',
      red: isDarkMode
        ? 'border border-red-400 text-red-400'
        : 'border border-red-500 text-red-600',
      yellow: isDarkMode
        ? 'border border-yellow-400 text-yellow-400'
        : 'border border-yellow-500 text-yellow-600',
      purple: isDarkMode
        ? 'border border-purple-400 text-purple-400'
        : 'border border-purple-500 text-purple-600',
      gray: isDarkMode
        ? 'border border-slate-600 text-slate-300'
        : 'border border-slate-300 text-slate-700',
    },
    soft: {
      green: isDarkMode
        ? 'bg-green-500/20 text-green-300'
        : 'bg-green-100 text-green-700',
      blue: isDarkMode
        ? 'bg-blue-500/20 text-blue-300'
        : 'bg-blue-100 text-blue-700',
      red: isDarkMode
        ? 'bg-red-500/20 text-red-300'
        : 'bg-red-100 text-red-700',
      yellow: isDarkMode
        ? 'bg-yellow-500/20 text-yellow-300'
        : 'bg-yellow-100 text-yellow-700',
      purple: isDarkMode
        ? 'bg-purple-500/20 text-purple-300'
        : 'bg-purple-100 text-purple-700',
      gray: isDarkMode
        ? 'bg-slate-800/50 text-slate-300'
        : 'bg-slate-100 text-slate-600',
    },
  };

  const sizeClass = sizes[size] || sizes.md;
  const variantClass = variants[variant]?.[color] || variants.soft.gray;

  return (
    <span
      className={`inline-flex items-center font-semibold transition-colors ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
