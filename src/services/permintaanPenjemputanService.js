/**
 * Service untuk mengelola permintaan penjemputan e-waste
 */

// Mock data untuk kategori sampah
export const kategoriUtamaOptions = [
  { value: '', label: 'Pilih Kategori Sampah' },
  { value: 'kategori1', label: 'Peralatan Penukar Suhu' },
  { value: 'kategori2', label: 'Layar & Monitor' },
  { value: 'kategori3', label: 'Lampu' },
  { value: 'kategori4', label: 'Peralatan Besar' },
  { value: 'kategori5', label: 'Peralatan Kecil' },
  { value: 'kategori6', label: 'Peralatan IT & Telekomunikasi Kecil' },
];

// Alias untuk kompatibilitas
export const kategoriSampahOptions = kategoriUtamaOptions;

// Jenis spesifik untuk setiap kategori
const jenisKategoriOptions = {
  kategori1: [
    { value: '', label: 'Pilih Jenis Peralatan' },
    { value: 'kulkas', label: 'Kulkas/Lemari Es' },
    { value: 'freezer', label: 'Freezer' },
    { value: 'ac_split', label: 'AC Split' },
    { value: 'ac_window', label: 'AC Window' },
    { value: 'chiller', label: 'Chiller' },
    { value: 'dehumidifier', label: 'Dehumidifier' },
  ],
  kategori2: [
    { value: '', label: 'Pilih Jenis Layar/Monitor' },
    { value: 'tv_lcd', label: 'TV LCD' },
    { value: 'tv_led', label: 'TV LED' },
    { value: 'tv_plasma', label: 'TV Plasma' },
    { value: 'monitor_crt', label: 'Monitor CRT' },
    { value: 'monitor_lcd', label: 'Monitor LCD/LED' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'tablet', label: 'Tablet' },
  ],
  kategori3: [
    { value: '', label: 'Pilih Jenis Lampu' },
    { value: 'led', label: 'Lampu LED' },
    { value: 'fluorescent', label: 'Lampu Fluorescent/TL' },
    { value: 'cfl', label: 'Lampu CFL/Hemat Energi' },
    { value: 'halogen', label: 'Lampu Halogen' },
    { value: 'hid', label: 'Lampu HID' },
    { value: 'neon', label: 'Lampu Neon' },
  ],
  kategori4: [
    { value: '', label: 'Pilih Jenis Peralatan Besar' },
    { value: 'mesin_cuci', label: 'Mesin Cuci' },
    { value: 'mesin_pengering', label: 'Mesin Pengering' },
    { value: 'dishwasher', label: 'Mesin Pencuci Piring' },
    { value: 'oven_listrik', label: 'Oven Listrik' },
    { value: 'microwave', label: 'Microwave' },
    { value: 'printer_besar', label: 'Printer/Copier Besar' },
    { value: 'water_heater', label: 'Water Heater Listrik' },
  ],
  kategori5: [
    { value: '', label: 'Pilih Jenis Peralatan Kecil' },
    { value: 'smartphone', label: 'Smartphone/HP' },
    { value: 'feature_phone', label: 'HP Biasa/Feature Phone' },
    { value: 'radio', label: 'Radio' },
    { value: 'speaker', label: 'Speaker/Sound System' },
    { value: 'kamera_digital', label: 'Kamera Digital' },
    { value: 'camcorder', label: 'Camcorder' },
    { value: 'mp3_player', label: 'MP3 Player' },
    { value: 'power_bank', label: 'Power Bank' },
    { value: 'charger', label: 'Charger/Adaptor' },
  ],
  kategori6: [
    { value: '', label: 'Pilih Jenis Peralatan IT/Telekomunikasi' },
    { value: 'router', label: 'Router' },
    { value: 'modem', label: 'Modem' },
    { value: 'switch', label: 'Network Switch' },
    { value: 'hard_drive', label: 'Hard Drive/HDD' },
    { value: 'ssd', label: 'SSD' },
    { value: 'usb_drive', label: 'USB Drive/Flashdisk' },
    { value: 'memory_card', label: 'Memory Card' },
    { value: 'keyboard', label: 'Keyboard' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'webcam', label: 'Webcam' },
    { value: 'headset', label: 'Headset/Headphone' },
  ],
};

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
            preview: e.target.result,
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
