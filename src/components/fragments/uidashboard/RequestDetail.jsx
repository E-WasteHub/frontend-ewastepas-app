import useDarkMode from '../../../hooks/useDarkMode';
import Timeline from './Timeline';

const RequestDetail = ({ request }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`px-4 py-3 border-t text-sm ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      {/* Informasi Detail */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Kode Penjemputan
          </p>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium'
                : 'text-gray-900 font-medium'
            }
          >
            {request.id}
          </p>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Status
          </p>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
              request.status === 'Selesai'
                ? isDarkMode
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-green-100 text-green-700'
                : request.status === 'Dibatalkan'
                ? isDarkMode
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-red-100 text-red-700'
                : isDarkMode
                ? 'bg-yellow-900/30 text-yellow-400'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {request.status}
          </span>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tanggal Permintaan
          </p>
          <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
            {request.tanggal}
          </p>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Poin
          </p>
          <p className='text-yellow-500 font-medium'>⭐ {request.poin}</p>
        </div>
      </div>

      {/* Alamat */}
      <div className='mb-4'>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Alamat Penjemputan
        </p>
        <p
          className={
            isDarkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'
          }
        >
          {request.lokasi}
        </p>
      </div>

      {/* Timeline */}
      {request.timeline && (
        <div className='mb-4'>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium mb-2'
                : 'text-gray-900 font-medium mb-2'
            }
          >
            Timeline Penjemputan
          </p>
          <Timeline steps={request.timeline} />
        </div>
      )}

      {/* Daftar Sampah */}
      {request.items && request.items.length > 0 && (
        <div className='mb-4'>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium mb-2'
                : 'text-gray-900 font-medium mb-2'
            }
          >
            Daftar Sampah
          </p>
          <div className='space-y-2'>
            {request.items.map((item, i) => (
              <div
                key={i}
                className={`p-2 rounded flex justify-between ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100'
                }`}
              >
                <div>
                  <p
                    className={
                      isDarkMode
                        ? 'text-white font-medium'
                        : 'text-gray-900 font-medium'
                    }
                  >
                    {item.nama}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } text-xs`}
                  >
                    {item.kategori}
                  </p>
                </div>
                <p className='text-yellow-500 text-sm'>⭐ {item.poin}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {request.feedback && (
        <div>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium mb-2'
                : 'text-gray-900 font-medium mb-2'
            }
          >
            Feedback
          </p>
          <div
            className={`p-2 rounded ${
              isDarkMode
                ? 'bg-gray-700/30 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {request.feedback}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetail;
