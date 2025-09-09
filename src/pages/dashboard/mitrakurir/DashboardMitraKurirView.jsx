// src/views/dashboard/mitra-kurir/DashboardMitraKurirView.jsx
import { ArrowRight, Package, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, Card, Loading } from '../../../components/elements';
import {
  PenjemputanKurirCard,
  SapaanDashboard,
  StatCard,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir from '../../../hooks/useMitraKurir';
import usePengguna from '../../../hooks/usePengguna';

const DashboardMitraKurirView = () => {
  useDocumentTitle('Dashboard Mitra Kurir');
  const { isDarkMode } = useDarkMode();
  const { pengguna } = usePengguna();

  // data dan actions
  const { penjemputanTersedia, stats, isLoading, error } = useMitraKurir();

  const safeStats = stats || {
    tersedia: 0,
    penjemputanBulanIni: 0,
    totalPenjemputan: 0,
  };

  return (
    <div
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <SapaanDashboard
        pengguna={pengguna}
        subtitle={
          <span>
            Selamat datang di dashboard Mitra Kurir EWasteHub. Semangat bekerja
            💪
          </span>
        }
      />
      {error && <Alert type='error' message={error} />}

      {/* Statistik Card */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6`}>
        <StatCard
          label='Penjemputan Tersedia'
          value={safeStats.penjemputanTersedia}
          icon={<Star className='w-6 h-6 text-green-500' />}
          useCard={false}
        />
        <StatCard
          label='Penjemputan bulan ini'
          value={safeStats.penjemputanBulanIni}
          icon={<Package className='w-6 h-6 text-green-500' />}
          useCard={false}
        />
        <StatCard
          label='Total Penjemputan'
          value={safeStats.totalPenjemputan}
          icon={<Package className='w-6 h-6 text-green-500' />}
          useCard={false}
        />
      </div>

      {/* Daftar Permintaan Terbaru */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border`}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-3'>
            <h2
              className={`text-lg font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Permintaan Penjemputan Terbaru
            </h2>
            <Link
              to='/dashboard/mitra-kurir/daftar-permintaan'
              className='text-green-600 hover:text-green-500 text-sm flex items-center gap-1'
            >
              <span>Lihat Semua</span>
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          {isLoading ? (
            <Loading mode='inline' text='Memuat data...' />
          ) : penjemputanTersedia.length === 0 ? (
            <div className='text-center py-8'>
              <Truck
                className={`mx-auto h-12 w-12 ${
                  isDarkMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              />
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Belum ada permintaan penjemputan
              </p>
            </div>
          ) : (
            <div className='grid gap-4'>
              {penjemputanTersedia.slice(0, 3).map((req) => (
                <PenjemputanKurirCard
                  key={req.id_penjemputan}
                  req={req}
                  onAmbil={undefined}
                  isAktif={false}
                  disabled={true}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMitraKurirView;
