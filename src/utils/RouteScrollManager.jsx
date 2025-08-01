import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Komponen ini secara otomatis akan menggulir halaman ke atas
 * setiap kali rute atau halaman berubah.
 */
const RouteScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default RouteScrollManager;
