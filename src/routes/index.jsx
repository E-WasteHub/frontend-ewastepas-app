import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingOverlay from '../components/elements/Loading/LoadingOverlay';
import DashboardLayout from '../components/layouts/DashboardLayout';

// ================= Public Pages =================
import EdukasiDetailView from '../pages/EdukasiDetailView';
import EdukasiView from '../pages/EdukasiView';
import HomeView from '../pages/HomeView';
import PanduanAplikasiView from '../pages/PanduanAplikasiView';

// ================= Auth Pages =================
import LoginView from '../pages/auth/LoginView';
import LupaPasswordView from '../pages/auth/LupaPasswordView';
import RegisterView from '../pages/auth/RegisterView';
import ResetKataSandiView from '../pages/auth/ResetKataSandiView';
import VerifikasiOTPView from '../pages/auth/VerifikasiOTPView';

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
const AdminKelolaKonversiPoinView = lazy(() =>
  import('../pages/dashboard/admin/AdminKelolaKonversiPoinView')
);
const AdminVerifikasiView = lazy(() =>
  import('../pages/dashboard/admin/AdminVerifikasiView')
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
const RiwayatMasyarakatView = lazy(() =>
  import('../pages/dashboard/masyarakat/RiwayatMasyarakatView')
);

// ================= Mitra Kurir Pages =================
const DashboardKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DashboardMitraKurirView')
);
const DaftarPermintaanKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DaftarPermintaanKurirView')
);
const UnggahDokumenView = lazy(() =>
  import('../pages/dashboard/mitrakurir/UnggahDokumenView')
);
const RiwayatMitraKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/RiwayatMitraKurirView')
);

// ================= Shared (Dashboard Profil) =================
const ProfilView = lazy(() => import('../pages/dashboard/ProfilView'));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <LoadingOverlay size='xl' text='Memuat halaman...' />
        </div>
      }
    >
      <Routes>
        {/* ========= Public Routes ========= */}
        <Route path='/' element={<HomeView />} />
        <Route path='/edukasi' element={<EdukasiView />} />
        <Route path='/edukasi/:id' element={<EdukasiDetailView />} />
        <Route path='/panduan-aplikasi' element={<PanduanAplikasiView />} />

        {/* ========= Auth Routes ========= */}
        <Route path='/login' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/lupa-password' element={<LupaPasswordView />} />
        <Route path='/verifikasi-otp' element={<VerifikasiOTPView />} />
        <Route path='/reset-kata-sandi' element={<ResetKataSandiView />} />

        {/* ========= Dashboard - Admin ========= */}
        <Route
          path='/dashboard/admin'
          element={
            <DashboardLayout>
              <AdminDashboardView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/data-master'
          element={
            <DashboardLayout>
              <AdminDataMasterView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-daerah'
          element={
            <DashboardLayout>
              <AdminKelolaDaerahView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-dropbox'
          element={
            <DashboardLayout>
              <AdminKelolaDropboxView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-edukasi'
          element={
            <DashboardLayout>
              <AdminKelolaEdukasiView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-kategori'
          element={
            <DashboardLayout>
              <AdminKelolaKategoriView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-jenis'
          element={
            <DashboardLayout>
              <AdminKelolaJenisView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/kelola-konversi-poin'
          element={
            <DashboardLayout>
              <AdminKelolaKonversiPoinView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/verifikasi-akun'
          element={
            <DashboardLayout>
              <AdminVerifikasiView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/transaksi'
          element={
            <DashboardLayout>
              <AdminTransaksiView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/admin/profil'
          element={
            <DashboardLayout>
              <ProfilView />
            </DashboardLayout>
          }
        />

        {/* ========= Dashboard - Masyarakat ========= */}
        <Route
          path='/dashboard/masyarakat'
          element={
            <DashboardLayout>
              <DashboardMasyarakatView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/masyarakat/penjemputan'
          element={
            <DashboardLayout>
              <PermintaanPenjemputanView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/masyarakat/lacak'
          element={
            <DashboardLayout>
              <LacakPenjemputanView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/masyarakat/riwayat'
          element={
            <DashboardLayout>
              <RiwayatMasyarakatView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/masyarakat/profil'
          element={
            <DashboardLayout>
              <ProfilView />
            </DashboardLayout>
          }
        />

        {/* ========= Dashboard - Mitra Kurir ========= */}
        <Route
          path='/dashboard/mitra-kurir'
          element={
            <DashboardLayout>
              <DashboardKurirView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/daftar-permintaan'
          element={
            <DashboardLayout>
              <DaftarPermintaanKurirView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/unggah-dokumen'
          element={
            <DashboardLayout>
              <UnggahDokumenView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/riwayat'
          element={
            <DashboardLayout>
              <RiwayatMitraKurirView />
            </DashboardLayout>
          }
        />
        <Route
          path='/dashboard/mitra-kurir/profil'
          element={
            <DashboardLayout>
              <ProfilView />
            </DashboardLayout>
          }
        />

        {/* ========= 404 Fallback ========= */}
        <Route
          path='*'
          element={
            <div className='p-6 text-center'>Halaman tidak ditemukan</div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
