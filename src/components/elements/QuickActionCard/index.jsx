import useDarkMode from '../../../hooks/useDarkMode';

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <button
      onClick={onClick}
      className={`
        w-full h-20 flex flex-col items-center justify-center space-y-2
        border-2 rounded-lg transition-all duration-200
        ${
          isDarkMode
            ? 'border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10'
            : 'border-green-300 hover:border-green-400 hover:bg-green-50'
        }
        ${className}
      `}
    >
      <Icon
        className={`w-6 h-6 ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      />
      <span
        className={`text-sm font-medium ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      >
        {title}
      </span>
      {description && (
        <span
          className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {description}
        </span>
      )}
    </button>
  );
};

export default QuickActionCard;
