import { useState } from 'react';
import darkLogo from '../../../assets/img/ewasteDark.png';
import lightLogo from '../../../assets/img/ewasteLight.png';
import useDarkMode from '../../../hooks/useDarkMode';
import { useResponsive } from '../../../hooks/useResponsive';

const sizeConfig = {
  sm: { wrapper: 'w-6 h-6', icon: 'w-4 h-4', text: 'text-sm' },
  md: { wrapper: 'w-8 h-8', icon: 'w-6 h-6', text: 'text-base' },
  lg: { wrapper: 'w-10 h-10', icon: 'w-8 h-8', text: 'text-lg' },
  xl: { wrapper: 'w-12 h-12', icon: 'w-10 h-10', text: 'text-xl' },
  '2xl': { wrapper: 'w-14 h-14', icon: 'w-12 h-12', text: 'text-2xl' },
};

const LogoApp = ({ size = null, withText = false, responsive = true }) => {
  const { isDarkMode } = useDarkMode();
  const { isMobile, isTablet } = useResponsive();
  const [imgError, setImgError] = useState(false);

  // ✅ Gunakan imported assets daripada path string
  const logoSrc = isDarkMode ? darkLogo : lightLogo;

  // Auto responsive sizing jika size tidak diberikan dan responsive = true
  const getResponsiveSize = () => {
    if (!responsive || size) return size || 'md';

    if (isMobile) return 'sm';
    if (isTablet) return 'md';
    return 'lg';
  };

  const currentSize = sizeConfig[getResponsiveSize()] || sizeConfig.md;
  return (
    <div className={`flex items-center ${withText ? 'space-x-2' : ''}`}>
      <div
        className={`${currentSize.wrapper} rounded-full flex items-center justify-center`}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt='Ewastepas Logo'
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
          Ewastepas
        </span>
      )}
    </div>
  );
};

export default LogoApp;
