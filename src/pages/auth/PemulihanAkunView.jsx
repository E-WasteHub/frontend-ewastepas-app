// src/pages/auth/LupaPasswordView.jsx
import { FormPemulihanAkun } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const PemulihanAkunView = () => {
  useDocumentTitle('Reset Kata Sandi - Ewastepas');

  return (
    <AuthLayout namaApp='Ewastepas' maxWidth='max-w-2xl'>
      <FormPemulihanAkun />
    </AuthLayout>
  );
};

export default PemulihanAkunView;
