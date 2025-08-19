import { create } from 'zustand';

const useKonversiPoinStore = create((set) => ({
  konversiPoin: [],
  isLoading: false,
  error: null,

  fetchKonversiPoin: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/konversi-poin")
      set({
        konversiPoin: [{ id: 1, nilai: 100, deskripsi: '100 poin = Rp10.000' }],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useKonversiPoinStore;
