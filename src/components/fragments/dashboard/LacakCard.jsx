// src/components/fragments/lacak/LacakCard.jsx
import Card from '../../elements/Card';

const statusStyles = {
  'Menunggu Kurir': 'bg-yellow-100 text-yellow-700',
  'Dijemput Kurir': 'bg-blue-100 text-blue-700',
  'Diantar Kurir ke Dropbox': 'bg-indigo-100 text-indigo-700',
  Selesai: 'bg-green-100 text-green-700',
  Dibatalkan: 'bg-red-100 text-red-700',
  default: 'bg-gray-100 text-gray-700',
};

const LacakCard = ({ req, onDetail }) => {
  return (
    <Card className='rounded-lg border border-gray-300'>
      <div className='flex justify-between items-start p-4'>
        <div>
          <p className='font-semibold'>
            Kode: <span className='text-green-500'>{req.kode}</span>
          </p>
          <p className='text-xs text-gray-400'>
            Dibuat pada : {new Date(req.waktu).toLocaleString('id-ID')}
          </p>
          <p className='text-sm'>Alamat : {req.alamat}</p>
        </div>
        <div className='text-right'>
          <span
            className={`inline-block text-xs px-3 py-1 rounded-full ${
              statusStyles[req.status] || statusStyles.default
            }`}
          >
            {req.status}
          </span>
          {req.poin > 0 && (
            <p className='text-green-600 font-semibold'>+{req.poin} poin</p>
          )}
        </div>
      </div>

      <div className='border-t p-3 text-right'>
        <button
          onClick={onDetail}
          className='text-sm text-green-500 hover:underline'
        >
          Lihat Detail
        </button>
      </div>
    </Card>
  );
};

export default LacakCard;
