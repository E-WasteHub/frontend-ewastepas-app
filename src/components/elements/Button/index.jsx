import useDarkMode from '../../../hooks/useDarkMode';

const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  // Style dasar untuk semua button
  const baseStyle =
    'px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  // Style berdasarkan variant
  let variantStyle = '';

  if (variant === 'primary') {
    variantStyle = isDarkMode
      ? 'bg-green-500 text-white hover:bg-green-600'
      : 'bg-green-600 text-white hover:bg-green-700';
  } else if (variant === 'secondary') {
    variantStyle = isDarkMode
      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center justify-center gap-2'>
          <div className='animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent'></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
