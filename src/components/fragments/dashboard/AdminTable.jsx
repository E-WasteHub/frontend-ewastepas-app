// src/components/fragments/AdminTable.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import useResponsive from '../../../hooks/useResponsive';

const AdminTable = ({ columns = [], data = [], topContent }) => {
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();

  return (
    <div className='space-y-4'>
      {topContent && topContent}

      {/* Mobile view: card list */}
      {isMobile ? (
        <div className='space-y-3'>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg shadow-md ${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                {columns
                  .filter((col) => !col.hideOnMobile)
                  .map((col, i) => (
                    <div
                      key={i}
                      className='flex justify-between py-1 border-b last:border-0 border-slate-600/20'
                    >
                      <span
                        className={`font-medium ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {col.name}
                      </span>
                      <span
                        className={`${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {col.cell ? col.cell(row) : row[col.selector]}
                      </span>
                    </div>
                  ))}
              </div>
            ))
          ) : (
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
        </div>
      ) : (
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
                isDarkMode ? 'divide-slate-600' : 'divide-slate-300'
              }`}
            >
              {data.length > 0 ? (
                data.map((row, idx) => (
                  <tr key={idx} className='transition'>
                    {columns.map((col, i) => (
                      <td key={i} className='px-4 py-3'>
                        {col.cell ? col.cell(row) : row[col.selector]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className='px-4 py-6 text-center text-slate-500 dark:text-slate-400'
                  >
                    Tidak ada data untuk ditampilkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
