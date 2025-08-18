import FormRegister from '../../components/fragments/forms/FormRegister';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const RegisterPage = () => {
  useDocumentTitle('Registrasi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub'>
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
