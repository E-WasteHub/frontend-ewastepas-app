// src/views/EdukasiDetailView.jsx
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../components/elements';
import MainLayout from '../components/layouts/MainLayout';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import * as edukasiService from '../services/edukasiService';

const EdukasiDetailView = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();

  const [artikel, setArtikel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useDocumentTitle('Detail Edukasi | Ewastepas');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await edukasiService.detailEdukasi(id);
        const data = res.data || res;
        setArtikel(data);
      } catch (err) {
        console.error('Error fetching edukasi detail:', err);
        setError(err.message || 'Gagal memuat detail edukasi');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (isLoading) {
    return <Loading mode='overlay' text='Loading artikel...' />;
  }

  if (error) {
    return (
      <MainLayout>
        <section
          className={`px-4 py-12 mt-12 ${
            isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
          }`}
        >
          <div className='max-w-4xl mx-auto text-center'>
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

            <p className='text-red-500 py-10'>{error}</p>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (!artikel) {
    return (
      <MainLayout>
        <p className='text-center text-slate-500 py-10'>
          Artikel tidak ditemukan
        </p>
      </MainLayout>
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

          {/* Thumbnail */}
          <div className='mb-6'>
            <img
              src={
                artikel.gambar_url ||
                'https://be.ewastepas.my.id/public/images/no-image.jpg'
              }
              alt={artikel.judul_konten}
              className='w-full h-64 object-cover rounded-lg'
            />
          </div>

          {/* Judul */}
          <h1
            className={`font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            } text-3xl sm:text-4xl`}
          >
            {artikel.judul_konten}
          </h1>

          {/* Isi konten */}
          <div
            className={`prose max-w-none ${
              isDarkMode ? 'prose-invert text-slate-300' : 'text-slate-700'
            }`}
            dangerouslySetInnerHTML={{ __html: artikel.isi_konten }}
          />

          {/* Footer */}
          <div className='mt-10 flex items-center justify-between'>
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <BookOpen className='w-4 h-4' />
              Artikel edukasi dari Ewastepas
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiDetailView;
