import useDarkMode from '../../../hooks/useDarkMode';

const LogoApp = ({ size = 'md', showText = false, textSize = 'lg' }) => {
  const { isDarkMode } = useDarkMode();

  // Size variants for the logo icon
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  // Icon size (should be smaller than container)
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  // Text size variants
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const logoApp = isDarkMode
    ? '/src/assets/img/ewasteDark.png'
    : '/src/assets/img/ewasteLight.png';

  return (
    <div className={`flex items-center ${showText ? 'space-x-2' : ''}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center`}
      >
        <img
          src={logoApp}
          alt='E-WasteHub Logo'
          className={`${iconSizeClasses[size]} object-contain`}
          onError={(e) => {
            // Fallback to text if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML =
              '<span class="text-white font-bold text-sm">E</span>';
          }}
        />
      </div>
      {showText && (
        <span
          className={`font-semibold ${textSizeClasses[textSize]} ${
            isDarkMode ? 'text-green-400' : 'text-green-500'
          }`}
        >
          EWasteHub
        </span>
      )}
    </div>
  );
};
export default LogoApp;
