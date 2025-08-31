// src/hooks/masyarakat/useDetailRiwayatMasyarakat.js
import { useEffect, useState } from 'react';
import { ambilDetailPenjemputan } from '../../services/penjemputanService';

const useDetailRiwayatMasyarakat = (id_penjemputan) => {
  const [detailRiwayat, setDetailRiwayat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const res = await ambilDetailPenjemputan(id_penjemputan);
        console.log('📥 RESPONSE DETAIL RIWAYAT:', res);

        const status = res?.data?.penjemputan?.status_penjemputan;
        if (status && ['Selesai', 'Dibatalkan'].includes(status)) {
          setDetailRiwayat(res.data);
        } else {
          setDetailRiwayat(undefined);
        }
      } catch (err) {
        console.error('❌ Gagal ambil detail riwayat:', err);
        setDetailRiwayat(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    if (id_penjemputan) fetchDetail();
  }, [id_penjemputan]);

  return { detailRiwayat, isLoading };
};

export default useDetailRiwayatMasyarakat;
