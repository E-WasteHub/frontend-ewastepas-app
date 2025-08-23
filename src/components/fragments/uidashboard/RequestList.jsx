// src/components/fragments/uidashboard/RequestList.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import RequestDetail from './RequestDetail';

const RequestList = ({
  requests,
  onSelect,
  selectedId,
  role,
  onUpdateStatus,
}) => {
  const { isDarkMode } = useDarkMode();

  // 🔹 Filter khusus kurir → cuma 1 ongoing job
  const activeForKurir =
    role === 'mitra-kurir'
      ? requests.find((r) =>
          ['Dijemput Kurir', 'Diantar Kurir ke Dropbox'].includes(r.status)
        )
      : null;

  const visibleRequests = activeForKurir ? [activeForKurir] : requests;

  return (
    <div className='space-y-5'>
      {visibleRequests.map((req) => {
        const isSelected = selectedId === req.id;

        return (
          <div
            key={req.id}
            className={`rounded-lg border transition overflow-hidden shadow-sm ${
              isSelected
                ? isDarkMode
                  ? 'border-green-500 bg-slate-800/60'
                  : 'border-green-400 bg-slate-50'
                : isDarkMode
                ? 'bg-gray-800/40 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Ringkasan */}
            <div className='flex flex-col sm:flex-row justify-between gap-4 p-5'>
              {/* Info kiri */}
              <div className='space-y-2 text-sm'>
                <p
                  className={`font-semibold text-base ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Kode Penjemputan:{' '}
                  <span className='text-green-500'>{req.id}</span>
                </p>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-xs`}
                >
                  Tanggal Penjemputan: {req.tanggal}
                </p>

                <p
                  className={`${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  } text-sm`}
                >
                  {role === 'masyarakat' ? (
                    <>
                      Kurir:{' '}
                      <span className='font-medium'>{req.kurir || '-'}</span>
                    </>
                  ) : (
                    <>
                      Masyarakat:{' '}
                      <span className='font-medium'>
                        {req.masyarakat || '-'}
                      </span>
                    </>
                  )}
                </p>

                <p
                  className={`line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } text-sm`}
                >
                  Alamat: {req.lokasi}
                </p>
              </div>

              {/* Info kanan */}
              <div className='text-right space-y-2 sm:min-w-[130px]'>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-md font-medium ${
                    req.status === 'Selesai'
                      ? isDarkMode
                        ? 'bg-green-900/70 text-green-400'
                        : 'bg-green-100 text-green-700'
                      : req.status === 'Dibatalkan'
                      ? isDarkMode
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-red-100 text-red-700'
                      : req.status === 'Menunggu Kurir'
                      ? 'bg-blue-100 text-blue-600'
                      : req.status === 'Dijemput Kurir'
                      ? 'bg-orange-100 text-orange-600'
                      : req.status === 'Diantar Kurir ke Dropbox'
                      ? 'bg-purple-100 text-purple-600'
                      : isDarkMode
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {req.status}
                </span>
                <p className='text-sm text-green-500 font-semibold'>
                  {req.poin} poin
                </p>
              </div>
            </div>

            {/* Toggle detail */}
            <button
              onClick={() => onSelect(isSelected ? null : req)}
              className={`w-full px-5 py-3 text-xs sm:text-sm border-t flex items-center justify-center sm:justify-end gap-2 font-medium ${
                isDarkMode
                  ? 'border-gray-700 text-green-400 hover:bg-gray-700/30'
                  : 'border-gray-200 text-green-700 hover:bg-green-50'
              }`}
            >
              {isSelected ? 'Tutup Detail' : 'Lihat Detail'}
              <span className='text-xs'>{isSelected ? '▲' : '▼'}</span>
            </button>

            {isSelected && (
              <RequestDetail
                request={req}
                role={role}
                onUpdateStatus={onUpdateStatus}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RequestList;
