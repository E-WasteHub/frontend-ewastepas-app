import { Layers, X } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import { jenisSampahDummy } from '../../../data/jenisSampahDummy';
import { kategoriSampahDummy } from '../../../data/kategoriSampahDummy';
import useDarkMode from '../../../hooks/useDarkMode';
import { Badge } from '../../elements';

const KategoriSection = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedKategori, setSelectedKategori] = useState(null);

  const getJenisByKategori = (kategoriId) =>
    jenisSampahDummy.filter((item) => item.id_kategori_sampah === kategoriId);

  return (
    <section
      className={`px-4 py-16 md:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'
      }`}
    >
      <div className='max-w-screen-xl mx-auto'>
        {/* Header */}
        <Motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant='solid' intent='success' size='md' className='mb-4'>
            <Layers className='mr-1.5 h-4 w-4' />
            Kategori Sampah Elektronik
          </Badge>
          <h2
            className={`mb-4 text-3xl font-bold md:text-4xl ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kategori yang Kami Terima
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Klik kategori untuk melihat daftar jenis sampah yang diterima.
          </p>
        </Motion.div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {kategoriSampahDummy.map((kategori, index) => (
            <Motion.div
              key={kategori.id_kategori_sampah}
              onClick={() => setSelectedKategori(kategori)}
              className={`p-6 text-center border rounded-xl cursor-pointer transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-green-500 hover:shadow-md'
                  : 'bg-white border-slate-200 hover:border-green-500 hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className={`mb-2 text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {kategori.nama_kategori_sampah}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {kategori.deskripsi_kategori_sampah}
              </p>
              <div
                className={`pt-4 mt-4 border-t ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-200'
                }`}
              >
                <Badge
                  variant='outline'
                  intent='success'
                  size='sm'
                  className='text-xs'
                >
                  +{kategori.poin_kategori_sampah} poin
                </Badge>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedKategori && (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50'>
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full max-w-2xl p-6 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedKategori(null)}
              className='absolute top-4 right-4 text-slate-400 hover:text-red-500 transition'
            >
              <X className='h-5 w-5' />
            </button>

            {/* Modal Content */}
            <h3 className='mb-4 text-xl font-bold'>
              Jenis Sampah: {selectedKategori.nama_kategori_sampah}
            </h3>
            {/* Scrollable List */}
            <div className='max-h-96 overflow-y-auto pt-4 pr-2'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {getJenisByKategori(selectedKategori.id_kategori_sampah).map(
                  (jenis, idx) => (
                    <div
                      key={jenis.id_jenis_sampah}
                      className={`p-4 rounded-lg border ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <h4 className='font-semibold mb-1'>
                        {jenis.nama_jenis_sampah}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {jenis.deskripsi_jenis_sampah}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </section>
  );
};

export default KategoriSection;
