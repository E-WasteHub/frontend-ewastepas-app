import { useEffect, useState } from 'react';
import { indexDaerah } from '../../../services/daerahService';
import { indexDropbox } from '../../../services/dropboxService';
import { Button } from '../../elements';

const PilihDropboxModal = ({ isOpen, onClose, onSelect }) => {
  const [daerahList, setDaerahList] = useState([]);
  const [dropboxList, setDropboxList] = useState([]);
  const [selectedDaerah, setSelectedDaerah] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      Promise.all([indexDaerah(), indexDropbox()])
        .then(([daerahRes, dropboxRes]) => {
          // pastikan hasilnya array
          const daerahData = Array.isArray(daerahRes?.data)
            ? daerahRes.data
            : daerahRes?.data?.daerah || daerahRes || [];

          const dropboxData = Array.isArray(dropboxRes?.data)
            ? dropboxRes.data
            : dropboxRes?.data?.dropbox || dropboxRes || [];

          console.log('📥 Daerah Response:', daerahRes);
          console.log('📥 Dropbox Response:', dropboxRes);

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
            {/* Dropdown pilih daerah */}
            <select
              className='w-full mb-4 border rounded p-2 text-sm dark:bg-slate-700 dark:text-white'
              value={selectedDaerah}
              onChange={(e) => setSelectedDaerah(e.target.value)}
            >
              <option value=''>-- Pilih Daerah --</option>
              {daerahList.map((d) => (
                <option key={d.id_daerah} value={d.id_daerah}>
                  {d.nama_daerah}
                </option>
              ))}
            </select>

            {/* List dropbox sesuai daerah */}
            {selectedDaerah && dropboxFiltered.length > 0 ? (
              <ul className='space-y-2'>
                {dropboxFiltered.map((db) => (
                  <li
                    key={db.id_dropbox}
                    className='flex justify-between items-center border-b pb-2'
                  >
                    <span>
                      {db.nama_dropbox} - {db.alamat}
                    </span>
                    <Button
                      type='button'
                      className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs'
                      onClick={() => onSelect(db.id_dropbox)}
                    >
                      Pilih
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-sm text-gray-500'>
                {selectedDaerah
                  ? 'Tidak ada dropbox di daerah ini.'
                  : 'Pilih daerah terlebih dahulu.'}
              </p>
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
