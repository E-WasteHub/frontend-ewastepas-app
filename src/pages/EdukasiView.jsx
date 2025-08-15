import { BookOpen } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import { educationTopics } from '../data/edukasiData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MainLayout from '../layouts/MainLayout';

const EdukasiPage = () => {
  useDocumentTitle('Edukasi | E-wasteHub');
  const { isDarkMode } = useDarkMode();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(educationTopics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = educationTopics.slice(startIndex, endIndex);

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
            variant='soft'
            color='green'
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
            Jelajahi berbagai topik untuk memahami pentingnya pengelolaan sampah
            elektronik yang bertanggung jawab.
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
            {currentTopics.map((topic, index) => {
              const { Icon } = topic;

              return (
                <Motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='group'
                >
                  <Link to={`/edukasi/${topic.id}`} className='block h-full'>
                    <article
                      className={`p-6 border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {/* Header with Icon and Category */}
                      <div className='flex items-start gap-4 mb-4'>
                        {Icon && (
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${
                              isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`}
                            />
                          </div>
                        )}

                        <div className='flex-1'>
                          <Badge color='gray' size='sm' className='mb-2'>
                            {topic.category}
                          </Badge>

                          <h3
                            className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {topic.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed mb-4 line-clamp-4 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {topic.description}
                      </p>

                      {/* Footer */}
                      <div className='flex items-center justify-between text-sm'>
                        <span
                          className={
                            isDarkMode ? 'text-slate-500' : 'text-slate-500'
                          }
                        >
                          5 menit baca
                        </span>
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
                    </article>
                  </Link>
                </Motion.div>
              );
            })}
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

export default EdukasiPage;
