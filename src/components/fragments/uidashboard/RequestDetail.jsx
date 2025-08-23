// src/components/fragments/uidashboard/RequestDetail.jsx
import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Button } from '../../elements';
import { AlertModal, ConfirmDialog, Timeline } from '../../fragments';

const RequestDetail = ({ request, role = 'masyarakat', onUpdateStatus }) => {
  const { isDarkMode } = useDarkMode();
  const [dialog, setDialog] = useState({ open: false, action: null });
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    type: '',
  });

  // 🔹 Mapping status kurir → aksi selanjutnya
  const nextStatusMap = {
    'Menunggu Kurir': {
      label: 'Ambil Penjemputan',
      next: 'Dijemput Kurir',
      desc: 'Kurir sudah mengambil barang',
      color: 'bg-green-600 hover:bg-green-700 text-white',
    },
    'Dijemput Kurir': {
      label: 'Antar ke Dropbox',
      next: 'Diantar Kurir ke Dropbox',
      desc: 'Barang diantar ke dropbox',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    'Diantar Kurir ke Dropbox': {
      label: 'Selesaikan Penjemputan',
      next: 'Selesai',
      desc: 'Penjemputan selesai',
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
  };

  // 🔹 Handler konfirmasi
  const handleConfirm = () => {
    if (dialog.action === 'cancel') {
      // Case masyarakat membatalkan
      const updated = {
        ...request,
        status: 'Dibatalkan',
        timeline: [
          ...(request.timeline || []),
          {
            status: 'Dibatalkan',
            desc: 'Penjemputan dibatalkan oleh masyarakat',
            time: new Date().toLocaleTimeString(),
          },
        ],
      };
      onUpdateStatus?.(updated);
      setDialog({ open: false, action: null });
      setAlert({
        open: true,
        title: 'Dibatalkan',
        message: `Penjemputan ${request.id} berhasil dibatalkan.`,
        type: 'error',
      });
      return;
    }

    // Case kurir melanjutkan ke tahap berikutnya
    const next = nextStatusMap[request.status];
    if (!next) {
      setDialog({ open: false, action: null });
      return;
    }

    const updated = {
      ...request,
      status: next.next,
      timeline: [
        ...(request.timeline || []),
        {
          status: next.next,
          desc: next.desc,
          time: new Date().toLocaleTimeString(),
        },
      ],
    };

    onUpdateStatus?.(updated);
    setDialog({ open: false, action: null });
    setAlert({
      open: true,
      title: 'Berhasil',
      message: `Status penjemputan ${request.id} diperbarui menjadi "${next.next}".`,
      type: 'success',
    });
  };

  return (
    <div
      className={`px-4 py-5 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Kiri */}
        <div className='space-y-5'>
          {/* Daftar Sampah */}
          <div>
            <p
              className={`font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } text-base`}
            >
              Daftar Sampah
            </p>
            {request.items?.length > 0 ? (
              <ul className='list-disc list-inside space-y-1 text-sm'>
                {request.items.map((item, idx) => (
                  <li
                    key={idx}
                    className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                  >
                    {item.nama} ({item.kategori}) - {item.poin} poin
                  </li>
                ))}
              </ul>
            ) : (
              <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                Tidak ada sampah tercatat
              </p>
            )}
          </div>

          {/* Waktu */}
          <div>
            <p
              className={`font-medium mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } text-base`}
            >
              Waktu Penjemputan
            </p>
            <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
              {request.tanggal}
            </p>
          </div>

          {/* Catatan Kurir */}
          {request.feedback && (
            <div>
              <p
                className={`font-medium mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } text-base`}
              >
                Catatan Kurir
              </p>
              <p
                className={`italic text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                "{request.feedback}"
              </p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <p
            className={`font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } text-base`}
          >
            Timeline Penjemputan
          </p>
          <Timeline currentStatus={request.status} steps={request.timeline} />
        </div>
      </div>

      {/* Tombol aksi */}
      <div className='mt-6 flex justify-end gap-3'>
        {role === 'mitra-kurir' && nextStatusMap[request.status] && (
          <Button
            onClick={() => setDialog({ open: true, action: request.status })}
            className={nextStatusMap[request.status].color}
          >
            {nextStatusMap[request.status].label}
          </Button>
        )}

        {role === 'masyarakat' &&
          request.status !== 'Selesai' &&
          request.status !== 'Dibatalkan' && (
            <Button
              onClick={() => setDialog({ open: true, action: 'cancel' })}
              className='bg-red-500 hover:bg-red-600 text-white'
            >
              Batalkan Penjemputan
            </Button>
          )}
      </div>

      {/* Confirm dialog */}
      <ConfirmDialog
        isOpen={dialog.open}
        onClose={() => setDialog({ open: false, action: null })}
        onConfirm={handleConfirm}
        title='Konfirmasi'
        message={
          dialog.action === 'cancel'
            ? `Apakah Anda yakin ingin membatalkan penjemputan ${request.id}?`
            : `Apakah Anda yakin ingin melanjutkan ke tahap berikutnya untuk ${request.id}?`
        }
        confirmText={
          dialog.action === 'cancel' ? 'Ya, Batalkan' : 'Ya, Lanjutkan'
        }
        confirmColor={
          dialog.action === 'cancel'
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : nextStatusMap[request.status]?.color || 'bg-green-600 text-white'
        }
      />

      {/* Alert modal */}
      <AlertModal
        isOpen={alert.open}
        onClose={() =>
          setAlert({ open: false, title: '', message: '', type: '' })
        }
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};

export default RequestDetail;
