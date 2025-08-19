import { Package, X } from 'lucide-react';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button } from '../../../elements';
import { Input } from '../../../elements/Form';

const SampahList = ({ daftarSampah, onSampahChange }) => {
  const { isDarkMode } = useDarkMode();

  const handleUbahBerat = (id, berat) =>
    onSampahChange(
      daftarSampah.map((s) =>
        s.id === id ? { ...s, berat: parseInt(berat) || 1 } : s
      )
    );

  const handleHapus = (id) =>
    onSampahChange(daftarSampah.filter((s) => s.id !== id));

  const totalBerat = daftarSampah.reduce((t, s) => t + (s.berat || 0), 0);
  const estimasiPoin = daftarSampah.reduce(
    (t, s) => t + (s.berat || 0) * (s.poin_per_kg || 0),
    0
  );

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h3
          className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Semua Sampah
        </h3>
        <div className='text-right text-xs sm:text-sm'>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Total: {daftarSampah.length} ({totalBerat} Kg)
          </p>
          <p className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
            Estimasi: {estimasiPoin} poin
          </p>
        </div>
      </div>

      {/* List */}
      <div className='space-y-3 max-h-64 overflow-y-auto'>
        {daftarSampah.length === 0 ? (
          <p
            className={`text-center py-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Belum ada sampah dipilih
          </p>
        ) : (
          daftarSampah.map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <Package className='w-5 h-5 text-green-500' />
              </div>

              {/* Info */}
              <div className='flex-1 text-xs sm:text-sm'>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {s.nama_kategori_sampah}
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {s.nama_jenis_sampah} • {s.poin_per_kg} poin/kg
                </p>
              </div>

              {/* Input + Tombol */}
              <div className='flex items-center gap-2'>
                {/* Input Berat */}
                <div className='flex items-center gap-1'>
                  <Input
                    type='number'
                    value={s.berat || 1}
                    onChange={(e) => handleUbahBerat(s.id, e.target.value)}
                    className='w-14 sm:w-16 h-8 px-0 text-center text-xs sm:text-sm'
                    min='1'
                  />
                  <span className='text-xs'>Kg</span>
                </div>

                {/* Tombol Hapus */}
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => handleHapus(s.id)}
                  className='w-12 h-10 !px-4 !py-1.5'
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SampahList;
