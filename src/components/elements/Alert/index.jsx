import { CircleCheckBig, CircleX, Info, TriangleAlert } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Alert = ({ type = 'info', title, message, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  if (!message && !title) return null;

  const baseStyle = {
    success: { icon: CircleCheckBig, color: 'green' },
    warning: { icon: TriangleAlert, color: 'yellow' },
    error: { icon: CircleX, color: 'red' },
    info: { icon: Info, color: 'blue' },
  };

  const { icon: Icon, color } = baseStyle[type] || baseStyle.info;

  const container = isDarkMode
    ? `bg-${color}-900/20 border-${color}-800`
    : `bg-${color}-50 border-${color}-200`;

  const text = isDarkMode ? `text-${color}-300` : `text-${color}-800`;
  const iconColor = `text-${color}-500`;

  return (
    <div
      className={`flex items-start space-x-3 rounded-xl border p-4 ${container} ${className}`}
      role='alert'
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
      <div className={`flex-1 ${text}`}>
        {title && <h3 className='text-sm font-semibold'>{title}</h3>}
        {message && (
          <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;
