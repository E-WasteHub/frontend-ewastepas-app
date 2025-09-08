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
        enabled: true, // Enable PWA in development
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
            src: '/icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        categories: ['education', 'environmental', 'utilities'],
        shortcuts: [
          {
            name: 'Edukasi',
            short_name: 'Edukasi',
            description: 'Akses konten edukasi sampah elektronik',
            url: '/edukasi',
            icons: [
              {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
              },
            ],
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache halaman edukasi
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
            // Cache API calls untuk konten edukasi
            urlPattern: ({ url }) => url.pathname.includes('/konten-edukasi'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'edukasi-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
              },
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache gambar edukasi
            urlPattern: ({ request }) =>
              request.destination === 'image' &&
              request.url.includes('edukasi'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'edukasi-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
            },
          },
        ],
        skipWaiting: false, // Prevent immediate activation
        clientsClaim: false, // Prevent immediate control
      },
    }),
  ],
  // Optimasi Build
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
