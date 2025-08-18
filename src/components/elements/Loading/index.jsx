import { Loader2 } from 'lucide-react';

const sizeConfig = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const Loading = ({ size = 'md', text }) => {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Loader2 className={`${sizeConfig[size]} animate-spin text-green-600`} />
      {text && <p className='mt-2 text-sm text-gray-600'>{text}</p>}
    </div>
  );
};

export default Loading;
