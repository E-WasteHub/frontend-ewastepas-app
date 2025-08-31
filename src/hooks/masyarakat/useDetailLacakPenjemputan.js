// src/hooks/masyarakat/useDetailLacakPenjemputan.js
import { useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  batalPenjemputan,
} from '../../services/penjemputanService';
import { langkahStatusPenjemputan } from '../../utils/penjemputanUtils';

const useDetailLacakPenjemputan = (id_penjemputan) => {
  const [detailPenjemputan, setDetailPenjemputan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [langkahAktif, setLangkahAktif] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const res = await ambilDetailPenjemputan(id_penjemputan);

        if (res?.data) {
          setDetailPenjemputan(res.data);
          setLangkahAktif(langkahStatusPenjemputan(res.data.penjemputan));
        } else {
          setDetailPenjemputan(null);
        }
      } catch (err) {
        console.error('❌ Gagal ambil detail penjemputan:', err);
        setDetailPenjemputan(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id_penjemputan) {
      fetchDetail();
    }
  }, [id_penjemputan]);

  // Handler untuk membatalkan penjemputan
  const batalkanPenjemputan = async () => {
    try {
      await batalPenjemputan(id_penjemputan, {
        status: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error('❌ Gagal membatalkan:', err);
      return false;
    }
  };

  return {
    detailPenjemputan,
    isLoading,
    langkahAktif,
    batalkanPenjemputan,
  };
};

export default useDetailLacakPenjemputan;
