// src/views/masyarakat/DetailLacakPenjemputan.jsx
import { FileText, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Loading } from '../../../components/elements';
import {
  ConfirmModal,
  HeaderDashboard,
  ItemSampahCard,
  Timeline,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMasyarakat from '../../../hooks/useMasyarakat';
import useToast from '../../../hooks/useToast';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';
import {
  daftarLangkahStatus,
  dapatkanLangkahAktif,
} from '../../../utils/penjemputanUtils';

const DetailLacakPenjemputan = () => {
  useDocumentTitle('Detail Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { showAlert } = useToast();
  const { id_penjemputan } = useParams();
  const navigate = useNavigate();

  const {
    detail: detailPenjemputan,
    isLoadingDetail,
    fetchDetail,
    batalkan,
  } = useMasyarakat();

  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch detail sekali ketika id_penjemputan berubah
  useEffect(() => {
    if (id_penjemputan) {
      fetchDetail(id_penjemputan);
    }
  }, [id_penjemputan, fetchDetail]);

  if (isLoadingDetail) {
    return <Loading mode='overlay' text='Memuat detail penjemputan...' />;
  }

  if (!detailPenjemputan?.penjemputan) {
    return (
      <div className='p-6 text-center text-red-500'>
        Data penjemputan tidak ditemukan
      </div>
    );
  }

  const p = detailPenjemputan.penjemputan;
  const langkahAktif = dapatkanLangkahAktif(p);

  return (
    <div
      className={`max-w-7xl mx-auto space-y-3 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <HeaderDashboard
        title='Detail Penjemputan'
        subtitle='Detail lengkap untuk penjemputan sampah elektronik.'
      />

      {/* Card utama */}
      <Card
        className={`p-5 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Info penjemputan */}
        <section className='mb-3'>
          <h3 className='text-xl font-bold mb-2'>Informasi Penjemputan</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm'>
            {/* Kolom kiri */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Kode Penjemputan
                </span>
                <p className='font-normal'>{p.kode_penjemputan}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Tanggal Dibuat
                </span>
                <p>{formatTanggalIndonesia(p.waktu_ditambah)}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Alamat Penjemputan
                </span>
                <p>{p.alamat_penjemputan}</p>
              </div>
              {p.catatan && (
                <div>
                  <span className='text-xs font-semibold text-gray-400'>
                    Catatan Penjemputan
                  </span>
                  <p className='italic'>{p.catatan}</p>
                </div>
              )}
            </div>

            {/* Kolom kanan */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Perkiraan Waktu Jemput
                </span>
                <p>{p.waktu_operasional || '-'}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Nama Kurir
                </span>
                <p>{p.nama_kurir || 'Belum ditentukan'}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Dropbox Tujuan
                </span>
                <p>{p.nama_dropbox || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status + Detail sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <section>
            <h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' /> Status Penjemputan
            </h3>
            <Timeline
              steps={daftarLangkahStatus}
              currentStep={langkahAktif}
              isDarkMode={isDarkMode}
              detail={p}
            />
          </section>

          <section>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-green-500' /> Detail Sampah
            </h3>
            {detailPenjemputan.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  detailPenjemputan.sampah.length > 3
                    ? 'max-h-96 overflow-y-auto pr-2'
                    : ''
                }`}
              >
                {detailPenjemputan.sampah.map((s) => (
                  <ItemSampahCard
                    key={s.id_sampah}
                    data={s}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500'>Tidak ada data sampah</p>
            )}
          </section>
        </div>

        {/* Tombol batal */}
        {langkahAktif >= 0 && langkahAktif < 2 && (
          <div className='flex justify-end mt-6'>
            <Button
              type='button'
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => setConfirmOpen(true)}
            >
              Batalkan Penjemputan
            </Button>
          </div>
        )}
      </Card>

      {/* Modal konfirmasi */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const success = await batalkan(p.id_penjemputan);
          if (success) {
            setConfirmOpen(false);
            showAlert(
              'Berhasil',
              'Penjemputan berhasil dibatalkan.',
              'success'
            );
            setTimeout(() => navigate(-1), 1500);
          }
        }}
      />
    </div>
  );
};

export default DetailLacakPenjemputan;
