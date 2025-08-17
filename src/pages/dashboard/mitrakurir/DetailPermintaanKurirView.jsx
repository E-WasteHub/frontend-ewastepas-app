import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../components/elements/Alert';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DetailPermintaanKurirView = () => {
  useDocumentTitle('Detail Permintaan - E-WasteHub');
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();

  // State sesuai boundary class DetailPermintaanKurirView
  const [jenisSampahDipilih, setJenisSampahDipilih] = useState([]);
  const [alamat, setAlamat] = useState('');
  const [jadwal, setJadwal] = useState('');
  const [catatan, setCatatan] = useState('');
  const [detailPermintaan, setDetailPermintaan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusPermintaan, setStatusPermintaan] = useState('menunggu');

  // Fungsi sesuai boundary class
  const muatDetailPermintaan = async () => {
    try {
      setIsLoading(true);
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockDetail = {
        id: parseInt(id),
        kodePenjemputan: `EW-${String(id).padStart(3, '0')}`,
        namaPemesan: 'Budi Santoso',
        emailPemesan: 'budi.santoso@email.com',
        teleponPemesan: '+62 812-3456-7890',
        alamatLengkap:
          'Jl. Merdeka No. 123, RT 05/RW 03, Menteng, Jakarta Pusat 10310',
        waktuPenjemputan: '2024-08-15T09:00:00',
        jenisSampah: [
          {
            nama: 'Laptop Bekas',
            kategori: 'Elektronik Besar',
            estimasiPoin: 150,
            berat: '2 kg',
          },
          {
            nama: 'Smartphone',
            kategori: 'Elektronik Kecil',
            estimasiPoin: 100,
            berat: '0.5 kg',
          },
        ],
        catatanTambahan:
          'Laptop ada di lantai 2, smartphone di meja ruang tamu. Mohon hati-hati saat membawa.',
        estimasiTotalPoin: 250,
        jarak: '2.5 km',
        estimasiWaktuPerjalanan: '15 menit',
        status: 'menunggu',
      };

      setDetailPermintaan(mockDetail);
      setJenisSampahDipilih(mockDetail.jenisSampah);
      setAlamat(mockDetail.alamatLengkap);
      setJadwal(mockDetail.waktuPenjemputan);
      setCatatan(mockDetail.catatanTambahan);
      setStatusPermintaan(mockDetail.status);
      setError('');
    } catch (err) {
      setError('Gagal memuat detail permintaan');
      console.error('Error loading detail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const konfirmasiPengambilan = async () => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatusPermintaan('diambil');
      setDetailPermintaan((prev) => ({ ...prev, status: 'diambil' }));
    } catch (err) {
      setError('Gagal mengkonfirmasi pengambilan');
      console.error('Error confirming pickup:', err);
    }
  };

  const updateStatusPenjemputan = async (statusBaru) => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatusPermintaan(statusBaru);
      setDetailPermintaan((prev) => ({ ...prev, status: statusBaru }));

      if (statusBaru === 'selesai') {
        // Redirect ke dashboard setelah selesai
        setTimeout(() => {
          navigate('/dashboard/mitra-kurir');
        }, 2000);
      }
    } catch (err) {
      setError('Gagal mengupdate status penjemputan');
      console.error('Error updating status:', err);
    }
  };

  const batalkanPermintaan = async () => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatusPermintaan('dibatalkan');
      setDetailPermintaan((prev) => ({ ...prev, status: 'dibatalkan' }));
    } catch (err) {
      setError('Gagal membatalkan permintaan');
      console.error('Error canceling request:', err);
    }
  };

  useEffect(() => {
    muatDetailPermintaan();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memuat detail permintaan...
          </p>
        </div>
      </div>
    );
  }

  if (!detailPermintaan) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className='text-center'>
          <X
            className={`mx-auto h-12 w-12 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`}
          />
          <p
            className={`mt-4 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Permintaan tidak ditemukan
          </p>
          <Link to='/dashboard/mitra-kurir'>
            <Button className='mt-4' variant='outline'>
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      menunggu: { variant: 'secondary', text: 'Menunggu' },
      diambil: { variant: 'warning', text: 'Diambil' },
      dijemput: { variant: 'info', text: 'Dijemput' },
      diantar: { variant: 'info', text: 'Dalam Perjalanan' },
      selesai: { variant: 'success', text: 'Selesai' },
      dibatalkan: { variant: 'error', text: 'Dibatalkan' },
    };

    const config = statusConfig[status] || {
      variant: 'secondary',
      text: 'Unknown',
    };
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getActionButtons = () => {
    switch (statusPermintaan) {
      case 'menunggu':
        return (
          <div className='flex gap-3'>
            <Button
              onClick={konfirmasiPengambilan}
              className='bg-blue-600 hover:bg-blue-700 text-white flex-1'
            >
              <CheckCircle className='h-4 w-4 mr-2' />
              Ambil Tugas
            </Button>
            <Button
              onClick={batalkanPermintaan}
              variant='outline'
              className='border-red-300 text-red-600 hover:bg-red-50'
            >
              Batalkan
            </Button>
          </div>
        );
      case 'diambil':
        return (
          <div className='flex gap-3'>
            <Button
              onClick={() => updateStatusPenjemputan('dijemput')}
              className='bg-green-600 hover:bg-green-700 text-white flex-1'
            >
              <Truck className='h-4 w-4 mr-2' />
              Mulai Penjemputan
            </Button>
          </div>
        );
      case 'dijemput':
        return (
          <div className='flex gap-3'>
            <Button
              onClick={() => updateStatusPenjemputan('diantar')}
              className='bg-blue-600 hover:bg-blue-700 text-white flex-1'
            >
              <MapPin className='h-4 w-4 mr-2' />
              Dalam Perjalanan
            </Button>
          </div>
        );
      case 'diantar':
        return (
          <div className='flex gap-3'>
            <Button
              onClick={() => updateStatusPenjemputan('selesai')}
              className='bg-green-600 hover:bg-green-700 text-white flex-1'
            >
              <CheckCircle className='h-4 w-4 mr-2' />
              Selesaikan Tugas
            </Button>
          </div>
        );
      case 'selesai':
        return (
          <div className='text-center'>
            <CheckCircle className={`mx-auto h-8 w-8 text-green-500 mb-2`} />
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Tugas telah selesai! Terima kasih atas kerja kerasnya.
            </p>
          </div>
        );
      case 'dibatalkan':
        return (
          <div className='text-center'>
            <X className={`mx-auto h-8 w-8 text-red-500 mb-2`} />
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Permintaan telah dibatalkan.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            to='/dashboard/mitra-kurir'
            className={`inline-flex items-center text-sm ${
              isDarkMode
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-500'
            } mb-4`}
          >
            <ArrowLeft className='h-4 w-4 mr-1' />
            Kembali ke Dashboard
          </Link>

          <div className='flex items-center justify-between'>
            <div>
              <h1
                className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Detail Permintaan Penjemputan
              </h1>
              <p
                className={`mt-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {detailPermintaan.kodePenjemputan}
              </p>
            </div>
            {getStatusBadge(statusPermintaan)}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Detail Permintaan */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Informasi Pemesan */}
            <Card
              className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Informasi Pemesan
                </h3>
              </div>
              <div className='p-6 space-y-4'>
                <div className='flex items-center gap-3'>
                  <User
                    className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {detailPermintaan.namaPemesan}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {detailPermintaan.emailPemesan}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Phone
                    className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {detailPermintaan.teleponPemesan}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Nomor telepon
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lokasi dan Jadwal */}
            <Card
              className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Lokasi & Jadwal
                </h3>
              </div>
              <div className='p-6 space-y-4'>
                <div className='flex items-start gap-3'>
                  <MapPin
                    className={`h-5 w-5 mt-0.5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Alamat Penjemputan
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {alamat}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      } mt-1`}
                    >
                      Jarak: {detailPermintaan.jarak} • Est.{' '}
                      {detailPermintaan.estimasiWaktuPerjalanan}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Calendar
                    className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Jadwal Penjemputan
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {new Date(jadwal).toLocaleString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Daftar Sampah */}
            <Card
              className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Daftar Sampah Elektronik
                </h3>
              </div>
              <div className='p-6'>
                <div className='space-y-3'>
                  {jenisSampahDipilih.map((sampah, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        isDarkMode
                          ? 'border-gray-600 bg-gray-700'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-3'>
                          <Package
                            className={`h-5 w-5 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          />
                          <div>
                            <p
                              className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {sampah.nama}
                            </p>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {sampah.kategori} • {sampah.berat}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p
                            className={`font-medium ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}
                          >
                            {sampah.estimasiPoin} poin
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-4 pt-4 border-t ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <span
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Total Estimasi Poin
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      {detailPermintaan.estimasiTotalPoin} poin
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Catatan */}
            {catatan && (
              <Card
                className={`${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Catatan Tambahan
                  </h3>
                </div>
                <div className='p-6'>
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {catatan}
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Action Panel */}
          <div className='lg:col-span-1'>
            <Card
              className={`sticky top-8 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Status & Aksi
                </h3>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  <div className='text-center'>
                    <div
                      className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      {detailPermintaan.estimasiTotalPoin}
                    </div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Total Poin
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}
                  >
                    {getActionButtons()}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPermintaanKurirView;
