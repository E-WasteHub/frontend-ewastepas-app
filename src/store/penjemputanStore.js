import { create } from 'zustand';
// import api from "../services/api";

const usePenjemputanStore = create((set) => ({
  penjemputan: [],
  isLoading: false,
  error: null,

  fetchPenjemputan: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: axios.get("/penjemputan")
      set({
        penjemputan: [
          { id: 1, status: 'pending', alamat: 'Jl. Dummy No.1' },
          { id: 2, status: 'selesai', alamat: 'Jl. Testing No.2' },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  tambahPenjemputan: async (baru) => {
    try {
      // TODO: axios.post("/penjemputan", baru)
      set((state) => ({
        penjemputan: [...state.penjemputan, { id: Date.now(), ...baru }],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateStatus: async (id, status) => {
    try {
      // TODO: axios.put(`/penjemputan/${id}`, { status })
      set((state) => ({
        penjemputan: state.penjemputan.map((p) =>
          p.id === id ? { ...p, status } : p
        ),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default usePenjemputanStore;
