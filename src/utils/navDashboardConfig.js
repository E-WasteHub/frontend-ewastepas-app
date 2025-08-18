import { Database, History, Home, Plus, Search, User } from 'lucide-react';

export const navDashboardConfig = {
  admin: [
    { title: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    {
      title: 'Data Master',
      icon: Database,
      path: '/dashboard/admin/data-master',
    },
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
    {
      title: 'Permintaan Penjemputan',
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
    { title: 'Profil', icon: User, path: '/dashboard/masyarakat/profil' },
  ],
};
