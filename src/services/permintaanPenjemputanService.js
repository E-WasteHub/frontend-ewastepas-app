/**
 * Service untuk mengelola permintaan penjemputan e-waste
 */

import { kategoriData } from '../data/kategoriData';

// Convert kategoriData to options format for compatibility
export const kategoriUtamaOptions = [
  { value: '', label: 'Pilih Kategori Sampah' },
  ...kategoriData.map((kategori) => ({
    value: kategori.id.toString(),
    label: `${kategori.name} - ${kategori.category} (${kategori.points} poin/kg)`,
  })),
];

// Alias untuk kompatibilitas
export const kategoriSampahOptions = kategoriUtamaOptions;

// Generate jenis options from kategoriData
const jenisKategoriOptions = {};
kategoriData.forEach((kategori) => {
  jenisKategoriOptions[kategori.id.toString()] = [
    { value: '', label: 'Pilih Jenis Sampah' },
    ...kategori.items.map((item) => ({
      value: item.toLowerCase().replace(/\s+/g, '_'),
      label: item,
    })),
  ];
});

// Data waktu operasional
export const waktuOperasionalOptions = [
  { value: '', label: 'Pilih Waktu Operasional' },
  { value: '1', label: '08:00 - 10:00' },
  { value: '2', label: '10:00 - 12:00' },
  { value: '3', label: '13:00 - 15:00' },
  { value: '4', label: '15:00 - 17:00' },
];

// Data dropbox
export const dropboxOptions = [
  { value: '', label: 'Pilih Dropbox Tujuan' },
  { value: '1', label: 'Dropbox Pusat Kota' },
  { value: '2', label: 'Dropbox Mall Central' },
  { value: '3', label: 'Dropbox Kantor Walikota' },
  { value: '4', label: 'Dropbox Terminal Bus' },
];

/**
 * Mendapatkan opsi jenis berdasarkan kategori
 * @param {string} kategori - ID kategori
 * @returns {Array} Array opsi jenis
 */
export const getJenisOptions = (kategori) => {
  return (
    jenisKategoriOptions[kategori] || [
      { value: '', label: 'Pilih Kategori Terlebih Dahulu' },
    ]
  );
};

/**
 * Mendapatkan label kategori berdasarkan value
 * @param {string} value - Value kategori
 * @returns {string} Label kategori
 */
export const getKategoriLabel = (value) => {
  const kategori = kategoriUtamaOptions.find((opt) => opt.value === value);
  return kategori ? kategori.label : value;
};

/**
 * Mendapatkan label jenis berdasarkan kategori dan value
 * @param {string} kategori - ID kategori
 * @param {string} value - Value jenis
 * @returns {string} Label jenis
 */
export const getJenisLabel = (kategori, value) => {
  const jenisOptions = getJenisOptions(kategori);
  const jenis = jenisOptions.find((opt) => opt.value === value);
  return jenis ? jenis.label : value;
};

/**
 * Validasi file foto
 * @param {File} file - File yang akan divalidasi
 * @returns {Object} Result validasi
 */
export const validatePhotoFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipe file tidak didukung. Gunakan JPG, PNG, atau GIF.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Ukuran file terlalu besar. Maksimal 10MB.',
    };
  }

  return { valid: true };
};

/**
 * Memproses upload foto
 * @param {FileList} files - Files yang akan diupload
 * @returns {Promise<Array>} Array photo objects
 */
export const processPhotoUpload = (files) => {
  return new Promise((resolve) => {
    const photoPromises = Array.from(files).map((file) => {
      const validation = validatePhotoFile(file);

      if (!validation.valid) {
        console.warn(`File ${file.name}: ${validation.error}`);
        return null;
      }

      return new Promise((resolvePhoto) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolvePhoto({
            id: Date.now() + Math.random(),
            file: file,
            url: e.target.result, // Changed from 'preview' to 'url' for consistency
            name: file.name,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then((photos) => {
      resolve(photos.filter(Boolean)); // Filter out null values
    });
  });
};

/**
 * Validasi form data sebelum submit
 * @param {Object} formData - Data form
 * @returns {Object} Result validasi
 */
export const validateFormData = (formData) => {
  const errors = [];

  if (!formData.alamat_jemput?.trim()) {
    errors.push('Alamat penjemputan harus diisi');
  }

  if (!formData.waktu_dijemput) {
    errors.push('Waktu penjemputan harus diisi');
  }

  if (!formData.id_waktu_operasional) {
    errors.push('Waktu operasional harus dipilih');
  }

  if (!formData.id_dropbox) {
    errors.push('Dropbox tujuan harus dipilih');
  }

  if (!formData.sampah || formData.sampah.length === 0) {
    errors.push('Minimal harus ada satu sampah yang ditambahkan');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Submit permintaan penjemputan ke backend
 * @param {Object} data - Data permintaan
 * @returns {Promise<Object>} Response dari API
 */
export const submitPermintaanPenjemputan = async (data) => {
  try {
    // Validasi data terlebih dahulu
    const validation = validateFormData(data);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // TODO: Implementasi API call
    // const response = await fetch('/api/permintaan-penjemputan', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // });

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Data yang akan dikirim ke backend:', data);

    return {
      success: true,
      message: 'Permintaan penjemputan berhasil dikirim',
      data: {
        id: `REQ-${Date.now()}`,
        status: 'pending',
        ...data,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Gagal mengirim permintaan penjemputan',
    };
  }
};
