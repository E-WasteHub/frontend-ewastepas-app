import { create } from 'zustand';
import * as edukasiService from '../services/edukasiService';

const useEdukasiStore = create((set) => ({
  data: [],
  isLoading: false,
  error: null,
  successMessage: null,

  // Ambil semua konten
  fetchEdukasi: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await edukasiService.indexEdukasi();
      set({ data: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Ambil detail konten
  fetchEdukasiDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await edukasiService.showEdukasi(id);
      set({ data: [res.data], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Tambah konten
  createEdukasi: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await edukasiService.createEdukasi(payload);
      set((state) => ({
        data: [...state.data, res.data],
        successMessage: res.message,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Update konten
  updateEdukasi: async (id, payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await edukasiService.updateEdukasi(id, payload);
      set((state) => ({
        data: state.data.map((item) =>
          item.id_konten === id ? res.data : item
        ),
        successMessage: res.message,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Hapus konten
  deleteEdukasi: async (id) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await edukasiService.deleteEdukasi(id);
      set((state) => ({
        data: state.data.filter((item) => item.id_konten !== id),
        successMessage: res.message,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Reset pesan
  clearStatus: () => set({ error: null, successMessage: null }),
}));

export default useEdukasiStore;
