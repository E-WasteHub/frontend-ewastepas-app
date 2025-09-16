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
export const menuMasterAdmin = [
  {
    judul: 'Kelola Kategori',
    jalur: '/dashboard/admin/kelola-kategori',
    ikon: FolderKanban,
    deskripsi: 'Kelola kategori sampah elektronik',
  },
  {
    judul: 'Kelola Jenis',
    jalur: '/dashboard/admin/kelola-jenis',
    ikon: ListChecks,
    deskripsi: 'Definisikan jenis-jenis sampah elektronik',
  },
  {
    judul: 'Kelola Daerah',
    jalur: '/dashboard/admin/kelola-daerah',
    ikon: MapPin,
    deskripsi: 'Kelola cakupan wilayah dan area layanan',
  },
  {
    judul: 'Kelola Dropbox',
    jalur: '/dashboard/admin/kelola-dropbox',
    ikon: Box,
    deskripsi: 'Atur titik dropbox sampah elektronik',
  },
  {
    judul: 'Kelola Edukasi',
    jalur: '/dashboard/admin/kelola-edukasi',
    ikon: BookOpen,
    deskripsi: 'Kelola materi edukasi terkait e-waste',
  },
];

// Sidebar menu (desktop)
export const itemMenuBerdasarkanPeran = {
  Admin: [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/admin' },
    {
      judul: 'Verifikasi Akun',
      ikon: User,
      jalur: '/dashboard/admin/verifikasi-akun',
    },
    {
      judul: 'Data Master',
      ikon: Database,
      jalur: '/dashboard/admin/data-master',
      anak: menuMasterAdmin.map((m) => ({ judul: m.judul, jalur: m.jalur })),
    },
    { judul: 'Transaksi', ikon: History, jalur: '/dashboard/admin/transaksi' },
  ],
  'Mitra Kurir': [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/mitra-kurir' },
    {
      judul: 'Daftar Permintaan',
      ikon: BookA,
      jalur: '/dashboard/mitra-kurir/daftar-permintaan',
    },
    {
      judul: 'Permintaan Aktif',
      ikon: BookAlertIcon,
      jalur: '/dashboard/mitra-kurir/permintaan-aktif',
    },
    {
      judul: 'Riwayat Penjemputan',
      ikon: History,
      jalur: '/dashboard/mitra-kurir/riwayat',
    },
  ],
  Masyarakat: [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/masyarakat' },
    {
      judul: 'Buat Permintaan',
      ikon: Plus,
      jalur: '/dashboard/masyarakat/penjemputan',
    },
    {
      judul: 'Lacak Penjemputan',
      ikon: Search,
      jalur: '/dashboard/masyarakat/lacak',
    },
    {
      judul: 'Riwayat Penjemputan',
      ikon: History,
      jalur: '/dashboard/masyarakat/riwayat',
    },
  ],
};

// Bottom bar menu (mobile)
export const itemMenuBawahBerdasarkanPeran = {
  Admin: [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/admin' },
    {
      judul: 'Verifikasi',
      ikon: User,
      jalur: '/dashboard/admin/verifikasi-akun',
    },
    { judul: 'Data', ikon: Database, jalur: '/dashboard/admin/data-master' },
    { judul: 'Transaksi', ikon: History, jalur: '/dashboard/admin/transaksi' },
  ],
  'Mitra Kurir': [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/mitra-kurir' },
    {
      judul: 'Permintaan',
      ikon: BookA,
      jalur: '/dashboard/mitra-kurir/daftar-permintaan',
    },
    {
      judul: 'Aktif',
      ikon: BookAlertIcon,
      jalur: '/dashboard/mitra-kurir/permintaan-aktif',
    },
    {
      judul: 'Riwayat',
      ikon: History,
      jalur: '/dashboard/mitra-kurir/riwayat',
    },
  ],
  Masyarakat: [
    { judul: 'Dashboard', ikon: Home, jalur: '/dashboard/masyarakat' },
    { judul: 'Buat', ikon: Plus, jalur: '/dashboard/masyarakat/penjemputan' },
    { judul: 'Lacak', ikon: Search, jalur: '/dashboard/masyarakat/lacak' },
    { judul: 'Riwayat', ikon: History, jalur: '/dashboard/masyarakat/riwayat' },
  ],
};
