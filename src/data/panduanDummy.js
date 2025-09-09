import { CalendarPlus, Gift, UserRoundPlus } from 'lucide-react';

export const panduanDummy = [
  {
    id: 1,
    number: 1,
    title: 'Daftar Akun',
    description: 'Buat akun masyarakat untuk mulai menggunakan Ewastepas',
    Icon: UserRoundPlus,
    steps: [
      'Pilih role "Masyarakat" di halaman utama',
      'Klik tombol "Daftar" atau "Register"',
      'Isi form pendaftaran dengan lengkap (nama, email, password)',
      'Verifikasi email melalui link yang dikirim ke email Anda',
      'Login dengan akun yang sudah dibuat',
    ],
    tip: 'Pastikan email yang digunakan aktif untuk menerima verifikasi',
  },
  {
    id: 2,
    number: 2,
    title: 'Jadwal Penjemputan',
    description: 'Atur jadwal penjemputan sampah elektronik Anda',
    Icon: CalendarPlus,
    steps: [
      'Login ke dashboard masyarakat',
      'Klik menu "Penjemputan" atau "Jemput Sampah"',
      'Pilih kategori e-waste yang akan diserahkan',
      'Isi detail barang (jenis, kondisi, perkiraan berat)',
      'Tentukan alamat penjemputan',
      'Pilih tanggal dan waktu yang tersedia',
      'Konfirmasi jadwal penjemputan',
    ],
    tip: 'Siapkan e-waste dalam satu wadah dan pastikan mudah diakses kurir',
  },
  {
    id: 3,
    number: 3,
    title: 'Serahkan & Dapat Poin',
    description: 'Serahkan e-waste kepada kurir dan dapatkan poin reward',
    Icon: Gift,
    steps: [
      'Tunggu kurir datang sesuai jadwal yang dipilih',
      'Serahkan e-waste yang sudah disiapkan',
      'Kurir akan melakukan verifikasi dan penimbangan',
      'Tandatangani bukti serah terima',
      'Poin akan otomatis masuk ke akun setelah verifikasi selesai',
      'Cek dashboard untuk melihat poin yang diterima',
    ],
    tip: 'Pantau status penjemputan dan notifikasi poin melalui dashboard',
  },
];
