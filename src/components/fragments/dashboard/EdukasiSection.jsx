import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../elements/Button';
import Card from '../../elements/Card';

const EdukasiDashboardSection = ({ artikelTerbaru = [] }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLihatSemuaArtikel = () => {
    navigate('/edukasi');
  };

  const handleBacaArtikel = (artikelId) => {
    navigate(`/edukasi/${artikelId}`);
  };

  // Function untuk format tanggal
  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Function untuk truncate text
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card>
      <Card.Body className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <BookOpen
              className={`w-5 h-5 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            />
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Artikel Edukasi Terbaru
            </h3>
          </div>

          {artikelTerbaru.length > 0 && (
            <Button
              onClick={handleLihatSemuaArtikel}
              variant='primary'
              size='sm'
              className='!py-2'
            >
              Lihat Semua
            </Button>
          )}
        </div>

        {artikelTerbaru.length === 0 ? (
          <div className='text-center py-8'>
            <BookOpen
              className={`w-12 h-12 mx-auto mb-3 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
            />
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Belum ada artikel edukasi tersedia
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {artikelTerbaru.slice(0, 3).map((artikel, index) => (
              <div
                key={artikel.id_konten || artikel.id || index}
                className={`group cursor-pointer rounded-lg border transition-all hover:shadow-md ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                }`}
                onClick={() =>
                  handleBacaArtikel(artikel.id_konten || artikel.id)
                }
              >
                {/* Gambar Artikel */}
                {artikel.gambar && (
                  <div className='aspect-video w-full overflow-hidden rounded-t-lg'>
                    <img
                      src={artikel.gambar}
                      alt={artikel.judul_konten || artikel.judul}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className='p-4'>
                  {/* Judul Artikel */}
                  <h4
                    className={`font-semibold text-sm mb-2 line-clamp-2 group-hover:text-green-500 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {artikel.judul_konten || artikel.judul}
                  </h4>

                  {/* Excerpt */}
                  {artikel.isi_konten && (
                    <p
                      className={`text-xs mb-3 line-clamp-3 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {truncateText(
                        artikel.isi_konten.replace(/<[^>]*>/g, ''),
                        80
                      )}
                    </p>
                  )}

                  {/* Footer */}
                  <div className='flex items-center justify-between'>
                    <span
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {formatTanggal(
                        artikel.tanggal_dibuat ||
                          artikel.createdAt ||
                          new Date()
                      )}
                    </span>

                    <div className='flex items-center gap-1 text-green-500 group-hover:gap-2 transition-all'>
                      <span className='text-xs font-medium'>Baca</span>
                      <ArrowRight className='w-3 h-3' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EdukasiDashboardSection;
