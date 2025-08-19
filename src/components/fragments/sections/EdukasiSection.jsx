import { Sparkles } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { kontenEdukasiDummy } from '../../../data';
import useDarkMode from '../../../hooks/useDarkMode';
import { Badge } from '../../elements';

const EdukasiSection = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      className={`px-4 py-12 sm:py-16 ${
        isDarkMode ? 'bg-slate-900' : 'bg-white'
      }`}
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <Motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant='solid' intent='success' size='md' className='mb-4'>
            <Sparkles className='w-4 h-4 mr-1.5' />
            Edukasi EWasteHub
          </Badge>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kumpulan Edukasi EWasteHub
          </h2>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Artikel dan sumber daya untuk memahami pentingnya pengelolaan sampah
            elektronik dan cara berkontribusi.
          </p>
        </Motion.div>

        {/* Grid Edukasi */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12'>
          {kontenEdukasiDummy.slice(0, 4).map((item, index) => (
            <Motion.div
              key={item.id_konten}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='group'
            >
              <Link to={`/edukasi/${item.id_konten}`} className='block h-full'>
                <div
                  className={`p-6 text-center border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Gambar Thumbnail */}
                  {item.gambar && (
                    <div className='flex items-center justify-center w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full bg-gray-100'>
                      <img
                        src={item.gambar}
                        alt={item.judul_konten}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}

                  {/* Judul */}
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.judul_konten}
                  </h3>

                  {/* Deskripsi singkat */}
                  <p
                    className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {item.isi_konten}
                  </p>

                  {/* Read More */}
                  <div
                    className={`text-xs font-medium ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    <span className='flex items-center justify-center gap-1'>
                      Baca selengkapnya
                      <svg
                        className='w-3 h-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Motion.div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        {kontenEdukasiDummy.length > 4 && (
          <Motion.div
            className='text-end'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to='/edukasi'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:scale-105'
            >
              <span>Lihat Semua Edukasi</span>
            </Link>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default EdukasiSection;
