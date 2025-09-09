// src/utils/dateUtils.js

// format tanggal ke format Indonesia (DD MMMM YYYY)
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

// format tanggal dan waktu ke format Indonesia (DD MMMM YYYY, HH:MM)
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

// format detik ke format MM:SS untuk countdown timer
export const formatWaktuCountdown = (detik) => {
  if (detik <= 0) return '00:00';

  const menit = Math.floor(detik / 60);
  const sisaDetik = detik % 60;

  return `${menit.toString().padStart(2, '0')}:${sisaDetik
    .toString()
    .padStart(2, '0')}`;
};

// format waktu ke format Indonesia (HH:MM)
export const formatWaktuIndonesia = (tanggal) => {
  if (!tanggal) return '-';
  const waktuTanggal = new Date(tanggal);
  if (isNaN(waktuTanggal.getTime())) return '-';

  return waktuTanggal.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// cek apakah tanggal adalah hari ini
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
