import { Layers } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { kategoriSampahDummy } from '../../../data'; // data sesuai entity
import useDarkMode from '../../../hooks/useDarkMode';
import { Badge } from '../../elements';

const KategoriSection = () => {
  const { isDarkMode } = useDarkMode();

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
            Serahkan berbagai jenis sampah elektronik Anda untuk didaur ulang
            secara bertanggung jawab.
          </p>
        </Motion.div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {kategoriSampahDummy.slice(0, 6).map((kategori, index) => (
            <Motion.div
              key={kategori.id_kategori_sampah}
              className={`p-6 text-center border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Nama Kategori */}
              <h3
                className={`mb-2 text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {kategori.nama_kategori_sampah}
              </h3>

              {/* Deskripsi */}
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {kategori.deskripsi_kategori_sampah}
              </p>

              {/* Poin Reward */}
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
    </section>
  );
};

export default KategoriSection;
