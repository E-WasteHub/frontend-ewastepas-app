// src/components/fragments/admincrud/DropboxCrudModal.jsx
import { useEffect, useState } from 'react';
import * as daerahService from '../../../services/daerahService';
import { Button, InputForm, Modal } from '../../elements';

const DropboxCrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = 'Form Dropbox',
  isLoading = false,
}) => {
  const [namaDropbox, setNamaDropbox] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [idDaerah, setIdDaerah] = useState('');
  const [daerahOptions, setDaerahOptions] = useState([]);

  useEffect(() => {
    // ambil daftar daerah untuk dropdown
    const fetchDaerah = async () => {
      try {
        const res = await daerahService.ambilSemua();
        const data = Array.isArray(res.data) ? res.data : res?.data?.data || [];
        setDaerahOptions(data);
      } catch (err) {
        console.error('❌ Gagal ambil daftar daerah:', err);
      }
    };
    fetchDaerah();
  }, []);

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

  const handleSubmit = () => {
    onSubmit({
      nama_dropbox: namaDropbox,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      id_daerah: parseInt(idDaerah, 10),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        <InputForm
          label='Nama Dropbox'
          name='nama_dropbox'
          value={namaDropbox}
          onChange={(e) => setNamaDropbox(e.target.value)}
          required
          placeholder='Masukkan nama dropbox'
        />

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

        <div>
          <label className='block text-sm font-medium mb-1'>Daerah</label>
          <select
            value={idDaerah}
            onChange={(e) => setIdDaerah(e.target.value)}
            className='w-full border rounded px-3 py-2'
            required
          >
            <option value=''>Pilih Daerah</option>
            {daerahOptions.map((daerah) => (
              <option key={daerah.id_daerah} value={daerah.id_daerah}>
                {daerah.nama_daerah}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !namaDropbox || !longitude || !latitude || !idDaerah
            }
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DropboxCrudModal;
