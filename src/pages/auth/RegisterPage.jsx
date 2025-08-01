import { FormRegister } from '../../components';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthLayout } from '../../layouts';

const RegisterPage = () => {
  useDocumentTitle('Registrasi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
