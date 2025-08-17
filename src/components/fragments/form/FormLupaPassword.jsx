import Button from '../../elements/Button';
import { Input } from '../../elements/Form';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

const FormLupaPassword = () => {
  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <FormHeader
        title='Lupa Kata Sandi'
        subtitle='Masukkan email untuk reset kata sandi'
        showLogo={true}
      />

      <form className='space-y-6'>
        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Masukkan email Anda'
          required
        />

        <Button type='submit' variant='primary' className='w-full'>
          Kirim Link Reset
        </Button>
      </form>

      <FormFooter
        links={[{ to: '/login', text: 'Kembali ke halaman masuk' }]}
      />
    </div>
  );
};

export default FormLupaPassword;
