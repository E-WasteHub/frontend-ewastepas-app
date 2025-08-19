import { Gift, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import SapaanDashboard from '../../../components/elements/SapaanDashboard';
import { StatCard } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardMasyarakatView = ({ userProfile }) => {
  useDocumentTitle('Dashboard Masyarakat');
  const { isDarkMode } = useDarkMode();
  const [stats, setStats] = useState({
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  });

  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    // 🔹 Dummy data untuk simulasi
    const dummyRiwayat = [
      {
        id: 1,
        tanggal: '2025-08-15',
        jenis: 'Elektronik Kecil',
        status: 'Selesai',
        poin: 20,
      },
      {
        id: 2,
        tanggal: '2025-08-10',
        jenis: 'Baterai & Charger',
        status: 'Diproses',
        poin: 15,
      },
      {
        id: 3,
        tanggal: '2025-08-05',
        jenis: 'Laptop Rusak',
        status: 'Selesai',
        poin: 30,
      },
    ];

    setRiwayat(dummyRiwayat);

    // 🔹 Update statistik berdasarkan riwayat
    setStats({
      totalPoin: dummyRiwayat.reduce((sum, r) => sum + r.poin, 0),
      totalPenjemputan: dummyRiwayat.length,
      sedangBerlangsung: dummyRiwayat.filter((r) => r.status === 'Diproses')
        .length,
    });
  }, []);

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      {/* 🔹 Sapaan Dashboard */}
      <SapaanDashboard userProfile={userProfile} />

      {/* 🔹 Statistik */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <StatCard
          title='Total Poin'
          value={stats.totalPoin}
          color='text-green-600'
          icon={<Gift className='w-5 h-5 text-green-500' />}
        />
        <StatCard
          title='Total Penjemputan'
          value={stats.totalPenjemputan}
          color='text-blue-600'
          icon={<Truck className='w-5 h-5 text-blue-500' />}
        />
        <StatCard
          title='Penjemputan Sedang Berlangsung'
          value={stats.sedangBerlangsung}
          color='text-yellow-600'
          icon={<Truck className='w-5 h-5 text-yellow-500' />}
        />
      </div>

      {/* 🔹 Riwayat Penjemputan */}
      <div
        className={`shadow rounded-lg p-6 ${
          isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className='text-lg font-semibold mb-4'>Riwayat Penjemputan</h2>

        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr
                className={`text-left text-sm font-medium ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <th className='p-3 border-b'>Tanggal</th>
                <th className='p-3 border-b'>Jenis Sampah</th>
                <th className='p-3 border-b'>Status</th>
                <th className='p-3 border-b text-right'>Poin</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0 ? (
                riwayat.map((item) => (
                  <tr
                    key={item.id}
                    className={`text-sm ${
                      isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className='p-3 border-b'>{item.tanggal}</td>
                    <td className='p-3 border-b'>{item.jenis}</td>
                    <td className='p-3 border-b'>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            item.status === 'Selesai'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className='p-3 border-b text-right font-semibold'>
                      {item.poin}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className='p-4 text-center text-sm text-gray-500'
                  >
                    Belum ada riwayat penjemputan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardMasyarakatView;
