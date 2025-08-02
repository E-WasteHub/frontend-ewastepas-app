import { Download, X } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';
import usePWA from '../../hooks/usePWA';

const PWAUpdatePrompt = () => {
  const { isDarkMode } = useDarkMode();
  const { showUpdatePrompt, updateApp, dismissUpdate } = usePWA();

  if (!showUpdatePrompt) return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96'>
      <div
        className={`rounded-lg border shadow-lg p-4 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className='flex items-start gap-3'>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-green-600' : 'bg-green-500'
            }`}
          >
            <Download className='w-5 h-5 text-white' />
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-sm mb-1'>Update Tersedia</h3>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              Versi baru EwasteHub tersedia dengan fitur dan perbaikan terbaru.
            </p>

            <div className='flex gap-2 mt-3'>
              <button
                onClick={updateApp}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Update Sekarang
              </button>
              <button
                onClick={dismissUpdate}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Nanti Saja
              </button>
            </div>
          </div>

          <button
            onClick={dismissUpdate}
            className={`p-1 rounded-full transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:bg-slate-700'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
