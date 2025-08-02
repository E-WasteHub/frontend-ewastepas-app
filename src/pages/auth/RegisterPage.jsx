import FormRegister from '../../components/form/FormRegister';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AuthLayout from '../../layouts/AuthLayout';

const RegisterPage = () => {
  useDocumentTitle('Registrasi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
