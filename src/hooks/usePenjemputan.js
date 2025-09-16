// src/hooks/usePenjemputan.js
import { useEffect, useRef, useState } from 'react';
import * as penjemputanService from '../services/penjemputanService';
import { ambilPesanError } from '../utils/errorUtils';
import {
  hitungEstimasiPoin,
  hitungTotalJumlahSampah,
} from '../utils/penjemputanUtils';
import useToast from './useToast';

const usePenjemputan = ({ showAlert }) => {
  // master data
  const [kategoriList, setKategoriList] = useState([]);
  const [jenisList, setJenisList] = useState([]);
  const [waktuOperasionalList, setWaktuOperasionalList] = useState([]);

  // daftar sampah user
  const [daftarSampah, setDaftarSampah] = useState([]);

  // modal tambah sampah
  const [isModalOpen, setIsModalOpen] = useState(false);

  // input sementara untuk modal/form
  const [sampahSementara, setSampahSementara] = useState({
    id_kategori: '',
    id_jenis: '',
    jumlah_sampah: '',
    catatan_sampah: '',
    file: null,
    previewUrl: null,
  });

  // file input ref
  const fileInputRef = useRef(null);

  // toast/alert
  const toast = useToast();
  const tampilkanAlert = showAlert || toast.showAlert;

  // load kategori & waktu operasional
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori();
        if (!active) return;
        setKategoriList(res?.data?.kategori || []);
        setWaktuOperasionalList(res?.data?.waktu_operasional || []);
      } catch (err) {
        tampilkanAlert(
          'Error',
          ambilPesanError(err, 'Gagal memuat data awal'),
          'error'
        );
      }
    })();
    return () => {
      active = false;
    };
  }, [tampilkanAlert]);

  // load jenis sampah ketika kategori dipilih
  useEffect(() => {
    if (!sampahSementara.id_kategori) return;
    (async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori(
          sampahSementara.id_kategori
        );
        setJenisList(res?.data?.jenis || []);
      } catch (err) {
        tampilkanAlert(
          'Error',
          ambilPesanError(err, 'Gagal memuat jenis sampah'),
          'error'
        );
      }
    })();
  }, [sampahSementara.id_kategori, tampilkanAlert]);

  // tambah sampah ke daftar
  const tambahSampah = () => {
    if (
      !sampahSementara.id_kategori ||
      !sampahSementara.id_jenis ||
      !sampahSementara.jumlah_sampah
    ) {
      tampilkanAlert(
        'Peringatan',
        'Lengkapi data sampah terlebih dahulu',
        'warning'
      );
      return;
    }

    const kategori = kategoriList.find(
      (k) => Number(k.id_kategori) === Number(sampahSementara.id_kategori)
    );
    const jenis = jenisList.find(
      (j) => Number(j.id_jenis) === Number(sampahSementara.id_jenis)
    );

    const newSampah = {
      id: Date.now(),
      id_kategori: String(sampahSementara.id_kategori),
      nama_kategori: kategori?.nama_kategori || 'Kategori',
      poin_per_unit: kategori?.poin_kategori || 0,
      id_jenis: String(sampahSementara.id_jenis),
      nama_jenis: jenis?.nama_jenis || 'Jenis',
      jumlah_sampah: Number(sampahSementara.jumlah_sampah),
      catatan_sampah: sampahSementara.catatan_sampah || '',
      file: sampahSementara.file,
      previewUrl: sampahSementara.previewUrl,
    };

    setDaftarSampah((prev) => [...prev, newSampah]);
    tampilkanAlert('Berhasil', 'Sampah ditambahkan', 'success');

    // reset input sementara
    setSampahSementara({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      file: null,
      previewUrl: null,
    });
  };

  // hapus sampah dari daftar
  const hapusSampah = (id) => {
    setDaftarSampah((prev) => prev.filter((s) => s.id !== id));
  };

  // buka input file untuk upload foto
  const bukaUploadFoto = (id) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.dataset.id = id;
    fileInputRef.current.click();
  };

  // handle ketika user pilih file
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

  // total jumlah dan estimasi poin
  const totalJumlah = hitungTotalJumlahSampah(daftarSampah);
  const estimasiPoin = hitungEstimasiPoin(daftarSampah);

  // bentuk formData untuk backend
  const buatFormData = (formData) => {
    const fd = new FormData();

    fd.append(
      'id_waktu_operasional',
      String(formData.id_waktu_operasional || '')
    );
    fd.append('alamat_penjemputan', formData.alamat_penjemputan || '');
    fd.append('catatan', formData.catatan || '');

    const sampahData = daftarSampah.map((s) => ({
      id_kategori: s.id_kategori,
      id_jenis: s.id_jenis,
      jumlah_sampah: s.jumlah_sampah,
      catatan_sampah: s.catatan_sampah,
    }));
    fd.append('sampah', JSON.stringify(sampahData));

    daftarSampah.forEach((s) => {
      if (s.file instanceof File) {
        fd.append('gambar', s.file);
      } else {
        fd.append('gambar', new Blob([], { type: 'image/png' }), 'empty.png');
      }
    });

    return fd;
  };

  // reset daftar sampah
  const resetSampah = () => {
    setDaftarSampah([]);
    setSampahSementara({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      file: null,
      previewUrl: null,
    });
  };

  return {
    // state
    kategoriList,
    jenisList,
    waktuOperasionalList,
    daftarSampah,
    sampahSementara,
    isModalOpen,
    totalJumlah,
    estimasiPoin,
    fileInputRef,

    // setter
    setSampahSementara,
    setIsModalOpen,
    setDaftarSampah,

    // actions
    tambahSampah,
    hapusSampah,
    bukaUploadFoto,
    handleFileChange,
    resetSampah,

    // utils
    buatFormData,
  };
};

export default usePenjemputan;
