// src/hooks/usePenjemputan.js
import { useEffect, useRef, useState } from 'react';
import * as penjemputanService from '../services/penjemputanService';
import {
  hitungEstimasiPoin,
  hitungTotalJumlahSampah,
} from '../utils/penjemputanUtils';
import useToast from './useToast';

const usePenjemputan = ({ showAlert }) => {
  // master data
  const [kategoriData, setKategoriData] = useState([]);
  const [jenisData, setJenisData] = useState([]);
  const [waktuOperasional, setWaktuOperasional] = useState([]);

  // daftar sampah
  const [daftarSampah, setDaftarSampah] = useState([]);

  // modal tambah sampah
  const [isModalOpen, setIsModalOpen] = useState(false);

  // input sementara
  const [tempSampah, setTempSampah] = useState({
    id_kategori: '',
    id_jenis: '',
    jumlah_sampah: '',
    catatan_sampah: '',
    gambar: null,
    previewUrl: null,
  });

  // file ref
  const fileInputRef = useRef(null);

  // ✅ Toast hook untuk mengganti alert jika tidak ada showAlert dari parent
  const toast = useToast();
  const alertFunction = showAlert || toast.showAlert;

  // fetch kategori & waktu
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori();
        if (!isMounted) return;
        setKategoriData(res?.data?.kategori || []);
        setWaktuOperasional(res?.data?.waktu_operasional || []);
      } catch (err) {
        console.error('❌ Gagal fetch awal:', err);
        alertFunction('Error', 'Gagal memuat data awal', 'error');
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [alertFunction]);

  // fetch jenis saat kategori berubah
  useEffect(() => {
    if (!tempSampah.id_kategori) return;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori(
          tempSampah.id_kategori
        );
        setJenisData(res?.data?.jenis || []);
      } catch (err) {
        console.error('❌ Gagal fetch jenis:', err);
        alertFunction('Error', 'Gagal memuat jenis sampah', 'error');
      }
    })();
  }, [tempSampah.id_kategori, alertFunction]);

  // tambah sampah
  const handleTambahSampah = () => {
    if (
      !tempSampah.id_kategori ||
      !tempSampah.id_jenis ||
      !tempSampah.jumlah_sampah
    ) {
      alertFunction(
        'Peringatan',
        'Lengkapi data sampah terlebih dahulu',
        'warning'
      );
      return;
    }

    const kategori = kategoriData.find(
      (k) => Number(k.id_kategori) === Number(tempSampah.id_kategori)
    );
    const jenis = jenisData.find(
      (j) => Number(j.id_jenis) === Number(tempSampah.id_jenis)
    );

    const newSampah = {
      id: Date.now(),
      id_kategori: tempSampah.id_kategori,
      nama_kategori_sampah: kategori?.nama_kategori || 'Kategori',
      poin_per_unit: kategori?.poin_kategori || 0,
      id_jenis: tempSampah.id_jenis,
      nama_jenis_sampah: jenis?.nama_jenis || 'Jenis',
      jumlah_sampah: Number(tempSampah.jumlah_sampah),
      catatan_sampah: tempSampah.catatan_sampah,
      gambar: tempSampah.gambar,
      previewUrl: tempSampah.previewUrl,
    };

    setDaftarSampah((prev) => [...prev, newSampah]);
    alertFunction('Berhasil', 'Sampah ditambahkan.', 'success');

    setTempSampah({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      gambar: null,
      previewUrl: null,
    });
  };

  // hapus sampah
  const handleHapusSampah = (id) => {
    setDaftarSampah((prev) => prev.filter((s) => s.id !== id));
  };

  // upload foto
  const handleUploadFoto = (id) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.dataset.id = id;
    fileInputRef.current.click();
  };

  // saat file dipilih
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const id = fileInputRef.current?.dataset?.id;
    if (!file || !id) return;

    setDaftarSampah((prev) =>
      prev.map((s) =>
        String(s.id) === String(id)
          ? { ...s, gambar: file, previewUrl: URL.createObjectURL(file) }
          : s
      )
    );
  };

  // total jumlah & poin menggunakan utils
  const totalJumlah = hitungTotalJumlahSampah(daftarSampah);
  const estimasiPoin = hitungEstimasiPoin(daftarSampah);

  return {
    // state
    kategoriData,
    jenisData,
    waktuOperasional,
    daftarSampah,
    tempSampah,
    isModalOpen,
    totalJumlah,
    estimasiPoin,
    fileInputRef,

    // setter
    setTempSampah,
    setIsModalOpen,
    setDaftarSampah,

    // action
    handleTambahSampah,
    handleHapusSampah,
    handleUploadFoto,
    handleFileChange,
  };
};

export default usePenjemputan;
