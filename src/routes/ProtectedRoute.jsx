import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '../components/elements';
import { AlertModal } from '../components/fragments';
import usePengguna from '../hooks/usePengguna';
import {
  getDashboardPathByPeran,
  getProfilePathByPeran,
} from '../utils/peranUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { pengguna, isLoading } = usePengguna();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'warning',
  });

  // 🔄 Tunggu dulu sampai usePengguna selesai load
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <span>Loading...</span>
      </div>
    );
  }

  // 🚫 Belum login → ke halaman login
  if (!pengguna) {
    return <Navigate to='/login' replace />;
  }

  const currentRole = pengguna.peran;

  // 🚫 Role tidak sesuai → redirect ke dashboard sesuai peran
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    if (!showAlert) {
      setAlertConfig({
        title: 'Akses Ditolak',
        message: `Anda tidak memiliki izin untuk mengakses halaman ini. Peran Anda: ${currentRole}`,
        type: 'warning',
      });
      setShowAlert(true);
    }

    return (
      <>
        <AlertModal
          isOpen={showAlert}
          onClose={() => {
            setShowAlert(false);
            setTimeout(() => {
              navigate(getDashboardPathByPeran(currentRole));
            }, 200);
          }}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
        />
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <Alert
            type='warning'
            title='Akses Ditolak'
            message={`Peran Anda (${currentRole}) tidak memiliki izin untuk mengakses halaman ini.`}
          />
        </div>
      </>
    );
  }

  // 🚫 Khusus Mitra Kurir → cek status
  if (currentRole === 'Mitra Kurir' && pengguna.status_pengguna !== 'Aktif') {
    const profilePath = getProfilePathByPeran(currentRole);

    if (pengguna.status_pengguna === 'Belum Aktif') {
      // hanya boleh akses halaman profil
      if (window.location.pathname !== profilePath) {
        if (!showAlert) {
          setAlertConfig({
            title: 'Akun Belum Aktif',
            message:
              'Akun Anda belum aktif. Silakan upload dokumen verifikasi terlebih dahulu di halaman profil.',
            type: 'warning',
          });
          setShowAlert(true);
        }

        return (
          <>
            <AlertModal
              isOpen={showAlert}
              onClose={() => {
                setShowAlert(false);
                setTimeout(() => {
                  navigate(profilePath);
                }, 200);
              }}
              title={alertConfig.title}
              message={alertConfig.message}
              type={alertConfig.type}
            />
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
              <Alert
                type='warning'
                title='Akun Belum Aktif'
                message='Silakan upload dokumen verifikasi di halaman profil untuk mengaktifkan akun Anda.'
              />
            </div>
          </>
        );
      }
    } else {
      // Status lain selain Aktif/Belum Aktif (misal: Ditolak, Pending, dll)
      if (window.location.pathname !== profilePath) {
        if (!showAlert) {
          setAlertConfig({
            title: 'Status Akun Tidak Valid',
            message: `Status akun Anda: ${pengguna.status_pengguna}. Silakan hubungi admin untuk informasi lebih lanjut.`,
            type: 'error',
          });
          setShowAlert(true);
        }

        return (
          <>
            <AlertModal
              isOpen={showAlert}
              onClose={() => {
                setShowAlert(false);
                setTimeout(() => {
                  navigate(profilePath);
                }, 200);
              }}
              title={alertConfig.title}
              message={alertConfig.message}
              type={alertConfig.type}
            />
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
              <Alert
                type='error'
                title='Status Akun Tidak Valid'
                message={`Status: ${pengguna.status_pengguna}. Hubungi admin untuk bantuan.`}
              />
            </div>
          </>
        );
      }
    }
  }

  // ✅ Kalau lolos semua validasi → render children
  return children;
};

export default ProtectedRoute;
