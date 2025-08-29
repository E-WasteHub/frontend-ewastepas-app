import { Loader2 } from 'lucide-react';

const sizeConfig = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const Loading = ({ size = 'md', text, mode = 'inline', className = '' }) => {
  // 🔹 Mode Overlay → full screen
  if (mode === 'overlay') {
    return (
      <div className='fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm'>
        <Loader2 className='w-12 h-12 animate-spin text-green-500' />
        {text && <p className='mt-3 text-white font-medium'>{text}</p>}
      </div>
    );
  }

  // 🔹 Mode Inline → biasanya di card/section
  if (mode === 'inline') {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 ${className}`}
      >
        <Loader2
          className={`${sizeConfig[size]} animate-spin text-green-600`}
        />
        {text && <p className='mt-2 text-sm text-gray-600'>{text}</p>}
      </div>
    );
  }

  // 🔹 Mode Button → untuk di dalam tombol (inline row, kecil)
  if (mode === 'button') {
    return (
      <span className={`flex items-center gap-2 ${className}`}>
        <Loader2 className={`${sizeConfig[size]} animate-spin text-white`} />
        {text && <span>{text}</span>}
      </span>
    );
  }

  return null;
};

export default Loading;
