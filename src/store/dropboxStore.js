import { create } from 'zustand';

const useDropboxStore = create((set) => ({
  dropbox: [],
  isLoading: false,
  error: null,

  fetchDropbox: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/dropbox")
      set({
        dropbox: [
          { id: 1, lokasi: 'Bandung' },
          { id: 2, lokasi: 'Jakarta' },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useDropboxStore;
