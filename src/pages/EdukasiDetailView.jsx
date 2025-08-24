// src/views/EdukasiDetailView.jsx
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useEdukasiStore from '../store/edukasiStore';

const EdukasiDetailView = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const { detail, isLoading, error, fetchEdukasiDetail } = useEdukasiStore();

  useDocumentTitle(
    detail ? `${detail.judul_konten} | E-wasteHub` : 'Edukasi | E-wasteHub'
  );

  useEffect(() => {
    fetchEdukasiDetail(id);
  }, [id, fetchEdukasiDetail]);

  if (isLoading) {
    return <p className='text-center py-10'>Loading artikel...</p>;
  }

  if (error) {
    return <p className='text-center text-red-500 py-10'>{error}</p>;
  }

  if (!detail) {
    return (
      <p className='text-center text-slate-500 py-10'>
        Artikel tidak ditemukan
      </p>
    );
  }

  return (
    <MainLayout>
      <section
        className={`px-4 py-12 mt-12 ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Back button */}
          <Link
            to='/edukasi'
            className={`inline-flex items-center mb-6 text-sm font-medium ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-500'
            }`}
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Kembali ke Edukasi
          </Link>

          {/* Judul */}
          <h1
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {detail.judul_konten}
          </h1>

          {/* Thumbnail */}
          {detail.gambar && (
            <div className='mb-6'>
              <img
                src={detail.gambar}
                alt={detail.judul_konten}
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          )}

          {/* Isi konten */}
          <div
            className={`prose max-w-none ${
              isDarkMode ? 'prose-invert text-slate-300' : 'text-slate-700'
            }`}
            dangerouslySetInnerHTML={{ __html: detail.isi_konten }}
          />

          {/* Footer */}
          <div className='mt-10 flex items-center gap-2 text-sm text-slate-500'>
            <BookOpen className='w-4 h-4' />
            Artikel edukasi dari EwasteHub
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiDetailView;
