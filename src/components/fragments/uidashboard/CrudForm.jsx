import { Input } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';

const CrudForm = ({ fields, values, setValues }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <form className='space-y-4'>
      {fields.map((field) => (
        <div key={field.name}>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={values[field.name] || ''}
              onChange={(e) =>
                setValues({ ...values, [field.name]: e.target.value })
              }
              className={`w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            >
              <option value=''>Pilih {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              type={field.type || 'text'}
              value={values[field.name] || ''}
              onChange={(e) =>
                setValues({ ...values, [field.name]: e.target.value })
              }
              placeholder={field.placeholder || ''}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default CrudForm;
