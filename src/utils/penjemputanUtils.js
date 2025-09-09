// src/utils/penjemputanUtils.js

// Daftar langkah status penjemputan
export const daftarLangkahStatus = [
  {
    key: 'diproses',
    label: 'Menunggu Kurir',
    description: 'Menunggu diterima oleh kurir',
    timeKey: 'waktu_ditambah',
    status: 'Diproses',
  },
  {
    key: 'diterima',
    label: 'Diterima',
    description: 'Kurir sedang menuju lokasi masyarakat',
    timeKey: 'waktu_diterima',
    status: 'Diterima',
  },
  {
    key: 'dijemput',
    label: 'Dijemput Kurir',
    description: 'Kurir sedang menuju dropbox',
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

// Dapatkan langkah aktif berdasarkan status penjemputan
export const dapatkanLangkahAktif = (penjemputan) => {
  if (!penjemputan) return 0;
  if (penjemputan.waktu_dibatalkan) return -1;
  if (penjemputan.waktu_selesai) return 3;
  if (penjemputan.waktu_dijemput) return 2;
  if (penjemputan.waktu_diterima) return 1;
  if (penjemputan.waktu_ditambah) return 0;
  return 0;
};

// Hitung total jumlah sampah dari daftar sampah
export const hitungTotalJumlahSampah = (daftarSampah) => {
  if (!Array.isArray(daftarSampah)) return 0;

  return daftarSampah.reduce((total, sampah) => {
    const jumlah = Number(sampah.jumlah_sampah) || 0;
    return total + jumlah;
  }, 0);
};

// Hitung estimasi poin dari daftar sampah
export const hitungEstimasiPoin = (daftarSampah) => {
  if (!Array.isArray(daftarSampah)) return 0;

  return daftarSampah.reduce((totalPoin, sampah) => {
    const jumlah = Number(sampah.jumlah_sampah) || 0;
    const poinPerUnit = Number(sampah.poin_per_unit) || 0;
    return totalPoin + jumlah * poinPerUnit;
  }, 0);
};

// Filter penjemputan berdasarkan status
export const filterPenjemputanByStatus = (daftarPenjemputan, status) => {
  if (!Array.isArray(daftarPenjemputan)) return [];

  return daftarPenjemputan.filter(
    (penjemputan) => penjemputan.status_penjemputan === status
  );
};

// Ambil data array dengan aman dari response API
export const ambilDataArrayAman = (response, keyData = 'data') => {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response[keyData])) return response[keyData];
  return [];
};

// Cari penjemputan berdasarkan ID
export const cariPenjemputanById = (daftarPenjemputan, idPenjemputan) => {
  if (!Array.isArray(daftarPenjemputan)) return null;

  return (
    daftarPenjemputan.find(
      (penjemputan) =>
        String(penjemputan.id_penjemputan) === String(idPenjemputan)
    ) || null
  );
};

// Update status penjemputan dalam daftar penjemputan
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

// Kelompokkan penjemputan berdasarkan status
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

// Hitung statistik penjemputan berdasarkan status
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
