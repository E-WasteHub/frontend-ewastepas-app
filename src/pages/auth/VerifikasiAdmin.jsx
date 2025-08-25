// src/views/VerifyAdminView.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as authService from '../../services/authService';

const VerifikasiAdmin = () => {
  const [status, setStatus] = useState('Memverifikasi...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const otp = searchParams.get('otp');
      if (!otp) {
        setStatus('OTP tidak ditemukan.');
        navigate('/login');
        return;
      }

      try {
        const res = await authService.verifikasiAdmin(otp);

        if (res.token) {
          // simpan data ke localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('pengguna', JSON.stringify(res.data));
          localStorage.setItem('peran', res.data.nama_peran);

          navigate('/dashboard/admin');
        } else {
          setStatus('Link verifikasi tidak valid.');
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        setStatus(err.message || 'Verifikasi gagal.');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    verify();
  }, [navigate, searchParams]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg font-semibold text-green-500'>{status}</p>
    </div>
  );
};

export default VerifikasiAdmin;
