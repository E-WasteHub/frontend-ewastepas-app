import useDarkMode from '../../../hooks/useDarkMode';

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  iconColor = 'green',
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();

  const iconColorClasses = {
    green: isDarkMode
      ? 'text-green-400 bg-green-500/10'
      : 'text-green-500 bg-green-50',
    blue: isDarkMode
      ? 'text-blue-400 bg-blue-500/10'
      : 'text-blue-500 bg-blue-50',
    yellow: isDarkMode
      ? 'text-yellow-400 bg-yellow-500/10'
      : 'text-yellow-500 bg-yellow-50',
    red: isDarkMode ? 'text-red-400 bg-red-500/10' : 'text-red-500 bg-red-50',
  };

  const valueColorClasses = {
    green: isDarkMode ? 'text-green-400' : 'text-green-600',
    blue: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    yellow: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
    red: isDarkMode ? 'text-red-400' : 'text-red-600',
  };

  return (
    <div
      className={`${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } rounded-lg shadow-md p-6 ${className}`}
    >
      <div className='flex flex-col items-center text-center space-y-4'>
        <div className={`p-4 rounded-full ${iconColorClasses[iconColor]}`}>
          <Icon className='w-8 h-8' />
        </div>
        <div>
          <p
            className={`text-lg font-medium mb-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {title}
          </p>
          <p className={`text-4xl font-bold ${valueColorClasses[iconColor]}`}>
            {value}
          </p>
          {subtitle && (
            <p
              className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
