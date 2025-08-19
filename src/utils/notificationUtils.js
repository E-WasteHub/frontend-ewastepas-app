// utils/notificationUtils.js
export const notificationsByRole = {
  admin: [
    {
      id: 1,
      title: 'Verifikasi Akun Baru',
      message: '5 akun mitra kurir menunggu verifikasi',
      time: '1 jam yang lalu',
      isRead: false,
    },
    {
      id: 2,
      title: 'Laporan Transaksi',
      message: 'Laporan bulanan tersedia',
      time: '3 jam yang lalu',
      isRead: false,
    },
  ],
  'mitra-kurir': [
    {
      id: 1,
      title: 'Permintaan Penjemputan Baru',
      message: '3 permintaan penjemputan di area Anda',
      time: '30 menit yang lalu',
      isRead: false,
    },
  ],
  masyarakat: [
    {
      id: 1,
      title: 'Penjemputan Berhasil',
      message: 'Limbah Anda telah dijemput',
      time: '2 jam yang lalu',
      isRead: false,
    },
  ],
};
