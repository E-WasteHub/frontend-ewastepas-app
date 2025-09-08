// hooks/useResponsive.js
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return { isMobile, isTablet, isDesktop };
};

// Shortcut hooks (opsional)
export const useIsMobile = () => useMediaQuery({ maxWidth: 639 });
export const useIsTablet = () =>
  useMediaQuery({ minWidth: 640, maxWidth: 767 });
export const useIsDesktop = () => useMediaQuery({ minWidth: 768 });

export default useResponsive;
