// src/views/EdukasiView.jsx
import { BookOpen } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Loading } from '../components/elements';
import Pagination from '../components/elements/Pagination';
import MainLayout from '../components/layouts/MainLayout';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import * as edukasiService from '../services/edukasiService';
import getLatestEdukasi from '../utils/getLatestEdukasi';
import { stripHtmlUtils } from '../utils/stripHtmlUtils';

const EdukasiView = () => {
  useDocumentTitle('Edukasi | Ewastepas');
  const { isDarkMode } = useDarkMode();

  const [edukasiData, setEdukasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await edukasiService.ambilSemuaEdukasi();
        setEdukasiData(res?.data || []);
      } catch (err) {
        setError(err.message || 'Gagal memuat edukasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedData = getLatestEdukasi(edukasiData, edukasiData.length);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTopics = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className={`px-4 py-12 mt-12 text-center ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Badge variant='solid' intent='success' size='md' className='mb-4'>
            <BookOpen className='w-4 h-4 mr-2' />
            Pusat Edukasi Ewastepas
          </Badge>

          <h1
            className={`font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            } text-3xl sm:text-4xl lg:text-5xl`}
          >
            Tingkatkan Pengetahuan Anda
          </h1>

          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            } text-base sm:text-lg lg:text-xl`}
          >
            Jelajahi berbagai artikel untuk memahami pentingnya pengelolaan
            sampah elektronik yang bertanggung jawab.
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        className={`px-4 py-8 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white'}`}
      >
        <div className='max-w-6xl mx-auto'>
          {isLoading && <Loading mode='inline' text='Loading konten...' />}
          {error && (
            <div className='text-center'>
              <p className='text-red-500 mb-4'>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <Motion.div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {currentTopics.map((topic, index) => (
                  <Motion.div
                    key={topic.id_konten}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/edukasi/${topic.id_konten}`}
                      className='block h-full'
                    >
                      <article
                        className={`border rounded-xl overflow-hidden hover:border-green-500 transition h-full flex flex-col ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className='w-full h-48'>
                          <img
                            src={topic.gambar_url}
                            alt={topic.judul_konten}
                            className='w-full h-full object-cover'
                          />
                        </div>

                        {/* Konten */}
                        <div className='flex flex-col text-center flex-1 p-6'>
                          <h3
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {topic.judul_konten}
                          </h3>

                          <p
                            className={`text-sm line-clamp-4 flex-1 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {stripHtmlUtils(topic.isi_konten).substring(0, 100)}
                            ...
                          </p>

                          <div className='flex items-center justify-end text-sm mt-4'>
                            <span
                              className={`font-medium ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`}
                            >
                              Baca selengkapnya →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </Motion.div>
                ))}
              </Motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  isDarkMode={isDarkMode}
                />
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiView;
