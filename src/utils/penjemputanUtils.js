// src/utils/penjemputanUtils.js

export const parseToDate = (value) => {
  if (!value) return null;

  // Kalau number → langsung
  if (typeof value === 'number') {
    return value.toString().length === 10
      ? new Date(value * 1000) // detik → ms
      : new Date(value); // milidetik
  }

  // Kalau string angka → parse ke int
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return value.length === 10
      ? new Date(parseInt(value, 10) * 1000)
      : new Date(parseInt(value, 10));
  }

  // Kalau string datetime biasa
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

// Ubah data penjemputan menjadi status teks
export const statusPenjemputan = (penjemputan) => {
  if (!penjemputan) return '-';
  if (penjemputan.waktu_dibatalkan) return 'Dibatalkan';
  if (penjemputan.waktu_sampai) return 'Selesai';
  if (penjemputan.waktu_diantar) return 'Diantar ke Dropbox';
  if (penjemputan.waktu_diterima || penjemputan.waktu_dijemput)
    return 'Dijemput Kurir';
  return 'Menunggu Kurir';
};

// Tentukan langkah aktif pada timeline
// @returns number (0 = Menunggu, 1 = Dijemput, 2 = Diantar, 3 = Selesai, -1 = Dibatalkan)
export const langkahStatusPenjemputan = (penjemputan) => {
  if (!penjemputan) return 0;
  if (penjemputan.waktu_dibatalkan) return -1;
  if (penjemputan.waktu_sampai) return 3;
  if (penjemputan.waktu_diantar) return 2;
  if (penjemputan.waktu_diterima || penjemputan.waktu_dijemput) return 1;
  return 0;
};

// 🔹 Format tanggal (Indonesia, tanpa jam)
export const formatTanggalID = (tanggal) => {
  const d = parseToDate(tanggal);
  if (!d) return '-';
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// 🔹 Format tanggal + jam (Indonesia)
export const formatTanggalWaktuID = (tanggal) => {
  const d = parseToDate(tanggal);
  if (!d) return '-';
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 🔹 Format khusus waktu saja (jam:menit)
export const formatWaktuID = (timestamp) => {
  const d = parseToDate(timestamp);
  if (!d) return '-';
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Hitung total poin dari daftar sampah
export const hitungTotalPoin = (daftarSampah) => {
  if (!Array.isArray(daftarSampah)) return 0;
  return daftarSampah.reduce(
    (total, item) => total + (item.poin_sampah || 0),
    0
  );
};

// Definisi langkah-langkah timeline penjemputan
export const daftarLangkahStatus = [
  {
    key: 'menunggu',
    label: 'Menunggu Kurir',
    description: 'Permintaan berhasil dibuat',
    timeKey: 'waktu_ditambah',
  },
  {
    key: 'dijemput',
    label: 'Dijemput Kurir',
    description: 'Kurir mengambil barang',
    timeKey: 'waktu_dijemput',
  },
  {
    key: 'diantar',
    label: 'Diantar ke Dropbox',
    description: 'Barang diantar ke dropbox',
    timeKey: 'waktu_diantar',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    description: 'Penjemputan selesai',
    timeKey: 'waktu_sampai',
  },
  {
    key: 'dibatalkan',
    label: 'Dibatalkan',
    description: 'Penjemputan dibatalkan',
    timeKey: 'waktu_dibatalkan',
  },
];

// Bangun timeline dari data penjemputan
export const buatTimelinePenjemputan = (penjemputan) => {
  if (!penjemputan) return [];

  const timeline = [];

  if (penjemputan.waktu_ditambah) {
    timeline.push({
      status: 'Menunggu Kurir',
      deskripsi: 'Permintaan berhasil dibuat',
      waktu: penjemputan.waktu_ditambah,
      aktif: true,
    });
  }

  if (penjemputan.waktu_diterima || penjemputan.waktu_dijemput) {
    timeline.push({
      status: 'Dijemput Kurir',
      deskripsi: 'Kurir mengambil barang',
      waktu: penjemputan.waktu_diterima || penjemputan.waktu_dijemput,
      aktif: true,
    });
  }

  if (penjemputan.waktu_diantar) {
    timeline.push({
      status: 'Diantar ke Dropbox',
      deskripsi: 'Barang diantar ke dropbox',
      waktu: penjemputan.waktu_diantar,
      aktif: true,
    });
  }

  if (penjemputan.waktu_sampai) {
    timeline.push({
      status: 'Selesai',
      deskripsi: 'Penjemputan selesai',
      waktu: penjemputan.waktu_sampai,
      aktif: true,
    });
  }

  if (penjemputan.waktu_dibatalkan) {
    timeline.push({
      status: 'Dibatalkan',
      deskripsi: 'Penjemputan dibatalkan',
      waktu: penjemputan.waktu_dibatalkan,
      aktif: true,
    });
  }

  return timeline;
};

export const mapStatusLabel = (status) => {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'menunggu':
      return 'Menunggu Kurir';
    case 'diproses':
      return 'Menunggu Kurir'; // mapping ke label frontend
    case 'diterima':
      return 'Dijemput Kurir';
    case 'dijemput':
      return 'Diantar ke Dropbox';
    case 'selesai':
      return 'Selesai';
    case 'dibatalkan':
      return 'Dibatalkan';
    default:
      return status || '-';
  }
};

// Cek status aktif
export const isStatusAktif = (status) => {
  const s = (status || '').toLowerCase();
  return [
    'menunggu kurir',
    'dijemput kurir',
    'diantar ke dropbox',
    'diproses',
    'diterima',
  ].includes(s);
};

// Cek status final
export const isStatusFinal = (status) => {
  const s = (status || '').toLowerCase();
  return ['selesai', 'dibatalkan'].includes(s);
};

//  Map status ke class warna untuk badge
export const warnaStatusBadge = (status) => {
  const warnaMap = {
    Selesai:
      'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    Dibatalkan: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
    'Diantar ke Dropbox':
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300',
    'Dijemput Kurir':
      'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
    'Menunggu Kurir':
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
  };

  return (
    warnaMap[status] ||
    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  );
};
