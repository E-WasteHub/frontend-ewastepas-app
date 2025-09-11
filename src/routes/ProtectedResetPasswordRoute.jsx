// src/routes/ProtectedResetPasswordRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import useToast from '../hooks/useToast';

const ProtectedResetPasswordRoute = ({ children }) => {
  const location = useLocation();
  const { error } = useToast();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  if (!token) {
    error('Link reset kata sandi tidak valid atau sudah kedaluwarsa.');
    return <Navigate to='/pemulihan-akun' replace />;
  }

  return children;
};

export default ProtectedResetPasswordRoute;
