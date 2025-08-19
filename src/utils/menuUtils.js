import { Database, History, Home, Plus, Search, User } from 'lucide-react';

// Sidebar menu (desktop)
export const menuItemsByRole = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    {
      title: 'Data Master',
      icon: Database,
      path: '/dashboard/admin/data-master',
    },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
  ],
  'mitra-kurir': [
    { title: 'Dashboard', icon: Home, path: '/dashboard/mitra-kurir' },
    { title: 'Riwayat', icon: History, path: '/dashboard/mitra-kurir/riwayat' },
    {
      title: 'Dokumen',
      icon: Plus,
      path: '/dashboard/mitra-kurir/unggah-dokumen',
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
    { title: 'Riwayat', icon: History, path: '/dashboard/masyarakat/riwayat' },
  ],
};

// Bottom bar menu (mobile)
export const bottomMenuItemsByRole = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    { title: 'Data', icon: Database, path: '/dashboard/admin/data-master' },
    { title: 'Transaksi', icon: History, path: '/dashboard/admin/transaksi' },
    { title: 'Profil', icon: User, path: '/dashboard/admin/profil' },
  ],
  'mitra-kurir': [
    { title: 'Dashboard', icon: Home, path: '/dashboard/mitra-kurir' },
    { title: 'Riwayat', icon: History, path: '/dashboard/mitra-kurir/riwayat' },
    {
      title: 'Dokumen',
      icon: Plus,
      path: '/dashboard/mitra-kurir/unggah-dokumen',
    },
    { title: 'Profil', icon: User, path: '/dashboard/mitra-kurir/profil' },
  ],
  masyarakat: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/masyarakat' },
    { title: 'Buat', icon: Plus, path: '/dashboard/masyarakat/penjemputan' },
    { title: 'Lacak', icon: Search, path: '/dashboard/masyarakat/lacak' },
    { title: 'Riwayat', icon: History, path: '/dashboard/masyarakat/riwayat' },
    { title: 'Profil', icon: User, path: '/dashboard/masyarakat/profil' },
  ],
};
