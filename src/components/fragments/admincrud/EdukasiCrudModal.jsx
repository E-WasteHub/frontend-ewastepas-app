// src/components/fragments/admincrud/EdukasiCrudModal.jsx
import { useEffect, useState } from 'react';
import { Button, InputForm, Modal } from '../../elements';

const EdukasiCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Edukasi',
  isLoading = false,
}) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul_konten || '');
      setIsi(initialData.isi_konten || '');
      setGambar(initialData.gambar || '');
    } else {
      setJudul('');
      setIsi('');
      setGambar('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({
      judul_konten: judul,
      isi_konten: isi,
      gambar,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        <InputForm
          label='Judul Konten'
          name='judul_konten'
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          placeholder='Masukkan judul konten'
        />

        <div>
          <label className='block text-sm font-medium mb-1'>Isi Konten</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            rows={5}
            className='w-full border rounded px-3 py-2'
            placeholder='Tuliskan isi konten edukasi'
            required
          />
        </div>

        <InputForm
          label='URL Gambar'
          name='gambar'
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          placeholder='https://example.com/gambar.jpg'
        />

        {gambar && (
          <img
            src={gambar}
            alt='Preview'
            className='w-full rounded border mt-2'
          />
        )}

        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !judul || !isi}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EdukasiCrudModal;
