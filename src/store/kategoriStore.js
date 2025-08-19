import { create } from 'zustand';
// import api from "../services/api"; // aktifkan kalau backend sudah siap

const useKategoriStore = create((set) => ({
  kategori: [],
  isLoading: false,
  error: null,

  fetchKategori: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/kategori")
      set({
        kategori: [
          { id: 1, nama: 'Elektronik' },
          { id: 2, nama: 'Baterai' },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addKategori: async (baru) => {
    try {
      // TODO: axios.post("/kategori", baru)
      set((state) => ({
        kategori: [...state.kategori, { id: Date.now(), ...baru }],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useKategoriStore;
