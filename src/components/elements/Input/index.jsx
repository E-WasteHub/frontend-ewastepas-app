import { forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage';
import Input from './Input';
import Label from './Label';

const InputForm = forwardRef(
  (
    {
      label,
      name,
      id,
      type = 'text',
      value,
      onChange,
      placeholder,
      required = false,
      disabled = false,
      error,
      showPasswordToggle = false,
      autoComplete,
      className = '',
      labelClassName = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className='space-y-2'>
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            error={error}
            className={labelClassName}
          >
            {label}
          </Label>
        )}

        <Input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          error={error}
          showPasswordToggle={showPasswordToggle}
          autoComplete={autoComplete}
          className={className}
          {...props}
        />

        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  }
);

InputForm.displayName = 'InputForm';

export default InputForm;
