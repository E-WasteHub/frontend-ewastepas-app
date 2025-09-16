// src/components/fragments/forms/penjemputan/ModalTambahSampah.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Input, Label, Textarea } from '../../../elements';
import SampahUpload from '../../uploads/SampahUpload';

const ModalTambahSampah = ({
  isOpen,
  onClose,
  sampahSementara,
  setSampahSementara,
  onSave,
}) => {
  const { isDarkMode } = useDarkMode();
  if (!isOpen) return null;

  // ubah gambar sampah sementara
  const ubahGambarSampahSementara = (images) => {
    if (images.length === 0) {
      // user menghapus gambar
      setSampahSementara((p) => ({
        ...p,
        file: null,
        previewUrl: null,
      }));
    } else {
      // user menambah/mengganti gambar
      const latestImage = images[images.length - 1];
      setSampahSementara((p) => ({
        ...p,
        file: latestImage?.file || null,
        previewUrl: latestImage?.url || null,
      }));
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div
        className={`rounded-lg shadow-lg w-full max-w-md p-6 relative ${
          isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
        }`}
      >
        <h3 className='text-lg font-bold mb-4'>Detail Sampah</h3>

        <div className='space-y-3'>
          {/* jumlah */}
          <div>
            <Label required>Jumlah</Label>
            <Input
              type='number'
              min='1'
              value={sampahSementara.jumlah_sampah}
              onChange={(e) =>
                setSampahSementara((p) => ({
                  ...p,
                  jumlah_sampah: e.target.value,
                }))
              }
            />
          </div>

          {/* catatan */}
          <div>
            <Label>Catatan Kondisi</Label>
            <Textarea
              rows={2}
              value={sampahSementara.catatan_sampah}
              onChange={(e) =>
                setSampahSementara((p) => ({
                  ...p,
                  catatan_sampah: e.target.value,
                }))
              }
            />
          </div>

          {/* foto */}
          <div>
            <SampahUpload
              gambarSampah={
                sampahSementara.file
                  ? [
                      {
                        file: sampahSementara.file,
                        url: sampahSementara.previewUrl,
                        name: sampahSementara.file?.name || 'Preview',
                        id: 'sampah-sementara',
                      },
                    ]
                  : []
              }
              onGambarChange={ubahGambarSampahSementara}
              disabled={false}
            />
          </div>
        </div>

        {/* action */}
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
