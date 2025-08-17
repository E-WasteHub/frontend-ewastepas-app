import darkLogo from '../../../assets/img/ewasteDark.png';
import lightLogo from '../../../assets/img/ewasteLight.png';
import useDarkMode from '../../../hooks/useDarkMode';

const FormHeader = ({
  title,
  subtitle,
  showLogo = true,
  centerAlign = true,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();
  const logo = isDarkMode ? darkLogo : lightLogo;

  return (
    <div className={`${centerAlign ? 'text-center' : ''} ${className}`}>
      {/* Logo */}
      {showLogo && (
        <div className='flex justify-center mb-6'>
          <img src={logo} alt='E-Waste Hub' className='h-16 w-auto' />
        </div>
      )}

      {/* Title */}
      {title && (
        <h1
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-green-400' : 'text-green-500'
          }`}
        >
          {title}
        </h1>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-2xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default FormHeader;
