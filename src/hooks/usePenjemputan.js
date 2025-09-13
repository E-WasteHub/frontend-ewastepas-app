// src/hooks/usePenjemputan.js
import { useEffect, useRef, useState } from 'react';
import * as penjemputanService from '../services/penjemputanService';
import {
  hitungEstimasiPoin,
  hitungTotalJumlahSampah,
} from '../utils/penjemputanUtils';
import useToast from './useToast';

const usePenjemputan = ({ showAlert }) => {
  /* -------------------------------------------------------------------------- */
  /*                                 STATE DATA                                 */
  /* -------------------------------------------------------------------------- */

  // master data (kategori, jenis, waktu operasional)
  const [kategoriList, setKategoriList] = useState([]);
  const [jenisList, setJenisList] = useState([]);
  const [waktuOperasionalList, setWaktuOperasionalList] = useState([]);

  // daftar sampah yang ditambahkan user
  const [daftarSampah, setDaftarSampah] = useState([]);

  // modal tambah sampah
  const [isModalOpen, setIsModalOpen] = useState(false);

  // input sementara untuk modal/form
  const [draftSampah, setDraftSampah] = useState({
    id_kategori: '',
    id_jenis: '',
    jumlah_sampah: '',
    catatan_sampah: '',
    file: null,
    previewUrl: null,
  });

  // file input ref (untuk upload foto)
  const fileInputRef = useRef(null);

  // toast/alert
  const toast = useToast();
  const alertFn = showAlert || toast.showAlert;

  /* -------------------------------------------------------------------------- */
  /*                               FETCHING DATA                                */
  /* -------------------------------------------------------------------------- */

  // ambil kategori + waktu operasional
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori();
        if (!active) return;
        setKategoriList(res?.data?.kategori || []);
        setWaktuOperasionalList(res?.data?.waktu_operasional || []);
      } catch (err) {
        console.error('❌ Gagal fetch kategori/waktu:', err);
        alertFn('Error', 'Gagal memuat data awal', 'error');
      }
    })();
    return () => {
      active = false;
    };
  }, [alertFn]);

  // ambil jenis sampah saat kategori berubah
  useEffect(() => {
    if (!draftSampah.id_kategori) return;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori(
          draftSampah.id_kategori
        );
        setJenisList(res?.data?.jenis || []);
      } catch (err) {
        console.error('❌ Gagal fetch jenis sampah:', err);
        alertFn('Error', 'Gagal memuat jenis sampah', 'error');
      }
    })();
  }, [draftSampah.id_kategori, alertFn]);

  /* -------------------------------------------------------------------------- */
  /*                                  HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  // tambah sampah ke daftar
  const addSampah = () => {
    if (
      !draftSampah.id_kategori ||
      !draftSampah.id_jenis ||
      !draftSampah.jumlah_sampah
    ) {
      alertFn('Peringatan', 'Lengkapi data sampah terlebih dahulu', 'warning');
      return;
    }

    const kategori = kategoriList.find(
      (k) => Number(k.id_kategori) === Number(draftSampah.id_kategori)
    );
    const jenis = jenisList.find(
      (j) => Number(j.id_jenis) === Number(draftSampah.id_jenis)
    );

    const newSampah = {
      id: Date.now(),
      id_kategori: String(draftSampah.id_kategori),
      nama_kategori: kategori?.nama_kategori || 'Kategori',
      poin_per_unit: kategori?.poin_kategori || 0,
      id_jenis: String(draftSampah.id_jenis),
      nama_jenis: jenis?.nama_jenis || 'Jenis',
      jumlah_sampah: Number(draftSampah.jumlah_sampah),
      catatan_sampah: draftSampah.catatan_sampah || '',
      file: draftSampah.file,
      previewUrl: draftSampah.previewUrl,
    };

    setDaftarSampah((prev) => [...prev, newSampah]);
    alertFn('Berhasil', 'Sampah ditambahkan.', 'success');

    // reset draft
    setDraftSampah({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      file: null,
      previewUrl: null,
    });
  };

  // hapus sampah dari daftar
  const removeSampah = (id) => {
    setDaftarSampah((prev) => prev.filter((s) => s.id !== id));
  };

  // trigger upload foto
  const triggerUploadFoto = (id) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.dataset.id = id;
    fileInputRef.current.click();
  };

  // saat user pilih file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const id = fileInputRef.current?.dataset?.id;
    if (!file || !id) return;

    setDaftarSampah((prev) =>
      prev.map((s) =>
        String(s.id) === String(id)
          ? { ...s, file, previewUrl: URL.createObjectURL(file) }
          : s
      )
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                  UTILITIES                                 */
  /* -------------------------------------------------------------------------- */

  // hitung total
  const totalJumlah = hitungTotalJumlahSampah(daftarSampah);
  const estimasiPoin = hitungEstimasiPoin(daftarSampah);

  // bentuk FormData untuk dikirim ke backend
  const buildFormData = (formData) => {
    const fd = new FormData();

    // field utama
    fd.append(
      'id_waktu_operasional',
      String(formData.id_waktu_operasional || '')
    );
    fd.append('alamat_penjemputan', formData.alamat_penjemputan || '');
    fd.append('catatan', formData.catatan || '');

    // data sampah
    const sampahData = daftarSampah.map((s) => ({
      id_kategori: s.id_kategori,
      id_jenis: s.id_jenis,
      jumlah_sampah: s.jumlah_sampah,
      catatan_sampah: s.catatan_sampah,
    }));
    fd.append('sampah', JSON.stringify(sampahData));

    // file upload dengan placeholder
    daftarSampah.forEach((s) => {
      if (s.file instanceof File) {
        fd.append('gambar', s.file);
      } else {
        // placeholder kosong agar tidak geser
        fd.append('gambar', new Blob([], { type: 'image/png' }), 'empty.png');
      }
    });

    return fd;
  };

  // reset daftar sampah dan draft
  const resetSampah = () => {
    setDaftarSampah([]);
    setDraftSampah({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      file: null,
      previewUrl: null,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                RETURN VALUE                                */
  /* -------------------------------------------------------------------------- */

  return {
    // state
    kategoriList,
    jenisList,
    waktuOperasionalList,
    daftarSampah,
    draftSampah,
    isModalOpen,
    totalJumlah,
    estimasiPoin,
    fileInputRef,

    // setter
    setDraftSampah,
    setIsModalOpen,
    setDaftarSampah,

    // action
    addSampah,
    removeSampah,
    triggerUploadFoto,
    handleFileChange,
    resetSampah,

    // utils
    buildFormData,
  };
};

export default usePenjemputan;
