// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// toggle ini bisa kamu pindah ke .env atau constant config
const BYPASS_AUTH = true; // ubah ke false kalau sudah mau pakai login beneran

const ProtectedRoute = ({ allowedRoles, redirectPath = '/unauthorized' }) => {
  const { user } = useAuthStore();

  // 👉 kalau bypass aktif, langsung render Outlet
  if (BYPASS_AUTH) {
    return <Outlet />;
  }

  // 👉 normal flow (auth beneran)
  if (!user) return <Navigate to='/login' replace />;

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

export default ProtectedRoute;
