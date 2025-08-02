import useDarkMode from '../../hooks/useDarkMode';

const CheckBox = ({
  id,
  name,
  checked,
  onChange,
  disabled = false,
  label,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
          isDarkMode ? 'bg-slate-700 border-slate-600' : ''
        }`}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 block text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-gray-900'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
