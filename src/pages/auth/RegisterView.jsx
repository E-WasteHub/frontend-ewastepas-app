import { FormRegister } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const RegisterView = () => {
  useDocumentTitle('Registrasi - E-WasteHub');

  return (
    <AuthLayout namaApp='Ewastepas'>
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterView;
