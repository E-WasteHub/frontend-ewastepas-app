// util untuk deteksi peran dari path
export const deteksiPeranDariPath = (pathname, fallback = 'Masyarakat') => {
  if (pathname.startsWith('/dashboard/admin')) return 'Admin';
  if (pathname.startsWith('/dashboard/mitra-kurir')) return 'Mitra Kurir';
  if (pathname.startsWith('/dashboard/masyarakat')) return 'Masyarakat';
  return fallback;
};

// untuk tampilan nama peran
export const dapatkanNamaTampilanPeran = (peran) => {
  switch (peran) {
    case 'Admin':
      return 'Admin';
    case 'Mitra Kurir':
      return 'Mitra Kurir';
    case 'Masyarakat':
    default:
      return 'Masyarakat';
  }
};

// ambil path dashboard sesuai peran
export const dapatkanPathDashboardBerdasarkanPeran = (peran) => {
  switch (peran) {
    case 'Admin':
      return '/dashboard/admin';
    case 'Mitra Kurir':
      return '/dashboard/mitra-kurir';
    case 'Masyarakat':
    default:
      return '/dashboard/masyarakat';
  }
};

// untuk ambil path profil sesuai peran
export const dapatkanPathProfilBerdasarkanPeran = (peran) => {
  switch (peran) {
    case 'Admin':
      return '/dashboard/admin/profil';
    case 'Mitra Kurir':
      return '/dashboard/mitra-kurir/profil';
    case 'Masyarakat':
    default:
      return '/dashboard/masyarakat/profil';
  }
};
