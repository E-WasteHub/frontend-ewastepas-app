import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { kategoriSampahDummy } from '../../../data/kategoriSampahDummy';
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Card } from '../../elements';
import { Input, Textarea } from '../../elements/Form';

const FormPenjemputan = ({
  formData,
  onInputChange,
  daftarSampah,
  onSampahChange,
  photos,
  onPhotoUpload,
  onPhotoRemove,
  isSubmitting,
  onCancel,
}) => {
  const { isDarkMode } = useDarkMode();
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedSampah, setSelectedSampah] = useState('');
  const [selectedPhotoForPreview, setSelectedPhotoForPreview] = useState(null);

  // Get available sampah items based on selected kategori
  const getAvailableSampah = () => {
    if (!selectedKategori) return [];
    const kategori = kategoriSampahDummy.find(
      (k) => k.id === parseInt(selectedKategori)
    );
    return kategori ? kategori.items : [];
  };

  // Handle tambah sampah
  const handleTambahSampah = () => {
    if (selectedKategori && selectedSampah) {
      const kategori = kategoriSampahDummy.find(
        (k) => k.id === parseInt(selectedKategori)
      );
      if (kategori) {
        // Check if this exact combination already exists
        const existingItem = daftarSampah.find(
          (s) => s.kategori_id === kategori.id && s.nama === selectedSampah
        );

        if (!existingItem) {
          const newSampah = {
            id: Date.now() + Math.random(), // Unique ID
            kategori_id: kategori.id,
            kategori_nama: kategori.name,
            kategori_icon: kategori.Icon,
            nama: selectedSampah,
            berat: 1, // Default berat 1kg
            poin_per_kg: kategori.points,
            category: kategori.category,
          };
          onSampahChange([...daftarSampah, newSampah]);
          setSelectedSampah('');
        }
      }
    }
  };

  // Handle hapus sampah
  const handleHapusSampah = (id) => {
    onSampahChange(daftarSampah.filter((s) => s.id !== id));
  };

  // Handle ubah berat sampah
  const handleUbahBerat = (id, berat) => {
    onSampahChange(
      daftarSampah.map((s) =>
        s.id === id ? { ...s, berat: parseInt(berat) || 1 } : s
      )
    );
  };

  // Calculate total sampah
  const totalSampah = daftarSampah.length;
  const totalBerat = daftarSampah.reduce(
    (total, s) => total + (s.berat || 0),
    0
  );
  const estimasiPoin = daftarSampah.reduce(
    (total, s) => total + (s.berat || 0) * (s.poin_per_kg || 0),
    0
  );

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mb-4'>
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Mengajukan Permintaan Penjemputan
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Form permintaan untuk permintaan penjemputan sampah elektronik
        </p>
      </div>
      <Card>
        <Card.Body className='p-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column - Form Fields */}
            <div className='space-y-6'>
              {/* Pilih Kategori Sampah */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  *Pilih Kategori Sampah
                </label>
                <select
                  value={selectedKategori}
                  onChange={(e) => {
                    console.log('Kategori selected:', e.target.value); // Debug log
                    setSelectedKategori(e.target.value);
                    setSelectedSampah(''); // Reset sampah when kategori changes
                  }}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-100 border-slate-600 focus:border-green-400 focus:ring-green-400/20'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500 focus:ring-green-500/20'
                  }`}
                >
                  <option value=''>Pilih kategori sampah...</option>
                  {kategoriSampahDummy && kategoriSampahDummy.length > 0 ? (
                    kategoriSampahDummy.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.name} - {kategori.category} ({kategori.points}{' '}
                        poin/kg)
                      </option>
                    ))
                  ) : (
                    <option value='' disabled>
                      Loading kategori...
                    </option>
                  )}
                </select>
                {selectedKategori && (
                  <div
                    className={`mt-2 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                    }`}
                  >
                    <div className='flex items-start gap-3'>
                      {(() => {
                        const kategori = kategoriSampahDummy.find(
                          (k) => k.id === parseInt(selectedKategori)
                        );
                        const IconComponent = kategori?.Icon;
                        return IconComponent ? (
                          <IconComponent className='w-5 h-5 mt-0.5 text-blue-500' />
                        ) : null;
                      })()}
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-blue-900'
                          }`}
                        >
                          {
                            kategoriSampahDummy.find(
                              (k) => k.id === parseInt(selectedKategori)
                            )?.name
                          }
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-300' : 'text-blue-700'
                          }`}
                        >
                          {
                            kategoriSampahDummy.find(
                              (k) => k.id === parseInt(selectedKategori)
                            )?.description
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pilih Sampah */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  *Pilih Sampah
                </label>
                <div className='flex gap-2'>
                  <select
                    value={selectedSampah}
                    onChange={(e) => setSelectedSampah(e.target.value)}
                    disabled={!selectedKategori}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 text-sm focus:outline-none focus:ring-2 ${
                      !selectedKategori ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      isDarkMode
                        ? 'bg-slate-800 text-slate-100 border-slate-600 focus:border-green-400 focus:ring-green-400/20'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-green-500 focus:ring-green-500/20'
                    }`}
                  >
                    <option value=''>
                      {selectedKategori
                        ? 'Pilih jenis sampah...'
                        : 'Pilih kategori terlebih dahulu'}
                    </option>
                    {getAvailableSampah().map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <Button
                    type='button'
                    onClick={handleTambahSampah}
                    disabled={!selectedKategori || !selectedSampah}
                    className='px-4'
                  >
                    <Plus className='w-4 h-4' />
                  </Button>
                </div>
              </div>

              {/* Tanggal dan Waktu */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  *Tanggal dan Waktu Penjemputan
                </label>
                <Input
                  type='datetime-local'
                  value={formData.waktu_dijemput || ''}
                  onChange={(e) =>
                    onInputChange('waktu_dijemput', e.target.value)
                  }
                  placeholder='mm/dd/yyyy'
                />
              </div>

              {/* Alamat Penjemputan */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  *Alamat Penjemputan
                </label>
                <Textarea
                  value={formData.alamat_jemput || ''}
                  onChange={(e) =>
                    onInputChange('alamat_jemput', e.target.value)
                  }
                  placeholder='Jl. Kapten Abdul Hamid No 86'
                  rows={3}
                />
              </div>

              {/* Catatan */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  *Catatan
                </label>
                <Textarea
                  value={formData.catatan || ''}
                  onChange={(e) => onInputChange('catatan', e.target.value)}
                  placeholder='Lorem ipsum dolor sit amet'
                  rows={3}
                />
              </div>
            </div>

            {/* Right Column - Sampah List & Photos */}
            <div className='space-y-6'>
              {/* Semua Sampah */}
              <div>
                <div className='flex justify-between items-center mb-4'>
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Semua Sampah
                  </h3>
                  <div className='text-right'>
                    <span
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Total Sampah: {totalSampah} ({totalBerat} Kg)
                    </span>
                    <br />
                    <span
                      className={`text-xs font-medium text-green-600 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      Estimasi Poin: {estimasiPoin}
                    </span>
                  </div>
                </div>

                <div className='space-y-3 max-h-64 overflow-y-auto'>
                  {daftarSampah.length === 0 ? (
                    <div
                      className={`text-center py-8 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <p className='text-sm'>Belum ada sampah yang dipilih</p>
                      <p className='text-xs mt-1'>
                        Pilih kategori dan jenis sampah terlebih dahulu
                      </p>
                    </div>
                  ) : (
                    daftarSampah.map((sampah) => {
                      const IconComponent = sampah.kategori_icon;
                      return (
                        <div
                          key={sampah.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {/* Sampah Icon */}
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                            }`}
                          >
                            {IconComponent && (
                              <IconComponent className='w-6 h-6 text-blue-500' />
                            )}
                          </div>

                          {/* Sampah Info */}
                          <div className='flex-1'>
                            <p
                              className={`font-medium text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {sampah.kategori_nama}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {sampah.nama}
                            </p>
                            <p
                              className={`text-xs text-green-600 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`}
                            >
                              {sampah.poin_per_kg} poin/kg
                            </p>
                          </div>

                          {/* Berat Input */}
                          <div className='flex items-center gap-2'>
                            <Input
                              type='number'
                              value={sampah.berat || ''}
                              onChange={(e) =>
                                handleUbahBerat(sampah.id, e.target.value)
                              }
                              className='w-16 text-center text-xs'
                              min='1'
                            />
                            <span
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Kg
                            </span>
                          </div>

                          {/* Remove Button */}
                          <Button
                            type='button'
                            variant='secondary'
                            onClick={() => handleHapusSampah(sampah.id)}
                            className='p-1 w-8 h-8'
                          >
                            <X className='w-4 h-4' />
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Upload Foto Sampah */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  Foto Sampah (Opsional)
                </label>

                {/* Conditional Render: Upload Area or Photo List */}
                {photos.length === 0 ? (
                  /* Upload Area - Show when no photos */
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-650 hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={onPhotoUpload}
                      className='hidden'
                      id='photo-upload'
                    />
                    <label htmlFor='photo-upload' className='cursor-pointer'>
                      <Upload
                        className={`w-8 h-8 mx-auto mb-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Klik untuk upload foto sampah
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}
                      >
                        PNG, JPG hingga 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  /* Photo List - Show when photos exist */
                  <div className='space-y-3'>
                    {/* Photo List Header */}
                    <div className='flex justify-between items-center'>
                      <span
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {photos.length} foto terupload
                      </span>
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={onPhotoUpload}
                        className='hidden'
                        id='add-more-photos'
                      />
                      <label
                        htmlFor='add-more-photos'
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer transition-colors ${
                          isDarkMode
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        <Plus className='w-3 h-3 mr-1' />
                        Tambah Foto
                      </label>
                    </div>

                    {/* Photo Grid */}
                    <div className='grid grid-cols-3 gap-2'>
                      {photos.map((photo) => (
                        <div key={photo.id} className='relative'>
                          <img
                            src={photo.url}
                            alt='Sampah'
                            className='w-full h-20 object-cover rounded-lg cursor-pointer'
                            onClick={() => setSelectedPhotoForPreview(photo)}
                          />
                          {/* Always visible delete button for mobile */}
                          <Button
                            type='button'
                            onClick={() => onPhotoRemove(photo.id)}
                            className='absolute top-1 right-1 p-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full'
                          >
                            <X className='w-3 h-3' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-4 mt-8 pt-6'>
            <Button
              type='button'
              variant='secondary'
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Kembali
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting || daftarSampah.length === 0}
              className='px-8'
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Photo Preview Modal */}
      {selectedPhotoForPreview && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4'
          onClick={() => setSelectedPhotoForPreview(null)}
        >
          <div
            className='relative max-w-4xl max-h-full w-full h-full flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type='button'
              onClick={() => setSelectedPhotoForPreview(null)}
              className='absolute top-4 right-4 z-10 p-2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all'
            >
              <X className='w-4 h-4' />
            </button>

            {/* Delete Button */}
            <button
              type='button'
              onClick={() => {
                onPhotoRemove(selectedPhotoForPreview.id);
                setSelectedPhotoForPreview(null);
              }}
              className='absolute top-4 left-4 z-10 p-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all'
            >
              <Trash2 className='w-4 h-4' />
            </button>

            {/* Photo Container */}
            <div className='relative w-full h-full flex items-center justify-center'>
              <img
                src={selectedPhotoForPreview.url}
                alt='Preview Sampah'
                className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              />

              {/* Photo Info */}
              <div className='absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-lg'>
                <p className='text-sm font-medium'>
                  {selectedPhotoForPreview.name || 'Foto Sampah'}
                </p>
                {selectedPhotoForPreview.size && (
                  <p className='text-xs opacity-75 mt-1'>
                    Ukuran:{' '}
                    {(selectedPhotoForPreview.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPenjemputan;
