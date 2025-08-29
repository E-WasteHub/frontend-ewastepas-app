// src/views/masyarakat/DashboardMasyarakatView.jsx
import { Gift, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, SapaanDashboard } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../../services/penjemputanService';

const DashboardMasyarakatView = ({ userProfile }) => {
  useDocumentTitle('Dashboard Masyarakat');
  const { isDarkMode } = useDarkMode();

  const [stats, setStats] = useState({
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Mapping status
  const mapStatus = (p) => {
    if (p.waktu_dibatalkan) return 'Dibatalkan';
    if (p.waktu_sampai) return 'Selesai';
    if (p.waktu_diantar) return 'Diantar Kurir ke Dropbox';
    if (p.waktu_diterima || p.waktu_dijemput) return 'Dijemput Kurir';
    return 'Menunggu Kurir';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 🔹 Ambil user dari localStorage → total poin
        const pengguna = JSON.parse(localStorage.getItem('pengguna'));
        const totalPoin = pengguna?.poin_pengguna || 0;

        // 🔹 Ambil riwayat penjemputan
        const res = await ambilRiwayatPenjemputan();
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        // 🔹 Ambil detail tiap penjemputan (untuk riwayat tampil poin & jenis sampah)
        const detailPromises = list.map(async (p) => {
          try {
            const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
            return {
              kodePenjemputan: p.kode_penjemputan,
              tanggal: new Date(p.waktu_ditambah).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
              jenisSampah:
                detailRes.data.sampah?.map((s) => s.nama_jenis) || [],
              alamat: p.alamat_jemput,
              kurir: p.nama_kurir || null,
              status: mapStatus(p),
              poin: detailRes.data.sampah?.reduce(
                (t, s) => t + (s.poin_sampah || 0),
                0
              ), // poin hanya tampil di list, bukan untuk total
            };
          } catch {
            return null;
          }
        });

        const mapped = (await Promise.all(detailPromises)).filter(Boolean);

        // 🔹 Hitung statistik (pakai totalPoin dari localStorage)
        const totalPenjemputan = mapped.length;
        const sedangBerlangsung = mapped.filter(
          (r) => r.status !== 'Selesai' && r.status !== 'Dibatalkan'
        ).length;

        setStats({ totalPoin, totalPenjemputan, sedangBerlangsung });
        setRequests(
          mapped.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
        );
      } catch (err) {
        console.error('❌ Error fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      } space-y-3`}
    >
      <SapaanDashboard
        userProfile={userProfile}
        subtitle='Selamat datang di EWasteHub. Yuk kelola e-waste kamu!'
      />

      {/* Statistik */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatCard
          label='Total Poin'
          value={stats.totalPoin}
          icon={<Gift className='w-6 h-6 text-green-500' />}
          isDarkMode={isDarkMode}
        />
        <StatCard
          label='Total Penjemputan'
          value={stats.totalPenjemputan}
          icon={<Truck className='w-6 h-6 text-green-500' />}
          isDarkMode={isDarkMode}
        />
        <StatCard
          label='Sedang Berlangsung'
          value={stats.sedangBerlangsung}
          icon={<Truck className='w-6 h-6 text-green-500' />}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Riwayat */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border`}
      >
        <div className='p-4 md:p-6 space-y-6'>
          <div className='flex justify-between items-center'>
            <h2
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Riwayat Penjemputan Terbaru
            </h2>
            <Link
              to='/dashboard/masyarakat/riwayat'
              className='text-sm font-medium text-green-600 hover:underline'
            >
              Lihat Semua
            </Link>
          </div>

          {loading ? (
            <p className='text-center text-gray-400'>⏳ Memuat data...</p>
          ) : requests.length > 0 ? (
            <div className='grid gap-4'>
              {requests.slice(0, 3).map((req) => (
                <RiwayatCard
                  key={req.kodePenjemputan}
                  req={req}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          ) : (
            <p
              className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Belum ada riwayat penjemputan
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

// Komponen kecil untuk statistik
const StatCard = ({ label, value, icon, isDarkMode }) => (
  <div
    className={`px-6 py-6 rounded-lg shadow-md ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}
  >
    <div className='flex items-center justify-between'>
      <div className='flex-1 text-center'>
        <p
          className={`text-md ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {label}
        </p>
        <p className='text-2xl font-bold text-green-500'>{value}</p>
      </div>
      <div
        className={`ml-4 p-3 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}
      >
        {icon}
      </div>
    </div>
  </div>
);

// Komponen kecil untuk riwayat
const RiwayatCard = ({ req, isDarkMode }) => {
  const statusColor =
    req.status === 'Selesai'
      ? 'bg-green-100 text-green-800'
      : req.status === 'Dibatalkan'
      ? 'bg-red-100 text-red-800'
      : req.status === 'Diantar Kurir ke Dropbox'
      ? 'bg-indigo-100 text-indigo-800'
      : req.status === 'Dijemput Kurir'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-yellow-100 text-yellow-800';

  return (
    <Card
      className={`p-6 md:p-5 rounded-lg border-2 transition hover:shadow ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h4
          className={`font-medium text-sm ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {req.kodePenjemputan}
        </h4>
        <span
          className={`inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs ${statusColor}`}
        >
          {req.status}
        </span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Tanggal:</span> {req.tanggal}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Jenis:</span>{' '}
          {req.jenisSampah?.join(', ') || '-'}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Kurir:</span>{' '}
          {req.kurir || 'Belum ditentukan'}
        </p>
        <p className='text-green-600 font-semibold'>{req.poin} poin</p>
        <p
          className={`col-span-1 sm:col-span-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } italic`}
        >
          {req.alamat}
        </p>
      </div>
    </Card>
  );
};

export default DashboardMasyarakatView;
