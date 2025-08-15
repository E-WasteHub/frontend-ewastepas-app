import InputField from './InputField';
import PasswordToggle from './PasswordToggle';

const PasswordField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  showPassword,
  onTogglePassword,
  className = '',
  ...props
}) => {
  return (
    <InputField
      label={label}
      name={name}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      {...props}
    >
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        <PasswordToggle
          showPassword={showPassword}
          onToggle={onTogglePassword}
          disabled={disabled}
        />
      </div>
    </InputField>
  );
};

export default PasswordField;
