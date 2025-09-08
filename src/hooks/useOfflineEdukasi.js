// src/hooks/useOfflineEdukasi.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { ambilSemuaEdukasi, detailEdukasi } from '../services/edukasiService';

const CACHE_KEY_PREFIX = 'ewastehub_edukasi_';
const CACHE_LIST_KEY = 'ewastehub_edukasi_list';
const CACHE_TIMESTAMP_KEY = 'ewastehub_edukasi_timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 hari

const useOfflineEdukasi = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isCaching, setIsCaching] = useState(false);
  const [cacheProgress, setCacheProgress] = useState(0);

  // Track jika sudah ada request yang sedang berjalan
  const activeRequestRef = useRef(null);
  const isRequestingRef = useRef(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simpan data ke localStorage
  const saveToCache = useCallback((key, data) => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  // Ambil data dari localStorage
  const getFromCache = useCallback((key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);

      // Check if cache is still valid
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting from cache:', error);
      return null;
    }
  }, []);

  // Cache semua edukasi untuk offline
  const cacheAllEdukasi = useCallback(async () => {
    if (!isOnline) {
      console.log('Cannot cache while offline');
      return false;
    }

    try {
      setIsCaching(true);
      setCacheProgress(0);

      // Ambil list edukasi
      const response = await ambilSemuaEdukasi();
      const edukasiList = response.data || response;

      // Simpan list ke cache
      saveToCache(CACHE_LIST_KEY, edukasiList);
      setCacheProgress(20);

      // Cache detail setiap edukasi
      const totalItems = edukasiList.length;
      for (let i = 0; i < totalItems; i++) {
        const item = edukasiList[i];
        try {
          const detailResponse = await detailEdukasi(item.id_konten);
          saveToCache(
            `${CACHE_KEY_PREFIX}${item.id_konten}`,
            detailResponse.data || detailResponse
          );
          setCacheProgress(20 + ((i + 1) / totalItems) * 80);
        } catch (error) {
          console.error(`Error caching detail for ${item.id_konten}:`, error);
        }
      }

      // Simpan timestamp cache
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

      console.log('All edukasi cached successfully');
      return true;
    } catch (error) {
      console.error('Error caching edukasi:', error);
      return false;
    } finally {
      setIsCaching(false);
      setCacheProgress(0);
    }
  }, [isOnline, saveToCache]);

  // Ambil list edukasi (online/offline) - FIXED dengan useCallback dan request deduplication
  const getEdukasiList = useCallback(async () => {
    // Cek jika sudah ada request yang berjalan
    if (isRequestingRef.current) {
      return activeRequestRef.current;
    }

    const executeRequest = async () => {
      if (isOnline) {
        try {
          const response = await ambilSemuaEdukasi();
          const data = response.data || response;
          // Update cache with fresh data
          saveToCache(CACHE_LIST_KEY, data);
          return data;
        } catch (error) {
          console.error(
            'Error fetching online data, falling back to cache:',
            error
          );
          return getFromCache(CACHE_LIST_KEY) || [];
        }
      } else {
        // Offline: ambil dari cache
        const cached = getFromCache(CACHE_LIST_KEY);
        if (cached) {
          return cached;
        } else {
          throw new Error(
            'Tidak ada data edukasi yang tersimpan untuk mode offline'
          );
        }
      }
    };

    // Set flag bahwa request sedang berjalan
    isRequestingRef.current = true;

    // Buat promise dan simpan ke ref
    activeRequestRef.current = executeRequest();

    try {
      const result = await activeRequestRef.current;
      return result;
    } finally {
      // Reset flags setelah request selesai
      isRequestingRef.current = false;
      activeRequestRef.current = null;
    }
  }, [isOnline, saveToCache, getFromCache]);

  // Ambil detail edukasi (online/offline)
  const getEdukasiDetail = useCallback(
    async (id) => {
      const cacheKey = `${CACHE_KEY_PREFIX}${id}`;

      if (isOnline) {
        try {
          const response = await detailEdukasi(id);
          const data = response.data || response;
          // Update cache with fresh data
          saveToCache(cacheKey, data);
          return data;
        } catch (error) {
          console.error(
            'Error fetching online detail, falling back to cache:',
            error
          );
          const cached = getFromCache(cacheKey);
          if (cached) {
            return cached;
          }
          throw error;
        }
      } else {
        // Offline: ambil dari cache
        const cached = getFromCache(cacheKey);
        if (cached) {
          return cached;
        } else {
          throw new Error(
            'Detail edukasi tidak tersedia offline. Silakan akses saat online untuk menyimpan konten.'
          );
        }
      }
    },
    [isOnline, saveToCache, getFromCache]
  );

  // Check if edukasi is cached
  const isEdukasiCached = useCallback(
    (id) => {
      return !!getFromCache(`${CACHE_KEY_PREFIX}${id}`);
    },
    [getFromCache]
  );

  // Get cache info
  const getCacheInfo = useCallback(() => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const listCache = getFromCache(CACHE_LIST_KEY);

    return {
      lastCached: timestamp ? new Date(parseInt(timestamp)) : null,
      totalCached: listCache ? listCache.length : 0,
      isExpired: timestamp
        ? Date.now() - parseInt(timestamp) > CACHE_DURATION
        : true,
    };
  }, [getFromCache]);

  // Clear all cache
  const clearCache = useCallback(() => {
    try {
      // Remove list cache
      localStorage.removeItem(CACHE_LIST_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);

      // Remove detail caches
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });

      console.log('Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, []);

  return {
    isOnline,
    isCaching,
    cacheProgress,
    cacheAllEdukasi,
    getEdukasiList,
    getEdukasiDetail,
    isEdukasiCached,
    getCacheInfo,
    clearCache,
  };
};

export default useOfflineEdukasi;
