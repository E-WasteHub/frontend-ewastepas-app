// src/utils/penjemputanUtils.js

/**
 * Utility functions untuk penjemputan
 */

/**
 * Mapping status penjemputan berdasarkan field waktu
 * @param {Object} penjemputan - Data penjemputan
 * @returns {string} Status yang sudah dimapping
 */
export const mapStatus = (penjemputan) => {
  if (penjemputan.waktu_dibatalkan) return 'Dibatalkan';
  if (penjemputan.waktu_sampai) return 'Selesai';
  if (penjemputan.waktu_diantar) return 'Diantar Kurir ke Dropbox';
  if (penjemputan.waktu_diterima || penjemputan.waktu_dijemput)
    return 'Dijemput Kurir';
  return 'Menunggu Kurir';
};

/**
 * Format tanggal untuk tampilan Indonesia
 * @param {string} dateString - String tanggal
 * @returns {string} Tanggal yang sudah diformat
 */
export const formatTanggalIndonesia = (dateString) => {
  if (!dateString) return '-';

  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format tanggal dan waktu untuk tampilan Indonesia
 * @param {string} dateString - String tanggal
 * @returns {string} Tanggal dan waktu yang sudah diformat
 */
export const formatTanggalWaktuIndonesia = (dateString) => {
  if (!dateString) return '-';

  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Hitung total poin dari array sampah
 * @param {Array} sampahArray - Array data sampah
 * @returns {number} Total poin
 */
export const hitungTotalPoin = (sampahArray) => {
  if (!Array.isArray(sampahArray)) return 0;

  return sampahArray.reduce((total, sampah) => {
    return total + (sampah.poin_sampah || 0);
  }, 0);
};

/**
 * Generate timeline berdasarkan data penjemputan
 * @param {Object} penjemputan - Data penjemputan
 * @returns {Array} Array timeline
 */
export const generateTimeline = (penjemputan) => {
  const timeline = [
    {
      status: 'Menunggu Kurir',
      desc: 'Permintaan berhasil dibuat',
      time: penjemputan.waktu_ditambah,
      active: true,
    },
  ];

  if (penjemputan.waktu_diterima) {
    timeline.push({
      status: 'Dijemput Kurir',
      desc: 'Kurir mengambil barang',
      time: penjemputan.waktu_diterima,
      active: true,
    });
  }

  if (penjemputan.waktu_diantar) {
    timeline.push({
      status: 'Diantar Kurir ke Dropbox',
      desc: 'Barang diantar ke dropbox',
      time: penjemputan.waktu_diantar,
      active: true,
    });
  }

  if (penjemputan.waktu_sampai) {
    timeline.push({
      status: 'Selesai',
      desc: 'Penjemputan selesai',
      time: penjemputan.waktu_sampai,
      active: true,
    });
  }

  if (penjemputan.waktu_dibatalkan) {
    timeline.push({
      status: 'Dibatalkan',
      desc: 'Penjemputan dibatalkan',
      time: penjemputan.waktu_dibatalkan,
      active: true,
    });
  }

  return timeline;
};

/**
 * Get status color class untuk badge
 * @param {string} status - Status penjemputan
 * @returns {string} CSS class untuk warna
 */
export const getStatusColorClass = (status) => {
  const colorMap = {
    Selesai:
      'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    Dibatalkan: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
    'Diantar Kurir ke Dropbox':
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300',
    'Dijemput Kurir':
      'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
    'Menunggu Kurir':
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
  };

  return (
    colorMap[status] ||
    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  );
};

/**
 * Check apakah tanggal adalah hari ini
 * @param {string} dateString - String tanggal
 * @returns {boolean} True jika hari ini
 */
export const isToday = (dateString) => {
  if (!dateString) return false;

  const today = new Date().toDateString();
  const checkDate = new Date(dateString).toDateString();

  return today === checkDate;
};

/**
 * Check apakah tanggal dalam rentang hari tertentu
 * @param {string} dateString - String tanggal
 * @param {number} days - Jumlah hari
 * @returns {boolean} True jika dalam rentang
 */
export const isWithinDays = (dateString, days) => {
  if (!dateString) return false;

  const checkDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - checkDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= days;
};
