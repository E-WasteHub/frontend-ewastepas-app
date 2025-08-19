import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ text = 'Memuat...' }) => {
  return (
    <div className='fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm'>
      <Loader2 className='w-12 h-12 animate-spin text-green-500' />
      {text && <p className='mt-3 text-white font-medium'>{text}</p>}
    </div>
  );
};

export default LoadingOverlay;
