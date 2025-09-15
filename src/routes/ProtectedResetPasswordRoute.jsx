// src/routes/ProtectedResetPasswordRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import useToast from '../hooks/useToast';

const ProtectedResetPasswordRoute = ({ children }) => {
  const location = useLocation();
  const { error } = useToast();
  const params = new URLSearchParams(location.search);
  const otp = params.get('otp');

  if (!otp) {
    error('Silahkan masukkan email anda terlebih dahulu.');
    return <Navigate to='/pemulihan-akun' replace />;
  }

  return children;
};

export default ProtectedResetPasswordRoute;
