import useDarkMode from '../../../hooks/useDarkMode';

const Alert = ({ type = 'info', message, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  const getTypeStyles = (type) => {
    const baseClasses = 'p-4 border rounded-lg';
    const typeClasses = {
      success: isDarkMode
        ? 'text-green-300 bg-green-900 border-green-800'
        : 'text-green-700 bg-green-100 border-green-200',
      error: isDarkMode
        ? 'text-red-300 bg-red-900 border-red-800'
        : 'text-red-700 bg-red-100 border-red-200',
      warning: isDarkMode
        ? 'text-yellow-300 bg-yellow-900 border-yellow-800'
        : 'text-yellow-700 bg-yellow-100 border-yellow-200',
      info: isDarkMode
        ? 'text-blue-300 bg-blue-900 border-blue-800'
        : 'text-blue-700 bg-blue-100 border-blue-200',
    };

    return `${baseClasses} ${typeClasses[type] || typeClasses.info}`;
  };

  if (!message) return null;

  return <div className={`${getTypeStyles(type)} ${className}`}>{message}</div>;
};

export default Alert;
