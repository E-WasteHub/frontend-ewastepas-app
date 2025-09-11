import { forwardRef } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Label, Message } from '../../elements';

const Textarea = forwardRef(
  (
    {
      label,
      placeholder,
      name,
      value,
      onChange,
      error,
      required = false,
      disabled = false,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();

    const desainDasar =
      'w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 resize-vertical';

    const warnaDesain = isDarkMode
      ? 'bg-slate-800 text-slate-100 placeholder-slate-400'
      : 'bg-white text-gray-900 placeholder-gray-500';

    const borderDesain = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : isDarkMode
      ? 'border-slate-600 focus:border-green-500 focus:ring-green-500/20'
      : 'border-gray-300 focus:border-green-500 focus:ring-green-500/20';

    const matikanDesain = disabled
      ? isDarkMode
        ? 'opacity-50 cursor-not-allowed bg-slate-900'
        : 'opacity-50 cursor-not-allowed bg-gray-100'
      : '';

    const textareaClasses = `${desainDasar} ${warnaDesain} ${borderDesain} ${matikanDesain} ${className}`;

    return (
      <div className='space-y-2'>
        {/* Label */}
        {label && (
          <Label htmlFor={name} required={required} error={error}>
            {label}
          </Label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          className={textareaClasses}
          {...props}
        />

        {/* Error */}
        <Message variant='error'>{error}</Message>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
