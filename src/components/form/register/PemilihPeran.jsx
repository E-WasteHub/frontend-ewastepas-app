import useDarkMode from '../../../hooks/useDarkMode';

const PemilihPeran = ({ selectedRole, onChange, error }) => {
  const { isDarkMode } = useDarkMode();

  const peran = [
    {
      id: 'masyarakat',
      title: 'Masyarakat',
      description: 'Untuk mengajukan permintaan penjemputan sampah elektronik',
    },
    {
      id: 'mitra_kurir',
      title: 'Mitra Kurir',
      description: 'Untuk menjadi kurir penjemput sampah elektronik',
    },
  ];

  const handlePilihPeran = (peranId) => {
    const event = {
      target: {
        name: 'role',
        value: peranId,
      },
    };
    onChange(event);
  };

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-4 ${
          isDarkMode ? 'text-slate-200' : 'text-gray-700'
        }`}
      >
        Pilih Peran Anda <span className='text-red-500'>*</span>
      </label>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {peran.map((itemPeran) => (
          <button
            key={itemPeran.id}
            type='button'
            onClick={() => handlePilihPeran(itemPeran.id)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 ${
              selectedRole === itemPeran.id
                ? isDarkMode
                  ? 'border-green-400 bg-green-400/20 text-green-300'
                  : 'border-green-500 bg-green-50 text-green-700'
                : isDarkMode
                ? 'border-slate-600 hover:border-slate-500 text-slate-300'
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            } cursor-pointer`}
          >
            <div className='text-center'>
              <div className='text-lg font-semibold mb-3'>
                {itemPeran.title}
              </div>
              <div className='text-sm opacity-80'>{itemPeran.description}</div>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
};

export default PemilihPeran;
