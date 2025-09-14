import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
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
  const editor = useRef(null);

  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [gambarFile, setGambarFile] = useState(null);

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

  const handleSubmit = () => {
    if (!judul.trim() || !isi.trim()) {
      alert('Judul dan isi konten wajib diisi');
      return;
    }

    const formData = new FormData();
    formData.append('judul_konten', judul.trim());
    formData.append('isi_konten', isi.trim());

    if (gambarFile) {
      // user upload gambar baru
      formData.append('gambar', gambarFile);
    } else if (gambar) {
      // user tetap pakai gambar lama → kirim placeholder agar backend tidak reset
      formData.append('gambar_url', gambar);
    } else {
      // user hapus gambar → fallback ke default
      formData.append(
        'gambar',
        new Blob([], { type: 'image/png' }),
        'empty.png'
      );
    }

    onSubmit(formData);
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

        {/* Isi Konten pakai Jodit */}
        <div className='space-y-1'>
          <label className='block text-sm font-medium mb-1'>Isi Konten</label>
          <JoditEditor
            ref={editor}
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
