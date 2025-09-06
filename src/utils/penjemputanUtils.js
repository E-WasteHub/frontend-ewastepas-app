// src/utils/penjemputanUtils.js
// Utility khusus untuk fitur penjemputan

/**
 * 🔹 DAFTAR LANGKAH STATUS PENJEMPUTAN
 * Konstanta untuk step timeline penjemputan
 */
export const DAFTAR_LANGKAH_STATUS = [
  {
    key: 'diproses',
    label: 'Menunggu Kurir',
    description: 'Permintaan berhasil dibuat',
    timeKey: 'waktu_ditambah',
    status: 'Diproses',
  },
  {
    key: 'diterima',
    label: 'Diterima',
    description: 'Kurir menerima permintaan',
    timeKey: 'waktu_diterima',
    status: 'Diterima',
  },
  {
    key: 'dijemput',
    label: 'Dijemput Kurir',
    description: 'Kurir sampai di lokasi masyarakat',
    timeKey: 'waktu_dijemput',
    status: 'Dijemput',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    description: 'Sampah sudah disetor ke dropbox',
    timeKey: 'waktu_selesai',
    status: 'Selesai',
  },
  {
    key: 'dibatalkan',
    label: 'Dibatalkan',
    description: 'Penjemputan dibatalkan',
    timeKey: 'waktu_dibatalkan',
    status: 'Dibatalkan',
  },
];

/**
 * 🔹 DAPATKAN LANGKAH AKTIF
 * Menentukan langkah aktif berdasarkan field waktu penjemputan
 */
export const dapatkanLangkahAktif = (penjemputan) => {
  if (!penjemputan) return 0;
  if (penjemputan.waktu_dibatalkan) return -1;
  if (penjemputan.waktu_selesai) return 3;
  if (penjemputan.waktu_dijemput) return 2;
  if (penjemputan.waktu_diterima) return 1;
  if (penjemputan.waktu_ditambah) return 0;
  return 0;
};

/**
 * 🔹 HITUNG TOTAL JUMLAH SAMPAH
 * Menghitung total jumlah dari daftar sampah
 */
export const hitungTotalJumlahSampah = (daftarSampah) => {
  if (!Array.isArray(daftarSampah)) return 0;

  return daftarSampah.reduce((total, sampah) => {
    const jumlah = Number(sampah.jumlah_sampah) || 0;
    return total + jumlah;
  }, 0);
};

/**
 * 🔹 HITUNG ESTIMASI POIN
 * Menghitung estimasi poin dari daftar sampah
 */
export const hitungEstimasiPoin = (daftarSampah) => {
  if (!Array.isArray(daftarSampah)) return 0;

  return daftarSampah.reduce((totalPoin, sampah) => {
    const jumlah = Number(sampah.jumlah_sampah) || 0;
    const poinPerUnit = Number(sampah.poin_per_unit) || 0;
    return totalPoin + jumlah * poinPerUnit;
  }, 0);
};

/**
 * 🔹 FILTER PENJEMPUTAN BERDASARKAN STATUS
 * Filter daftar penjemputan berdasarkan status tertentu
 */
export const filterPenjemputanByStatus = (daftarPenjemputan, status) => {
  if (!Array.isArray(daftarPenjemputan)) return [];

  return daftarPenjemputan.filter(
    (penjemputan) => penjemputan.status_penjemputan === status
  );
};

/**
 * 🔹 AMBIL DATA ARRAY DENGAN AMAN
 * Safely extract array dari response API
 */
export const ambilDataArrayAman = (response, keyData = 'data') => {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response[keyData])) return response[keyData];
  return [];
};

/**
 * 🔹 CARI PENJEMPUTAN BERDASARKAN ID
 * Mencari penjemputan berdasarkan ID
 */
export const cariPenjemputanById = (daftarPenjemputan, idPenjemputan) => {
  if (!Array.isArray(daftarPenjemputan)) return null;

  return (
    daftarPenjemputan.find(
      (penjemputan) =>
        String(penjemputan.id_penjemputan) === String(idPenjemputan)
    ) || null
  );
};

/**
 * 🔹 UPDATE STATUS PENJEMPUTAN
 * Update status penjemputan dalam array
 */
export const updateStatusPenjemputan = (
  daftarPenjemputan,
  idPenjemputan,
  statusBaru,
  dataUpdate = {}
) => {
  if (!Array.isArray(daftarPenjemputan)) return [];

  return daftarPenjemputan.map((penjemputan) =>
    String(penjemputan.id_penjemputan) === String(idPenjemputan)
      ? { ...penjemputan, status_penjemputan: statusBaru, ...dataUpdate }
      : penjemputan
  );
};

/**
 * 🔹 KELOMPOKKAN PENJEMPUTAN BERDASARKAN STATUS
 * Mengelompokkan penjemputan berdasarkan status
 */
export const kelompokkanPenjemputanByStatus = (daftarPenjemputan) => {
  if (!Array.isArray(daftarPenjemputan)) return {};

  return daftarPenjemputan.reduce((grup, penjemputan) => {
    const status = penjemputan.status_penjemputan || 'Tidak Diketahui';
    if (!grup[status]) {
      grup[status] = [];
    }
    grup[status].push(penjemputan);
    return grup;
  }, {});
};

/**
 * 🔹 STATISTIK PENJEMPUTAN
 * Menghitung statistik dari daftar penjemputan
 */
export const hitungStatistikPenjemputan = (daftarPenjemputan) => {
  if (!Array.isArray(daftarPenjemputan)) {
    return {
      total: 0,
      diproses: 0,
      diterima: 0,
      dijemput: 0,
      selesai: 0,
      dibatalkan: 0,
    };
  }

  const stats = {
    total: daftarPenjemputan.length,
    diproses: 0,
    diterima: 0,
    dijemput: 0,
    selesai: 0,
    dibatalkan: 0,
  };

  daftarPenjemputan.forEach((penjemputan) => {
    const status = penjemputan.status_penjemputan?.toLowerCase();
    if (status === 'diproses') stats.diproses++;
    else if (status === 'diterima') stats.diterima++;
    else if (status === 'dijemput') stats.dijemput++;
    else if (status === 'selesai') stats.selesai++;
    else if (status === 'dibatalkan') stats.dibatalkan++;
  });

  return stats;
};

export default {
  hitungTotalJumlahSampah,
  hitungEstimasiPoin,
  filterPenjemputanByStatus,
  ambilDataArrayAman,
  cariPenjemputanById,
  updateStatusPenjemputan,
  kelompokkanPenjemputanByStatus,
  hitungStatistikPenjemputan,
};
