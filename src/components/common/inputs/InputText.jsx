import Input from './Input';
import Label from './Label';

const InputText = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <Label
          htmlFor={props.name || props.id}
          required={required}
          error={error}
        >
          {label}
        </Label>
      )}

      <Input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        required={required}
        {...props}
      />
    </div>
  );
};

export default InputText;
