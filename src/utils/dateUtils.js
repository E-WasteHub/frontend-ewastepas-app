// src/utils/dateUtils.js
// Utility untuk format tanggal dan waktu khusus penjemputan

/**
 * 🔹 FORMAT TANGGAL INDONESIA
 * Untuk menampilkan tanggal penjemputan
 */
export const formatTanggalIndonesia = (tanggal) => {
  if (!tanggal) return '-';
  const waktuTanggal = new Date(tanggal);
  if (isNaN(waktuTanggal.getTime())) return '-';

  return waktuTanggal.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * 🔹 FORMAT TANGGAL DAN WAKTU INDONESIA
 * Untuk menampilkan waktu lengkap penjemputan
 */
export const formatTanggalWaktuIndonesia = (tanggal) => {
  if (!tanggal) return '-';
  const waktuTanggal = new Date(tanggal);
  if (isNaN(waktuTanggal.getTime())) return '-';

  return waktuTanggal.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * 🔹 FORMAT WAKTU COUNTDOWN UNTUK OTP
 * Untuk timer verifikasi OTP
 */
export const formatWaktuCountdown = (detik) => {
  if (detik <= 0) return '00:00';

  const menit = Math.floor(detik / 60);
  const sisaDetik = detik % 60;

  return `${menit.toString().padStart(2, '0')}:${sisaDetik
    .toString()
    .padStart(2, '0')}`;
};

/**
 * 🔹 FORMAT WAKTU INDONESIA (JAM:MENIT)
 * Untuk menampilkan waktu saja dalam timeline
 */
export const formatWaktuIndonesia = (tanggal) => {
  if (!tanggal) return '-';
  const waktuTanggal = new Date(tanggal);
  if (isNaN(waktuTanggal.getTime())) return '-';

  return waktuTanggal.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * 🔹 CEK APAKAH TANGGAL HARI INI
 * Untuk mengecek status penjemputan hari ini
 */
export const apakahHariIni = (tanggal) => {
  const hariIni = new Date();
  const tanggalCek = new Date(tanggal);

  return (
    tanggalCek.getDate() === hariIni.getDate() &&
    tanggalCek.getMonth() === hariIni.getMonth() &&
    tanggalCek.getFullYear() === hariIni.getFullYear()
  );
};

export default {
  formatTanggalIndonesia,
  formatTanggalWaktuIndonesia,
  formatWaktuCountdown,
  formatWaktuIndonesia,
  apakahHariIni,
};
