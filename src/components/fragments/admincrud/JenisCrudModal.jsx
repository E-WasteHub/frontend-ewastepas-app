// src/components/fragments/admincrud/JenisCrudModal.jsx
import { useEffect, useState } from 'react';
import * as kategoriService from '../../../services/kategoriService';
import { Button, InputForm, Modal } from '../../elements';

const JenisCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Jenis',
  isLoading = false,
}) => {
  const [formValues, setFormValues] = useState({
    nama_jenis: '',
    deskripsi_jenis: '',
    id_kategori: '',
  });
  const [kategoriOptions, setKategoriOptions] = useState([]);

  // load kategori untuk select
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await kategoriService.ambilSemua();
        const data = Array.isArray(res?.data)
          ? res.data
          : res?.data?.data || [];
        setKategoriOptions(data);
      } catch (err) {
        console.error('❌ Gagal fetch kategori:', err);
      }
    };
    fetchKategori();
  }, []);

  // isi ulang jika ada initialData
  useEffect(() => {
    if (initialData) {
      setFormValues({
        nama_jenis: initialData.nama_jenis || '',
        deskripsi_jenis: initialData.deskripsi_jenis || '',
        id_kategori: initialData.id_kategori || '',
      });
    } else {
      setFormValues({
        nama_jenis: '',
        deskripsi_jenis: '',
        id_kategori: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        {/* Nama Jenis */}
        <InputForm
          label='Nama Jenis'
          name='nama_jenis'
          value={formValues.nama_jenis}
          onChange={handleChange}
          placeholder='Masukkan nama jenis'
          required
        />

        {/* Deskripsi Jenis */}
        <InputForm
          label='Deskripsi Jenis'
          name='deskripsi_jenis'
          value={formValues.deskripsi_jenis}
          onChange={handleChange}
          placeholder='Masukkan deskripsi jenis'
          required
        />

        {/* Pilih Kategori */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Kategori</label>
          <select
            name='id_kategori'
            value={formValues.id_kategori}
            onChange={handleChange}
            className='w-full border rounded px-3 py-2'
            required
          >
            <option value=''>-- Pilih Kategori --</option>
            {kategoriOptions.map((k) => (
              <option key={k.id_kategori} value={k.id_kategori}>
                {k.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        {/* Tombol Aksi */}
        <div className='flex justify-end gap-2 mt-4'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !formValues.nama_jenis || !formValues.id_kategori
            }
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default JenisCrudModal;
