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

  const dasarDesain =
    'relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all';
  const statusDesain = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105';
  const warnaDesain = checked
    ? 'bg-green-600 border-green-600 text-white'
    : isDarkMode
    ? 'bg-slate-800 border-slate-600 hover:border-slate-500'
    : 'bg-white border-gray-300 hover:border-gray-400';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Kotak custom + input asli overlay */}
      <div className={`${dasarDesain} ${statusDesain} ${warnaDesain}`}>
        {checked && <Check className='w-3 h-3' strokeWidth={3} />}
        <input
          type='checkbox'
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className='absolute inset-0 opacity-0 cursor-pointer'
          {...props}
        />
      </div>

      {/* Label teks */}
      {label && (
        <label
          htmlFor={id}
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
