import { FormVerifikasiOTP } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const VerifikasiOTPView = () => {
  useDocumentTitle('Verifikasi OTP - Ewastepas');

  return (
    <AuthLayout namaApp='Ewastepas'>
      <FormVerifikasiOTP />
    </AuthLayout>
  );
};

export default VerifikasiOTPView;
