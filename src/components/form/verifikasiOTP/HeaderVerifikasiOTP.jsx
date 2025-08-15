import useDarkMode from '../../../hooks/useDarkMode';

const HeaderVerifikasiOTP = ({ logo, email }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='text-center mb-8'>
      {/* Logo dan Judul */}
      <img src={logo} alt='Logo EWasteHub' className='mx-auto mb-4 w-24 h-24' />
      <h2
        className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      >
        EwasteHub
      </h2>

      <h1
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Verifikasi OTP
      </h1>
      <p
        className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
      >
        Kami telah mengirimkan kode verifikasi 6 digit ke
      </p>
      <p
        className={`text-sm font-medium ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      >
        {email || 'email@example.com'}
      </p>
    </div>
  );
};

export default HeaderVerifikasiOTP;
