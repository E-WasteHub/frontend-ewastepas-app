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
      draftSampah,
      isModalOpen,
      totalJumlah,
      estimasiPoin,
      setDraftSampah,
      setIsModalOpen,
      addSampah,
      removeSampah,
      triggerUploadFoto,
      handleFileChange,
      resetSampah,
      fileInputRef,
      buildFormData,
    } = usePenjemputan({ showAlert });

    /* --------------------------- HANDLER: Reset Form -------------------------- */
    const handleReset = () => {
      onInputChange('id_waktu_operasional', '');
      onInputChange('alamat_penjemputan', '');
      onInputChange('catatan', '');
      resetSampah();
      onReset?.();
    };

    /* -------------------------- HANDLER: Submit Form -------------------------- */
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        // Validasi form
        if (!formData.id_waktu_operasional || !formData.alamat_penjemputan) {
          showAlert('Peringatan', 'Lengkapi data penjemputan', 'warning');
          return;
        }
        if (daftarSampah.length === 0) {
          showAlert('Peringatan', 'Tambahkan minimal 1 sampah', 'warning');
          return;
        }

        // Kirim data ke API
        const fd = buildFormData(formData);
        const res = await penjemputanService.buatPenjemputan(fd);

        // Handle response sesuai struktur API baru
        if (res?.data?.penjemputan) {
          const { penjemputan, sampah } = res.data;

          // Success message dengan informasi lengkap
          showAlert(
            'Berhasil',
            res.message || 'Permintaan penjemputan berhasil dibuat',
            'success'
          );

          // Tampilkan informasi kode penjemputan
          if (penjemputan.kode_penjemputan) {
            setTimeout(() => {
              showAlert(
                'Kode Penjemputan',
                `Kode: ${penjemputan.kode_penjemputan}\nStatus: ${penjemputan.status_penjemputan}\nEstimasi Poin: ${penjemputan.poin_penjemputan}`,
                'info'
              );
            }, 1000);
          }

          console.log('✅ Penjemputan berhasil dibuat:', {
            penjemputan,
            sampah: sampah || [],
            totalSampah: sampah?.length || 0,
          });

          // Reset form setelah berhasil
          handleReset();
        } else {
          throw new Error('Format response tidak sesuai');
        }
      } catch (err) {
        console.error('❌ Submit error:', err);
        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          'Gagal membuat permintaan penjemputan';
        showAlert('Error', errorMessage, 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    // expose reset ke parent
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
        {/* Hidden Input untuk Upload Foto */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />

        {/* Header */}
        <HeaderDashboard
          title='Mengajukan Permintaan'
          subtitle='Form permintaan untuk penjemputan sampah elektronik'
        />

        <Card>
          <Card.Body className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* --------------------- Kiri: Input Data Penjemputan --------------------- */}
              <div className='space-y-4'>
                {/* Pilih kategori */}
                <div>
                  <Label required>Kategori Sampah</Label>
                  <Select
                    value={draftSampah.id_kategori}
                    onChange={(val) =>
                      setDraftSampah((p) => ({
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

                {/* Pilih jenis */}
                <div className='flex items-end gap-3'>
                  <div className='flex-1'>
                    <Label required>Jenis Sampah</Label>
                    <Select
                      value={draftSampah.id_jenis}
                      onChange={(val) =>
                        setDraftSampah((p) => ({ ...p, id_jenis: val }))
                      }
                      disabled={!draftSampah.id_kategori}
                      placeholder={
                        draftSampah.id_kategori
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

                {/* Waktu operasional */}
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

              {/* ---------------------- Kanan: Daftar Sampah ---------------------- */}
              <DaftarSampah
                daftarSampah={daftarSampah}
                totalJumlah={totalJumlah}
                estimasiPoin={estimasiPoin}
                isDarkMode={isDarkMode}
                isSubmitting={isSubmitting}
                onHapus={removeSampah}
                onUpload={triggerUploadFoto}
              />
            </div>

            {/* Action Buttons */}
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

        {/* Modal Tambah Sampah */}
        <ModalTambahSampah
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          draftSampah={draftSampah}
          setDraftSampah={setDraftSampah}
          onSave={addSampah}
        />
      </form>
    );
  }
);

FormPenjemputan.displayName = 'FormPenjemputan';
export default FormPenjemputan;
