// src/components/fragments/forms/penjemputan/index.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import usePenjemputan from '../../../../hooks/usePenjemputan';
import { Button, Card, Label, Select, Textarea } from '../../../elements';
import DaftarSampah from './DaftarSampah';
import ModalTambahSampah from './ModalTambahSampah';

const FormPenjemputan = ({
  formData,
  onInputChange,
  isSubmitting,
  onCancel,
  showAlert,
  onSubmit,
}) => {
  const { isDarkMode } = useDarkMode();

  // 🔹 Ambil state & actions dari custom hook
  const {
    kategoriData,
    jenisData,
    waktuOperasional,
    daftarSampah,
    tempSampah,
    isModalOpen,
    totalJumlah,
    estimasiPoin,
    setTempSampah,
    setIsModalOpen,
    handleTambahSampah,
    handleHapusSampah,
    handleUploadFoto,
    fileInputRef,
    handleFileChange,
  } = usePenjemputan({ showAlert });

  /** 🔄 Handle submit form utama */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (daftarSampah.length === 0) {
      showAlert?.('Validasi Gagal', 'Tambah minimal 1 sampah dulu.', 'warning');
      return;
    }
    if (!formData.id_waktu_operasional || !formData.alamat_penjemputan) {
      showAlert?.('Validasi Gagal', 'Lengkapi data wajib.', 'warning');
      return;
    }

    onSubmit(daftarSampah);

    // reset form setelah submit
    onInputChange('id_waktu_operasional', '');
    onInputChange('alamat_penjemputan', '');
    onInputChange('catatan', '');
    onInputChange('daftarSampah', []);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-7xl mx-auto'>
      {/* Hidden Input untuk Upload Foto */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className='mb-6'>
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Mengajukan Permintaan Penjemputan
        </h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Form permintaan untuk penjemputan sampah elektronik
        </p>
      </div>

      <Card>
        <Card.Body className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Kiri: Input Data Sampah & Info Penjemputan */}
            <div className='space-y-4'>
              {/* Pilih kategori */}
              <div>
                <Label required>Kategori Sampah</Label>
                <Select
                  value={tempSampah.id_kategori}
                  onChange={(val) =>
                    setTempSampah((p) => ({
                      ...p,
                      id_kategori: val,
                      id_jenis: '',
                    }))
                  }
                  placeholder='Pilih kategori...'
                  options={kategoriData.map((k) => ({
                    value: k.id_kategori.toString(),
                    label: `${k.nama_kategori} (${
                      k.poin_kategori || 0
                    } poin/unit)`,
                  }))}
                />
              </div>

              {/* Pilih jenis */}
              <div className='flex items-end gap-3'>
                <div className='flex-1'>
                  <Label required>Jenis Sampah</Label>
                  <Select
                    value={tempSampah.id_jenis}
                    onChange={(val) =>
                      setTempSampah((p) => ({ ...p, id_jenis: val }))
                    }
                    disabled={!tempSampah.id_kategori}
                    placeholder={
                      tempSampah.id_kategori
                        ? 'Pilih jenis sampah...'
                        : 'Pilih kategori dulu'
                    }
                    options={jenisData.map((item) => ({
                      value: item.id_jenis.toString(),
                      label: item.nama_jenis,
                    }))}
                  />
                </div>
                <Button type='button' onClick={() => setIsModalOpen(true)}>
                  Tambah
                </Button>
              </div>

              {/* Waktu operasional */}
              <div>
                <Label required>Waktu Operasional</Label>
                <Select
                  value={formData.id_waktu_operasional?.toString() || ''}
                  onChange={(val) =>
                    onInputChange('id_waktu_operasional', Number(val))
                  }
                  placeholder='Pilih waktu operasional...'
                  options={waktuOperasional.map((w) => ({
                    value: w.id_waktu_operasional.toString(),
                    label: w.waktu_operasional,
                  }))}
                  className='w-full'
                />
              </div>

              {/* Alamat */}
              <div>
                <Label required>Alamat Penjemputan</Label>
                <Textarea
                  rows={3}
                  value={formData.alamat_penjemputan || ''}
                  onChange={(e) =>
                    onInputChange('alamat_penjemputan', e.target.value)
                  }
                />
              </div>

              {/* Catatan */}
              <div>
                <Label>Catatan untuk Kurir</Label>
                <Textarea
                  rows={3}
                  value={formData.catatan || ''}
                  onChange={(e) => onInputChange('catatan', e.target.value)}
                />
              </div>
            </div>

            {/* Kanan: daftar sampah */}
            <DaftarSampah
              daftarSampah={daftarSampah}
              totalJumlah={totalJumlah}
              estimasiPoin={estimasiPoin}
              isDarkMode={isDarkMode}
              isSubmitting={isSubmitting}
              onHapus={handleHapusSampah}
              onUpload={handleUploadFoto}
              onCancel={onCancel}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal Tambah Sampah */}
      <ModalTambahSampah
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tempSampah={tempSampah}
        setTempSampah={setTempSampah}
        onSave={handleTambahSampah}
      />
    </form>
  );
};

export default FormPenjemputan;
