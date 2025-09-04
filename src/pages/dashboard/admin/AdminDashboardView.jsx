import { Package, Users } from 'lucide-react';
import DataTable from 'react-data-table-component';
import { SapaanDashboard } from '../../../components/elements';
import { StatCard } from '../../../components/fragments';
import useAdminMonitoring from '../../../hooks/useAdminMonitoring';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePengguna from '../../../hooks/usePengguna';
import * as penjemputanService from '../../../services/penjemputanService';

const AdminDashboardView = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna } = usePengguna();
  useDocumentTitle('Dashboard Admin');

  // pakai hook monitoring transaksi
  const {
    data: transaksi,
    isLoading,
    error,
  } = useAdminMonitoring(penjemputanService);

  // sementara: dummy statistik
  const statistikPengguna = {
    totalPengguna: 1248,
    mitraKurir: 45,
  };
  const statistikTransaksi = {
    totalTransaksi: 3456,
  };

  // ambil hanya 5 transaksi terbaru
  const transaksiTerbaru = Array.isArray(transaksi)
    ? transaksi.slice(0, 5)
    : [];

  const columns = [
    { name: 'Kode', selector: (row) => row.kode_penjemputan },
    { name: 'Masyarakat', selector: (row) => row.nama_masyarakat },
    { name: 'Kurir', selector: (row) => row.nama_kurir || '-' },
    { name: 'Status', selector: (row) => row.status_penjemputan },
    { name: 'Poin', selector: (row) => row.poin_penjemputan },
    { name: 'Tanggal', selector: (row) => row.waktu_ditambah },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className='space-y-6'>
        {/* Header */}
        <SapaanDashboard
          pengguna={pengguna}
          subtitle={
            <span>
              Selamat datang di dashboard Admin EWasteHub. Selamat bekerja.
            </span>
          }
        />

        {/* Statistik */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <StatCard
            label='Total Pengguna Masyarakat'
            value={statistikPengguna.totalPengguna}
            icon={<Users className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
          <StatCard
            label='Total Pengguna Mitra Kurir'
            value={statistikPengguna.mitraKurir}
            icon={<Users className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
          <StatCard
            label='Total Transaksi'
            value={statistikTransaksi.totalTransaksi}
            icon={<Package className='w-6 h-6 text-green-500' />}
            useCard={false}
          />
        </div>

        {/* Transaksi terbaru */}
        <div>
          <h2 className='text-xl font-bold mb-2'>Transaksi Terbaru</h2>
          {isLoading ? (
            <p>⏳ Memuat data...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={transaksiTerbaru}
              highlightOnHover
              striped
              dense
              pagination={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
