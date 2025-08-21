import { BookOpen } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/elements';
import Pagination from '../components/elements/Pagination';
import MainLayout from '../components/layouts/MainLayout';
import { kontenEdukasiDummy } from '../data';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';

const EdukasiView = () => {
  useDocumentTitle('Edukasi | E-wasteHub');
  const { isDarkMode } = useDarkMode();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // supaya ada 2 halaman dari 4 data

  // Ambil hanya 4 data pertama
  const edukasiData = kontenEdukasiDummy.slice(0, 6);

  // Calculate pagination
  const totalPages = Math.ceil(edukasiData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = edukasiData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className={`px-4 py-12 mt-12 sm:py-16 md:py-20 text-center ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Badge
            variant='solid'
            intent='success'
            size='md'
            className='mb-4 sm:mb-6'
          >
            <BookOpen className='w-4 h-4 mr-2' />
            Pusat Edukasi EwasteHub
          </Badge>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Tingkatkan Pengetahuan Anda
          </h1>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Jelajahi berbagai artikel untuk memahami pentingnya pengelolaan
            sampah elektronik yang bertanggung jawab.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        className={`px-4 py-8 sm:py-12 ${
          isDarkMode ? 'bg-slate-900/50' : 'bg-white'
        }`}
      >
        <div className='max-w-6xl mx-auto'>
          <Motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {currentTopics.map((topic, index) => (
              <Motion.div
                key={topic.id_konten}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <Link
                  to={`/edukasi/${topic.id_konten}`}
                  className='block h-full'
                >
                  <article
                    className={`border w-full rounded-xl overflow-hidden hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Thumbnail */}
                    {topic.gambar && (
                      <div className='w-full h-48'>
                        <img
                          src={topic.gambar}
                          alt={topic.judul_konten}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    )}

                    {/* Body konten */}
                    <div className='flex flex-col text-center flex-1 p-6'>
                      {/* Title */}
                      <h3
                        className={`text-lg font-semibold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {topic.judul_konten}
                      </h3>

                      {/* Description Preview */}
                      <p
                        className={`text-sm leading-relaxed mb-4 line-clamp-4 flex-grow ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {topic.isi_konten.substring(0, 150)}...
                      </p>

                      {/* Footer (selalu di bawah) */}
                      <div className='flex items-center justify-end text-sm mt-auto'>
                        <span
                          className={`font-medium ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          <span className='flex items-center gap-1'>
                            Baca selengkapnya
                            <svg
                              className='w-4 h-4'
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
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Motion.div>
            ))}
          </Motion.div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            isDarkMode={isDarkMode}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiView;
