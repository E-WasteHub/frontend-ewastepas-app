import { CircleCheckBig, CircleX, Info, TriangleAlert } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Alert = ({ type = 'info', title, message, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  if (!message && !title) return null;

  const variants = {
    success: {
      icon: CircleCheckBig,
      light: 'bg-green-50 border-green-200 text-green-800',
      dark: 'bg-green-900/20 border-green-800 text-green-300',
    },
    warning: {
      icon: TriangleAlert,
      light: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      dark: 'bg-yellow-900/20 border-yellow-800 text-yellow-300',
    },
    error: {
      icon: CircleX,
      light: 'bg-red-50 border-red-200 text-red-800',
      dark: 'bg-red-900/20 border-red-800 text-red-500',
    },
    info: {
      icon: Info,
      light: 'bg-blue-50 border-blue-200 text-blue-800',
      dark: 'bg-blue-900/20 border-blue-800 text-blue-300',
    },
  };

  const variant = variants[type] || variants.info;
  const themeClass = isDarkMode ? variant.dark : variant.light;
  const Icon = variant.icon;

  return (
    <div
      className={`flex items-start space-x-3 rounded-xl border p-4 ${themeClass} ${className}`}
      role='alert'
    >
      <Icon className='h-5 w-5 flex-shrink-0 mt-0.5' />
      <div className='flex-1'>
        {title && <h3 className='text-sm font-semibold'>{title}</h3>}
        {message && (
          <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;
