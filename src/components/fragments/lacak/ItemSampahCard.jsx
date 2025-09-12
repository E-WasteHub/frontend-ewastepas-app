// src/components/fragments/lacak/ItemSampahCard.jsx
const ItemSampahCard = ({ data, isDarkMode }) => (
  <div
    className={`flex items-start gap-4 p-4 rounded-lg border shadow-sm transition-colors
      ${
        isDarkMode
          ? 'bg-slate-700 border-slate-600'
          : 'bg-white border-gray-200'
      }
    `}
  >
    {/* Foto */}
    <img
      src={data.gambar_url}
      alt={data.nama_jenis}
      className='w-20 h-20 rounded-lg object-cover shadow-md'
    />

    {/* Detail */}
    <div className='flex-1 text-sm'>
      <p className='font-semibold'>{data.nama_kategori}</p>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        {data.nama_jenis} •{' '}
        <span className='font-medium'>{data.jumlah_sampah} pcs</span> •{' '}
        <span className='font-medium text-green-500'>
          {data.poin_sampah || 0} poin
        </span>
      </p>
      {data.catatan_sampah && (
        <p className='text-xs italic mt-1 text-gray-500'>
          Catatan: {data.catatan_sampah}
        </p>
      )}
    </div>
  </div>
);

export default ItemSampahCard;
