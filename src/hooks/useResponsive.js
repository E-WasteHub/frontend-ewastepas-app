// hooks/useResponsive.js
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const isTablet = useMediaQuery({ minWidth: 721, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return { isMobile, isTablet, isDesktop };
};

// Shortcut hooks (opsional)
export const useIsMobile = () => useMediaQuery({ maxWidth: 720 });
export const useIsTablet = () =>
  useMediaQuery({ minWidth: 721, maxWidth: 1023 });
export const useIsDesktop = () => useMediaQuery({ minWidth: 1024 });

export default useResponsive;
