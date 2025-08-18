import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const LogoApp = ({ size = 'md', withText = false, textSize = 'lg' }) => {
  const { isDarkMode } = useDarkMode();
  const [imgError, setImgError] = useState(false);

  const logoSrc = isDarkMode
    ? '/src/assets/img/ewasteDark.png'
    : '/src/assets/img/ewasteLight.png';

  return (
    <div className={`flex items-center ${withText ? 'space-x-2' : ''}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center`}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt='E-WasteHub Logo'
            className={`${iconSizeClasses[size]} object-contain`}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className='text-white font-bold text-sm'>E</span>
        )}
      </div>

      {withText && (
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
