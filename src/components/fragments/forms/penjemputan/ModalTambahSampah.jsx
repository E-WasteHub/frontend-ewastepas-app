// src/components/fragments/forms/penjemputan/ModalTambahSampah.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Input, Label, Textarea } from '../../../elements';
import SampahUpload from '../../uploads/SampahUpload';

const ModalTambahSampah = ({
  isOpen,
  onClose,
  draftSampah,
  setDraftSampah,
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
          {/* Jumlah */}
          <div>
            <Label required>Jumlah</Label>
            <Input
              type='number'
              min='1'
              value={draftSampah.jumlah_sampah}
              onChange={(e) =>
                setDraftSampah((p) => ({ ...p, jumlah_sampah: e.target.value }))
              }
            />
          </div>

          {/* Catatan */}
          <div>
            <Label>Catatan Kondisi</Label>
            <Textarea
              rows={2}
              value={draftSampah.catatan_sampah}
              onChange={(e) =>
                setDraftSampah((p) => ({
                  ...p,
                  catatan_sampah: e.target.value,
                }))
              }
            />
          </div>

          {/* Foto */}
          <div>
            <SampahUpload
              gambarSampah={
                draftSampah.file
                  ? [
                      {
                        file: draftSampah.file,
                        url: draftSampah.previewUrl,
                        name: draftSampah.file?.name || 'Preview',
                        size: draftSampah.file?.size,
                        id: 'draft-image',
                      },
                    ]
                  : []
              }
              onGambarChange={(images) => {
                if (images.length === 0) {
                  // User cleared all images
                  setDraftSampah((p) => ({
                    ...p,
                    file: null,
                    previewUrl: null,
                  }));
                } else {
                  // User added/updated image
                  const latestImage = images[images.length - 1];
                  setDraftSampah((p) => ({
                    ...p,
                    file: latestImage?.file || null,
                    previewUrl: latestImage?.url || null,
                  }));
                }
              }}
              maxImages={1}
              required={false}
            />
          </div>
        </div>

        {/* Action */}
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
