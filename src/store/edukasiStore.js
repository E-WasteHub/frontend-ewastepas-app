import { create } from 'zustand';
// import api from "../services/api";

const useEdukasiStore = create((set) => ({
  artikel: [],
  isLoading: false,
  error: null,

  fetchArtikel: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/edukasi")
      set({
        artikel: [
          { id: 1, judul: 'Apa itu e-Waste?', isi: 'Penjelasan dummy...' },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addArtikel: async (baru) => {
    try {
      // TODO: axios.post("/edukasi", baru)
      set((state) => ({
        artikel: [...state.artikel, { id: Date.now(), ...baru }],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteArtikel: async (id) => {
    try {
      // TODO: axios.delete(`/edukasi/${id}`)
      set((state) => ({
        artikel: state.artikel.filter((a) => a.id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useEdukasiStore;
