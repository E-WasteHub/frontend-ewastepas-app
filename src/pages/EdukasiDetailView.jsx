// src/views/EdukasiDetailView.jsx
import { ArrowLeft, BookOpen, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../components/elements';
import MainLayout from '../components/layouts/MainLayout';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useOfflineEdukasi from '../hooks/useOfflineEdukasi';

const EdukasiDetailView = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const { isOnline, getEdukasiDetail, isEdukasiCached } = useOfflineEdukasi();

  const [artikel, setArtikel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useDocumentTitle('Detail Edukasi | EwasteHub');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getEdukasiDetail(id);
        setArtikel(data);
      } catch (err) {
        setError(err.message || 'Gagal memuat detail edukasi');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id, getEdukasiDetail]);

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

            {!isOnline ? (
              <div
                className={`border rounded-lg p-8 ${
                  isDarkMode
                    ? 'bg-amber-900/20 border-amber-700'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <WifiOff className='w-16 h-16 mx-auto mb-4 text-amber-600' />
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-800'
                  }`}
                >
                  Konten Tidak Tersedia Offline
                </h2>
                <p
                  className={`mb-4 ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}
                >
                  {error}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}
                >
                  Sambungkan internet atau kembali ke halaman edukasi untuk
                  menyimpan konten offline
                </p>
              </div>
            ) : (
              <p className='text-red-500 py-10'>{error}</p>
            )}
          </div>
        </section>
      </MainLayout>
    );
  }

  if (!artikel) {
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

          {/* Thumbnail */}
          {artikel.gambar && (
            <div className='mb-6'>
              <img
                src={artikel.gambar}
                alt={artikel.judul_konten}
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          )}

          {/* Judul (pakai Tailwind responsive) */}
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

          {/* Footer dengan status offline */}
          <div className='mt-10 flex items-center justify-between'>
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <BookOpen className='w-4 h-4' />
              Artikel edukasi dari EwasteHub
            </div>

            {!isOnline && isEdukasiCached(id) && (
              <div
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
                  isDarkMode
                    ? 'bg-amber-900/30 text-amber-400'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <WifiOff className='w-3 h-3' />
                Disimpan offline
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiDetailView;
