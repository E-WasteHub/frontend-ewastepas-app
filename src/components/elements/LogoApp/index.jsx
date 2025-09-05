import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const sizeConfig = {
  sm: { wrapper: 'w-6 h-6', icon: 'w-4 h-4', text: 'text-sm' },
  md: { wrapper: 'w-8 h-8', icon: 'w-6 h-6', text: 'text-base' },
  lg: { wrapper: 'w-10 h-10', icon: 'w-8 h-8', text: 'text-lg' },
  xl: { wrapper: 'w-12 h-12', icon: 'w-10 h-10', text: 'text-xl' },
  '2xl': { wrapper: 'w-14 h-14', icon: 'w-12 h-12', text: 'text-2xl' },
};

const LogoApp = ({ size = 'md', withText = false }) => {
  const { isDarkMode } = useDarkMode();
  const [imgError, setImgError] = useState(false);

  const logoSrc = isDarkMode
    ? '/src/assets/img/ewasteDark.png'
    : '/src/assets/img/ewasteLight.png';

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={`flex items-center ${withText ? 'space-x-2' : ''}`}>
      <div
        className={`${currentSize.wrapper} rounded-full flex items-center justify-center`}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt='EWasteHub Logo'
            className={`${currentSize.icon} object-contain`}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className='text-white font-bold text-sm'>E</span>
        )}
      </div>

      {withText && (
        <span
          className={`font-semibold ${currentSize.text} ${
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
