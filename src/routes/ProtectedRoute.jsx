import { Navigate, useNavigate } from 'react-router-dom';
import { Loading } from '../components/elements';
import usePengguna from '../hooks/usePengguna';
import useToast from '../hooks/useToast';
import {
  getDashboardPathByPeran,
  getProfilePathByPeran,
} from '../utils/peranUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { pengguna, isLoading } = usePengguna();
  const navigate = useNavigate();
  const { error, warning } = useToast();

  // 🔄 Tunggu dulu sampai usePengguna selesai load
  if (isLoading) {
    return <Loading mode='overlay' text='Memeriksa akses pengguna...' />;
  }

  // 🚫 Belum login → ke halaman login
  if (!pengguna) {
    return <Navigate to='/login' replace />;
  }

  const currentRole = pengguna.peran;

  // 🚫 Role tidak sesuai → redirect ke dashboard sesuai peran
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    warning(
      `Anda tidak memiliki izin untuk mengakses halaman ini. Peran Anda: ${currentRole}`
    );

    setTimeout(() => {
      navigate(getDashboardPathByPeran(currentRole), { replace: true });
    }, 2000);

    return (
      <Loading mode='overlay' text='Mengarahkan ke dashboard yang sesuai...' />
    );
  }

  // 🚫 Khusus Mitra Kurir → cek status (sebelum Aktif tidak boleh akses fitur)
  if (currentRole === 'Mitra Kurir' && pengguna.status_pengguna !== 'Aktif') {
    const profilePath = getProfilePathByPeran(currentRole);

    // Status: Belum Aktif → perlu upload dokumen
    if (pengguna.status_pengguna === 'Belum Aktif') {
      if (window.location.pathname !== profilePath) {
        warning(
          'Akun Anda belum aktif. Silakan upload dokumen verifikasi terlebih dahulu di halaman profil.'
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading
            mode='overlay'
            text='Mengarahkan ke halaman profil untuk upload dokumen...'
          />
        );
      }
    }
    // Status: Belum Selesai → masih proses registrasi
    else if (pengguna.status_pengguna === 'Belum Selesai') {
      if (window.location.pathname !== profilePath) {
        warning(
          'Proses registrasi Anda belum selesai. Silakan lengkapi data profil terlebih dahulu.'
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading
            mode='overlay'
            text='Mengarahkan ke halaman profil untuk melengkapi registrasi...'
          />
        );
      }
    }
    // Status: Menunggu Verifikasi → dokumen sudah diupload, menunggu admin
    else if (pengguna.status_pengguna === 'Menunggu Verifikasi') {
      if (window.location.pathname !== profilePath) {
        warning(
          'Dokumen Anda sedang dalam proses verifikasi oleh admin. Mohon tunggu konfirmasi lebih lanjut.'
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading mode='overlay' text='Mengarahkan ke halaman profil...' />
        );
      }
    }
    // Status lain (misal: Ditolak, dll)
    else {
      if (window.location.pathname !== profilePath) {
        error(
          `Status akun Anda: ${pengguna.status_pengguna}. Silakan hubungi admin untuk informasi lebih lanjut.`
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading mode='overlay' text='Mengarahkan ke halaman profil...' />
        );
      }
    }
  }

  // ✅ Kalau lolos semua validasi → render children
  return children;
};

export default ProtectedRoute;
