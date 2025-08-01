import useDarkMode from '../../../hooks/useDarkMode';

const Label = ({ htmlFor, children, required, error, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  // Enhanced typography with optimal readability and minimalist spacing
  const baseClasses = 'block mb-2 text-sm font-medium';

  // Refined color classes aligned with e-waste theme specifications
  const colorClasses = error
    ? isDarkMode
      ? 'text-red-400'
      : 'text-red-500'
    : isDarkMode
    ? 'text-slate-300'
    : 'text-gray-700';

  // Precise required indicator styling with consistent theme
  const requiredClasses = isDarkMode ? 'text-red-400' : 'text-red-500';

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {children}
      {required && (
        <span
          className={`ml-1 ${requiredClasses}`}
          aria-label='Required field'
          title='This field is required'
        >
          *
        </span>
      )}
    </label>
  );
};

export default Label;
