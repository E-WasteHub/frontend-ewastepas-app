import { CalendarPlus, Gift, Trophy, UserRoundPlus } from 'lucide-react';

export const panduanData = [
  {
    id: 1,
    number: '01',
    title: 'Buat Akun Gratis',
    description:
      'Kunjungi situs kami lewat browser di HP atau laptop Anda, lalu daftar dengan email. Hanya butuh satu menit!',
    Icon: UserRoundPlus,
    steps: [
      'Buka EwasteHub.com (misalnya) di browser Anda.',
      "Klik tombol 'Daftar' dan isi data diri singkat.",
      'Verifikasi akun Anda melalui link yang dikirim ke email.',
    ],
    tips: 'Untuk akses cepat seperti aplikasi, pilih "Tambahkan ke Layar Utama" (Add to Home Screen) dari menu browser Anda.',
  },
  {
    id: 2,
    number: '02',
    title: 'Jadwalkan Penjemputan',
    description:
      'Login ke akun Anda, laporkan jenis e-waste yang akan diserahkan, dan atur jadwal penjemputan.',
    Icon: CalendarPlus,
    steps: [
      "Klik menu 'Jemput Sampah' atau tombol serupa di halaman utama.",
      'Pilih kategori barang dan isi alamat penjemputan Anda.',
      'Pilih tanggal dan jam yang paling sesuai untuk Anda.',
    ],
    tips: 'Pastikan e-waste sudah dikumpulkan dalam satu wadah (misal: kardus) agar penjemputan lebih efisien.',
  },
  {
    id: 3,
    number: '03',
    title: 'Serahkan & Terima Poin',
    description:
      'Kurir kami akan datang sesuai jadwal. Setelah e-waste Anda kami verifikasi, poin akan langsung ditambahkan ke akun Anda.',
    Icon: Gift,
    steps: [
      'Tunggu kurir datang sesuai jadwal yang telah dipilih.',
      'Serahkan e-waste yang sudah Anda siapkan.',
      'Anda akan mendapat notifikasi via email/web saat poin sudah masuk.',
    ],
    tips: 'Anda bisa memantau status penjemputan, dari "Dijadwalkan" hingga "Selesai", langsung di dashboard akun Anda.',
  },
  {
    id: 4,
    number: '04',
    title: 'Lihat Dampak & Tukar Hadiah',
    description:
      'Kontribusi Anda sangat berarti! Lihat laporan dampak lingkungan Anda dan tukarkan poin dengan berbagai hadiah menarik.',
    Icon: Trophy,
    steps: [
      "Masuk ke menu 'Laporan Dampak' atau 'Profil' Anda.",
      "Jelajahi 'Katalog Reward' untuk melihat pilihan hadiah.",
      'Pilih hadiah dan tukarkan poin Anda dengan mudah.',
    ],
    tips: 'Ajak teman Anda bergabung lewat link referral unik di profil Anda untuk mendapatkan bonus poin bersama!',
  },
];
