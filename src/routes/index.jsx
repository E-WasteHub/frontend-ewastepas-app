// src/routes/AppRouter.jsx
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loading } from '../components/elements';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// ================= Public Pages =================
import EdukasiDetailView from '../pages/EdukasiDetailView';
import EdukasiView from '../pages/EdukasiView';
import HomeView from '../pages/HomeView';
import PanduanAplikasiView from '../pages/PanduanAplikasiView';

// ================= Auth Pages =================
import LoginView from '../pages/auth/LoginView';
import PemulihanAkunView from '../pages/auth/PemulihanAkunView';
import RegisterView from '../pages/auth/RegisterView';
import ResetKataSandiView from '../pages/auth/ResetKataSandiView';
import VerifikasiAdmin from '../pages/auth/VerifikasiAdminView';
import VerifikasiOTPView from '../pages/auth/VerifikasiOTPView';
import NotFoundView from '../pages/NotFoundView';

// ================= Admin Pages =================
const AdminDashboardView = lazy(() =>
  import('../pages/dashboard/admin/AdminDashboardView')
);
const AdminDataMasterView = lazy(() =>
  import('../pages/dashboard/admin/AdminDataMasterView')
);
const AdminKelolaDaerahView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaDaerahView')
);
const AdminKelolaDropboxView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaDropboxView')
);
const AdminKelolaEdukasiView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaEdukasiView')
);
const AdminKelolaKategoriView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaKategoriView')
);
const AdminKelolaJenisView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaJenisView')
);
const AdminVerifikasiAkunView = lazy(() =>
  import('../pages/dashboard/admin/AdminVerifikasiAkunView')
);
const AdminTransaksiView = lazy(() =>
  import('../pages/dashboard/admin/AdminTransaksiView')
);

// ================= Masyarakat Pages =================
const DashboardMasyarakatView = lazy(() =>
  import('../pages/dashboard/masyarakat/DashboardMasyarakatView')
);
const PermintaanPenjemputanView = lazy(() =>
  import('../pages/dashboard/masyarakat/PermintaanPenjemputanView')
);
const LacakPenjemputanView = lazy(() =>
  import('../pages/dashboard/masyarakat/LacakPenjemputanView')
);
const DetailLacakPenjemputanView = lazy(() =>
  import('../pages/dashboard/masyarakat/DetailLacakPenjemputanView')
);
const RiwayatMasyarakatView = lazy(() =>
  import('../pages/dashboard/masyarakat/RiwayatMasyarakatView')
);
const DetailRiwayatMasyarakatView = lazy(() =>
  import('../pages/dashboard/masyarakat/DetailRiwayatMasyarakatView')
);

// ================= Mitra Kurir Pages =================
const DashboardKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DashboardMitraKurirView')
);
const DaftarPermintaanKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DaftarPermintaanKurirView')
);
const PermintaanAktifKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/PermintaanAktifKurir')
);
const RiwayatMitraKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/RiwayatMitraKurirView')
);
const DetailRiwayatMitraKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DetailRiwayatMitraKurirView')
);

// ================= Shared (Dashboard Profil) =================
const ProfilView = lazy(() => import('../pages/dashboard/ProfilView'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading mode='overlay' text='Memuat halaman...' />}>
      <Routes>
        {/* ========= Public Routes ========= */}
        <Route path='/' element={<HomeView />} />
        <Route path='/edukasi' element={<EdukasiView />} />
        <Route path='/edukasi/:id' element={<EdukasiDetailView />} />
        <Route path='/panduan-aplikasi' element={<PanduanAplikasiView />} />

        {/* ========= Auth Routes ========= */}
        <Route path='/login' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/pemulihan-akun' element={<PemulihanAkunView />} />
        <Route
          path='/verifikasi-otp'
          element={
            <ProtectedRoute>
              <VerifikasiOTPView />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-kata-sandi'
          element={
            <ProtectedRoute>
              <ResetKataSandiView />
            </ProtectedRoute>
          }
        />
        <Route path='/verifikasi-admin' element={<VerifikasiAdmin />} />

        {/* ========= Dashboard - Admin ========= */}
        <Route
          path='/dashboard/admin'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminDashboardView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/data-master'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminDataMasterView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/kelola-daerah'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminKelolaDaerahView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/kelola-dropbox'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminKelolaDropboxView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/kelola-edukasi'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminKelolaEdukasiView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/kelola-kategori'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminKelolaKategoriView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/kelola-jenis'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminKelolaJenisView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/verifikasi-akun'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminVerifikasiAkunView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/transaksi'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <AdminTransaksiView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/admin/profil'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DashboardLayout>
                <ProfilView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ========= Dashboard - Masyarakat ========= */}
        <Route
          path='/dashboard/masyarakat'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <DashboardMasyarakatView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/penjemputan'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <PermintaanPenjemputanView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/lacak'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <LacakPenjemputanView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/lacak/:id_penjemputan'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <DetailLacakPenjemputanView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/riwayat'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <RiwayatMasyarakatView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/riwayat/:id_penjemputan'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <DetailRiwayatMasyarakatView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/masyarakat/profil'
          element={
            <ProtectedRoute allowedRoles={['Masyarakat']}>
              <DashboardLayout>
                <ProfilView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ========= Dashboard - Mitra Kurir ========= */}
        <Route
          path='/dashboard/mitra-kurir'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <DashboardKurirView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/daftar-permintaan'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <DaftarPermintaanKurirView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/permintaan-aktif'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <PermintaanAktifKurirView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/riwayat'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <RiwayatMitraKurirView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/riwayat/:id_penjemputan'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <DetailRiwayatMitraKurirView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/profil'
          element={
            <ProtectedRoute allowedRoles={['Mitra Kurir']}>
              <DashboardLayout>
                <ProfilView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ========= 404 Fallback ========= */}
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
