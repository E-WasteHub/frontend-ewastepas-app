import { lazy } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';

// Lazy load dashboard components
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

// Shared Components
const ProfilView = lazy(() => import('../pages/dashboard/ProfilView'));

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

const AdminTransaksiView = lazy(() =>
  import('../pages/dashboard/admin/AdminTransaksiView')
);
const AdminVerifikasiView = lazy(() =>
  import('../pages/dashboard/admin/AdminVerifikasiView')
);

// Mitra Kurir routes
const DashboardKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DashboardMitraKurirView')
);
const DaftarPermintaanKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DaftarPermintaanKurirView')
);
const DetailPermintaanKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/DetailPermintaanKurirView')
);
const UnggahDokumenView = lazy(() =>
  import('../pages/dashboard/mitrakurir/UnggahDokumenView')
);
const RiwayatMitraKurirView = lazy(() =>
  import('../pages/dashboard/mitrakurir/RiwayatMitraKurirView')
);

// Wrapper function to add dashboard layout (bypass guard untuk fokus tampilan)
// eslint-disable-next-line no-unused-vars
const createProtectedRoute = (Component) => {
  return () => (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
};

export const dashboardRoutes = [
  // Masyarakat Routes
  {
    path: '/dashboard/masyarakat',
    element: createProtectedRoute(DashboardMasyarakatView),
    title: 'Dashboard Masyarakat',
  },
  {
    path: '/dashboard/masyarakat/penjemputan',
    element: createProtectedRoute(PermintaanPenjemputanView),
    title: 'Buat Permintaan Penjemputan',
  },
  {
    path: '/dashboard/masyarakat/lacak',
    element: createProtectedRoute(LacakPenjemputanView),
    title: 'Lacak Penjemputan',
  },
  {
    path: '/dashboard/masyarakat/riwayat',
    element: createProtectedRoute(RiwayatMasyarakatView),
    title: 'Riwayat Transaksi',
  },
  {
    path: '/dashboard/masyarakat/profil',
    element: createProtectedRoute(ProfilView),
    title: 'Profil Saya',
  },

  // Admin Routes
  {
    path: '/dashboard/admin',
    element: createProtectedRoute(AdminDashboardView),
    title: 'Dashboard Admin',
  },
  {
    path: '/dashboard/admin/data-master',
    element: createProtectedRoute(AdminDataMasterView),
    title: 'Data Master',
  },
  {
    path: '/dashboard/admin/kelola-daerah',
    element: createProtectedRoute(AdminKelolaDaerahView),
    title: 'Kelola Daerah',
  },
  {
    path: '/dashboard/admin/kelola-dropbox',
    element: createProtectedRoute(AdminKelolaDropboxView),
    title: 'Kelola Dropbox',
  },
  {
    path: '/dashboard/admin/kelola-edukasi',
    element: createProtectedRoute(AdminKelolaEdukasiView),
    title: 'Kelola Edukasi',
  },
  {
    path: '/dashboard/admin/kelola-kategori',
    element: createProtectedRoute(AdminKelolaKategoriView),
    title: 'Kelola Kategori',
  },
  {
    path: '/dashboard/admin/kelola-jenis',
    element: createProtectedRoute(AdminKelolaJenisView),
    title: 'Kelola Jenis E-Waste',
  },
  {
    path: '/dashboard/admin/transaksi',
    element: createProtectedRoute(AdminTransaksiView),
    title: 'Kelola Transaksi Penjemputan',
  },
  {
    path: '/dashboard/admin/verifikasi',
    element: createProtectedRoute(AdminVerifikasiView),
    title: 'Kelola Verifikasi Akun',
  },
  {
    path: '/dashboard/admin/profil',
    element: createProtectedRoute(ProfilView),
    title: 'Profil Saya',
  },

  // Mitra Kurir Routes
  {
    path: '/dashboard/mitra-kurir',
    element: createProtectedRoute(DashboardKurirView),
    title: 'Dashboard Mitra Kurir',
  },
  {
    path: '/dashboard/mitra-kurir/daftar-permintaan',
    element: createProtectedRoute(DaftarPermintaanKurirView),
    title: 'Daftar Permintaan',
  },
  {
    path: '/dashboard/mitra-kurir/detail-permintaan/:id',
    element: createProtectedRoute(DetailPermintaanKurirView),
    title: 'Detail Permintaan',
  },
  {
    path: '/dashboard/mitra-kurir/unggah-dokumen',
    element: createProtectedRoute(UnggahDokumenView),
    title: 'Unggah Dokumen',
  },
  {
    path: '/dashboard/mitra-kurir/riwayat',
    element: createProtectedRoute(RiwayatMitraKurirView),
    title: 'Riwayat Penjemputan',
  },
  {
    path: '/dashboard/mitra-kurir/profil',
    element: createProtectedRoute(ProfilView),
    title: 'Profil Saya',
  },
];

export default dashboardRoutes;
