import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../components/common/Badge';
import { educationTopics } from '../data/edukasiData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MainLayout from '../layouts/MainLayout';

const EdukasiDetailPage = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();

  // Find the current topic
  const currentTopic = educationTopics.find((topic) => topic.id === id);

  // Set document title
  useDocumentTitle(
    currentTopic ? `${currentTopic.title} | E-wasteHub` : 'Edukasi | E-wasteHub'
  );

  // If topic not found, show 404-like message
  if (!currentTopic) {
    return (
      <MainLayout>
        <div
          className={`min-h-screen flex items-center justify-center px-4 ${
            isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
          }`}
        >
          <div className='text-center'>
            <h1
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Konten Tidak Ditemukan
            </h1>
            <p
              className={`text-lg mb-8 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Maaf, konten edukasi yang Anda cari tidak tersedia.
            </p>
            <Link
              to='/edukasi'
              className='inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors'
            >
              <ArrowLeft size={20} />
              Kembali ke Edukasi
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { Icon } = currentTopic;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className={`px-4 py-12 mt-12 sm:py-16 ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <Motion.div
            className='flex items-center gap-2 mb-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to='/edukasi'
              className={`flex items-center gap-1 text-sm transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-green-400'
                  : 'text-slate-600 hover:text-green-600'
              }`}
            >
              <ArrowLeft size={16} />
              Kembali ke Edukasi
            </Link>
          </Motion.div>

          {/* Content Header */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <Badge variant='soft' color='green' size='md' className='mb-4'>
              <Tag className='w-4 h-4 mr-2' />
              {currentTopic.category}
            </Badge>

            {/* Title */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {currentTopic.title}
            </h1>

            {/* Meta Info */}
            <div className='flex items-center gap-4 mb-8'>
              <div className='flex items-center gap-2'>
                <Clock
                  size={16}
                  className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                />
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  5 menit baca
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <BookOpen
                  size={16}
                  className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                />
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Artikel Edukasi
                </span>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section
        className={`px-4 py-8 sm:py-12 ${
          isDarkMode ? 'bg-slate-900/50' : 'bg-white'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Motion.article
            className='prose prose-lg max-w-none'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Icon and Description */}
            <div
              className={`flex items-start gap-6 p-6 rounded-2xl mb-8 ${
                isDarkMode
                  ? 'bg-slate-800/50 border border-slate-700/50'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              {Icon && (
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'bg-green-500/10' : 'bg-green-100'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>
              )}
              <div>
                <h2
                  className={`text-xl font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Ringkasan
                </h2>
                <p
                  className={`text-base leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {currentTopic.description}
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              <div className='space-y-6'>
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Mengapa Topik Ini Penting?
                  </h2>
                  <p className='text-lg leading-relaxed mb-4'>
                    Pemahaman mendalam tentang "
                    {currentTopic.title.toLowerCase()}" sangat penting dalam
                    upaya pengelolaan sampah elektronik yang berkelanjutan.
                    Topik ini membantu kita memahami dampak nyata dari tindakan
                    kita terhadap lingkungan.
                  </p>
                </div>

                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Langkah-Langkah Praktis
                  </h2>
                  <div className='space-y-4'>
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-slate-800/30' : 'bg-green-50'
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-green-400' : 'text-green-700'
                        }`}
                      >
                        1. Pahami Konsep Dasar
                      </h3>
                      <p>
                        Mulai dengan memahami definisi dan karakteristik dasar
                        dari topik ini. Kenali tanda-tanda dan ciri-ciri yang
                        dapat Anda amati dalam kehidupan sehari-hari.
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-slate-800/30' : 'bg-green-50'
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-green-400' : 'text-green-700'
                        }`}
                      >
                        2. Terapkan dalam Kehidupan Sehari-hari
                      </h3>
                      <p>
                        Implementasikan pengetahuan yang telah dipelajari dalam
                        aktivitas harian. Mulai dari hal-hal kecil yang dapat
                        memberikan dampak positif.
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-slate-800/30' : 'bg-green-50'
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-green-400' : 'text-green-700'
                        }`}
                      >
                        3. Bagikan Pengetahuan
                      </h3>
                      <p>
                        Sebarkan pemahaman kepada keluarga, teman, dan komunitas
                        sekitar. Semakin banyak orang yang memahami, semakin
                        besar dampak positif yang tercipta.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Manfaat Jangka Panjang
                  </h2>
                  <p className='text-lg leading-relaxed'>
                    Dengan memahami dan menerapkan konsep dalam "
                    {currentTopic.title.toLowerCase()}", Anda berkontribusi pada
                    terciptanya lingkungan yang lebih sehat dan berkelanjutan.
                    Setiap tindakan kecil yang dilakukan hari ini akan
                    memberikan dampak positif bagi generasi mendatang.
                  </p>
                </div>
              </div>
            </div>
          </Motion.article>

          {/* Call to Action */}
          <Motion.div
            className='mt-12 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className={`p-8 rounded-2xl ${
                isDarkMode
                  ? 'bg-slate-800/50 border border-slate-700/50'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Siap Mengambil Langkah Selanjutnya?
              </h3>
              <p
                className={`text-base mb-6 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Jelajahi topik edukasi lainnya dan mulai berkontribusi pada
                pengelolaan sampah elektronik yang berkelanjutan.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  to='/edukasi'
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-slate-900'
                  }`}
                >
                  Lihat Edukasi Lainnya
                </Link>
                <Link
                  to='/register'
                  className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors'
                >
                  Mulai Berkontribusi
                </Link>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiDetailPage;
