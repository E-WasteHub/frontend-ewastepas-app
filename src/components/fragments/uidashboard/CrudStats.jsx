// src/components/fragments/uidashboard/CrudStats.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import Card from '../../elements/Card';

const CrudStats = ({ stats = [] }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`flex items-center gap-4 p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Icon */}
          {stat.icon && (
            <div
              className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } ${stat.color}`}
            >
              <stat.icon className='h-5 w-5' />
            </div>
          )}

          {/* Info */}
          <div>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {stat.title}
            </p>
            <h3
              className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stat.value}
            </h3>
            {stat.desc && (
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {stat.desc}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CrudStats;
