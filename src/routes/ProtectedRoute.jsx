import { Navigate, useNavigate } from 'react-router-dom';
import { Loading } from '../components/elements';
import usePengguna from '../hooks/usePengguna';
import useToast from '../hooks/useToast';
import {
  getDashboardPathByPeran,
  getProfilePathByPeran,
} from '../utils/peranUtils';

/**
 * Komponen untuk melindungi rute dari akses yang tidak sah
 * Mengatur otorisasi berdasarkan peran pengguna dan status akun
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { pengguna, isLoading } = usePengguna();
  const navigate = useNavigate();
  const { error, warning } = useToast();

  // ===== TAHAP 1: PEMERIKSAAN LOADING =====
  // Tunggu sampai data pengguna selesai dimuat
  if (isLoading) {
    return <Loading mode='overlay' text='Memeriksa akses pengguna...' />;
  }

  // ===== TAHAP 2: PEMERIKSAAN LOGIN =====
  // Jika belum login, arahkan ke halaman login
  if (!pengguna) {
    return <Navigate to='/login' replace />;
  }

  const currentRole = pengguna.peran;

  // ===== TAHAP 3: PEMERIKSAAN OTORISASI PERAN =====
  // Periksa apakah peran pengguna diizinkan mengakses halaman ini
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

  // ===== TAHAP 4: PEMERIKSAAN KHUSUS MITRA KURIR =====
  // Mitra Kurir memiliki validasi status tambahan sebelum dapat mengakses fitur
  if (currentRole === 'Mitra Kurir' && pengguna.status_pengguna !== 'Aktif') {
    const profilePath = getProfilePathByPeran(currentRole);

    // Cegah redirect loop - jika sudah di halaman profil, izinkan akses
    const isCurrentlyOnProfile = window.location.pathname === profilePath;

    // Status 1: Belum Aktif - Pengguna baru yang belum upload dokumen
    if (pengguna.status_pengguna === 'Belum Aktif') {
      if (!isCurrentlyOnProfile) {
        warning(
          'Akun Anda belum aktif. Silakan upload dokumen verifikasi terlebih dahulu di halaman profil untuk menggunakan fitur aplikasi.'
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

    // Status 2: Belum Selesai - Dokumen ditolak admin, perlu upload ulang
    else if (pengguna.status_pengguna === 'Belum Selesai') {
      if (!isCurrentlyOnProfile) {
        error(
          'Dokumen verifikasi Anda tidak sesuai dan telah ditolak oleh admin. Silakan upload dokumen yang benar di halaman profil.'
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading
            mode='overlay'
            text='Mengarahkan ke halaman profil untuk upload ulang dokumen...'
          />
        );
      }
    }

    // Status 3: Menunggu Verifikasi - Dokumen sudah diupload, menunggu persetujuan admin
    else if (pengguna.status_pengguna === 'Menunggu Verifikasi') {
      if (!isCurrentlyOnProfile) {
        warning(
          'Dokumen Anda sedang dalam proses verifikasi oleh admin. Mohon tunggu konfirmasi dan jangan mengubah dokumen selama proses berlangsung.'
        );

        setTimeout(() => {
          navigate(profilePath, { replace: true });
        }, 2000);

        return (
          <Loading
            mode='overlay'
            text='Mengarahkan ke halaman profil untuk menunggu verifikasi...'
          />
        );
      }
    }

    // Status lainnya - Kemungkinan ada status baru atau error
    else {
      if (!isCurrentlyOnProfile) {
        error(
          `Status akun Anda: ${pengguna.status_pengguna}. Silakan hubungi admin melalui customer service untuk informasi lebih lanjut.`
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

  // ===== TAHAP 5: AKSES DIBERIKAN =====
  // Semua pemeriksaan berhasil, render komponen yang diminta
  return children;
};

export default ProtectedRoute;
