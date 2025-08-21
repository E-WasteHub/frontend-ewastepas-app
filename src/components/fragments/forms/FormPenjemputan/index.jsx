// src/components/fragments/forms/FormPenjemputan/index.jsx
import { useState } from 'react';
import { jenisSampahDummy, kategoriSampahDummy } from '../../../../data/index';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Card } from '../../../elements';
import { Input, Label, Select, Textarea } from '../../../elements/Form';
import SampahList from './SampahList';

const FormPenjemputan = ({
  formData,
  onInputChange,
  daftarSampah,
  onSampahChange,
  isSubmitting,
  onCancel,
  showAlert,
}) => {
  const { isDarkMode } = useDarkMode();
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedSampah, setSelectedSampah] = useState('');

  // Ambil jenis sampah dari kategori terpilih
  const getAvailableSampah = () => {
    if (!selectedKategori) return [];
    return jenisSampahDummy.filter(
      (j) => j.id_kategori_sampah === Number(selectedKategori)
    );
  };

  const handleTambahSampah = () => {
    if (selectedKategori && selectedSampah) {
      const kategori = kategoriSampahDummy.find(
        (k) => k.id_kategori_sampah === Number(selectedKategori)
      );
      const jenis = jenisSampahDummy.find(
        (j) => j.id_jenis_sampah === Number(selectedSampah)
      );

      if (kategori && jenis) {
        const exists = daftarSampah.find(
          (s) => s.id_jenis_sampah === jenis.id_jenis_sampah
        );

        if (exists) {
          showAlert?.(
            'Peringatan',
            'Jenis sampah ini sudah ditambahkan.',
            'warning'
          );
          return;
        }

        const newSampah = {
          id: Date.now() + Math.random(),
          id_kategori_sampah: kategori.id_kategori_sampah,
          nama_kategori_sampah: kategori.nama_kategori_sampah,
          poin_per_kg: kategori.poin_kategori_sampah,
          id_jenis_sampah: jenis.id_jenis_sampah,
          nama_jenis_sampah: jenis.nama_jenis_sampah,
          deskripsi_jenis_sampah: jenis.deskripsi_jenis_sampah,
          berat: 1,
        };

        onSampahChange([...daftarSampah, newSampah]);
        setSelectedSampah('');
        showAlert?.(
          'Berhasil',
          `Sampah "${jenis.nama_jenis_sampah}" berhasil ditambahkan.`,
          'success'
        );
      }
    }
  };

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
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
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Kategori */}
              <div>
                <Label required>Pilih Kategori Sampah</Label>
                <Select
                  value={selectedKategori}
                  onChange={(val) => {
                    setSelectedKategori(val);
                    setSelectedSampah('');
                  }}
                  placeholder='Pilih kategori...'
                  options={kategoriSampahDummy.map((kategori) => ({
                    value: kategori.id_kategori_sampah,
                    label: `${kategori.nama_kategori_sampah} (${kategori.poin_kategori_sampah} poin/kg)`,
                  }))}
                  className='w-full'
                />
              </div>

              {/* Sampah */}
              <div>
                <Label required>Pilih Sampah</Label>
                <div className='flex gap-2'>
                  <Select
                    value={selectedSampah}
                    onChange={(val) => setSelectedSampah(val)}
                    disabled={!selectedKategori}
                    placeholder={
                      selectedKategori
                        ? 'Pilih jenis sampah...'
                        : 'Pilih kategori terlebih dahulu'
                    }
                    options={getAvailableSampah().map((item) => ({
                      value: item.id_jenis_sampah,
                      label: item.nama_jenis_sampah,
                    }))}
                    className='flex-1'
                  />
                  <Button
                    type='button'
                    onClick={handleTambahSampah}
                    disabled={!selectedSampah}
                    className='!h-10 !py-1.5 !px-4 shrink-0'
                  >
                    Tambah
                  </Button>
                </div>
              </div>

              {/* Input lainnya */}
              <div>
                <Label required>Tanggal dan Waktu Penjemputan</Label>
                <Input
                  type='datetime-local'
                  value={formData.waktu_dijemput}
                  onChange={(e) =>
                    onInputChange('waktu_dijemput', e.target.value)
                  }
                />
              </div>

              <div>
                <Label required>Alamat Penjemputan</Label>
                <Textarea
                  rows={3}
                  value={formData.alamat_jemput}
                  placeholder='Jl. Contoh Alamat'
                  onChange={(e) =>
                    onInputChange('alamat_jemput', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Catatan</Label>
                <Textarea
                  rows={3}
                  value={formData.catatan}
                  onChange={(e) => onInputChange('catatan', e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              <SampahList
                daftarSampah={daftarSampah}
                onSampahChange={onSampahChange}
                showAlert={showAlert}
              />
            </div>
          </div>

          {/* Actions */}
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
    </div>
  );
};

export default FormPenjemputan;
