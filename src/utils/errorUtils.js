// Utility untuk mengambil pesan error dari objek error yang mungkin memiliki struktur berbeda
export const ambilPesanError = (
  error,
  defaultMessage = 'Terjadi kesalahan'
) => {
  return (
    error?.response?.data?.error?.message || // wrapper backend
    error?.response?.data?.message || // pesan langsung
    error?.message || // axios error
    defaultMessage
  );
};
