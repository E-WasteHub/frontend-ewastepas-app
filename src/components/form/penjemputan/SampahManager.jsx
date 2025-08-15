import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { kategoriSampahOptions } from '../../../services/permintaanPenjemputanService';
import Button from '../../common/Button';
import InputSelect from '../../common/inputs/InputSelect';
import InputText from '../../common/inputs/InputText';

/**
 * Komponen sederhana untuk mengelola daftar sampah
 * @param {Object} props
 * @param {Array} props.daftarSampah - Array daftar sampah
 * @param {Function} props.onSampahChange - Handler untuk perubahan daftar sampah
 */
const SampahManager = ({ daftarSampah, onSampahChange }) => {
  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sampahForm, setSampahForm] = useState({
    id_kategori: '',
    nama_sampah: '',
    berat_sampah: '',
  });

  const handleInputChange = (field, value) => {
    setSampahForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTambahSampah = () => {
    setSampahForm({
      id_kategori: '',
      nama_sampah: '',
      berat_sampah: '',
    });
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEditSampah = (index) => {
    setSampahForm(daftarSampah[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSimpanSampah = () => {
    if (
      !sampahForm.id_kategori ||
      !sampahForm.nama_sampah ||
      !sampahForm.berat_sampah
    ) {
      alert('Semua field harus diisi');
      return;
    }

    const newDaftarSampah = [...daftarSampah];

    if (editIndex !== null) {
      newDaftarSampah[editIndex] = sampahForm;
    } else {
      newDaftarSampah.push({
        ...sampahForm,
        id: Date.now(), // temporary ID
      });
    }

    onSampahChange(newDaftarSampah);
    setShowModal(false);
  };

  const handleHapusSampah = (index) => {
    if (confirm('Yakin ingin menghapus sampah ini?')) {
      const newDaftarSampah = daftarSampah.filter((_, i) => i !== index);
      onSampahChange(newDaftarSampah);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3
          className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Daftar Sampah ({daftarSampah.length} item)
        </h3>
        <Button onClick={handleTambahSampah} variant='primary' size='sm'>
          + Tambah
        </Button>
      </div>

      {daftarSampah.length === 0 ? (
        <div
          className={`p-6 border-2 border-dashed rounded-lg text-center ${
            isDarkMode
              ? 'border-gray-600 text-gray-400'
              : 'border-gray-300 text-gray-500'
          }`}
        >
          <p>Belum ada sampah</p>
        </div>
      ) : (
        <div className='space-y-2'>
          {daftarSampah.map((sampah, index) => {
            const kategori = kategoriSampahOptions.find(
              (k) => k.value === sampah.id_kategori
            );
            return (
              <div
                key={index}
                className={`p-3 border rounded-lg ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-800'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <h4
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {sampah.nama_sampah}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {kategori?.label || 'Tidak diketahui'} •{' '}
                      {sampah.berat_sampah} kg
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      onClick={() => handleEditSampah(index)}
                      variant='ghost'
                      size='sm'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleHapusSampah(index)}
                      variant='ghost'
                      size='sm'
                      className='text-red-500'
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

      {/* Modal Form Sampah */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div
            className={`rounded-lg p-6 w-full max-w-md ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {editIndex !== null ? 'Edit Sampah' : 'Tambah Sampah'}
            </h3>

            <div className='space-y-4'>
              <InputSelect
                label='Kategori Sampah'
                value={sampahForm.id_kategori}
                onChange={(value) => handleInputChange('id_kategori', value)}
                options={kategoriSampahOptions}
                required
              />

              <InputText
                label='Nama Sampah'
                value={sampahForm.nama_sampah}
                onChange={(value) => handleInputChange('nama_sampah', value)}
                placeholder='Contoh: Laptop bekas'
                required
              />

              <InputText
                label='Berat Sampah (kg)'
                type='number'
                value={sampahForm.berat_sampah}
                onChange={(value) => handleInputChange('berat_sampah', value)}
                placeholder='0.0'
                step='0.1'
                min='0'
                required
              />
            </div>

            <div className='flex gap-3 mt-6'>
              <Button
                onClick={() => setShowModal(false)}
                variant='ghost'
                className='flex-1'
              >
                Batal
              </Button>
              <Button
                onClick={handleSimpanSampah}
                variant='primary'
                className='flex-1'
              >
                {editIndex !== null ? 'Simpan' : 'Tambah'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampahManager;
