import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import Loading from '../../../components/elements/Loading';
import SapaanDashboard from '../../../components/elements/SapaanDashboard';
import StatCard from '../../../components/elements/StatCard';
import QuickActions from '../../../components/fragments/dashboard/QuickActions';
import RiwayatSection from '../../../components/fragments/dashboard/RiwayatSection';
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
  useDocumentTitle('Dashboard Masyarakat');

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load data in parallel - hanya yang diperlukan
      const [dashboardResponse, profileResponse, riwayatResponse] =
        await Promise.all([
          getDashboardData(),
          getUserProfile(),
          getRiwayatTerbaru(5), // Riwayat transaksi terakhir (5 terakhir)
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

  // Get total poin from dashboard data - sesuai UC-020: menampilkan total poin yang dimiliki
  const totalPoin =
    userProfile?.poin_pengguna ||
    dashboardData?.userProfile?.totalPoin ||
    dashboardData?.statistics?.find((s) =>
      s.title.toLowerCase().includes('poin')
    )?.value ||
    '0';

  return (
    <div className='max-w-7xl mx-auto space-y-6 px-4 md:px-0'>
      {/* Sapaan personal dengan nama masyarakat */}
      <SapaanDashboard userProfile={userProfile} />

      {/* Total poin dan Aksi Cepat */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Total Poin - Sebelah Kiri */}
        <StatCard
          icon={Star}
          title='Total Poin Anda'
          value={totalPoin}
          iconColor='green'
        />

        {/* Aksi Cepat - Sebelah Kanan */}
        <QuickActions />
      </div>

      {/* Riwayat Penjemputan Terbaru */}
      <RiwayatSection riwayatTerbaru={riwayatTerbaru} />
    </div>
  );
};

export default DashboardMasyarakatView;
