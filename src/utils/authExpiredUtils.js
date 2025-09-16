const kunciToken = 'token';
const kunciTokenExpired = 'token_expires_at';
const kunciOtpExpired = 'otpExpiresAt';

// simpan token dengan waktu kedaluwarsa (default 12 jam)
export function simpanTokenDenganExpiry(token, expirySeconds = 12 * 60 * 60) {
  if (!token) return;
  try {
    localStorage.setItem(kunciToken, token);
    const expiresAt = Date.now() + expirySeconds * 1000;
    localStorage.setItem(kunciTokenExpired, expiresAt.toString());
  } catch {
    // error simpan token diabaikan
  }
}

// ambil token jika masih berlaku
export function ambilTokenValid() {
  const token = localStorage.getItem(kunciToken);
  const expiresAt = localStorage.getItem(kunciTokenExpired);

  if (!token || !expiresAt) return null;

  if (Date.now() > parseInt(expiresAt, 10)) {
    hapusAutentikasi();
    return null;
  }

  return token;
}

// Hapus semua data autentikasi
export function hapusAutentikasi() {
  localStorage.removeItem(kunciToken);
  localStorage.removeItem(kunciTokenExpired);
  localStorage.removeItem('pengguna');
  localStorage.removeItem('peran');
}
// ----- END TOKEN ----

// ---- OTP -----
// Simpan waktu expired OTP (dalam detik, default 5 menit)
export function simpanOtpDenganExpiry(expirySeconds = 5 * 60) {
  const expiresAt = Date.now() + expirySeconds * 1000;
  localStorage.setItem(kunciOtpExpired, expiresAt.toString());
}

// Ambil sisa waktu OTP dalam detik
export function ambilSisaWaktuOtp() {
  const expiry = localStorage.getItem(kunciOtpExpired);
  if (!expiry) return 0;

  const remaining = Math.floor((parseInt(expiry, 10) - Date.now()) / 1000);
  return Math.max(0, remaining);
}

// Hapus data OTP
export function hapusOtp() {
  localStorage.removeItem(kunciOtpExpired);
}

// Cek apakah ada OTP yang tertunda
export function adaOtpTertunda() {
  return Boolean(localStorage.getItem('userId'));
}

// ----- END OTP -----
