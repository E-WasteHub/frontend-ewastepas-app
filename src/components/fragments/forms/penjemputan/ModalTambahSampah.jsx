// src/components/fragments/forms/penjemputan/ModalTambahSampah.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Input, Label, Textarea } from '../../../elements';

const ModalTambahSampah = ({
  isOpen,
  onClose,
  tempSampah,
  setTempSampah,
  onSave,
}) => {
  const { isDarkMode } = useDarkMode();
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div
        className={`rounded-lg shadow-lg w-full max-w-md p-6 relative ${
          isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
        }`}
      >
        <h3 className='text-lg font-bold mb-4'>Detail Sampah</h3>

        <div className='space-y-3'>
          <div>
            <Label required>Jumlah</Label>
            <Input
              type='number'
              min='1'
              value={tempSampah.jumlah_sampah}
              onChange={(e) =>
                setTempSampah((p) => ({ ...p, jumlah_sampah: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>Catatan Kondisi</Label>
            <Textarea
              rows={2}
              value={tempSampah.catatan_sampah}
              onChange={(e) =>
                setTempSampah((p) => ({ ...p, catatan_sampah: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>Foto (opsional)</Label>
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setTempSampah((p) => ({
                    ...p,
                    gambar: file,
                    previewUrl: URL.createObjectURL(file),
                  }));
                }
              }}
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6 flex-wrap sm:flex-nowrap'>
          <Button variant='secondary' onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalTambahSampah;
