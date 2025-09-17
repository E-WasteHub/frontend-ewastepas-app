// Utility untuk mendapatkan edukasi terbaru
export const edukasiTerbaru = (data, count = 4) => {
  if (!Array.isArray(data)) return [];

  return [...data]
    .sort((a, b) => {
      // Kalau ada waktu_tambah → pakai itu
      if (a.waktu_tambah && b.waktu_tambah) {
        return new Date(b.waktu_tambah) - new Date(a.waktu_tambah);
      }
      // Kalau tidak ada → fallback ke id_konten
      return (b.id_konten || 0) - (a.id_konten || 0);
    })
    .slice(0, count);
};

export default edukasiTerbaru;
