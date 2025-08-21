// src/components/fragments/uidashboard/CrudHeader.jsx
import useDarkMode from '../../../hooks/useDarkMode';

const CrudHeader = ({ title, description }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      {/* Judul dan deskripsi */}
      <div>
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CrudHeader;
