import {
  BookA,
  BookAlertIcon,
  Database,
  History,
  Home,
  Plus,
  Search,
  User,
} from 'lucide-react';

// Sidebar menu (desktop)
export const menuItemsByRole = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    {
      title: 'Verifikasi Akun',
      icon: User,
      path: '/dashboard/admin/verifikasi-akun',
    },
    {
      title: 'Data Master',
      icon: Database,
      path: '/dashboard/admin/data-master',
    },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'mitra-kurir': [
    { title: 'Dashboard', icon: Home, path: '/dashboard/mitra-kurir' },
    {
      title: 'Daftar Permintaan',
      icon: BookA,
      path: '/dashboard/mitra-kurir/daftar-permintaan',
    },
    {
      title: 'Permintaan Aktif',
      icon: BookAlertIcon,
      path: '/dashboard/mitra-kurir/permintaan-aktif',
    },
    {
      title: 'Riwayat Penjemputan',
      icon: History,
      path: '/dashboard/mitra-kurir/riwayat',
    },
  ],
  masyarakat: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/masyarakat' },
    {
      title: 'Buat Permintaan',
      icon: Plus,
      path: '/dashboard/masyarakat/penjemputan',
    },
    {
      title: 'Lacak Penjemputan',
      icon: Search,
      path: '/dashboard/masyarakat/lacak',
    },
    {
      title: 'Riwayat Penjemputan',
      icon: History,
      path: '/dashboard/masyarakat/riwayat',
    },
  ],
};

// Bottom bar menu (mobile)
export const bottomMenuItemsByRole = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    {
      title: 'VerifikasiAkun',
      icon: User,
      path: '/dashboard/admin/verifikasi-akun',
    },
    { title: 'Data', icon: Database, path: '/dashboard/admin/data-master' },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'mitra-kurir': [
    { title: 'Dashboard', icon: Home, path: '/dashboard/mitra-kurir' },
    {
      title: 'DaftarPermintaan',
      icon: BookA,
      path: '/dashboard/mitra-kurir/daftar-permintaan',
    },
    {
      title: 'Permintaan Aktif',
      icon: BookAlertIcon,
      path: '/dashboard/mitra-kurir/permintaan-aktif',
    },
    {
      title: 'Riwayat',
      icon: History,
      path: '/dashboard/mitra-kurir/riwayat',
    },
  ],
  masyarakat: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/masyarakat' },
    { title: 'Buat', icon: Plus, path: '/dashboard/masyarakat/penjemputan' },
    { title: 'Lacak', icon: Search, path: '/dashboard/masyarakat/lacak' },
    { title: 'Riwayat', icon: History, path: '/dashboard/masyarakat/riwayat' },
  ],
};
