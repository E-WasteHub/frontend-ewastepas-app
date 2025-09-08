// src/components/elements/CacheManager.jsx
import { AlertCircle, CheckCircle, Download, Info, Trash2 } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import useOfflineEdukasi from '../../hooks/useOfflineEdukasi';

const CacheManager = ({ className = '' }) => {
  const { isDarkMode } = useDarkMode();
  const {
    isOnline,
    isCaching,
    cacheProgress,
    cacheAllEdukasi,
    getCacheInfo,
    clearCache,
  } = useOfflineEdukasi();

  const [showDetails, setShowDetails] = useState(false);
  const [cacheStatus, setCacheStatus] = useState(null);

  const cacheInfo = getCacheInfo();

  const handleCacheData = async () => {
    if (!isOnline) {
      setCacheStatus({
        type: 'error',
        message: 'Tidak dapat menyimpan data saat offline',
      });
      return;
    }

    const success = await cacheAllEdukasi();
    if (success) {
      setCacheStatus({
        type: 'success',
        message: 'Semua konten edukasi berhasil disimpan untuk akses offline',
      });
    } else {
      setCacheStatus({
        type: 'error',
        message: 'Gagal menyimpan konten edukasi',
      });
    }

    setTimeout(() => setCacheStatus(null), 5000);
  };

  const handleClearCache = () => {
    clearCache();
    setCacheStatus({ type: 'success', message: 'Cache berhasil dibersihkan' });
    setTimeout(() => setCacheStatus(null), 3000);
  };

  const formatDate = (date) => {
    if (!date) return 'Belum pernah';
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`${className}`}>
      <div
        className={`border rounded-lg p-4 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <Download className='w-5 h-5 text-green-600' />
            <h3
              className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Konten Offline
            </h3>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`text-xs px-2 py-1 rounded ${
              isDarkMode
                ? 'text-slate-400 hover:text-slate-300'
                : 'text-slate-600 hover:text-slate-700'
            }`}
          >
            <Info className='w-4 h-4' />
          </button>
        </div>

        {/* Status */}
        <div className='mb-4'>
          <div className='flex items-center gap-2 mb-2'>
            {isOnline ? (
              <div className='flex items-center gap-1 text-green-600 text-sm'>
                <CheckCircle className='w-4 h-4' />
                Online
              </div>
            ) : (
              <div className='flex items-center gap-1 text-amber-600 text-sm'>
                <AlertCircle className='w-4 h-4' />
                Offline
              </div>
            )}
            <span
              className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              • {cacheInfo.totalCached} konten tersimpan
            </span>
          </div>

          {showDetails && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-xs space-y-1 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <p>Terakhir disimpan: {formatDate(cacheInfo.lastCached)}</p>
              <p>
                Status: {cacheInfo.isExpired ? 'Perlu diperbarui' : 'Terkini'}
              </p>
            </Motion.div>
          )}
        </div>

        {/* Progress bar saat caching */}
        {isCaching && (
          <div className='mb-4'>
            <div className='flex justify-between text-sm mb-1'>
              <span
                className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}
              >
                Menyimpan konten...
              </span>
              <span
                className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}
              >
                {Math.round(cacheProgress)}%
              </span>
            </div>
            <div
              className={`w-full bg-slate-200 rounded-full h-2 ${
                isDarkMode ? 'bg-slate-700' : ''
              }`}
            >
              <Motion.div
                className='bg-green-600 h-2 rounded-full'
                initial={{ width: 0 }}
                animate={{ width: `${cacheProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Status message */}
        {cacheStatus && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs p-2 rounded mb-4 ${
              cacheStatus.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {cacheStatus.message}
          </Motion.div>
        )}

        {/* Actions */}
        <div className='flex gap-2'>
          <button
            onClick={handleCacheData}
            disabled={!isOnline || isCaching}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              !isOnline || isCaching
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <Download className='w-4 h-4' />
            {isCaching ? 'Menyimpan...' : 'Simpan Offline'}
          </button>

          {cacheInfo.totalCached > 0 && (
            <button
              onClick={handleClearCache}
              disabled={isCaching}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Trash2 className='w-4 h-4' />
            </button>
          )}
        </div>

        {!isOnline && cacheInfo.totalCached === 0 && (
          <p className='text-xs text-amber-600 mt-2'>
            Tidak ada konten offline. Sambungkan internet untuk menyimpan
            konten.
          </p>
        )}
      </div>
    </div>
  );
};

export default CacheManager;
