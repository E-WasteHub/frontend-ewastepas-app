// src/components/fragments/admincrud/KategoriCrudModal.jsx
import { useEffect, useState } from 'react';
import { Button, InputForm, Modal } from '../../elements';

const KategoriCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  // State lokal untuk form kategori
  const [kategoriData, setKategoriData] = useState({
    nama_kategori: '',
    poin_kategori: '',
    deskripsi_kategori: '',
  });

  // Isi form saat mode edit
  useEffect(() => {
    if (initialData) {
      setKategoriData({
        nama_kategori: initialData.nama_kategori || '',
        poin_kategori: initialData.poin_kategori || '',
        deskripsi_kategori: initialData.deskripsi_kategori || '',
      });
    } else {
      setKategoriData({
        nama_kategori: '',
        poin_kategori: '',
        deskripsi_kategori: '',
      });
    }
  }, [initialData]);

  // Handle input perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setKategoriData((prev) => ({ ...prev, [name]: value }));
  };

  // Saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(kategoriData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Kategori' : 'Tambah Kategori'}
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputForm
          label='Nama Kategori'
          name='nama_kategori'
          value={kategoriData.nama_kategori}
          onChange={handleChange}
          required
        />
        <InputForm
          label='Poin Kategori'
          name='poin_kategori'
          type='number'
          value={kategoriData.poin_kategori}
          onChange={handleChange}
          required
        />
        <InputForm
          label='Deskripsi Kategori'
          name='deskripsi_kategori'
          type='text'
          value={kategoriData.deskripsi_kategori}
          onChange={handleChange}
        />

        {/* Tombol aksi */}
        <div className='flex justify-end gap-2'>
          <Button variant='secondary' type='button' onClick={onClose}>
            Batal
          </Button>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default KategoriCrudModal;
