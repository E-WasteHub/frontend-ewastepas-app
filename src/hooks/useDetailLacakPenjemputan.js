// src/hooks/useDetailLacakPenjemputan.js
import { useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  batalPenjemputan,
} from '../services/penjemputanService';

/* ===============================
   📌 Mapping status penjemputan
================================= */
export const statusSteps = [
  { key: 'menunggu', label: 'Menunggu Kurir' },
  { key: 'dijemput', label: 'Dijemput Kurir' },
  { key: 'diantar', label: 'Diantar ke Dropbox' },
  { key: 'selesai', label: 'Selesai' },
];

export const getStatusStep = (p) => {
  if (!p) return 0;
  if (p.waktu_dibatalkan) return -1;
  if (p.waktu_sampai) return 3;
  if (p.waktu_diantar) return 2;
  if (p.waktu_dijemput || p.waktu_diterima) return 1;
  return 0;
};

/* ===============================
   📌 Custom Hook: useDetailLacakPenjemputan
================================= */
const useDetailLacakPenjemputan = (id_penjemputan) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await ambilDetailPenjemputan(id_penjemputan);

        if (res?.data) {
          setDetail(res.data);
          setCurrentStatus(getStatusStep(res.data.penjemputan));
        } else {
          setDetail(null);
        }
      } catch (err) {
        console.error('❌ Gagal ambil detail penjemputan:', err);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    if (id_penjemputan) {
      fetchDetail();
    }
  }, [id_penjemputan]);

  // 🔹 Batalkan penjemputan
  const handleBatalkan = async () => {
    try {
      await batalPenjemputan(id_penjemputan, {
        status: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      return true; // sukses
    } catch (err) {
      console.error('❌ Gagal batalkan:', err);
      return false;
    }
  };

  return { detail, loading, currentStatus, handleBatalkan };
};

export default useDetailLacakPenjemputan;
