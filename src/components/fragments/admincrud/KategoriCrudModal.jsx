import { useEffect, useState } from 'react';
import { Button, InputForm, Modal } from '../../elements';

const KategoriCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState({
    nama_kategori: '',
    poin_kategori: '',
    deskripsi_kategori: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormValues({
        nama_kategori: initialData.nama_kategori || '',
        poin_kategori: initialData.poin_kategori || '',
        deskripsi_kategori: initialData.deskripsi_kategori || '',
      });
    } else {
      setFormValues({
        nama_kategori: '',
        poin_kategori: '',
        deskripsi_kategori: '',
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Kategori' : 'Tambah Kategori'}
    >
      <div className='space-y-4'>
        <InputForm
          label='Nama Kategori'
          name='nama_kategori'
          value={formValues.nama_kategori}
          onChange={handleChange}
          required
        />
        <InputForm
          label='Poin Kategori'
          name='poin_kategori'
          type='number'
          value={formValues.poin_kategori}
          onChange={handleChange}
          required
        />
        <InputForm
          label='Deskripsi Kategori'
          name='deskripsi_kategori'
          type='text'
          value={formValues.deskripsi_kategori}
          onChange={handleChange}
        />

        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default KategoriCrudModal;
