import useDarkMode from '../../../hooks/useDarkMode';

const Badge = ({
  variant = 'solid',
  status = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  // ukuran badge
  const ukuranBadge = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  // warna & tema
  const warnaBadge = {
    success: {
      light: {
        solid: 'bg-green-100 text-green-700',
        soft: 'bg-green-50 text-green-700 border border-green-200',
        outline: 'border border-green-300 text-green-700',
      },
      dark: {
        solid: 'bg-green-600/30 text-green-300',
        soft: 'bg-green-500/10 text-green-400 border border-green-600/30',
        outline: 'border border-green-500/50 text-green-300',
      },
    },
    danger: {
      light: {
        solid: 'bg-red-100 text-red-700',
        soft: 'bg-red-50 text-red-700 border border-red-200',
        outline: 'border border-red-300 text-red-700',
      },
      dark: {
        solid: 'bg-red-600/30 text-red-300',
        soft: 'bg-red-500/10 text-red-400 border border-red-600/30',
        outline: 'border border-red-500/50 text-red-300',
      },
    },
    warning: {
      light: {
        solid: 'bg-yellow-100 text-yellow-800',
        soft: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        outline: 'border border-yellow-300 text-yellow-800',
      },
      dark: {
        solid: 'bg-yellow-600/30 text-yellow-300',
        soft: 'bg-yellow-500/10 text-yellow-400 border border-yellow-600/30',
        outline: 'border border-yellow-500/50 text-yellow-300',
      },
    },
    info: {
      light: {
        solid: 'bg-blue-100 text-blue-700',
        soft: 'bg-blue-50 text-blue-700 border border-blue-200',
        outline: 'border border-blue-300 text-blue-700',
      },
      dark: {
        solid: 'bg-blue-600/30 text-blue-300',
        soft: 'bg-blue-500/10 text-blue-400 border border-blue-600/30',
        outline: 'border border-blue-500/50 text-blue-300',
      },
    },
    secondary: {
      light: {
        solid: 'bg-gray-200 text-gray-700',
        soft: 'bg-gray-100 text-gray-700 border border-gray-200',
        outline: 'border border-gray-400 text-gray-700',
      },
      dark: {
        solid: 'bg-slate-700 text-slate-300',
        soft: 'bg-slate-600/20 text-slate-300 border border-slate-600/30',
        outline: 'border border-slate-500/50 text-slate-300',
      },
    },
  };

  const temaMode = isDarkMode ? 'dark' : 'light';
  const styles = warnaBadge[status]?.[temaMode]?.[variant] || '';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${ukuranBadge[size]} ${styles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
