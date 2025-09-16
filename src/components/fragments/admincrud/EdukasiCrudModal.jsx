// src/components/fragments/admincrud/EdukasiCrudModal.jsx
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../../../hooks';
import { Button, InputForm, Modal } from '../../elements';
import { EdukasiUpload } from '../../fragments';

const EdukasiCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Edukasi',
  isLoading = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const editorRef = useRef(null);

  // State lokal form
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [gambarFile, setGambarFile] = useState(null);

  // Isi form saat mode edit
  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul_konten || '');
      setIsi(initialData.isi_konten || '');
      setGambar(initialData.gambar_url || initialData.gambar || '');
      setGambarFile(null);
    } else {
      setJudul('');
      setIsi('');
      setGambar('');
      setGambarFile(null);
    }
  }, [initialData]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;

    const formData = new FormData();
    formData.append('judul_konten', judul.trim());
    formData.append('isi_konten', isi.trim());

    if (gambarFile) {
      // Upload gambar baru
      formData.append('gambar', gambarFile);
    } else if (gambar) {
      // Pakai gambar lama
      formData.append('gambar_url', gambar);
    }
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Judul konten */}
        <InputForm
          label='Judul Konten'
          name='judul_konten'
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          placeholder='Masukkan judul konten'
        />

        {/* Isi konten dengan Jodit */}
        <div className='space-y-1'>
          <label className='block text-sm font-medium mb-1'>Isi Konten</label>
          <JoditEditor
            ref={editorRef}
            value={isi}
            config={{
              minHeight: 200,
              theme: isDarkMode ? 'dark' : 'default',
              toolbarAdaptive: false,
              buttons: [
                'bold',
                'italic',
                'underline',
                '|',
                'ul',
                'ol',
                '|',
                'left',
                'center',
                'right',
                'justify',
              ],
            }}
            onBlur={(newContent) => setIsi(newContent)}
          />
        </div>

        {/* Upload gambar */}
        <EdukasiUpload
          currentImage={gambar}
          onImageChange={(file) => {
            if (file) {
              setGambarFile(file);
              setGambar('');
            } else {
              setGambarFile(null);
            }
          }}
          onRemove={() => {
            setGambarFile(null);
            setGambar('');
          }}
          isLoading={isLoading}
        />

        {/* Tombol aksi */}
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            type='submit'
            disabled={isLoading || !judul.trim() || !isi.trim()}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EdukasiCrudModal;
