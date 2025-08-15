import InputField from '../../common/inputs/InputField';

const FieldDataPribadi = ({ formData, errors, onChange }) => {
  return (
    <div className='space-y-6'>
      {/* Nama Input */}
      <InputField
        label='Nama Lengkap'
        name='nama'
        placeholder='Masukkan nama lengkap Anda'
        value={formData.nama}
        onChange={onChange}
        required
        error={errors?.nama}
      />

      {/* Email Input */}
      <InputField
        label='Email'
        name='email'
        type='email'
        placeholder='Masukkan email Anda'
        value={formData.email}
        onChange={onChange}
        required
        error={errors?.email}
      />
    </div>
  );
};

export default FieldDataPribadi;
