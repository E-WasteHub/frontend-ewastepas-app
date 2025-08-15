/**
 * Service untuk Dashboard Masyarakat
 * Mengelola API calls dan data manipulation untuk dashboard masyarakat
 */

// Mock data untuk development
const mockData = {
  userProfile: {
    nama: 'John Doe',
    totalPoin: 2500,
  },
  riwayatTerakhir: [
    {
      id: 1,
      kode: 'EWH-001',
      tanggal: '2024-08-10',
      status: 'selesai',
      totalPoin: 150,
      jenisSampah: ['Laptop Bekas', 'Mouse'],
    },
    {
      id: 2,
      kode: 'EWH-002',
      tanggal: '2024-08-08',
      status: 'dalam_proses',
      totalPoin: 200,
      jenisSampah: ['Smartphone', 'Charger'],
    },
    {
      id: 3,
      kode: 'EWH-003',
      tanggal: '2024-08-05',
      status: 'menunggu',
      totalPoin: 100,
      jenisSampah: ['Printer Bekas'],
    },
    {
      id: 4,
      kode: 'EWH-004',
      tanggal: '2024-08-03',
      status: 'selesai',
      totalPoin: 300,
      jenisSampah: ['TV LED', 'Remote'],
    },
    {
      id: 5,
      kode: 'EWH-005',
      tanggal: '2024-08-01',
      status: 'selesai',
      totalPoin: 180,
      jenisSampah: ['Keyboard', 'Speaker'],
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
  calculateStats,
  generateGreeting,
};
