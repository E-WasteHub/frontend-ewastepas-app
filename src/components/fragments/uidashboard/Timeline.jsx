import useDarkMode from '../../../hooks/useDarkMode';

const Timeline = ({ steps }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-4'>
      {steps.map((step, i) => (
        <div key={i} className='flex items-start gap-3'>
          {/* Titik */}
          <div
            className={`w-3 h-3 mt-1 rounded-full ${
              step.warna || 'bg-blue-500'
            }`}
          ></div>

          {/* Deskripsi */}
          <div>
            <p
              className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              {step.deskripsi}
            </p>
            {step.lokasi && (
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {step.lokasi}
              </p>
            )}
            <p
              className={`text-xs ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              {step.waktu}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
