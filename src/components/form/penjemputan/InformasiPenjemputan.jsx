import useDarkMode from '../../../hooks/useDarkMode';
import { waktuOperasionalOptions } from '../../../services/permintaanPenjemputanService';
import InputSelect from '../../common/inputs/InputSelect';
import InputText from '../../common/inputs/InputText';
import InputTextarea from '../../common/inputs/InputTextarea';

/**
 * Komponen untuk form informasi penjemputan
 */
const InformasiPenjemputan = ({ formData, onInputChange }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-3 md:space-y-4'>
      <h3
        className={`text-base md:text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Informasi Penjemputan
      </h3>

      <div className='space-y-3 md:space-y-4'>
        <InputTextarea
          label='Alamat Penjemputan'
          value={formData.alamat_jemput}
          onChange={(value) => onInputChange('alamat_jemput', value)}
          placeholder='Masukkan alamat lengkap untuk penjemputan'
          rows={3}
          required
        />

        <InputText
          label='Waktu Penjemputan'
          type='datetime-local'
          value={formData.waktu_dijemput}
          onChange={(value) => onInputChange('waktu_dijemput', value)}
          required
        />

        <InputSelect
          label='Waktu Operasional'
          value={formData.id_waktu_operasional}
          onChange={(value) => onInputChange('id_waktu_operasional', value)}
          options={waktuOperasionalOptions}
          required
        />

        <InputTextarea
          label='Catatan Tambahan'
          value={formData.catatan}
          onChange={(value) => onInputChange('catatan', value)}
          placeholder='Catatan untuk kurir (opsional)'
          rows={3}
        />
      </div>
    </div>
  );
};

export default InformasiPenjemputan;
