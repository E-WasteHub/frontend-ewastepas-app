// src/hooks/kurir/usePermintaanAktifKurir.js
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  updatePenjemputan,
} from '../../services/penjemputanService';
import {
  buatTimelinePenjemputan,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';

/**
 * Hook untuk mengelola permintaan penjemputan aktif bagi Mitra Kurir
 * - Cari permintaan aktif (status: Diterima / Diantar, belum selesai / belum dibatalkan)
 * - Ambil detail permintaan aktif
 * - Update status penjemputan
 */
const usePermintaanAktifKurir = () => {
  const location = useLocation();

  const [permintaanAktif, setPermintaanAktif] = useState(null); // data permintaan aktif
  const [detailPenjemputan, setDetailPenjemputan] = useState(null); // detail penjemputan aktif
  const [isLoading, setIsLoading] = useState(true);
  const [pesanError, setPesanError] = useState('');

  // ✅ Ambil permintaan aktif
  const ambilPermintaanAktif = useCallback(async () => {
    try {
      setIsLoading(true);
      setPesanError('');

      // Ambil semua riwayat penjemputan
      const res = await ambilRiwayatPenjemputan();
      const daftar = Array.isArray(res.data)
        ? res.data
        : res.data?.penjemputan || [];

      // Filter permintaan yang aktif (status "Dijemput" atau "Diantar ke Dropbox")
      const daftarAktif = daftar.filter(
        (p) =>
          !p.waktu_dibatalkan &&
          !p.waktu_sampai &&
          (p.waktu_diterima || p.waktu_diantar)
      );

      let aktif = daftarAktif[0] || null;

      // fallback dari location.state atau localStorage
      if (!aktif) {
        const fallbackId =
          location.state?.fallbackActiveId ||
          localStorage.getItem('recentlyTakenRequest');
        if (fallbackId) {
          const ditemukan = daftar.find(
            (p) => (p.id_penjemputan ?? p.id)?.toString() === fallbackId
          );
          if (ditemukan) {
            aktif = ditemukan;
          }
        }
      }

      if (aktif) {
        setPermintaanAktif({ ...aktif, status: statusPenjemputan(aktif) });

        // Ambil detail untuk permintaan aktif
        const idAktif = aktif.id_penjemputan ?? aktif.id;
        const detailRes = await ambilDetailPenjemputan(idAktif);

        const dataDetail = {
          sampah:
            detailRes.data?.sampah?.map((s) => ({
              id_sampah: s.id_sampah,
              kategori: s.nama_kategori,
              jenis: s.nama_jenis,
              jumlah: s.jumlah_sampah,
              catatan: s.catatan_sampah || null,
              poin: s.poin_sampah || 0,
            })) || [],
          catatanMasyarakat: detailRes.data?.penjemputan.catatan || null,
          waktuOperasional: detailRes.data?.penjemputan.waktu_operasional,
          timeline: buatTimelinePenjemputan(detailRes.data.penjemputan),
          totalPoin: hitungTotalPoin(detailRes.data?.sampah),
        };

        setDetailPenjemputan(dataDetail);

        // hapus fallback kalau sudah kepakai
        const fallbackId =
          location.state?.fallbackActiveId ||
          localStorage.getItem('recentlyTakenRequest');
        if (
          fallbackId &&
          fallbackId.toString() ===
            (aktif.id_penjemputan ?? aktif.id)?.toString()
        ) {
          localStorage.removeItem('recentlyTakenRequest');
        }
      } else {
        setPermintaanAktif(null);
        setDetailPenjemputan(null);
      }
    } catch (err) {
      console.error('❌ Gagal ambil permintaan aktif', err);
      setPesanError('Gagal memuat permintaan aktif');
    } finally {
      setIsLoading(false);
    }
  }, [location.state?.fallbackActiveId]);

  // ✅ Update status permintaan aktif
  const ubahStatusPenjemputan = async (aksi) => {
    try {
      const idAktif = permintaanAktif?.id_penjemputan ?? permintaanAktif?.id;
      if (!idAktif) return;

      let statusBaru = '';
      let deskripsi = '';

      if (aksi === 'Dijemput') {
        statusBaru = 'Diantar ke Dropbox';
        deskripsi = 'Kurir menuju atau berada di dropbox';
      } else if (aksi === 'Sampai') {
        statusBaru = 'Selesai';
        deskripsi = 'Kurir telah setor sampah';
      } else if (aksi === 'Dibatalkan') {
        statusBaru = 'Dibatalkan';
        deskripsi = 'Penjemputan dibatalkan';
      }

      await updatePenjemputan(idAktif, {
        status: statusBaru,
        [`waktu_${statusBaru.toLowerCase().replace(/\s+/g, '_')}`]:
          new Date().toISOString(),
      });

      // Update state lokal agar UI langsung berubah
      if (statusBaru === 'Selesai' || statusBaru === 'Dibatalkan') {
        setPermintaanAktif(null);
        setDetailPenjemputan(null);
      } else {
        setPermintaanAktif((prev) => ({ ...prev, status: statusBaru }));
        setDetailPenjemputan((prev) => ({
          ...prev,
          timeline: [
            ...(prev?.timeline || []),
            { status: statusBaru, deskripsi, waktu: new Date().toISOString() },
          ],
        }));
      }

      return true; // sukses
    } catch (err) {
      console.error('❌ Gagal update status penjemputan', err);
      setPesanError('Gagal update status penjemputan');
      return false;
    }
  };

  // ✅ Ambil data saat pertama kali masuk halaman
  useEffect(() => {
    ambilPermintaanAktif();
  }, [ambilPermintaanAktif]);

  return {
    permintaanAktif,
    detailPenjemputan,
    isLoading,
    pesanError,
    ubahStatusPenjemputan,
    refetch: ambilPermintaanAktif,
  };
};

export default usePermintaanAktifKurir;
