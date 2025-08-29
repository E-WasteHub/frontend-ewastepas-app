import { Check } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Checkbox = ({
  id,
  name,
  checked = false,
  onChange,
  disabled = false,
  label,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange({ target: { checked: !checked, name } });
    }
  };

  const baseBox =
    'flex items-center justify-center w-5 h-5 rounded border-2 transition-all';
  const stateBox = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105';
  const colorBox = checked
    ? 'bg-green-600 border-green-600 text-white'
    : isDarkMode
    ? 'bg-slate-800 border-slate-600 hover:border-slate-500'
    : 'bg-white border-gray-300 hover:border-gray-400';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Input asli (disembunyikan untuk aksesibilitas) */}
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className='sr-only'
        {...props}
      />

      {/* Kotak custom */}
      <button
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        className={`${baseBox} ${stateBox} ${colorBox}`}
      >
        {checked && <Check className='w-3 h-3' strokeWidth={3} />}
      </button>

      {/* Label di sebelahnya */}
      {label && (
        <label
          htmlFor={id}
          onClick={handleToggle}
          className={`text-sm cursor-pointer ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
