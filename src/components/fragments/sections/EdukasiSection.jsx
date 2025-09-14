// src/sections/EdukasiSection.jsx
import { Sparkles } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import * as edukasiService from '../../../services/edukasiService';
import getLatestEdukasi from '../../../utils/getLatestEdukasi';
import { stripHtml } from '../../../utils/stripHtml';
import { Badge } from '../../elements';

const EdukasiSection = () => {
  const { isDarkMode } = useDarkMode();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ambil data edukasi saat mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const edukasiData = await edukasiService.ambilSemuaEdukasi();
        setData(edukasiData?.data || []);
      } catch (err) {
        setError(err.message || 'Gagal memuat data edukasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // hanya ambil 4 edukasi terbaru
  const edukasiPreview = getLatestEdukasi(data, 4);

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
            Edukasi Ewastepas
          </Badge>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kumpulan Edukasi Ewastepas
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
        {isLoading ? (
          <p className='text-center text-slate-500'>Memuat edukasi...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12'>
            {edukasiPreview.map((item, index) => (
              <Motion.div
                key={item.id_konten}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group'
              >
                <Link
                  to={`/edukasi/${item.id_konten}`}
                  className='block h-full'
                >
                  <div
                    className={`border w-full rounded-xl overflow-hidden shadow-md hover:border-green-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Gambar Thumbnail */}
                    <div className='w-full aspect-[16/9]'>
                      <img
                        src={item.gambar_url}
                        alt={item.judul_konten}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Konten dalam card */}
                    <div className='p-6 flex flex-col flex-1 text-center'>
                      <h3
                        className={`text-lg font-semibold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {item.judul_konten}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed mb-4 line-clamp-3 flex-1 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {stripHtml(item.isi_konten).substring(0, 100)}...
                      </p>

                      <div
                        className={`text-xs font-medium mt-auto ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        <span className='flex items-center justify-center gap-1'>
                          Baca selengkapnya
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Motion.div>
            ))}
          </div>
        )}

        {/* Tombol Lihat Semua */}
        {data.length > 4 && (
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
