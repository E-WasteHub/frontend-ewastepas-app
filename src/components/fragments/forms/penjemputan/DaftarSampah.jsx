import { X } from 'lucide-react';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Loading } from '../../../elements';

const DaftarSampah = ({
  daftarSampah,
  totalJumlah,
  estimasiPoin,
  isSubmitting,
  onHapus,
  onUpload,
  onCancel,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='flex flex-col h-full'>
      {/* Header kanan (judul + total) */}
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>Daftar Sampah</h3>
        <span
          className={`text-sm ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}
        >
          Total: {totalJumlah} pcs • Estimasi {estimasiPoin} poin
        </span>
      </div>

      {/* Daftar Sampah scrollable (mobile-first) */}
      <div
        className={`
          flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar
          max-h-[60vh] md:max-h-[44vh]
        `}
      >
        {daftarSampah.length === 0 ? (
          <p className='text-sm text-gray-500'>Belum ada sampah ditambahkan</p>
        ) : (
          daftarSampah.map((s) => (
            <div
              key={s.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-slate-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Foto */}
              <div
                className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer ${
                  isDarkMode ? 'bg-slate-600' : 'bg-gray-200'
                }`}
                onClick={() => onUpload(s.id)}
              >
                {s.previewUrl ? (
                  <img
                    src={s.previewUrl}
                    alt='foto sampah'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span className='flex items-center justify-center w-full h-full text-xs text-gray-400'>
                    No Foto
                  </span>
                )}
              </div>

              {/* Detail Sampah */}
              <div className='flex-1 text-sm'>
                <p className='font-medium'>{s.nama_kategori_sampah}</p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {s.nama_jenis_sampah} • {s.jumlah_sampah} pcs •{' '}
                  {s.poin_per_unit} poin/unit
                </p>
                {s.catatan_sampah && (
                  <p className='text-xs text-gray-500 italic'>
                    Catatan: {s.catatan_sampah}
                  </p>
                )}
              </div>

              {/* Tombol Hapus */}
              <button
                type='button'
                onClick={() => onHapus(s.id)}
                className='p-1 rounded-full bg-red-500 text-white hover:bg-red-600'
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Actions sticky */}
      <div
        className='
          sticky bottom-0 bg-inherit py-8 flex justify-end gap-3
        '
      >
        <Button
          type='button'
          variant='secondary'
          onClick={onCancel}
          disabled={isSubmitting}
          className='flex-1 md:flex-none'
        >
          Kembali
        </Button>
        <Button
          type='submit'
          disabled={isSubmitting || daftarSampah.length === 0}
          className='flex-1 md:flex-none'
        >
          {isSubmitting ? (
            <Loading size='sm' text='Mengirim...' mode='button' />
          ) : (
            'Kirim Permintaan'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DaftarSampah;
