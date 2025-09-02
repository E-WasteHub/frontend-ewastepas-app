import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';

// ================= Public Pages =================
import EdukasiDetailView from '../pages/EdukasiDetailView';
import EdukasiView from '../pages/EdukasiView';
import HomeView from '../pages/HomeView';
import PanduanAplikasiView from '../pages/PanduanAplikasiView';

// ================= Auth Pages =================
import { Loader2 } from 'lucide-react';
import LoginView from '../pages/auth/LoginView';
import PemulihanAkunView from '../pages/auth/PemulihanAkunView';
import RegisterView from '../pages/auth/RegisterView';
import ResetKataSandiView from '../pages/auth/ResetKataSandiView';
import VerifikasiAdminView from '../pages/auth/VerifikasiAdminView';
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
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          {/* Loading tidak menggunakan komponen */}
          <div className='flex items-center justify-center min-h-screen'>
            <Loader2 className='w-12 h-12 animate-spin text-green-600' />
          </div>
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
        <Route path='/pemulihan-akun' element={<PemulihanAkunView />} />
        <Route path='/verifikasi-otp' element={<VerifikasiOTPView />} />
        <Route path='/reset-kata-sandi' element={<ResetKataSandiView />} />
        <Route path='/verifikasi-admin' element={<VerifikasiAdminView />} />

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
          path='/dashboard/masyarakat/lacak/:id_penjemputan'
          element={
            <DashboardLayout>
              <DetailLacakPenjemputanView />
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
          path='/dashboard/masyarakat/riwayat/:id_penjemputan'
          element={
            <DashboardLayout>
              <DetailRiwayatMasyarakatView />
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
          path='/dashboard/mitra-kurir/permintaan-aktif'
          element={
            <DashboardLayout>
              <PermintaanAktifKurirView />
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
          path='/dashboard/mitra-kurir/riwayat/:id_penjemputan'
          element={
            <DashboardLayout>
              <DetailRiwayatMitraKurirView />
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
            <div className='p-6 text-center mx-auto flex !px-12 flex-col items-center justify-center min-h-screen'>
              Halaman tidak ditemukan
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
