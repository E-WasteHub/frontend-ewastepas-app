import { forwardRef } from 'react';
import { Input, Label } from '../../elements';

const FormField = forwardRef((props, ref) => {
  const { label, name, error, required, ...rest } = props;

  return (
    <div className='w-full space-y-1'>
      <Label htmlFor={name} required={required} error={error}>
        {label}
      </Label>
      <Input name={name} error={error} {...rest} ref={ref} />
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
