import useDarkMode from '../../../hooks/useDarkMode';
import Loading from '../Loading';

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

  // kelas dasar untuk tombol
  const desainDasar =
    'px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  // kelas berdasarkan varian dan mode gelap/terang
  const variantDesain = {
    primary: isDarkMode
      ? 'bg-green-500 text-white hover:bg-green-600'
      : 'bg-green-600 text-white hover:bg-green-700',
    secondary: isDarkMode
      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    icon: isDarkMode
      ? 'bg-slate-600 border border-slate-800'
      : 'bg-slate-200 border border-slate-300',
  };

  // gabungkan semua kelas
  const gabunganDesain = `${desainDasar} ${variantDesain[variant]} ${className}`;

  return (
    <button
      className={gabunganDesain}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loading mode='button' size='sm' text={loadingText} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
