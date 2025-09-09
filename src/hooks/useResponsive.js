// hooks/useResponsive.js
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return { isMobile, isTablet, isDesktop };
};

// Shortcut hooks (opsional)
export const useIsMobile = () => useMediaQuery({ maxWidth: 767 });
export const useIsTablet = () =>
  useMediaQuery({ minWidth: 768, maxWidth: 1024 });
export const useIsDesktop = () => useMediaQuery({ minWidth: 1025 });

export default useResponsive;
