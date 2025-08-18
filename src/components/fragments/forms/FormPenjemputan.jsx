import Button from '../../elements/Button';
import { Input } from '../../elements/Form';
import FormHeader from './FormHeader';

const FormPenjemputan = () => {
  return (
    <div className='w-full max-w-2xl mx-auto space-y-6'>
      <FormHeader
        title='Permintaan Penjemputan'
        subtitle='Isi form untuk mengajukan penjemputan sampah elektronik'
        showLogo={false}
      />

      <form className='space-y-6'>
        <Input
          type='text'
          label='Alamat Penjemputan'
          name='alamat'
          placeholder='Masukkan alamat lengkap'
          required
        />
        <Input
          type='text'
          label='Jenis Sampah'
          name='jenis'
          placeholder='Contoh: Laptop bekas, HP rusak'
          required
        />
        <Input
          type='text'
          label='Keterangan Tambahan'
          name='keterangan'
          placeholder='Deskripsi kondisi sampah (opsional)'
        />{' '}
        <Button type='submit' variant='primary' className='w-full'>
          Ajukan Penjemputan
        </Button>
      </form>
    </div>
  );
};

export default FormPenjemputan;
