import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const OTPInputField = ({ kodeOTP, onOTPChange, isLoading, error }) => {
  const { isDarkMode } = useDarkMode();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Update otpValues ketika kodeOTP berubah dari parent
  useEffect(() => {
    const newValues = kodeOTP.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtpValues(newValues);
  }, [kodeOTP]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Cegah input lebih dari 1 karakter
    if (!/^\d*$/.test(value)) return; // Hanya izinkan angka

    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    // Update parent state
    const otpString = newValues.join('');
    onOTPChange(otpString);

    // Auto focus ke input selanjutnya
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const numbers = text.replace(/\D/g, '').slice(0, 6);
        if (numbers) {
          onOTPChange(numbers);
          // Focus pada input terakhir yang terisi atau input pertama yang kosong
          const focusIndex = Math.min(numbers.length, 5);
          inputRefs.current[focusIndex]?.focus();
        }
      });
    }
  };

  const handleFocus = (index) => {
    // Select all text saat focus
    inputRefs.current[index]?.select();
  };

  return (
    <div className='space-y-4'>
      {/* Label */}
      <label
        className={`block text-sm font-medium ${
          isDarkMode ? 'text-slate-200' : 'text-gray-700'
        }`}
      >
        Masukkan Kode OTP
      </label>

      {/* OTP Input Grid */}
      <div className='flex justify-center gap-3'>
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type='text'
            inputMode='numeric'
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            disabled={isLoading}
            className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-all duration-200 ${
              isDarkMode
                ? `bg-slate-700 border-slate-600 text-white placeholder-slate-400
                   focus:border-green-400 focus:ring-green-400/20 focus:bg-slate-600`
                : `bg-white border-gray-300 text-gray-900 placeholder-gray-400
                   focus:border-green-500 focus:ring-green-500/20`
            } ${
              error && !value
                ? isDarkMode
                  ? 'border-red-400'
                  : 'border-red-500'
                : ''
            } ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'focus:ring-2 focus:outline-none'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className='text-center text-sm text-red-500 mt-2'>{error}</p>
      )}
    </div>
  );
};

export default OTPInputField;
