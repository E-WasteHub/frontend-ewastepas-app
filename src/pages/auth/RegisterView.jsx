import FormRegister from '../../components/form/FormRegister';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AuthLayout from '../../layouts/AuthLayout';

const RegisterPage = () => {
  useDocumentTitle('Registrasi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub'>
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
