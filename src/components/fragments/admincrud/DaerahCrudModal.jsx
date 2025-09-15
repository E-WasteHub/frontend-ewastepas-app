// src/components/fragments/admincrud/DaerahCrudModal.jsx
import { useEffect, useState } from 'react';
import { Button, InputForm, Modal } from '../../elements';

const DaerahCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Daerah',
  isLoading = false,
}) => {
  // State lokal untuk form
  const [namaDaerah, setNamaDaerah] = useState('');

  // Isi form saat mode edit
  useEffect(() => {
    if (initialData) {
      setNamaDaerah(initialData.nama_daerah || '');
    } else {
      setNamaDaerah('');
    }
  }, [initialData]);

  // Saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaDaerah.trim()) return;
    onSubmit({ nama_daerah: namaDaerah.trim() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Input nama daerah */}
        <InputForm
          label='Nama Daerah'
          name='nama_daerah'
          value={namaDaerah}
          onChange={(e) => setNamaDaerah(e.target.value)}
          required
          placeholder='Masukkan nama daerah'
        />

        {/* Tombol aksi */}
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button type='submit' disabled={isLoading || !namaDaerah.trim()}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DaerahCrudModal;
