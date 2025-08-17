import Button from '../../elements/Button';
import { Input } from '../../elements/Form';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

const FormVerifikasiOTP = () => {
  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <FormHeader
        title='Verifikasi OTP'
        subtitle='Masukkan kode OTP yang dikirim ke email Anda'
        showLogo={true}
      />

      <form className='space-y-6'>
        <Input
          type='text'
          label='Kode OTP'
          name='otp'
          placeholder='Masukkan kode 6 digit'
          required
        />

        <Button type='submit' variant='primary' className='w-full'>
          Verifikasi
        </Button>
      </form>

      <FormFooter
        links={[{ to: '/auth/register', text: 'Kirim ulang kode OTP' }]}
      />
    </div>
  );
};

export default FormVerifikasiOTP;
