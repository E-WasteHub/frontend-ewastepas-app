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
  Admin: [
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
      children: [
        { title: 'Kelola Kategori', path: '/dashboard/admin/kelola-kategori' },
        { title: 'Kelola Jenis', path: '/dashboard/admin/kelola-jenis' },
        { title: 'Kelola Daerah', path: '/dashboard/admin/kelola-daerah' },
        { title: 'Kelola Dropbox', path: '/dashboard/admin/kelola-dropbox' },
        { title: 'Kelola Edukasi', path: '/dashboard/admin/kelola-edukasi' },
      ],
    },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'Mitra Kurir': [
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
  Masyarakat: [
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
  Admin: [
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
      children: [
        { title: 'Kelola Kategori', path: '/dashboard/admin/kelola-kategori' },
        { title: 'Kelola Jenis', path: '/dashboard/admin/kelola-jenis' },
        { title: 'Kelola Daerah', path: '/dashboard/admin/kelola-daerah' },
        { title: 'Kelola Dropbox', path: '/dashboard/admin/kelola-dropbox' },
        { title: 'Kelola Edukasi', path: '/dashboard/admin/kelola-edukasi' },
      ],
    },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'Mitra Kurir': [
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
  Masyarakat: [
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
