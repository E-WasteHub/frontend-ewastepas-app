import { CheckCircle, Clock, Package, Star } from 'lucide-react';
import StatCard from '../../elements/StatCard';

const StatsGrid = ({ dashboardData }) => {
  // Extract statistics from dashboard data
  const totalPoin =
    dashboardData?.userProfile?.totalPoin ||
    dashboardData?.statistics?.find((s) =>
      s.title.toLowerCase().includes('poin')
    )?.value ||
    '0';

  const totalTransaksi = dashboardData?.riwayatTerakhir?.length || 0;
  const transaksiSelesai =
    dashboardData?.riwayatTerakhir?.filter((t) => t.status === 'selesai')
      ?.length || 0;
  const transaksiAktif =
    dashboardData?.riwayatTerakhir?.filter((t) => t.status === 'dalam_proses')
      ?.length || 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <StatCard
        icon={Star}
        title='Total Poin'
        value={totalPoin}
        iconColor='green'
      />

      <StatCard
        icon={Package}
        title='Total Transaksi'
        value={totalTransaksi}
        iconColor='blue'
      />

      <StatCard
        icon={CheckCircle}
        title='Selesai'
        value={transaksiSelesai}
        iconColor='green'
      />

      <StatCard
        icon={Clock}
        title='Dalam Proses'
        value={transaksiAktif}
        iconColor='yellow'
      />
    </div>
  );
};

export default StatsGrid;
