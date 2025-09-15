// src/utils/authExpiredUtils.js

const tokenKey = 'token';
const tokenExpiresKey = 'token_expires_at';
const otpExpiresKey = 'otpExpiresAt';

// ---- TOKEN -----
// Simpan token dengan waktu kedaluwarsa (default 12 jam)
export function setTokenWithExpiry(token, expirySeconds = 12 * 60 * 60) {
  if (!token) return;
  try {
    localStorage.setItem(tokenKey, token);
    const expiresAt = Date.now() + expirySeconds * 1000;
    localStorage.setItem(tokenExpiresKey, expiresAt.toString());
  } catch (e) {
    console.error('setTokenWithExpiry error:', e);
  }
}

// Ambil token jika masih berlaku
export function ambilValidToken() {
  const token = localStorage.getItem(tokenKey);
  const expiresAt = localStorage.getItem(tokenExpiresKey);

  if (!token || !expiresAt) return null;

  if (Date.now() > parseInt(expiresAt, 10)) {
    clearAuth();
    return null;
  }

  return token;
}

// Hapus semua data autentikasi
export function clearAuth() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenExpiresKey);
  localStorage.removeItem('pengguna');
  localStorage.removeItem('peran');
}
// ----- END TOKEN ----

// ---- OTP -----
// Simpan waktu expired OTP (dalam detik, default 5 menit)
export function setOtpWithExpiry(expirySeconds = 5 * 60) {
  const expiresAt = Date.now() + expirySeconds * 1000;
  localStorage.setItem(otpExpiresKey, expiresAt.toString());
}

// Ambil sisa waktu OTP dalam detik
export function getOtpRemaining() {
  const expiry = localStorage.getItem(otpExpiresKey);
  if (!expiry) return 0;

  const remaining = Math.floor((parseInt(expiry, 10) - Date.now()) / 1000);
  return Math.max(0, remaining);
}

// Hapus data OTP
export function clearOtp() {
  localStorage.removeItem(otpExpiresKey);
}

// Cek apakah ada OTP yang tertunda
export function hasPendingOtp() {
  return Boolean(localStorage.getItem('userId'));
}

// ----- END OTP -----
