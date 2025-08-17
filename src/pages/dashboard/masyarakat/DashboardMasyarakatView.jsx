import { Calendar, MapPin, Plus, Search, Star, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import Loading from '../../../components/elements/Loading';
import SapaanDashboard from '../../../components/elements/SapaanDashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  getDashboardData,
  getRiwayatTerbaru,
  getUserProfile,
} from '../../../services/dashboardMasyarakatService';

const DashboardMasyarakatView = () => {
  // State management
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [riwayatTerbaru, setRiwayatTerbaru] = useState([]);

  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  useDocumentTitle('Dashboard Masyarakat');

  // Handler untuk melihat semua riwayat
  const handleLihatSemuaRiwayat = () => {
    navigate('/dashboard/riwayat');
  };

  // Handler untuk navigasi akses cepat
  const handleBuatPermintaan = () => {
    navigate('/dashboard/masyarakat/penjemputan');
  };

  const handleLacakPenjemputan = () => {
    navigate('/dashboard/masyarakat/lacak');
  };

  // Function untuk format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Function untuk mendapatkan status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'secondary', text: 'Menunggu' },
      dalam_proses: { variant: 'warning', text: 'Dalam Proses' },
      dijemput: { variant: 'warning', text: 'Dijemput' },
      selesai: { variant: 'success', text: 'Selesai' },
      dibatalkan: { variant: 'danger', text: 'Dibatalkan' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant={config.variant} size='sm'>
        {config.text}
      </Badge>
    );
  };

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load data in parallel
      const [dashboardResponse, profileResponse, riwayatResponse] =
        await Promise.all([
          getDashboardData(),
          getUserProfile(),
          getRiwayatTerbaru(3),
        ]);

      // Extract data from API responses with fallbacks
      setDashboardData(dashboardResponse?.data || null);
      setUserProfile(profileResponse?.data || null);
      setRiwayatTerbaru(
        Array.isArray(riwayatResponse?.data) ? riwayatResponse.data : []
      );
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Loading
        size='xl'
        isDarkMode={isDarkMode}
        text='Memuat dashboard...'
        className='absolute inset-0 flex items-center justify-center'
      />
    );
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0'>
      {/* Greeting Header */}
      <SapaanDashboard
        userProfile={userProfile}
        isDarkMode={isDarkMode}
        isLoading={isLoading}
      />

      {/* Card Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {/* Total Poin */}
        <div className='md:col-span-2 lg:col-span-1'>
          <Card>
            <Card.Body className='text-center py-4 md:py-6'>
              <div className='flex flex-col items-center space-y-3 md:space-y-4'>
                <div
                  className={`p-3 md:p-4 rounded-full ${
                    isDarkMode ? 'bg-green-500/10' : 'bg-green-50'
                  }`}
                >
                  <Star
                    className={`w-6 h-6 md:w-8 md:h-8 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-base md:text-lg font-medium mb-1 md:mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Total Poin Anda
                  </p>
                  <p
                    className={`text-3xl md:text-4xl pb-1 md:pb-2 font-bold ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    {dashboardData?.statistics?.find((s) =>
                      s.title.toLowerCase().includes('poin')
                    )?.value || '0'}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Akses Cepat */}
        <div className='md:col-span-2 lg:col-span-2'>
          <Card>
            <Card.Body className='py-4 md:py-6'>
              <h3
                className={`text-base md:text-lg font-semibold mb-3 md:mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Akses Cepat
              </h3>
              <div className='grid grid-cols-2 gap-3 md:gap-4'>
                {/* Buat Permintaan */}
                <Button
                  onClick={handleBuatPermintaan}
                  variant='outline'
                  className={`h-16 md:h-20 flex flex-col items-center justify-center space-y-1 md:space-y-2 border-2 ${
                    isDarkMode
                      ? 'border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10'
                      : 'border-green-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <Plus
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    Buat Permintaan
                  </span>
                </Button>

                {/* Lacak Penjemputan */}
                <Button
                  onClick={handleLacakPenjemputan}
                  variant='outline'
                  className={`h-16 md:h-20 flex flex-col items-center justify-center space-y-1 md:space-y-2 border-2 ${
                    isDarkMode
                      ? 'border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10'
                      : 'border-green-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <Search
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    Lacak Penjemputan
                  </span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div>
        {/* Riwayat Penjemputan Terbaru */}
        <Card>
          <Card.Body className='p-4 md:p-6'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 md:mb-4 space-y-2 sm:space-y-0'>
              <h3
                className={`text-base md:text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Riwayat Penjemputan Terbaru
              </h3>
              {(riwayatTerbaru || []).length > 0 && (
                <Button
                  onClick={handleLihatSemuaRiwayat}
                  variant='primary'
                  size='sm'
                  className='!py-2'
                >
                  Lihat Semua
                </Button>
              )}
            </div>

            {(riwayatTerbaru || []).length === 0 ? (
              <div className='text-center py-6 md:py-8'>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Belum ada riwayat penjemputan
                </p>
              </div>
            ) : (
              <div className='space-y-3 md:space-y-4'>
                {(riwayatTerbaru || []).slice(0, 2).map((riwayat, index) => (
                  <div
                    key={riwayat.id_penjemputan || riwayat.id || index}
                    className={`p-3 md:p-4 rounded-lg border transition-all hover:shadow-md ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className='space-y-3 md:space-y-0'>
                      <div className='flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0'>
                        <div className='flex-1'>
                          <h3
                            className={`font-semibold text-base md:text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {riwayat.kode_penjemputan ||
                              `EWH-${String(index + 1).padStart(3, '0')}`}
                          </h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <Calendar
                              className={`w-3 h-3 md:w-4 md:h-4 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            />
                            <span
                              className={`text-xs md:text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {formatDate(
                                riwayat.tanggal_permintaan ||
                                  riwayat.waktu_ditambah ||
                                  riwayat.tanggal
                              )}
                            </span>
                          </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0'>
                          <div className='order-2 sm:order-1'>
                            {getStatusBadge(riwayat.status)}
                          </div>
                          <div className='flex items-center gap-1 order-1 sm:order-2'>
                            <Star className='w-3 h-3 md:w-4 md:h-4 text-green-500' />
                            <span
                              className={`text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {riwayat.total_poin || 0} poin
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4'>
                        <div>
                          <p
                            className={`text-xs font-medium mb-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Kurir:
                          </p>
                          <div className='flex items-center gap-2'>
                            <User
                              className={`w-3 h-3 md:w-4 md:h-4 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            />
                            <span
                              className={`text-xs md:text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {riwayat.kurir || 'Belum ditentukan'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p
                            className={`text-xs font-medium mb-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Lokasi:
                          </p>
                          <div className='flex items-start gap-2'>
                            <MapPin
                              className={`w-3 h-3 md:w-4 md:h-4 mt-0.5 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            />
                            <span
                              className={`text-xs md:text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {riwayat.alamat_jemput ||
                                riwayat.alamat ||
                                'Alamat tidak tersedia'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0'>
                        <div className='flex items-center gap-3 md:gap-4 text-xs'>
                          <span
                            className={`${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {(riwayat.sampah || []).length} item sampah
                          </span>
                          {riwayat.dropbox && (
                            <span
                              className={`${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Dropbox: {riwayat.dropbox}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMasyarakatView;
