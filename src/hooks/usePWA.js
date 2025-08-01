import { useEffect, useState } from 'react';

let swRegistered = false; // Flag to prevent duplicate registration

const usePWA = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);
  const [isOfflineReady, setIsOfflineReady] = useState(false);

  useEffect(() => {
    // Prevent duplicate registration in StrictMode
    if (swRegistered || !('serviceWorker' in navigator)) return;

    swRegistered = true;

    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        const updateFunction = registerSW({
          onNeedRefresh() {
            console.log('🔄 New content available');
            setShowUpdatePrompt(true);
          },
          onOfflineReady() {
            console.log('✅ App ready to work offline');
            setIsOfflineReady(true);
          },
          onRegistered(r) {
            console.log('📱 SW Registered successfully');
            // Only log in development
            if (import.meta.env.DEV) {
              console.log('Registration details:', r);
            }
          },
          onRegisterError(error) {
            console.error('❌ SW registration error:', error);
            swRegistered = false; // Reset flag on error
          },
        });
        setUpdateSW(() => updateFunction);
      })
      .catch((error) => {
        console.log('PWA registration failed:', error);
        swRegistered = false; // Reset flag on error
      });
  }, []);

  const updateApp = () => {
    if (updateSW) {
      updateSW(true);
    }
    setShowUpdatePrompt(false);
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  return {
    showUpdatePrompt,
    isOfflineReady,
    updateApp,
    dismissUpdate,
  };
};

export default usePWA;
