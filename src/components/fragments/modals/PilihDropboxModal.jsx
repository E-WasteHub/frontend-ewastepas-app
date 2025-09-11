import { useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { ambilSemuaDaerah } from '../../../services/daerahService';
import { ambilSemuaDropbox } from '../../../services/dropboxService';
import { Button, Loading, Select } from '../../elements';

const PilihDropboxModal = ({ isOpen, onClose, onSelect }) => {
  const [daerahList, setDaerahList] = useState([]);
  const [dropboxList, setDropboxList] = useState([]);
  const [selectedDaerah, setSelectedDaerah] = useState('');
  const [selectedDropbox, setSelectedDropbox] = useState('');
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      Promise.all([ambilSemuaDaerah(), ambilSemuaDropbox()])
        .then(([daerahRes, dropboxRes]) => {
          const daerahData = Array.isArray(daerahRes?.data)
            ? daerahRes.data
            : daerahRes?.data?.daerah || daerahRes || [];

          const dropboxData = Array.isArray(dropboxRes?.data)
            ? dropboxRes.data
            : dropboxRes?.data?.dropbox || dropboxRes || [];

          setDaerahList(daerahData);
          setDropboxList(dropboxData);
        })
        .catch((err) => {
          console.error('  Gagal ambil data modal dropbox:', err);
          setDaerahList([]);
          setDropboxList([]);
        })
        .finally(() => setLoading(false));
    } else {
      // reset state saat modal ditutup
      setSelectedDaerah('');
      setSelectedDropbox('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const dropboxFiltered = selectedDaerah
    ? dropboxList.filter((db) => db.id_daerah === Number(selectedDaerah))
    : [];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <h2 className='text-lg font-semibold mb-4'>Pilih Dropbox Tujuan</h2>

        {loading ? (
          <Loading mode='inline' text='Memuat data...' />
        ) : (
          <>
            {/* Select Daerah */}
            <Select
              label='Pilih Daerah'
              value={selectedDaerah}
              onChange={(value) => {
                setSelectedDaerah(value);
                setSelectedDropbox('');
              }}
              placeholder='Pilih Daerah'
              options={daerahList.map((d) => ({
                value: d.id_daerah,
                label: d.nama_daerah,
              }))}
            />

            {/* Select Dropbox */}
            {selectedDaerah && (
              <Select
                className='mt-4'
                label='Pilih Dropbox'
                value={selectedDropbox}
                onChange={(value) => setSelectedDropbox(value)}
                placeholder={
                  dropboxFiltered.length > 0
                    ? 'Pilih Dropbox'
                    : 'Tidak ada dropbox di daerah ini'
                }
                disabled={dropboxFiltered.length === 0}
                options={dropboxFiltered.map((db) => ({
                  value: db.id_dropbox,
                  label: `${db.nama_dropbox}`,
                }))}
              />
            )}
          </>
        )}

        {/* Tombol Aksi */}
        <div className='flex justify-end mt-6 gap-3'>
          <Button
            type='button'
            variant='secondary'
            onClick={onClose}
            className='text-sm'
          >
            Batal
          </Button>
          <Button
            type='button'
            variant='primary'
            className='text-sm'
            disabled={!selectedDropbox}
            onClick={() => {
              if (selectedDropbox) {
                onSelect?.(selectedDropbox);
                onClose?.();
              }
            }}
          >
            Konfirmasi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PilihDropboxModal;
