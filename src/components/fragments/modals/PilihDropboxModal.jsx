import { useEffect, useState } from 'react';
import { ambilSemuaDaerah } from '../../../services/daerahService';
import { ambilSemuaDropbox } from '../../../services/dropboxService';
import { Button, Select } from '../../elements';

const PilihDropboxModal = ({ isOpen, onClose, onSelect }) => {
  const [daerahList, setDaerahList] = useState([]);
  const [dropboxList, setDropboxList] = useState([]);
  const [selectedDaerah, setSelectedDaerah] = useState('');
  const [selectedDropbox, setSelectedDropbox] = useState('');
  const [loading, setLoading] = useState(true);

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
          console.error('❌ Gagal ambil data modal dropbox:', err);
          setDaerahList([]);
          setDropboxList([]);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const dropboxFiltered = selectedDaerah
    ? dropboxList.filter((db) => db.id_daerah === Number(selectedDaerah))
    : [];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-lg font-semibold mb-4'>Pilih Dropbox Tujuan</h2>

        {loading ? (
          <p className='text-sm text-gray-500'>⏳ Memuat data...</p>
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
                onChange={(value) => {
                  setSelectedDropbox(value);
                  onSelect?.(value);
                }}
                placeholder={
                  dropboxFiltered.length > 0
                    ? 'Pilih Dropbox'
                    : 'Tidak ada dropbox di daerah ini'
                }
                disabled={dropboxFiltered.length === 0}
                options={dropboxFiltered.map((db) => ({
                  value: db.id_dropbox,
                  label: `${db.nama_dropbox} - ${db.latitude}, ${db.longitude}`,
                }))}
              />
            )}
          </>
        )}

        <div className='flex justify-end mt-4'>
          <Button type='button' onClick={onClose} className='text-sm'>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PilihDropboxModal;
