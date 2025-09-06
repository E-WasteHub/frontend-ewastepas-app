// src/components/fragments/AdminTable.jsx
import { useMediaQuery } from 'react-responsive';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminTable = ({ columns = [], data = [], topContent }) => {
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className='space-y-4'>
      {topContent && topContent}
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
              {columns.map((col, i) =>
                isMobile && col.hideOnMobile ? null : (
                  <th
                    key={i}
                    className='px-4 py-3 text-sm font-semibold tracking-wide'
                  >
                    {col.name}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? 'divide-slate-600' : 'divide-slate-300'
            }`}
          >
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={idx} className={`transition`}>
                  {columns.map((col, i) =>
                    isMobile && col.hideOnMobile ? null : (
                      <td key={i} className='px-4 py-3'>
                        {col.cell ? col.cell(row) : row[col.selector]}
                      </td>
                    )
                  )}
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
    </div>
  );
};

export default AdminTable;
