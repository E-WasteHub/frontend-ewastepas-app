import useDarkMode from '../../../hooks/useDarkMode';

const Label = ({
  htmlFor,
  children,
  required = false,
  error,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();

  const desainDasar = 'block text-sm font-medium mb-1';
  const warnaDesain = error
    ? isDarkMode
      ? 'text-red-400'
      : 'text-red-500'
    : isDarkMode
    ? 'text-slate-200'
    : 'text-gray-700';

  return (
    <label
      htmlFor={htmlFor}
      className={`${desainDasar} ${warnaDesain} ${className}`}
    >
      {children}
      {required && <span className='ml-1 text-red-500'>*</span>}
    </label>
  );
};

export default Label;
