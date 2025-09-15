// src/components/fragments/admincrud/DropboxCrudModal.jsx
import { useEffect, useState } from 'react';
import * as daerahService from '../../../services/daerahService';
import { Button, InputForm, Modal, Select } from '../../elements';

const DropboxCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Dropbox',
  isLoading = false,
}) => {
  // State lokal untuk form
  const [namaDropbox, setNamaDropbox] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [idDaerah, setIdDaerah] = useState('');
  const [daerahOptions, setDaerahOptions] = useState([]);

  // Ambil daftar daerah untuk dropdown
  useEffect(() => {
    const ambilDaerah = async () => {
      try {
        const res = await daerahService.ambilSemua();
        const data = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setDaerahOptions(data);
      } catch (err) {
        console.error('Gagal mengambil daftar daerah:', err);
      }
    };
    ambilDaerah();
  }, []);

  // Isi form saat mode edit
  useEffect(() => {
    if (initialData) {
      setNamaDropbox(initialData.nama_dropbox || '');
      setLongitude(initialData.longitude || '');
      setLatitude(initialData.latitude || '');
      setIdDaerah(initialData.id_daerah || '');
    } else {
      setNamaDropbox('');
      setLongitude('');
      setLatitude('');
      setIdDaerah('');
    }
  }, [initialData]);

  // Saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaDropbox.trim() || !longitude || !latitude || !idDaerah) return;

    onSubmit({
      nama_dropbox: namaDropbox.trim(),
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      id_daerah: parseInt(idDaerah, 10),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Input nama dropbox */}
        <InputForm
          label='Nama Dropbox'
          name='nama_dropbox'
          value={namaDropbox}
          onChange={(e) => setNamaDropbox(e.target.value)}
          required
          placeholder='Masukkan nama dropbox'
        />

        {/* Input koordinat */}
        <InputForm
          label='Longitude'
          name='longitude'
          type='number'
          step='any'
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          placeholder='Contoh: 107.60981'
        />

        <InputForm
          label='Latitude'
          name='latitude'
          type='number'
          step='any'
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          placeholder='Contoh: -6.914744'
        />

        {/* Pilih daerah */}
        <Select
          label='Daerah'
          value={idDaerah}
          onChange={setIdDaerah}
          options={daerahOptions.map((d) => ({
            value: d.id_daerah,
            label: d.nama_daerah,
          }))}
          placeholder='Pilih daerah'
          required
        />

        {/* Tombol aksi */}
        <div className='flex justify-end gap-2'>
          <Button type='button' variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            type='submit'
            disabled={
              isLoading ||
              !namaDropbox.trim() ||
              !longitude ||
              !latitude ||
              !idDaerah
            }
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DropboxCrudModal;
