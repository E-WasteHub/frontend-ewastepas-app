// src/components/fragments/admincrud/JenisCrudModal.jsx
import { useEffect, useState } from 'react';
import * as kategoriService from '../../../services/kategoriService';
import { Button, InputForm, Modal, Select } from '../../elements';

const JenisCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Jenis',
  isLoading = false,
}) => {
  // State lokal untuk form
  const [jenisData, setjenisData] = useState({
    nama_jenis: '',
    deskripsi_jenis: '',
    id_kategori: '',
  });
  const [kategoriOptions, setKategoriOptions] = useState([]);

  // Ambil daftar kategori untuk dropdown
  useEffect(() => {
    const ambilKategori = async () => {
      try {
        const res = await kategoriService.ambilSemuaKategori();
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];
        setKategoriOptions(data);
      } catch (err) {
        console.error('Gagal mengambil kategori:', err);
      }
    };
    ambilKategori();
  }, []);

  // Isi ulang form jika ada initialData (mode edit)
  useEffect(() => {
    if (initialData) {
      setjenisData({
        nama_jenis: initialData.nama_jenis || '',
        deskripsi_jenis: initialData.deskripsi_jenis || '',
        id_kategori: initialData.id_kategori || '',
      });
    } else {
      setjenisData({
        nama_jenis: '',
        deskripsi_jenis: '',
        id_kategori: '',
      });
    }
  }, [initialData]);

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setjenisData((prev) => ({ ...prev, [name]: value }));
  };

  // Saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jenisData.nama_jenis.trim() || !jenisData.id_kategori) return;

    onSubmit({
      ...jenisData,
      nama_jenis: jenisData.nama_jenis.trim(),
      deskripsi_jenis: jenisData.deskripsi_jenis.trim(),
      id_kategori: parseInt(jenisData.id_kategori, 10),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Nama Jenis */}
        <InputForm
          label='Nama Jenis'
          name='nama_jenis'
          value={jenisData.nama_jenis}
          onChange={handleChange}
          placeholder='Masukkan nama jenis'
          required
        />

        {/* Deskripsi Jenis */}
        <InputForm
          label='Deskripsi Jenis'
          name='deskripsi_jenis'
          value={jenisData.deskripsi_jenis}
          onChange={handleChange}
          placeholder='Masukkan deskripsi jenis'
          required
        />

        {/* Pilih Kategori */}
        <Select
          label='Kategori'
          value={jenisData.id_kategori}
          onChange={(value) =>
            setjenisData((prev) => ({ ...prev, id_kategori: value }))
          }
          options={kategoriOptions.map((k) => ({
            value: k.id_kategori,
            label: k.nama_kategori,
          }))}
          placeholder='Pilih Kategori'
          required
        />

        {/* Tombol Aksi */}
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            type='submit'
            disabled={
              isLoading ||
              !jenisData.nama_jenis.trim() ||
              !jenisData.id_kategori
            }
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JenisCrudModal;
