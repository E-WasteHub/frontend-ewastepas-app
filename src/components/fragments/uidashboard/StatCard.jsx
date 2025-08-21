import useDarkMode from '../../../hooks/useDarkMode';

const StatCard = ({ title, value, color, icon, subtitle }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`px-6 py-6 rounded-lg shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className='flex items-center justify-between'>
        {/* Bagian teks */}
        <div className='flex-1 text-center'>
          <p
            className={`text-md ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {title}
          </p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && (
            <span
              className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* Icon */}
        <div
          className={`ml-4 p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
