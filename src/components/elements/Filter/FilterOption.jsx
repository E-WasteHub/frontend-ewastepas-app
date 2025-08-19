import useDarkMode from '../../../hooks/useDarkMode';

const FilterOption = ({ label, count, active, onClick, color = 'gray' }) => {
  const { isDarkMode } = useDarkMode();

  const activeStyles = isDarkMode
    ? 'bg-blue-600 text-white'
    : 'bg-blue-100 text-blue-700';

  const hoverStyles = isDarkMode
    ? 'hover:bg-gray-700 text-gray-300'
    : 'hover:bg-gray-100 text-gray-700';

  const textColor =
    color === 'orange'
      ? 'text-orange-500'
      : color === 'green'
      ? 'text-green-600'
      : 'text-gray-600';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
        ${active ? activeStyles : hoverStyles} ${!active ? textColor : ''}
      `}
    >
      {label} ({count})
    </button>
  );
};

export default FilterOption;
