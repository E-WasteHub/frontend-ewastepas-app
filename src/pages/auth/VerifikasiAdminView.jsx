// src/views/VerifyAdminView.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as authService from '../../services/authService';
import { setTokenWithExpiry } from '../../utils/authExpiry';

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
          // simpan token dengan expiry (12 jam sesuai backend)
          const DEFAULT_TTL = 12 * 60 * 60; // 43200s (12 jam)
          setTokenWithExpiry(res.token, DEFAULT_TTL);

          // simpan pengguna & peran
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
