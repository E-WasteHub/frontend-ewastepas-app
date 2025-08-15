import Input from './Input';
import Label from './Label';

const InputTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  rows = 3,
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
        type='textarea'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        required={required}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default InputTextarea;
