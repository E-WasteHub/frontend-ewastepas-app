import useDarkMode from '../../../hooks/useDarkMode';
import RequestDetail from './RequestDetail';

const RequestList = ({ requests, onSelect, selectedId }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-4'>
      {requests.map((req) => {
        const isSelected = selectedId === req.id;
        return (
          <div
            key={req.id}
            className={`rounded-lg border transition ${
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
            <div className='flex justify-between items-start p-4'>
              <div>
                <p
                  className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {req.id}
                </p>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-xs`}
                >
                  {req.tanggal}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  Kurir: <span className='font-medium'>{req.kurir}</span>
                </p>
                <p
                  className={
                    isDarkMode
                      ? 'text-gray-200 text-sm'
                      : 'text-gray-800 text-sm'
                  }
                >
                  Lokasi: {req.lokasi}
                </p>
              </div>
              <div className='text-right'>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    req.status === 'Selesai'
                      ? isDarkMode
                        ? 'bg-green-900/70 text-green-400'
                        : 'bg-green-100 text-green-700'
                      : req.status === 'Dibatalkan'
                      ? isDarkMode
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-red-100 text-red-700'
                      : isDarkMode
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {req.status}
                </span>
                <p className='text-xs mt-1 text-yellow-500'>
                  ⭐ {req.poin} poin
                </p>
              </div>
            </div>

            {/* Tombol toggle detail */}
            <button
              onClick={() => onSelect(isSelected ? null : req)}
              className={`w-full px-4 py-2 border-t flex items-center justify-end text-sm ${
                isDarkMode
                  ? 'border-gray-700 text-green-400 hover:bg-gray-700/30'
                  : 'border-gray-200 text-green-700 hover:bg-green-50'
              }`}
            >
              {isSelected ? 'Tutup Detail' : 'Lihat Detail'}
              <span className='px-2'>{isSelected ? '▲' : '▼'}</span>
            </button>

            {/* Detail expand */}
            {isSelected && <RequestDetail request={req} />}
          </div>
        );
      })}
    </div>
  );
};

export default RequestList;
