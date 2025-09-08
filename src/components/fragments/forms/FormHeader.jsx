import darkLogo from '../../../assets/img/ewasteDark.png';
import lightLogo from '../../../assets/img/ewasteLight.png';
import useDarkMode from '../../../hooks/useDarkMode';

const FormHeader = ({ title, subtitle, showLogo = true, center = true }) => {
  const { isDarkMode } = useDarkMode();
  const logo = isDarkMode ? darkLogo : lightLogo;

  const textAlign = center ? 'text-center' : '';

  return (
    <div className={textAlign}>
      {/* Logo */}
      {showLogo && (
        <img src={logo} alt='Ewastepas' className='h-16 w-auto mx-auto mb-6' />
      )}

      {/* Judul */}
      {title && (
        <h1
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-green-400' : 'text-green-500'
          }`}
        >
          {title}
        </h1>
      )}

      {/* Subjudul */}
      {subtitle && (
        <p
          className={`text-base ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default FormHeader;
