import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifest: {
        name: 'EWasteHub',
        short_name: 'EWasteHub',
        description: 'Aplikasi Antar Jemput Sampah Elektronik',
        theme_color: '#508D4E',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // hanya cache untuk EdukasiView & DetailEdukasiView
            urlPattern: ({ url }) => url.pathname.startsWith('/edukasi'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'edukasi-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
              },
            },
          },
        ],
      },
    }),
  ],
  // ✅ Optimasi Build untuk Skripsi (Simple & Basic)
  build: {
    // Tingkatkan limit warning chunk size
    chunkSizeWarningLimit: 1000,

    // Optimasi sederhana untuk split bundle
    rollupOptions: {
      output: {
        // Pisahkan React libraries dari app code
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },

    // Optimasi assets
    assetsInlineLimit: 4096,
  },
});
