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
  const [namaDaerah, setNamaDaerah] = useState('');

  useEffect(() => {
    if (initialData) {
      setNamaDaerah(initialData.nama_daerah || '');
    } else {
      setNamaDaerah('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ nama_daerah: namaDaerah });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        <InputForm
          label='Nama Daerah'
          name='nama_daerah'
          value={namaDaerah}
          onChange={(e) => setNamaDaerah(e.target.value)}
          required
          placeholder='Masukkan nama daerah'
        />

        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !namaDaerah}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DaerahCrudModal;
