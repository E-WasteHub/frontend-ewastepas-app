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
      workbox: {
        // Cache First - untuk asset statis yang jarang berubah
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
            },
          },
          // Cache First - untuk gambar dan asset media
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
            },
          },
          // Cache First - untuk CSS dan JS yang sudah di-bundle
          {
            urlPattern: /\.(?:css|js)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
              },
            },
          },
          // Network First - untuk API calls dan data dinamis
          {
            urlPattern: /^https:\/\/api\.ewastehub\.com\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 menit
              },
              networkTimeoutSeconds: 3,
            },
          },
          // Network First - untuk halaman HTML dinamis
          {
            urlPattern: /^https:\/\/ewastehub\.com\/dashboard\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dashboard-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 10, // 10 menit
              },
              networkTimeoutSeconds: 3,
            },
          },
          // Stale While Revalidate - untuk konten yang bisa sedikit outdated
          {
            urlPattern:
              /^https:\/\/ewastehub\.com\/(?:kategori|manfaat|edukasi|panduan).*$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'content-pages-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24, // 24 jam
              },
            },
          },
        ],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        globIgnores: ['**/node_modules/**/*'],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'EwasteHub - Platform Daur Ulang E-Waste',
        short_name: 'EwasteHub',
        description:
          'Platform digital untuk mengelola dan mendaur ulang sampah elektronik dengan mudah dan aman',
        theme_color: '#10b981',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
        categories: ['utilities', 'lifestyle', 'productivity'],
        shortcuts: [
          {
            name: 'Jemput Sampah',
            short_name: 'Pickup',
            description: 'Jadwalkan penjemputan e-waste',
            url: '/dashboard/pickup',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'Lihat aktivitas dan poin Anda',
            url: '/dashboard',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable PWA in development
      },
    }),
  ],
});
