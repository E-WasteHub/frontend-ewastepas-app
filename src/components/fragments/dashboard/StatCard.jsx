// src/components/fragments/dashboard/StatCard.jsx
import { useDarkMode } from '../../../hooks';
import { Card } from '../../elements';

const StatCard = ({
  label,
  value,
  icon,
  color = 'text-green-500',
  useCard = true,
}) => {
  const { isDarkMode } = useDarkMode();

  const content = (
    <div className='flex items-center justify-between'>
      <div className='flex-1 text-center'>
        <p
          className={`text-md ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {label}
        </p>
        <p className={`text-2xl font-bold ${color}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <div
        className={`ml-4 p-3 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}
      >
        {icon}
      </div>
    </div>
  );

  if (useCard) {
    return (
      <Card
        className={`px-6 py-6 rounded-lg shadow-md ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {content}
      </Card>
    );
  }

  return (
    <div
      className={`px-6 py-6 rounded-lg shadow-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      {content}
    </div>
  );
};

export default StatCard;
