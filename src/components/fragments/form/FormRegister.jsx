import Button from '../../elements/Button';
import { Input } from '../../elements/Form';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

const FormRegister = () => {
  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <FormHeader
        title='Daftar'
        subtitle='Buat akun E-Waste Hub baru'
        showLogo={true}
      />

      <form className='space-y-6'>
        <Input
          type='text'
          label='Nama Lengkap'
          name='nama'
          placeholder='Masukkan nama lengkap'
          required
        />
        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Masukkan email'
          required
        />
        <Input
          type='password'
          label='Kata Sandi'
          name='password'
          placeholder='Masukkan kata sandi'
          showPasswordToggle={true}
          required
        />{' '}
        <Button type='submit' variant='primary' className='w-full'>
          Daftar
        </Button>
      </form>

      <FormFooter
        links={[{ to: '/login', text: 'Sudah punya akun? Masuk di sini' }]}
      />
    </div>
  );
};

export default FormRegister;
