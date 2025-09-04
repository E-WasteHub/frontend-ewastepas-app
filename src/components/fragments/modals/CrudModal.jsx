// src/components/fragments/modals/CrudModal.jsx
import { useEffect, useState } from 'react';
import { Button, InputForm, Modal } from '../../elements';

const CrudModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title = 'Form',
  fields = [],
  isLoading = false,
}) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(initialData || {});
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        {fields.map((field) =>
          field.type === 'textarea' ? (
            <textarea
              key={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={handleChange}
              placeholder={field.label}
              className='w-full border rounded px-3 py-2'
            />
          ) : (
            <InputForm
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formValues[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            />
          )
        )}

        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CrudModal;
