import { create } from 'zustand';
// import api from "../services/api"; // nanti aktifkan kalau backend sudah ada

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 🚀 Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: ganti dengan axios API
      // const res = await api.post("/auth/login", credentials);
      // const { user, role } = res.data;

      const user = { id: 1, name: 'Dummy User', email: 'dummy@mail.com' };
      const role = 'masyarakat';

      set({ user, role, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // 🚀 Logout
  logout: () => {
    // TODO: panggil API logout kalau ada session di backend
    set({ user: null, role: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
