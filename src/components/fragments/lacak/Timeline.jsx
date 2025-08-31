// src/components/fragments/lacak/Timeline.jsx
import {
  daftarLangkahStatus,
  formatWaktuID,
} from '../../../utils/penjemputanUtils';

const Timeline = ({ currentStep = 0, isDarkMode, detail }) => {
  if (currentStep === -1) {
    return (
      <div
        className={`p-2 rounded-lg text-sm font-medium text-center ${
          isDarkMode
            ? 'bg-red-900/40 text-red-400 border border-red-700'
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}
      >
        ❌ Penjemputan dibatalkan
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {daftarLangkahStatus
        .filter((step, index) => {
          // Step selalu muncul kalau index <= currentStep
          if (index <= currentStep) return true;

          // Kalau index lebih besar → cek apakah sudah ada waktu di detail
          return Boolean(detail?.[step.timeKey]);
        })
        .map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          const timeValue = detail?.[step.timeKey];
          const timeLabel = timeValue ? formatWaktuID(timeValue) : '-';

          return (
            <div
              key={step.key}
              className={`flex items-start gap-3 p-4 rounded-lg shadow-sm border transition-colors ${
                isActive
                  ? isDarkMode
                    ? 'bg-green-900/40 border-green-600'
                    : 'bg-green-50 border-green-400'
                  : isDone
                  ? isDarkMode
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-gray-100 border-gray-200'
                  : isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Nomor step */}
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : isDone
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {index + 1}
              </span>

              {/* Info */}
              <div className='flex flex-col'>
                <p
                  className={`text-sm ${
                    isActive
                      ? 'text-green-600 font-semibold'
                      : isDone
                      ? 'text-green-400'
                      : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.description}
                </p>
                {timeValue && (
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {timeLabel}
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
