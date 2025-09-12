// src/components/fragments/dashboard/HeaderDashboard.jsx
import useDarkMode from '../../../hooks/useDarkMode';

const HeaderDashboard = ({ title, subtitle, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={className}>
      <h2
        className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
        {subtitle && (
          <div className='text-[18px]'>
            <p
              className={`font-normal ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {subtitle}
            </p>
          </div>
        )}
      </h2>
    </div>
  );
};

export default HeaderDashboard;
