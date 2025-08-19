import { create } from 'zustand';

const useJenisStore = create((set) => ({
  jenis: [],
  isLoading: false,
  error: null,

  fetchJenis: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/jenis")
      set({
        jenis: [
          { id: 1, nama: 'HP' },
          { id: 2, nama: 'Laptop' },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useJenisStore;
