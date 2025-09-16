// src/components/fragments/forms/penjemputan/index.jsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import usePenjemputan from '../../../../hooks/usePenjemputan';
import * as penjemputanService from '../../../../services/penjemputanService';
import { Button, Card, Label, Select, Textarea } from '../../../elements';
import HeaderDashboard from '../../dashboard/HeaderDashboard';
import DaftarSampah from './DaftarSampah';
import ModalTambahSampah from './ModalTambahSampah';

const FormPenjemputan = forwardRef(
  ({ formData, onInputChange, showAlert, onReset }, ref) => {
    const { isDarkMode } = useDarkMode();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // hooks penjemputan
    const {
      kategoriList,
      jenisList,
      waktuOperasionalList,
      daftarSampah,
      sampahSementara,
      isModalOpen,
      totalJumlah,
      estimasiPoin,
      setSampahSementara,
      setIsModalOpen,
      tambahSampah,
      hapusSampah,
      bukaUploadFoto,
      handleFileChange,
      resetSampah,
      fileInputRef,
      buatFormData,
    } = usePenjemputan({ showAlert });

    // reset form
    const handleReset = () => {
      onInputChange('id_waktu_operasional', '');
      onInputChange('alamat_penjemputan', '');
      onInputChange('catatan', '');
      resetSampah();
      onReset?.();
    };

    // submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        // validasi input
        if (!formData.id_waktu_operasional || !formData.alamat_penjemputan) {
          showAlert('Peringatan', 'Lengkapi data penjemputan', 'warning');
          return;
        }
        if (daftarSampah.length === 0) {
          showAlert('Peringatan', 'Tambahkan minimal 1 sampah', 'warning');
          return;
        }

        // kirim data ke api
        const fd = buatFormData(formData);
        const res = await penjemputanService.buatPenjemputan(fd);

        if (res?.data?.penjemputan) {
          const { penjemputan } = res.data;

          showAlert(
            'Berhasil',
            res.message || 'Permintaan penjemputan berhasil dibuat',
            'success'
          );

          // tampilkan kode penjemputan
          if (penjemputan.kode_penjemputan) {
            setTimeout(() => {
              showAlert(
                'Kode Penjemputan',
                `Kode: ${penjemputan.kode_penjemputan}\nStatus: ${penjemputan.status_penjemputan}\nEstimasi Poin: ${penjemputan.poin_penjemputan}`,
                'info'
              );
            }, 1000);
          }

          // reset form setelah berhasil
          handleReset();
        } else {
          throw new Error('Format response tidak sesuai');
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          'Gagal membuat permintaan penjemputan';
        showAlert('Error', errorMessage, 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    // expose fungsi ke parent
    useImperativeHandle(ref, () => ({
      resetForm: () => {
        handleReset();
      },
      submitForm: () => {
        handleSubmit();
      },
    }));

    return (
      <form onSubmit={handleSubmit} className='max-w-7xl mx-auto space-y-3'>
        {/* hidden input upload foto */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />

        {/* header */}
        <HeaderDashboard
          title='Mengajukan Permintaan'
          subtitle='Form permintaan untuk penjemputan sampah elektronik'
        />

        <Card>
          <Card.Body className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                {/* pilih kategori */}
                <div>
                  <Label required>Kategori Sampah</Label>
                  <Select
                    value={sampahSementara.id_kategori}
                    onChange={(val) =>
                      setSampahSementara((p) => ({
                        ...p,
                        id_kategori: val,
                        id_jenis: '',
                      }))
                    }
                    placeholder='Pilih kategori...'
                    options={kategoriList.map((k) => ({
                      value: k.id_kategori.toString(),
                      label: `${k.nama_kategori} (${
                        k.poin_kategori || 0
                      } poin/unit)`,
                    }))}
                  />
                </div>

                {/* pilih jenis */}
                <div className='flex items-end gap-3'>
                  <div className='flex-1'>
                    <Label required>Jenis Sampah</Label>
                    <Select
                      value={sampahSementara.id_jenis}
                      onChange={(val) =>
                        setSampahSementara((p) => ({ ...p, id_jenis: val }))
                      }
                      disabled={!sampahSementara.id_kategori}
                      placeholder={
                        sampahSementara.id_kategori
                          ? 'Pilih jenis sampah...'
                          : 'Pilih kategori dulu'
                      }
                      options={jenisList.map((j) => ({
                        value: j.id_jenis.toString(),
                        label: j.nama_jenis,
                      }))}
                    />
                  </div>
                  <Button type='button' onClick={() => setIsModalOpen(true)}>
                    Tambah
                  </Button>
                </div>

                {/* waktu operasional */}
                <div>
                  <Label required>Waktu Operasional</Label>
                  <Select
                    value={formData.id_waktu_operasional?.toString() || ''}
                    onChange={(val) =>
                      onInputChange('id_waktu_operasional', Number(val))
                    }
                    placeholder='Pilih waktu operasional...'
                    options={waktuOperasionalList.map((w) => ({
                      value: w.id_waktu_operasional.toString(),
                      label: w.waktu_operasional,
                    }))}
                  />
                </div>

                {/* alamat */}
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

                {/* catatan */}
                <div>
                  <Label>Catatan untuk Kurir</Label>
                  <Textarea
                    rows={3}
                    value={formData.catatan || ''}
                    onChange={(e) => onInputChange('catatan', e.target.value)}
                  />
                </div>
              </div>

              <DaftarSampah
                daftarSampah={daftarSampah}
                totalJumlah={totalJumlah}
                estimasiPoin={estimasiPoin}
                isDarkMode={isDarkMode}
                isSubmitting={isSubmitting}
                onHapus={hapusSampah}
                onUpload={bukaUploadFoto}
              />
            </div>

            {/* action buttons */}
            <div className='flex justify-end gap-3 mt-6'>
              <Button
                type='button'
                variant='secondary'
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset Form
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting || daftarSampah.length === 0}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* modal tambah sampah */}
        <ModalTambahSampah
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sampahSementara={sampahSementara}
          setSampahSementara={setSampahSementara}
          onSave={tambahSampah}
        />
      </form>
    );
  }
);

FormPenjemputan.displayName = 'FormPenjemputan';
export default FormPenjemputan;
