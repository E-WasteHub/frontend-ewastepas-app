// src/routes/ProtectedOtpRoute.jsx
import { Navigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

const ProtectedOtpRoute = ({ children }) => {
  const { warning } = useToast();
  const userId = localStorage.getItem('userId');

  // Kalau tidak ada userId, jangan izinkan masuk ke OTP
  if (!userId) {
    warning('Anda harus melalui proses login atau registrasi terlebih dahulu.');
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedOtpRoute;
