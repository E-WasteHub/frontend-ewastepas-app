// src/components/fragments/admincrud/EdukasiCrudModal.jsx
import { useEffect, useState } from 'react';
import { Button, InputForm, Modal, Textarea } from '../../elements';
import { EdukasiUpload } from '../../fragments';

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
  const [gambarFile, setGambarFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul_konten || '');
      setIsi(initialData.isi_konten || '');
      // Support both 'gambar' and 'gambar_url' dari backend
      setGambar(initialData.gambar_url || initialData.gambar || '');
      setGambarFile(null); // Reset file ketika edit
    } else {
      setJudul('');
      setIsi('');
      setGambar('');
      setGambarFile(null);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!judul.trim() || !isi.trim()) {
      alert('Judul dan isi konten wajib diisi');
      return;
    }

    if (gambarFile) {
      // Ada file baru → pakai FormData
      const formData = new FormData();
      formData.append('judul_konten', judul.trim());
      formData.append('isi_konten', isi.trim());
      formData.append('gambar', gambarFile);

      // Debug isi formData
      for (let [key, value] of formData.entries()) {
        console.log(
          `${key}:`,
          value instanceof File ? `File: ${value.name}` : value
        );
      }

      onSubmit(formData);
    } else {
      // Tidak ada file baru → kirim JSON
      const jsonData = {
        judul_konten: judul.trim(),
        isi_konten: isi.trim(),
      };
      if (gambar) jsonData.gambar_url = gambar;

      console.log('📤 Submit JSON:', jsonData);
      onSubmit(jsonData);
    }
  };

  const handleImageChange = (file) => {
    console.log('📸 Image changed in modal:', file);
    setGambarFile(file);
    // Reset URL gambar lama ketika ada file baru
    if (file) {
      setGambar('');
    }
  };

  const handleImageRemove = () => {
    setGambarFile(null);
    setGambar('');
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

        <Textarea
          label='Isi Konten'
          name='isi_konten'
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={5}
          placeholder='Tuliskan isi konten edukasi'
          required
        />

        <EdukasiUpload
          currentImage={gambar}
          onImageChange={handleImageChange}
          onRemove={handleImageRemove}
          isLoading={isLoading}
        />

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
