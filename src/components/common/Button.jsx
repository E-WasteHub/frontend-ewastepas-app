import useDarkMode from '../../hooks/useDarkMode';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const baseStyles =
    'w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'primary':
        return isDarkMode
          ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
          : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';

      case 'secondary':
        return isDarkMode
          ? 'bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 focus:ring-slate-500'
          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400';

      default:
        return '';
    }
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${getVariantStyles(variant)} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className='flex items-center justify-center gap-2'>
          <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
