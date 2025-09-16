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
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      scope: '/',
      base: '/',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifest: {
        name: 'Ewastepas',
        short_name: 'Ewastepas',
        description: 'Aplikasi Antar Jemput Sampah Elektronik',
        theme_color: '#508D4E',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        lang: 'id',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Halaman edukasi tetap bisa diakses offline
            urlPattern: ({ url }) => url.pathname.startsWith('/edukasi'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'edukasi-pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
              },
            },
          },
          {
            // API edukasi → selalu coba fetch baru dulu, fallback ke cache
            urlPattern: ({ url }) => url.pathname.includes('/konten-edukasi'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'edukasi-api-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request, url }) =>
              request.destination === 'image' &&
              url.hostname === 'be.ewastepas.my.id' &&
              url.pathname.startsWith('/uploads/konten'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'edukasi-gambar-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // biar update SW lebih aman, nggak langsung replace
        skipWaiting: false,
        clientsClaim: false,
      },
    }),
  ],

  // Build optimization
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    assetsInlineLimit: 4096,
  },
});
