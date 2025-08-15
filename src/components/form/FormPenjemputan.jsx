import Button from '../common/Button';
import Card from '../common/Card';
import DaftarSampah from './penjemputan/DaftarSampah';
import InformasiPenjemputan from './penjemputan/InformasiPenjemputan';
import UploadFoto from './penjemputan/UploadFoto';

/**
 * Komponen form lengkap untuk permintaan penjemputan dengan layout 2 kolom
 * @param {Object} props
 * @param {Object} props.formData - Data form
 * @param {Function} props.onInputChange - Handler untuk perubahan input
 * @param {Array} props.daftarSampah - Daftar sampah
 * @param {Function} props.onSampahChange - Handler untuk perubahan sampah
 * @param {Array} props.photos - Daftar foto
 * @param {Function} props.onPhotoUpload - Handler upload foto
 * @param {Function} props.onPhotoRemove - Handler hapus foto
 * @param {boolean} props.isSubmitting - Status loading submit
 * @param {Function} props.onCancel - Handler untuk tombol batal
 */
const FormPenjemputan = ({
  formData,
  onInputChange,
  daftarSampah,
  onSampahChange,
  photos,
  onPhotoUpload,
  onPhotoRemove,
  isSubmitting = false,
  onCancel,
}) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
      {/* Kolom Kiri - Informasi Penjemputan */}
      <div className='space-y-4 md:space-y-6'>
        <Card>
          <Card.Body className='p-4 md:p-6'>
            <InformasiPenjemputan
              formData={formData}
              onInputChange={onInputChange}
            />
          </Card.Body>
        </Card>
      </div>

      {/* Kolom Kanan - Daftar Sampah & Upload Foto */}
      <div className='space-y-4 md:space-y-6'>
        <Card>
          <Card.Body className='p-4 md:p-6'>
            <DaftarSampah
              daftarSampah={daftarSampah}
              onSampahChange={onSampahChange}
            />
          </Card.Body>
        </Card>

        <Card>
          <Card.Body className='p-4 md:p-6'>
            <UploadFoto
              photos={photos}
              onPhotoUpload={onPhotoUpload}
              onPhotoRemove={onPhotoRemove}
            />
          </Card.Body>
        </Card>

        {/* Submit Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 sm:justify-end pt-2 md:pt-4'>
          <Button
            type='button'
            variant='outline'
            className='px-4 md:px-6 py-3 sm:w-auto text-sm md:text-base'
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button
            type='submit'
            className='px-4 md:px-6 py-2 sm:w-auto text-sm md:text-base'
            disabled={
              isSubmitting ||
              !formData.alamat_jemput ||
              !formData.waktu_dijemput ||
              !formData.id_waktu_operasional ||
              !formData.id_dropbox ||
              daftarSampah.length === 0
            }
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPenjemputan;
