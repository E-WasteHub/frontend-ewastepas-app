// src/utils/menuUtils.js
import {
  BookA,
  BookAlertIcon,
  BookOpen,
  Box,
  Database,
  FolderKanban,
  History,
  Home,
  ListChecks,
  MapPin,
  Plus,
  Search,
  User,
} from 'lucide-react';

// Master data menu khusus Admin (juga dipakai di DataMasterCard)
export const adminMasterMenus = [
  {
    title: 'Kelola Kategori',
    path: '/dashboard/admin/kelola-kategori',
    icon: FolderKanban,
    description: 'Kelola kategori sampah elektronik',
  },
  {
    title: 'Kelola Jenis',
    path: '/dashboard/admin/kelola-jenis',
    icon: ListChecks,
    description: 'Definisikan jenis-jenis sampah elektronik',
  },
  {
    title: 'Kelola Daerah',
    path: '/dashboard/admin/kelola-daerah',
    icon: MapPin,
    description: 'Kelola cakupan wilayah dan area layanan',
  },
  {
    title: 'Kelola Dropbox',
    path: '/dashboard/admin/kelola-dropbox',
    icon: Box,
    description: 'Atur titik dropbox sampah elektronik',
  },
  {
    title: 'Kelola Edukasi',
    path: '/dashboard/admin/kelola-edukasi',
    icon: BookOpen,
    description: 'Kelola materi edukasi terkait e-waste',
  },
];

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
      children: adminMasterMenus.map((m) => ({ title: m.title, path: m.path })),
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
      title: 'Verifikasi',
      icon: User,
      path: '/dashboard/admin/verifikasi-akun',
    },
    { title: 'Data', icon: Database, path: '/dashboard/admin/data-master' },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'Mitra Kurir': [
    { title: 'Dashboard', icon: Home, path: '/dashboard/mitra-kurir' },
    {
      title: 'Permintaan',
      icon: BookA,
      path: '/dashboard/mitra-kurir/daftar-permintaan',
    },
    {
      title: 'Aktif',
      icon: BookAlertIcon,
      path: '/dashboard/mitra-kurir/permintaan-aktif',
    },
    { title: 'Riwayat', icon: History, path: '/dashboard/mitra-kurir/riwayat' },
  ],
  Masyarakat: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/masyarakat' },
    { title: 'Buat', icon: Plus, path: '/dashboard/masyarakat/penjemputan' },
    { title: 'Lacak', icon: Search, path: '/dashboard/masyarakat/lacak' },
    { title: 'Riwayat', icon: History, path: '/dashboard/masyarakat/riwayat' },
  ],
};
