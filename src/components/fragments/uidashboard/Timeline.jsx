// src/components/fragments/uidashboard/Timeline.jsx
import useDarkMode from '../../../hooks/useDarkMode';

const Timeline = ({ steps = [], currentStatus }) => {
  const { isDarkMode } = useDarkMode();

  // mapping status ke index (urutan tetap)
  const statusOrder = {
    'Menunggu Kurir': 0,
    'Dijemput Kurir': 1,
    'Diantar Kurir ke Dropbox': 2,
    Selesai: 3,
  };
  const currentIndex = statusOrder[currentStatus] ?? -1;

  return (
    <div className='space-y-5'>
      {steps.map((step, i) => {
        const isActive = step.status === currentStatus;
        const isPast = (statusOrder[step.status] ?? -1) < currentIndex;

        return (
          <div key={i} className='flex items-start gap-3'>
            {/* Titik status */}
            <div className='flex-shrink-0 mt-1'>
              <div
                className={`w-3 h-3 rounded-full ${
                  isActive
                    ? 'bg-green-500 ring-2 ring-green-400'
                    : isPast
                    ? 'bg-gray-400'
                    : 'bg-gray-300'
                }`}
              />
            </div>

            {/* Label + Deskripsi */}
            <div>
              <p
                className={`text-sm sm:text-base ${
                  isActive
                    ? 'font-semibold text-green-600'
                    : isPast
                    ? isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                    : isDarkMode
                    ? 'text-gray-500'
                    : 'text-gray-400'
                }`}
              >
                {step.status}
              </p>
              {step.desc && (
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.desc}
                </p>
              )}
              {step.time && (
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {step.time}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
