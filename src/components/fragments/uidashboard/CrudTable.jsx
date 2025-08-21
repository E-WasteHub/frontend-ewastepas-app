// src/components/fragments/uidashboard/CrudTable.jsx
import useDarkMode from '../../../hooks/useDarkMode';

const CrudTable = ({ columns, data, renderRow }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`overflow-x-auto rounded-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <table className='min-w-full divide-y'>
        {/* Header */}
        <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody
          className={`divide-y ${
            isDarkMode
              ? 'bg-gray-900 divide-gray-700'
              : 'bg-white divide-gray-200'
          }`}
        >
          {data.map((item, idx) => (
            <tr
              key={idx}
              className={`hover:${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              } transition-colors`}
            >
              {renderRow
                ? renderRow(item)
                : columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}
                    >
                      {item[col.key]}
                    </td>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
