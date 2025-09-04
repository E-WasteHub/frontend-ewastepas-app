export const detectPeranFromPath = (pathname, fallback = 'Masyarakat') => {
  if (pathname.startsWith('/dashboard/admin')) return 'Admin';
  if (pathname.startsWith('/dashboard/mitra-kurir')) return 'Mitra Kurir';
  if (pathname.startsWith('/dashboard/masyarakat')) return 'Masyarakat';
  return fallback;
};

export const getPeranDisplayName = (peran) => {
  // Return peran asli tanpa normalisasi
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

/**
 * Helper untuk ambil path dashboard sesuai peran
 */
export const getDashboardPathByPeran = (peran) => {
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

/**
 * Helper untuk ambil path profil sesuai peran
 */
export const getProfilePathByPeran = (peran) => {
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
