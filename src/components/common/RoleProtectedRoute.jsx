import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import useAuthStore from '../../store/authStore';

const RoleProtectedRoute = ({ children, requiredRole, fallbackPath }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading untuk validasi
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Validasi role
  const validateRole = () => {
    if (!user || !user.role) return false;

    const userRole = user.role.toLowerCase();
    const required = requiredRole.toLowerCase();

    // Handle different role formats
    if (required === 'mitra-kurir' || required === 'mitrakurir') {
      return (
        userRole === 'mitra kurir' ||
        userRole === 'mitrakurir' ||
        userRole === 'mitra-kurir'
      );
    }

    return userRole === required;
  };

  const getRedirectPath = () => {
    if (!user || !user.role) return '/login';

    const userRole = user.role.toLowerCase();

    // Redirect ke dashboard sesuai role
    if (userRole === 'masyarakat') {
      return '/dashboard/masyarakat';
    } else if (userRole === 'admin') {
      return '/dashboard/admin';
    } else if (
      userRole === 'mitra kurir' ||
      userRole === 'mitrakurir' ||
      userRole === 'mitra-kurir'
    ) {
      return '/dashboard/mitra-kurir';
    }

    return fallbackPath || '/login';
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memvalidasi akses...
          </p>
        </div>
      </div>
    );
  }

  // Jika tidak login, redirect ke login
  if (!isAuthenticated || !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Jika role tidak sesuai, redirect ke dashboard yang sesuai
  if (!validateRole()) {
    const redirectPath = getRedirectPath();
    return <Navigate to={redirectPath} replace />;
  }

  // Jika semua validasi berhasil, render children
  return children;
};

export default RoleProtectedRoute;
