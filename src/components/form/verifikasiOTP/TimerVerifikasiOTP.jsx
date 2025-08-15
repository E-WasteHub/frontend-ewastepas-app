import { Clock, RefreshCw } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const TimerVerifikasiOTP = ({
  timer,
  formatTimer,
  canResend,
  onResendOTP,
  isLoading,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='text-center space-y-4'>
      {/* Timer Display */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-slate-700 text-slate-200'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <Clock className='w-4 h-4' />
        <span className='text-sm font-medium'>
          {timer > 0
            ? `Kode berakhir dalam ${formatTimer()}`
            : 'Kode telah berakhir'}
        </span>
      </div>

      {/* Resend Button */}
      {canResend && (
        <div className='space-y-2'>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Tidak menerima kode?
          </p>
          <button
            type='button'
            onClick={onResendOTP}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                : 'text-green-600 hover:text-green-700 hover:bg-green-50'
            } ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:underline focus:outline-none focus:ring-2 focus:ring-green-500/20'
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            {isLoading ? 'Mengirim...' : 'Kirim Ulang OTP'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TimerVerifikasiOTP;
