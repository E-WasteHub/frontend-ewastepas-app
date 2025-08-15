import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import {
  getJenisOptions,
  kategoriSampahOptions,
} from '../../../services/permintaanPenjemputanService';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import InputSelect from '../../common/inputs/InputSelect';
import InputText from '../../common/inputs/InputText';

/**
 * Komponen untuk mengelola daftar sampah
 */
const DaftarSampah = ({ daftarSampah, onSampahChange }) => {
  const { isDarkMode } = useDarkMode();
  const [showSampahModal, setShowSampahModal] = useState(false);
  const [editSampahIndex, setEditSampahIndex] = useState(null);
  const [sampahForm, setSampahForm] = useState({
    id_kategori: '',
    id_jenis: '',
    berat_sampah: '',
  });

  // Mendapatkan opsi jenis berdasarkan kategori yang dipilih
  const jenisOptions = getJenisOptions(sampahForm.id_kategori);

  // Handler untuk sampah
  const handleSampahInputChange = (field, value) => {
    setSampahForm((prev) => {
      const newForm = {
        ...prev,
        [field]: value,
      };

      // Reset jenis jika kategori berubah
      if (field === 'id_kategori') {
        newForm.id_jenis = '';
      }

      return newForm;
    });
  };

  const handleTambahSampah = () => {
    setSampahForm({
      id_kategori: '',
      id_jenis: '',
      berat_sampah: '',
    });
    setEditSampahIndex(null);
    setShowSampahModal(true);
  };

  const handleEditSampah = (index) => {
    setSampahForm(daftarSampah[index]);
    setEditSampahIndex(index);
    setShowSampahModal(true);
  };

  const handleSimpanSampah = () => {
    if (
      !sampahForm.id_kategori ||
      !sampahForm.id_jenis ||
      !sampahForm.berat_sampah
    ) {
      alert('Semua field harus diisi');
      return;
    }

    const newDaftarSampah = [...daftarSampah];

    if (editSampahIndex !== null) {
      newDaftarSampah[editSampahIndex] = sampahForm;
    } else {
      newDaftarSampah.push({
        ...sampahForm,
        id: Date.now(),
      });
    }

    onSampahChange(newDaftarSampah);
    setShowSampahModal(false);
  };

  const handleHapusSampah = (index) => {
    if (confirm('Yakin ingin menghapus sampah ini?')) {
      const newDaftarSampah = daftarSampah.filter((_, i) => i !== index);
      onSampahChange(newDaftarSampah);
    }
  };

  return (
    <>
      <div className='space-y-3 md:space-y-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0'>
          <h3
            className={`text-base md:text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Sampah ({daftarSampah.length} item)
          </h3>
          <Button
            onClick={handleTambahSampah}
            variant='primary'
            size='sm'
            type='button'
            className='text-sm sm:text-base px-3 md:px-4 py-1.5 md:py-2 w-full sm:w-auto'
          >
            Tambah Sampah
          </Button>
        </div>

        {daftarSampah.length === 0 ? (
          <div
            className={`p-4 md:p-6 border-2 border-dashed rounded-lg text-center ${
              isDarkMode
                ? 'border-gray-600 text-gray-400'
                : 'border-gray-300 text-gray-500'
            }`}
          >
            <p className='text-sm'>Belum ada sampah yang ditambahkan</p>
          </div>
        ) : (
          <div className='space-y-2 md:space-y-3'>
            {daftarSampah.map((sampah, index) => {
              const kategori = kategoriSampahOptions.find(
                (k) => k.value === sampah.id_kategori
              );
              const jenis = getJenisOptions(sampah.id_kategori).find(
                (j) => j.value === sampah.id_jenis
              );
              return (
                <div
                  key={index}
                  className={`p-3 md:p-4 border rounded-lg ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-800'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0'>
                    <div className='flex-1'>
                      <h4
                        className={`font-medium text-sm md:text-base ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {jenis?.label || 'Jenis tidak diketahui'}
                      </h4>
                      <p
                        className={`text-xs md:text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {kategori?.label || 'Kategori tidak diketahui'} •{' '}
                        {sampah.berat_sampah} kg
                      </p>
                    </div>
                    <div className='flex gap-2 self-end sm:self-start'>
                      <Button
                        onClick={() => handleEditSampah(index)}
                        variant='ghost'
                        size='sm'
                        type='button'
                        className='text-xs md:text-sm px-2 md:px-3 py-1'
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleHapusSampah(index)}
                        variant='ghost'
                        size='sm'
                        type='button'
                        className='text-red-500 text-xs md:text-sm px-2 md:px-3 py-1'
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Form Sampah */}
      <Modal
        isOpen={showSampahModal}
        onClose={() => setShowSampahModal(false)}
        title={editSampahIndex !== null ? 'Edit Sampah' : 'Tambah Sampah'}
        size='md'
      >
        <div className='space-y-4'>
          <InputSelect
            label='Kategori Sampah'
            value={sampahForm.id_kategori}
            onChange={(value) => handleSampahInputChange('id_kategori', value)}
            options={kategoriSampahOptions}
            required
          />

          <InputSelect
            label='Jenis Sampah'
            value={sampahForm.id_jenis}
            onChange={(value) => handleSampahInputChange('id_jenis', value)}
            options={jenisOptions}
            disabled={!sampahForm.id_kategori}
            required
          />

          <InputText
            label='Berat Sampah (kg)'
            type='number'
            value={sampahForm.berat_sampah}
            onChange={(value) => handleSampahInputChange('berat_sampah', value)}
            placeholder='0.0'
            step='0.1'
            min='0'
            required
          />
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={() => setShowSampahModal(false)}
            variant='ghost'
            className='flex-1'
            type='button'
          >
            Batal
          </Button>
          <Button
            onClick={handleSimpanSampah}
            variant='primary'
            className='flex-1'
            type='button'
          >
            {editSampahIndex !== null ? 'Simpan' : 'Tambah'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DaftarSampah;
