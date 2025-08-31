import { Activity, Package, Users } from 'lucide-react';
import { SapaanDashboard } from '../../../components/elements';
import { StatCard } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePengguna from '../../../hooks/usePengguna';

const AdminDashboardView = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna } = usePengguna();
  useDocumentTitle('Dashboard Admin');

  // Sample statistics data
  const statistikPengguna = {
    totalPengguna: 1248,
    penggunaBaru: 23,
    mitraKurir: 45,
    penggunaAktif: 892,
  };

  const statistikTransaksi = {
    totalTransaksi: 3456,
    transaksiHariIni: 18,
    transaksiSelesai: 3201,
    transaksiPending: 255,
    totalPoinTerdistribusi: 125400,
  };

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className='space-y-6'>
        {/* Header Section */}
        <SapaanDashboard
          pengguna={pengguna}
          subtitle={
            <span>
              Selamat datang di dashboard Admin EWasteHub. Selamat bekerja.
            </span>
          }
        />

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <StatCard
            label='Total Pengguna'
            value={statistikPengguna.totalPengguna}
            icon={<Users className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
          <StatCard
            label='Pengguna Aktif'
            value={statistikPengguna.penggunaAktif}
            icon={<Activity className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
          <StatCard
            label='Total Transaksi'
            value={statistikTransaksi.totalTransaksi}
            icon={<Package className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
