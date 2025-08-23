import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const ngrokUrl = 'https://df8d346198be.ngrok-free.app/';
const ngrokHost = new URL(ngrokUrl).hostname;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      host: ngrokHost,
      protocol: 'wss',
    },
    allowedHosts: [ngrokHost],
  },
});
