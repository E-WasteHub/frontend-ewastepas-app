// src/services/profilService.js

// import api from './api'; // axios instance

// =======================
// UPDATE PROFIL
// =======================
export const updateProfil = (id_pengguna, payload) => {
  // payload bisa berisi: { nama_lengkap, email, no_telepon, alamat_pengguna, gambar_pengguna }
  return Promise.resolve({
    data: {
      message: 'Profil berhasil diperbarui (dummy)',
      user: {
        id_pengguna,
        ...payload,
        waktu_diubah: new Date(),
      },
    },
  });

  // versi backend asli
  // return api.put(`/profil/${id_pengguna}`, payload);
};

// =======================
// CHANGE PASSWORD
// =======================
export const changePassword = (id_pengguna, payload) => {
  // payload: { passwordLama, passwordBaru }
  return Promise.resolve({
    data: {
      message: 'Password berhasil diubah (dummy)',
      id_pengguna,
    },
  });

  // versi backend asli
  // return api.put(`/profil/${id_pengguna}/password`, payload);
};

// =======================
// UPLOAD DOKUMEN (KTP/SIM)
// =======================
export const uploadDokumen = (id_pengguna, formData) => {
  // formData: { dokumen: File, id_jenis_dokumen }
  return Promise.resolve({
    data: {
      message: 'Dokumen berhasil diunggah (dummy)',
      dokumen: {
        id_dokumen: Date.now(),
        id_pengguna,
        id_jenis_dokumen: formData.id_jenis_dokumen,
        nama_file: formData.dokumen?.name || 'dummy.pdf',
        waktu_dibuat: new Date(),
      },
    },
  });

  // versi backend asli
  // return api.post(`/profil/${id_pengguna}/dokumen`, formData, {
  //   headers: { "Content-Type": "multipart/form-data" }
  // });
};
