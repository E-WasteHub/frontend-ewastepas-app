import { ArrowLeft } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { kontenEdukasiDummy } from '../data'; // pakai dummy sesuai entity
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';

const EdukasiDetailView = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();

  // Cari konten berdasarkan id_konten
  const currentTopic = kontenEdukasiDummy.find(
    (topic) => String(topic.id_konten) === id
  );

  // Set document title
  useDocumentTitle(
    currentTopic
      ? `${currentTopic.judul_konten} | E-wasteHub`
      : 'Edukasi | E-wasteHub'
  );

  // Jika konten tidak ditemukan
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
            {/* Gambar */}
            {currentTopic.gambar && (
              <img
                src={currentTopic.gambar}
                alt={currentTopic.judul_konten}
                className='w-full h-64 object-cover rounded-xl mb-6'
              />
            )}

            {/* Title */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {currentTopic.judul_konten}
            </h1>
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
            <div
              className={`${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              } whitespace-pre-line`}
            >
              {currentTopic.isi_konten}
            </div>
          </Motion.article>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiDetailView;
