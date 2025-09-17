// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../components/elements';
import usePengguna from '../hooks/usePengguna';
import {
  adaOtpTertunda,
  ambilTokenValid,
  hapusAutentikasi,
} from '../utils/authUtils';
import {
  dapatkanPathDashboardBerdasarkanPeran,
  dapatkanPathProfilBerdasarkanPeran,
} from '../utils/peranUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { pengguna, isLoading } = usePengguna();
  const location = useLocation();

  const token = ambilTokenValid();
  const path = location.pathname;
  const currentRole = pengguna?.peran;

  // === case 1: OTP user ===
  if (path === '/verifikasi-otp') {
    if (
      adaOtpTertunda() ||
      (token && pengguna?.status_pengguna === 'Belum Aktif')
    ) {
      return children;
    }
    return <Navigate to='/login' replace />;
  }

  // === case 2: reset password ===
  if (path === '/reset-kata-sandi') return children;

  // === case 3: verifikasi admin via link (OTP) ===
  if (path.startsWith('/verifikasi-admin')) return children;

  // === case 4: loading ===
  if (isLoading) {
    return <Loading mode='overlay' text='Memeriksa akses pengguna...' />;
  }

  // === case 5: belum login (selain admin OTP link) ===
  if (!pengguna && !path.startsWith('/verifikasi-admin')) {
    return <Navigate to='/login' replace />;
  }

  // === case 6: token wajib ===
  if (!token && !path.startsWith('/verifikasi-admin')) {
    hapusAutentikasi();
    return <Navigate to='/login?expired=1' replace />;
  }

  // === case 7: role authorization ===
  if (currentRole && allowedRoles && !allowedRoles.includes(currentRole)) {
    const dashboardPath = dapatkanPathDashboardBerdasarkanPeran(currentRole);
    return <Navigate to={`${dashboardPath}?unauthorized=1`} replace />;
  }

  // === case 8: khusus Mitra Kurir ===
  if (currentRole === 'Mitra Kurir' && pengguna.status_pengguna !== 'Aktif') {
    const profilePath = dapatkanPathProfilBerdasarkanPeran(currentRole);
    // langsung paksa ke halaman profil, ga usah pakai query param
    if (window.location.pathname !== profilePath) {
      return <Navigate to={profilePath} replace />;
    }
  }

  // === case 9: default ===
  return children;
};

export default ProtectedRoute;
