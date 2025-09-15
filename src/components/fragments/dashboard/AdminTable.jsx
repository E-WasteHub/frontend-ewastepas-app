// src/components/fragments/dashboard/AdminTable.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import useResponsive from '../../../hooks/useResponsive';

const AdminTable = ({ columns = [], data = [], topContent }) => {
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();

  const adaData = data && data.length > 0;

  // Desain dasar
  const cardBase = `p-4 rounded-xl shadow-sm border transition-all duration-200 ${
    isDarkMode
      ? 'bg-slate-800/80 border-slate-700 hover:shadow-md'
      : 'bg-white border-slate-200 hover:shadow-md'
  }`;

  return (
    <div className='space-y-4'>
      {topContent && topContent}

      {/* Kalau tidak ada data */}
      {!adaData && (
        <div
          className={`p-6 text-center rounded-lg ${
            isDarkMode
              ? 'bg-slate-800 text-slate-400'
              : 'bg-white text-slate-500'
          }`}
        >
          Tidak ada data untuk ditampilkan
        </div>
      )}

      {/* Mobile → tampilkan card list */}
      {isMobile && adaData && (
        <div className='space-y-4'>
          {data.map((row, idx) => (
            <div key={row.id || idx} className={cardBase}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
                {columns.map((col, i) => (
                  <div key={i} className='flex flex-col'>
                    {/* Label */}
                    <span
                      className={`text-xs font-medium tracking-wide mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {col.name}
                    </span>
                    {/* Value */}
                    <span
                      className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {col.cell ? col.cell(row) : row[col.selector]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop → tampilkan tabel */}
      {!isMobile && adaData && (
        <div
          className={`overflow-x-auto rounded-lg shadow-md ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <table className='min-w-full text-sm text-left'>
            <thead
              className={`${
                isDarkMode
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className='px-4 py-3 text-sm font-semibold tracking-wide'
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDarkMode ? 'divide-slate-600' : 'divide-slate-200'
              }`}
            >
              {data.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className='transition hover:bg-slate-50 dark:hover:bg-slate-700/50'
                >
                  {columns.map((col, i) => (
                    <td key={i} className='px-4 py-3'>
                      {col.cell ? col.cell(row) : row[col.selector]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
