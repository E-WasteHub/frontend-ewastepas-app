import useDarkMode from '../../../hooks/useDarkMode';
import Input from './Input';
import Label from './Label';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-2'>
      {/* Label */}
      <Label htmlFor={name} required={required} error={error}>
        {label}
      </Label>

      {/* Input Container */}
      <div className={children ? 'relative' : ''}>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          error={error}
          className={children ? `pr-12 ${className}` : className}
          {...props}
        />
        {children}
      </div>

      {/* Error Message */}
      {error && (
        <p
          className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
