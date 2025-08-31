// src/hooks/masyarakat/useLacakPenjemputan.js
import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../services/penjemputanService';
import {
  formatTanggalWaktuID,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';

// src/hooks/masyarakat/useLacakPenjemputan.js
const useLacakPenjemputan = () => {
  const [daftarPenjemputan, setDaftarPenjemputan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ambilData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await ambilRiwayatPenjemputan();
      const list = Array.isArray(res.data)
        ? res.data
        : res.data.penjemputan || [];

      const detailPromises = list.map(async (p) => {
        try {
          const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
          return {
            id: p.id_penjemputan,
            kode: p.kode_penjemputan,
            alamat: p.alamat_penjemputan,
            status: statusPenjemputan(p),
            waktu: formatTanggalWaktuID(p.waktu_ditambah),
            kurir: p.nama_kurir || 'Belum ditentukan',
            poin: hitungTotalPoin(detailRes.data?.sampah),
          };
        } catch {
          return null;
        }
      });

      const mapped = (await Promise.all(detailPromises)).filter(Boolean);

      // ✅ hanya simpan status yang masih aktif
      const aktifOnly = mapped.filter((p) =>
        ['Menunggu Kurir', 'Dijemput Kurir', 'Diantar ke Dropbox'].includes(
          p.status
        )
      );

      setDaftarPenjemputan(aktifOnly);
    } catch (err) {
      console.error('❌ Gagal ambil daftar penjemputan:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ambilData();
  }, [ambilData]);

  return { daftarPenjemputan, isLoading, refetch: ambilData };
};
export default useLacakPenjemputan;
