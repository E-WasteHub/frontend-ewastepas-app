/**
 * Service untuk Dashboard Masyarakat
 * Mengelola API calls dan data manipulation untuk dashboard masyarakat
 */

// Mock data untuk development
const mockData = {
  userProfile: {
    nama_lengkap: 'John Doe',
    email: 'john.doe@example.com',
    poin_pengguna: 2500,
    alamat_pengguna: 'Jl. Contoh No. 123, Jakarta',
  },
  riwayatTerakhir: [
    {
      id: 1,
      kode_penjemputan: 'EWH-001',
      tanggal_permintaan: '2024-08-10',
      status: 'selesai',
      total_poin: 150,
      kurir: 'Ahmad Kurir',
      alamat_jemput: 'Jl. Sudirman No. 45, Jakarta',
      sampah: ['Laptop Bekas', 'Mouse'],
      dropbox: 'Dropbox Sudirman',
    },
    {
      id: 2,
      kode_penjemputan: 'EWH-002',
      tanggal_permintaan: '2024-08-08',
      status: 'dalam_proses',
      total_poin: 200,
      kurir: 'Budi Kurir',
      alamat_jemput: 'Jl. Thamrin No. 12, Jakarta',
      sampah: ['Smartphone', 'Charger'],
      dropbox: 'Dropbox Thamrin',
    },
    {
      id: 3,
      kode_penjemputan: 'EWH-003',
      tanggal_permintaan: '2024-08-05',
      status: 'menunggu',
      total_poin: 100,
      kurir: null,
      alamat_jemput: 'Jl. Gatot Subroto No. 88, Jakarta',
      sampah: ['Printer Bekas'],
      dropbox: null,
    },
    {
      id: 4,
      kode_penjemputan: 'EWH-004',
      tanggal_permintaan: '2024-08-03',
      status: 'selesai',
      total_poin: 300,
      kurir: 'Citra Kurir',
      alamat_jemput: 'Jl. Kuningan No. 67, Jakarta',
      sampah: ['TV LED', 'Remote'],
      dropbox: 'Dropbox Kuningan',
    },
    {
      id: 5,
      kode_penjemputan: 'EWH-005',
      tanggal_permintaan: '2024-08-01',
      status: 'selesai',
      total_poin: 180,
      kurir: 'Dedi Kurir',
      alamat_jemput: 'Jl. Senayan No. 23, Jakarta',
      sampah: ['Keyboard', 'Speaker'],
      dropbox: 'Dropbox Senayan',
    },
  ],
  notifikasi: [
    {
      id: 1,
      tipe: 'selesai',
      judul: 'Penjemputan Selesai',
      pesan:
        'Sampah elektronik Anda telah berhasil dijemput dan diantar ke dropbox.',
      kode_penjemputan: 'EWH-001',
      waktu: '2024-08-10T14:30:00Z',
    },
    {
      id: 2,
      tipe: 'dalam_proses',
      judul: 'Kurir Dalam Perjalanan',
      pesan:
        'Kurir sedang menuju lokasi penjemputan Anda. Estimasi tiba 15 menit.',
      kode_penjemputan: 'EWH-002',
      waktu: '2024-08-08T10:15:00Z',
    },
    {
      id: 3,
      tipe: 'dikonfirmasi',
      judul: 'Permintaan Dikonfirmasi',
      pesan: 'Permintaan penjemputan Anda telah dikonfirmasi oleh kurir.',
      kode_penjemputan: 'EWH-003',
      waktu: '2024-08-05T09:00:00Z',
    },
  ],
  artikelEdukasi: [
    {
      id_konten: 1,
      judul_konten: 'Cara Memilah Sampah Elektronik dengan Benar',
      isi_konten:
        'Sampah elektronik atau e-waste memerlukan penanganan khusus karena mengandung bahan berbahaya. Berikut adalah panduan lengkap cara memilah sampah elektronik...',
      gambar: '/images/edukasi/pemilahan-ewaste.jpg',
      tanggal_dibuat: '2024-08-01T00:00:00Z',
    },
    {
      id_konten: 2,
      judul_konten: 'Dampak Positif Daur Ulang E-Waste untuk Lingkungan',
      isi_konten:
        'Daur ulang sampah elektronik memberikan dampak positif yang signifikan bagi lingkungan. Dengan mendaur ulang e-waste, kita dapat mengurangi pencemaran...',
      gambar: '/images/edukasi/daur-ulang-ewaste.jpg',
      tanggal_dibuat: '2024-07-28T00:00:00Z',
    },
    {
      id_konten: 3,
      judul_konten: 'Tips Memperpanjang Umur Perangkat Elektronik',
      isi_konten:
        'Memperpanjang umur perangkat elektronik adalah salah satu cara terbaik untuk mengurangi e-waste. Berikut adalah tips praktis yang bisa Anda terapkan...',
      gambar: '/images/edukasi/tips-perawatan.jpg',
      tanggal_dibuat: '2024-07-25T00:00:00Z',
    },
  ],
};

/**
 * Mengambil data dashboard masyarakat
 * @returns {Promise<Object>} Data dashboard dengan user profile dan riwayat
 */
export const getDashboardData = async () => {
  try {
    // Simulasi API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Ganti dengan real API call
    // const response = await fetch('/api/dashboard/masyarakat');
    // const data = await response.json();

    return {
      success: true,
      data: mockData,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      success: false,
      error: 'Gagal memuat data dashboard',
    };
  }
};

/**
 * Mengambil data user profile
 * @returns {Promise<Object>} Data profile user
 */
export const getUserProfile = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // TODO: Ganti dengan real API call
    // const response = await fetch('/api/user/profile');
    // const data = await response.json();

    return {
      success: true,
      data: mockData.userProfile,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      success: false,
      error: 'Gagal memuat profil pengguna',
    };
  }
};

/**
 * Mengambil riwayat transaksi terbaru
 * @param {number} limit - Jumlah data yang ingin diambil
 * @returns {Promise<Object>} Data riwayat transaksi
 */
export const getRiwayatTerbaru = async (limit = 3) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Ganti dengan real API call
    // const response = await fetch(`/api/transaksi/riwayat?limit=${limit}`);
    // const data = await response.json();

    const limitedData = mockData.riwayatTerakhir.slice(0, limit);

    return {
      success: true,
      data: limitedData,
    };
  } catch (error) {
    console.error('Error fetching riwayat terbaru:', error);
    return {
      success: false,
      error: 'Gagal memuat riwayat transaksi',
    };
  }
};

/**
 * Utility function untuk menghitung statistik
 * @param {Array} riwayat - Array data riwayat
 * @returns {Object} Statistik dari riwayat
 */
export const calculateStats = (riwayat) => {
  const totalTransaksi = riwayat.length;
  const transaksiAktif = riwayat.filter(
    (t) => t.status === 'dalam_proses'
  ).length;
  const transaksiSelesai = riwayat.filter((t) => t.status === 'selesai').length;
  const totalPoinTerkumpul = riwayat
    .filter((t) => t.status === 'selesai')
    .reduce((total, t) => total + t.totalPoin, 0);

  return {
    totalTransaksi,
    transaksiAktif,
    transaksiSelesai,
    totalPoinTerkumpul,
  };
};

/**
 * Mengambil notifikasi terbaru untuk masyarakat
 * @param {number} limit - Jumlah notifikasi yang ingin diambil
 * @returns {Promise<Object>} Data notifikasi
 */
export const getNotifikasiTerbaru = async (limit = 3) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    // TODO: Ganti dengan real API call
    // const response = await fetch(`/api/notifikasi?limit=${limit}`);
    // const data = await response.json();

    const limitedData = mockData.notifikasi.slice(0, limit);

    return {
      success: true,
      data: limitedData,
    };
  } catch (error) {
    console.error('Error fetching notifikasi:', error);
    return {
      success: false,
      error: 'Gagal memuat notifikasi',
    };
  }
};

/**
 * Mengambil artikel edukasi terbaru
 * @param {number} limit - Jumlah artikel yang ingin diambil
 * @returns {Promise<Object>} Data artikel edukasi
 */
export const getArtikelEdukasiTerbaru = async (limit = 3) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // TODO: Ganti dengan real API call
    // const response = await fetch(`/api/edukasi/artikel?limit=${limit}`);
    // const data = await response.json();

    const limitedData = mockData.artikelEdukasi.slice(0, limit);

    return {
      success: true,
      data: limitedData,
    };
  } catch (error) {
    console.error('Error fetching artikel edukasi:', error);
    return {
      success: false,
      error: 'Gagal memuat artikel edukasi',
    };
  }
};

/**
 * Utility function untuk generate greeting message
 * @param {string} nama - Nama pengguna
 * @returns {string} Pesan sapaan
 */
export const generateGreeting = (nama) => {
  const waktuSekarang = new Date().getHours();
  let sapaan = '';

  if (waktuSekarang < 12) {
    sapaan = 'Selamat Pagi';
  } else if (waktuSekarang < 15) {
    sapaan = 'Selamat Siang';
  } else if (waktuSekarang < 18) {
    sapaan = 'Selamat Sore';
  } else {
    sapaan = 'Selamat Malam';
  }

  return `${sapaan}, ${nama}!`;
};

export default {
  getDashboardData,
  getUserProfile,
  getRiwayatTerbaru,
  getNotifikasiTerbaru,
  getArtikelEdukasiTerbaru,
  calculateStats,
  generateGreeting,
};
