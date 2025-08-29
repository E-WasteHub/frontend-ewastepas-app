// src/components/fragments/forms/FormPenjemputan/index.jsx
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import * as penjemputanService from '../../../../services/penjemputanService';
import {
  Button,
  Card,
  Input,
  Label,
  Select,
  Textarea,
} from '../../../elements';

const FormPenjemputan = ({
  formData,
  onInputChange,
  isSubmitting,
  onCancel,
  showAlert,
  onSubmit,
}) => {
  const { isDarkMode } = useDarkMode();
  const [kategoriData, setKategoriData] = useState([]);
  const [jenisData, setJenisData] = useState([]);
  const [waktuOperasional, setWaktuOperasional] = useState([]);
  const [daftarSampah, setDaftarSampah] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tempSampah, setTempSampah] = useState({
    id_kategori: '',
    id_jenis: '',
    jumlah_sampah: '',
    catatan_sampah: '',
    gambar: null,
    previewUrl: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchInitialData = async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori();
        console.log('📦 Daftar Penjemputan:', res);
        if (!isMounted) return;
        setKategoriData(res?.data?.kategori || []);
        setWaktuOperasional(res?.data?.waktu_operasional || []);
      } catch (err) {
        console.error('❌ Gagal ambil data awal:', err);
        if (isMounted) {
          alert('Gagal memuat data awal (cek server)');
        }
      }
    };
    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!tempSampah.id_kategori) return;
    const fetchJenis = async () => {
      try {
        const res = await penjemputanService.ambilJenisByKategori(
          tempSampah.id_kategori
        );
        setJenisData(res?.data?.jenis || []);
      } catch (err) {
        console.error('❌ Gagal ambil jenis:', err);
        showAlert?.('Error', 'Gagal memuat jenis sampah', 'error');
      }
    };
    fetchJenis();
  }, [tempSampah.id_kategori, showAlert]);

  const handleTambahSampah = () => {
    if (
      !tempSampah.id_kategori ||
      !tempSampah.id_jenis ||
      !tempSampah.jumlah_sampah
    ) {
      showAlert?.(
        'Peringatan',
        'Lengkapi data sampah terlebih dahulu.',
        'warning'
      );
      return;
    }

    const kategori = kategoriData.find(
      (k) => Number(k.id_kategori) === Number(tempSampah.id_kategori)
    );
    const jenis = jenisData.find(
      (j) => Number(j.id_jenis) === Number(tempSampah.id_jenis)
    );

    const newSampah = {
      id: Date.now(),
      id_kategori: tempSampah.id_kategori,
      nama_kategori_sampah: kategori?.nama_kategori || 'Kategori',
      poin_per_unit: kategori?.poin_kategori || 0,
      id_jenis: tempSampah.id_jenis,
      nama_jenis_sampah: jenis?.nama_jenis || 'Jenis',
      jumlah_sampah: Number(tempSampah.jumlah_sampah),
      catatan_sampah: tempSampah.catatan_sampah,
      gambar: tempSampah.gambar,
      previewUrl: tempSampah.previewUrl,
    };

    setDaftarSampah([...daftarSampah, newSampah]);
    showAlert?.('Berhasil', 'Sampah ditambahkan.', 'success');

    setTempSampah({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      gambar: null,
      previewUrl: null,
    });
  };

  const handleHapusSampah = (id) => {
    setDaftarSampah(daftarSampah.filter((s) => s.id !== id));
  };

  const handleUploadFoto = (id) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.dataset.id = id;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const id = fileInputRef.current.dataset.id;
    if (!file || !id) return;

    setDaftarSampah((prev) =>
      prev.map((s) =>
        String(s.id) === String(id)
          ? { ...s, gambar: file, previewUrl: URL.createObjectURL(file) }
          : s
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (daftarSampah.length === 0) {
      showAlert?.('Validasi Gagal', 'Tambah minimal 1 sampah dulu.', 'warning');
      return;
    }
    if (!formData.id_waktu_operasional || !formData.alamat_jemput) {
      showAlert?.('Validasi Gagal', 'Lengkapi data wajib.', 'warning');
      return;
    }

    onSubmit(daftarSampah);

    // 🔄 reset semua setelah submit
    setDaftarSampah([]);
    setTempSampah({
      id_kategori: '',
      id_jenis: '',
      jumlah_sampah: '',
      catatan_sampah: '',
      gambar: null,
      previewUrl: null,
    });
    onInputChange('id_waktu_operasional', '');
    onInputChange('alamat_jemput', '');
    onInputChange('catatan', '');
  };

  const totalJumlah = daftarSampah.reduce(
    (t, s) => t + (s.jumlah_sampah || 0),
    0
  );
  const estimasiPoin = daftarSampah.reduce(
    (t, s) => t + (s.jumlah_sampah || 0) * (s.poin_per_unit || 0),
    0
  );

  return (
    <form onSubmit={handleSubmit} className='max-w-7xl mx-auto'>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

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
            {/* Kiri: Form Input */}
            <div className='space-y-4'>
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
                  options={kategoriData.map((kategori) => ({
                    value: kategori.id_kategori.toString(),
                    label: `${kategori.nama_kategori} (${
                      kategori.poin_kategori || 0
                    } poin/unit)`,
                  }))}
                />
              </div>

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

              {/* Waktu operasional & alamat */}
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
                    label: `${w.waktu_operasional}`,
                  }))}
                  className='w-full'
                />
              </div>

              <div>
                <Label required>Alamat Penjemputan</Label>
                <Textarea
                  rows={3}
                  value={formData.alamat_jemput || ''}
                  onChange={(e) =>
                    onInputChange('alamat_jemput', e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Catatan untuk Kurir</Label>
                <Textarea
                  rows={3}
                  value={formData.catatan || ''}
                  onChange={(e) => onInputChange('catatan', e.target.value)}
                />
              </div>
            </div>

            {/* Kanan: Daftar Sampah */}
            <div className='space-y-4'>
              <div
                className={`mt-2 text-sm text-right ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              >
                Total: {totalJumlah} pcs • Estimasi {estimasiPoin} poin
              </div>
              <h3 className='font-semibold mb-2'>Daftar Sampah</h3>
              {daftarSampah.length === 0 ? (
                <p className='text-sm text-gray-500'>
                  Belum ada sampah ditambahkan
                </p>
              ) : (
                <div className='space-y-3'>
                  {daftarSampah.map((s) => (
                    <div
                      key={s.id}
                      className='flex items-start gap-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-700'
                    >
                      <div
                        className='w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-600 cursor-pointer'
                        onClick={() => handleUploadFoto(s.id)}
                      >
                        {s.previewUrl ? (
                          <img
                            src={s.previewUrl}
                            alt='foto sampah'
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <span className='flex items-center justify-center w-full h-full text-xs text-gray-400'>
                            No Foto
                          </span>
                        )}
                      </div>
                      <div className='flex-1 text-sm'>
                        <p className='font-medium'>{s.nama_kategori_sampah}</p>
                        <p className='text-gray-600 dark:text-gray-300'>
                          {s.nama_jenis_sampah} • {s.jumlah_sampah} pcs •{' '}
                          {s.poin_per_unit} poin/unit
                        </p>
                        {s.catatan_sampah && (
                          <p className='text-xs text-gray-500 italic'>
                            Catatan: {s.catatan_sampah}
                          </p>
                        )}
                      </div>
                      <button
                        type='button'
                        onClick={() => handleHapusSampah(s.id)}
                        className='p-1 rounded-full bg-red-500 text-white hover:bg-red-600'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Actions */}
              <div className='flex justify-end gap-4 pt-96'>
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
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal Hardcode */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative'>
            <h3 className='text-lg font-bold mb-4'>Detail Sampah</h3>

            <div className='space-y-3'>
              <div>
                <Label required>Jumlah</Label>
                <Input
                  type='number'
                  min='1'
                  value={tempSampah.jumlah_sampah}
                  onChange={(e) =>
                    setTempSampah((p) => ({
                      ...p,
                      jumlah_sampah: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label>Catatan Kondisi</Label>
                <Textarea
                  rows={2}
                  value={tempSampah.catatan_sampah}
                  onChange={(e) =>
                    setTempSampah((p) => ({
                      ...p,
                      catatan_sampah: e.target.value,
                    }))
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

            <div className='flex justify-end gap-3 mt-6'>
              <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  handleTambahSampah();
                  setIsModalOpen(false);
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormPenjemputan;
