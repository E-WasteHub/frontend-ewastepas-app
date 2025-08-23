// src/components/fragments/forms/FormPenjemputan/SampahConfirmDialogForm.jsx
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button, Input, Modal, Textarea } from '../../../elements';

const SampahConfirmDialogForm = ({ isOpen, onClose, onConfirm }) => {
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState('');
  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // modal untuk preview besar
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFoto = () => {
    setFoto(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    onConfirm({ jumlah, catatan, foto });
    // reset setelah submit
    setJumlah(1);
    setCatatan('');
    setFoto(null);
    setPreviewUrl(null);
  };

  return (
    <>
      {/* Modal utama form konfirmasi */}
      <Modal isOpen={isOpen} onClose={onClose} title='Konfirmasi Sampah'>
        <div className='space-y-4'>
          {/* Jumlah */}
          <div>
            <label className='text-sm sm:text-base font-medium'>Jumlah</label>
            <Input
              type='number'
              min='1'
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className='mt-1 w-full'
            />
          </div>

          {/* Catatan */}
          <div>
            <label className='text-sm sm:text-base font-medium'>
              Catatan Kondisi
            </label>
            <Textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder='Misalnya: layarnya retak, masih bisa dinyalakan'
              className='mt-1 w-full'
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className='text-sm sm:text-base font-medium'>
              Upload Foto
            </label>

            {/* Hidden input */}
            <input
              type='file'
              accept='image/*'
              id='uploadFoto'
              className='hidden'
              onChange={handleFile}
            />

            {/* Button upload */}
            {!previewUrl ? (
              <label
                htmlFor='uploadFoto'
                className='mt-2 flex flex-col items-center justify-center border border-dashed rounded-lg cursor-pointer p-4 sm:p-6
                  hover:bg-gray-100 dark:hover:bg-slate-700 transition text-center'
              >
                <span className='text-xs sm:text-sm text-gray-500 dark:text-gray-300'>
                  Klik untuk pilih foto
                </span>
              </label>
            ) : (
              <div className='relative mt-2 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border cursor-pointer'>
                <img
                  src={previewUrl}
                  alt='Preview'
                  className='w-full h-full object-cover'
                  onClick={() => setIsPreviewOpen(true)} // klik untuk modal besar
                />
                <button
                  type='button'
                  onClick={handleRemoveFoto}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Batal
            </Button>
            <Button
              type='button'
              onClick={handleSubmit}
              className='bg-green-600 hover:bg-green-700 text-white'
            >
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal preview foto besar */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title='Preview Foto'
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt='Preview Besar'
            className='max-h-[80vh] w-auto mx-auto rounded-md'
          />
        )}
      </Modal>
    </>
  );
};

export default SampahConfirmDialogForm;
