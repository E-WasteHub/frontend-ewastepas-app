import { Mail } from 'lucide-react';
import { InputField } from '../../common/inputs';

const FieldDataLupaPassword = ({ email, onEmailChange, isLoading, error }) => {
  return (
    <div className='space-y-4'>
      {/* Input Email */}
      <InputField
        id='email'
        name='email'
        type='email'
        label='Alamat Email'
        placeholder='Masukkan alamat email Anda'
        value={email}
        onChange={onEmailChange}
        disabled={isLoading}
        error={error && error.includes('email') ? error : ''}
        icon={Mail}
        autoComplete='email'
        required
      />
    </div>
  );
};

export default FieldDataLupaPassword;
