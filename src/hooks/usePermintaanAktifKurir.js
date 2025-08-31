// src/hooks/usePermintaanAktifKurir.js
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  updatePenjemputan,
} from '../services/penjemputanService';

/**
 * Custom hook untuk mengelola permintaan aktif kurir.
 * - Fetch permintaan yang sedang aktif
 * - Handle update status penjemputan
 * - Manage timeline dan detail permintaan
 */
const usePermintaanAktifKurir = () => {
  const location = useLocation();

  // State utama
  const [permintaanAktif, setPermintaanAktif] = useState(null);
  const [detailPermintaan, setDetailPermintaan] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [pesanError, setPesanError] = useState('');

  // 🔹 Fungsi untuk menentukan status permintaan
  const tentukanStatus = (data) => {
    if (data.waktu_dibatalkan) return 'Dibatalkan';
    if (data.waktu_sampai) return 'Selesai';
    if (data.waktu_diterima && data.waktu_diantar) return 'Diantar';
    if (data.waktu_diterima) return 'Diterima';
    return 'Menunggu';
  };

  // 🔹 Ambil permintaan aktif dari riwayat
  const ambilPermintaanAktif = useCallback(async () => {
    try {
      setSedangMemuat(true);
      setPesanError('');

      // Ambil semua riwayat penjemputan
      const respons = await ambilRiwayatPenjemputan();
      const daftar = Array.isArray(respons) ? respons : respons?.data || [];

      // Filter sesuai kondisi yang kamu minta:
      // - waktu_dibatalkan harus null
      // - waktu_sampai harus null
      // - Case 1: ada waktu_diterima, belum ada waktu_diantar
      // - Case 2: ada waktu_diterima, ada waktu_diantar
      const daftarTersaring = daftar
        .filter((d) => {
          if (d.waktu_dibatalkan || d.waktu_sampai) return false;
          if (d.waktu_diterima && !d.waktu_diantar) return true; // case 1
          if (d.waktu_diterima && d.waktu_diantar) return true; // case 2
          return false;
        })
        .map((d) => ({ ...d, status: tentukanStatus(d) }));

      // Ambil permintaan aktif pertama
      let aktif = daftarTersaring[0] || null;

      // Jika tidak ada, coba fallback ke state / localStorage
      if (!aktif) {
        const fallbackId =
          location.state?.fallbackActiveId ||
          localStorage.getItem('recentlyTakenRequest');

        if (fallbackId) {
          const ditemukan = daftarTersaring.find(
            (d) => (d.id_penjemputan ?? d.id)?.toString() === fallbackId
          );
          if (ditemukan) {
            aktif = { ...ditemukan, status: 'Diterima' };
          }
        }
      }

      if (aktif) {
        setPermintaanAktif(aktif);

        // Hapus data fallback kalau sudah dipakai
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

        // Ambil detail permintaan aktif
        const idAktif = aktif.id_penjemputan ?? aktif.id;
        const responsDetail = await ambilDetailPenjemputan(idAktif);
        const d = responsDetail.data;

        const dataDetail = {
          items:
            responsDetail.sampah?.map((s) => ({
              id_sampah: s.id_sampah,
              nama_kategori: s.nama_kategori,
              nama_jenis: s.nama_jenis,
              jumlah_sampah: s.jumlah_sampah,
              catatan_sampah: s.catatan_sampah || null,
              poin_sampah: s.poin_sampah || 0,
            })) || [],
          catatanMasyarakat: d.catatan || null,
          waktuOperasional: d.waktu_operasional,
          timeline: [
            {
              status: 'Menunggu',
              desc: 'Permintaan berhasil dibuat',
              time: d.waktu_ditambah,
            },
            ...(d.waktu_diterima
              ? [
                  {
                    status: 'Diterima',
                    desc: 'Kurir menerima permintaan dan menuju lokasi',
                    time: d.waktu_diterima,
                  },
                ]
              : []),
            ...(d.waktu_diantar
              ? [
                  {
                    status: 'Diantar',
                    desc: 'Kurir menuju atau berada di dropbox',
                    time: d.waktu_diantar,
                  },
                ]
              : []),
            ...(d.waktu_sampai
              ? [
                  {
                    status: 'Selesai',
                    desc: 'Kurir telah setor sampah',
                    time: d.waktu_sampai,
                  },
                ]
              : []),
          ],
        };

        setDetailPermintaan(dataDetail);
      } else {
        setPermintaanAktif(null);
        setDetailPermintaan(null);
      }
    } catch (err) {
      console.error('❌ Gagal ambil permintaan aktif', err);
      setPesanError('Gagal memuat permintaan aktif');
    } finally {
      setSedangMemuat(false);
    }
  }, [location.state?.fallbackActiveId]);

  // 🔹 Update status penjemputan sesuai case
  const ubahStatusPenjemputan = async (aksi) => {
    console.log('Mengubah status penjemputan:', aksi);
    try {
      const idAktif = permintaanAktif?.id_penjemputan ?? permintaanAktif?.id;

      if (!idAktif) return;
      console.log('ID Aktif:', idAktif);

      let statusBaru = '';
      let deskripsi = '';

      if (aksi === 'Dijemput') {
        statusBaru = 'Diantar';
        deskripsi = 'Kurir menuju atau berada di dropbox';
      } else if (aksi === 'Sampai') {
        statusBaru = 'Sampai';
        deskripsi = 'Kurir telah setor sampah';
      } else if (aksi === 'Dibatalkan') {
        statusBaru = 'Dibatalkan';
        deskripsi = 'Penjemputan dibatalkan';
      }

      await updatePenjemputan(idAktif, { status: statusBaru });

      if (statusBaru === 'Sampai' || statusBaru === 'Dibatalkan') {
        alert(`✅ Penjemputan ${statusBaru.toLowerCase()}`);
        setPermintaanAktif(null);
        setDetailPermintaan(null);
      } else {
        // update status + timeline lokal
        setPermintaanAktif((prev) => ({ ...prev, status: statusBaru }));
        setDetailPermintaan((prev) => ({
          ...prev,
          timeline: [
            ...prev.timeline,
            {
              status: statusBaru,
              desc: deskripsi,
              time: new Date().toISOString(),
            },
          ],
        }));
      }
    } catch (err) {
      console.error('❌ Gagal update status penjemputan', err);
      setPesanError('Gagal update status penjemputan');
    }
  };

  // Jalankan saat pertama kali masuk halaman
  useEffect(() => {
    ambilPermintaanAktif();
  }, [ambilPermintaanAktif]);

  return {
    permintaanAktif,
    detailPermintaan,
    sedangMemuat,
    pesanError,
    ubahStatusPenjemputan,
    refetch: ambilPermintaanAktif,
  };
};

export default usePermintaanAktifKurir;
