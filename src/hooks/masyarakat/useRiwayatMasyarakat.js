// src/hooks/masyarakat/useRiwayatMasyarakat.js
import { useCallback, useEffect, useState } from 'react';
import { ambilRiwayatPenjemputan } from '../../services/penjemputanService';
import {
  formatTanggalID,
  hitungTotalPoin,
  mapStatusLabel,
} from '../../utils/penjemputanUtils';

/**
 * Hook untuk mengelola riwayat penjemputan masyarakat.
 * - Hanya menampilkan penjemputan dengan status "Selesai" / "Dibatalkan"
 * - Mendukung refresh data
 */
const useRiwayatMasyarakat = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  const ambilData = useCallback(async () => {
    try {
      setSedangMemuat(true);

      const res = await ambilRiwayatPenjemputan();
      console.log('📥 RESPONSE RIWAYAT:', res);

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.penjemputan || [];

      const dataTersusun = list
        // 🔹 Filter dulu: hanya ambil status final dari backend
        .filter((p) =>
          ['selesai', 'dibatalkan'].includes(
            (p.status_penjemputan || '').toLowerCase()
          )
        )
        // 🔹 Baru mapping ke format frontend
        .map((p) => ({
          id: p.id_penjemputan,
          kode: p.kode_penjemputan,
          alamat: p.alamat_penjemputan,
          status: mapStatusLabel(p.status_penjemputan),
          waktu: formatTanggalID(p.waktu_ditambah),
          kurir: p.nama_kurir || 'Belum ditentukan',
          poin: p.poin_penjemputan || hitungTotalPoin(p.sampah),
          catatan: p.catatan || '-',
        }));

      setRiwayat(dataTersusun);
    } catch (err) {
      console.error('❌ Gagal ambil riwayat:', err);
      setRiwayat([]);
    } finally {
      setSedangMemuat(false);
    }
  }, []);

  useEffect(() => {
    ambilData();
  }, [ambilData]);

  return {
    riwayat,
    sedangMemuat,
    refetch: ambilData,
  };
};

export default useRiwayatMasyarakat;
