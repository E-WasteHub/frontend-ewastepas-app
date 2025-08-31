// src/hooks/useLacakPenjemputan.js
import { useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../services/penjemputanService';
import { mapStatus } from '../utils/penjemputanUtils.js';

const useLacakPenjemputan = () => {
  const [permintaan, setPermintaan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await ambilRiwayatPenjemputan();
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        // 🔹 ambil detail untuk hitung poin saja
        const detailPromises = list.map(async (p) => {
          try {
            const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
            const poin = detailRes.sampah?.reduce(
              (total, s) => total + (s.poin_sampah || 0),
              0
            );
            return {
              id: p.id_penjemputan,
              kode: p.kode_penjemputan,
              alamat: p.alamat_jemput,
              status: mapStatus(p),
              waktu: p.waktu_ditambah,
              kurir: p.nama_kurir || 'Belum ditentukan',
              poin,
            };
          } catch (err) {
            console.error('❌ Gagal ambil detail poin:', err);
            return null;
          }
        });

        const mapped = (await Promise.all(detailPromises)).filter(Boolean);
        setPermintaan(mapped);
      } catch (err) {
        console.error('❌ Error fetch daftar penjemputan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { permintaan, loading };
};

export default useLacakPenjemputan;
