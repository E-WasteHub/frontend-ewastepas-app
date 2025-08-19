import { create } from 'zustand';
// import api from "../services/api";

const useProfilStore = create((set) => ({
  profil: null,
  isLoading: false,
  error: null,

  fetchProfil: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: ganti dengan axios API
      // const res = await api.get(`/profil/${userId}`);
      // set({ profil: res.data, isLoading: false });

      set({
        profil: { id: userId, name: 'Dummy User', alamat: 'Bandung' },
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateProfil: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.put(`/profil/${updates.id}`, updates)
      set((state) => ({
        profil: { ...state.profil, ...updates },
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useProfilStore;
