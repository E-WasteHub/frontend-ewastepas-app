import { BookOpen, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components';
import { educationTopics } from '../data/edukasiData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { MainLayout } from '../layouts';

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
            className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
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
                >
                  <Link to={`/edukasi/${topic.id}`} className='block h-full'>
                    <div
                      className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer h-full ${
                        isDarkMode
                          ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50'
                          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-green-500 hover:shadow-md'
                      }`}
                    >
                      {/* Icon & Title Row */}
                      <div className='flex items-start gap-4 mb-4'>
                        {Icon && (
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              isDarkMode
                                ? 'bg-green-500/10 group-hover:bg-green-500/20'
                                : 'bg-green-100 group-hover:bg-green-200'
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
                          <h3
                            className={`text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {topic.title}
                          </h3>

                          <p
                            className={`text-sm leading-relaxed ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className='flex items-center justify-between'>
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${
                            isDarkMode
                              ? 'bg-slate-700 text-slate-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {topic.category}
                        </span>

                        <span
                          className={`text-sm font-medium transition-opacity opacity-0 group-hover:opacity-100 ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          Baca selengkapnya →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Motion.div>
              );
            })}
          </Motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 mt-12'>
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
                    : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>

              {/* Page Numbers */}
              <div className='flex gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? isDarkMode
                            ? 'bg-green-600 text-white'
                            : 'bg-green-600 text-white'
                          : isDarkMode
                          ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
                          : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
                    : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
                }`}
              >
                Selanjutnya
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Coming Soon Notice */}
          <div className='mt-12 sm:mt-16 text-center'>
            <Badge variant='outline' color='gray' size='md'>
              <Zap className='w-4 h-4 mr-2' />
              Artikel baru akan segera hadir!
            </Badge>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiPage;
