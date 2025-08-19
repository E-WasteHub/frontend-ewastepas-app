import useDarkMode from '../../../hooks/useDarkMode';

const StatCard = ({ title, value, color = 'text-green-600', icon }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`shadow rounded-lg p-6 flex-1 min-w-[150px] flex flex-col items-center justify-center gap-2 transition ${
        isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className='flex items-center gap-2'>
        {icon && <span className='text-xl'>{icon}</span>}
        <h2 className='text-base font-medium'>{title}</h2>
      </div>

      {/* Value */}
      <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
