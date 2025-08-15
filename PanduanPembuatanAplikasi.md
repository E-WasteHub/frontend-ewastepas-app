# Panduan Pembuatan Aplikasi E-WasteHub

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Identifikasi Kelas Analisis](#identifikasi-kelas-analisis)
3. [Identifikasi Atribut](#identifikasi-atribut)
4. [Identifikasi Fungsi](#identifikasi-fungsi)
5. [Skenario Use Case](#skenario-use-case)

---

## Pendahuluan

Dokumen ini berisi panduan komprehensif untuk pembuatan aplikasi E-WasteHub yang mengelola sistem penjemputan sampah elektronik. Aplikasi ini melibatkan tiga jenis pengguna utama: Masyarakat, Mitra Kurir, dan Admin.

Dokumen ini disusun berdasarkan pemodelan berbasis kelas dengan menggunakan pola MVC (Model-View-Controller) dan dilengkapi dengan skenario use case yang detail untuk setiap fitur aplikasi.

---

## Identifikasi Kelas Analisis

### Tabel 1. Identifikasi Kelas Analisis

| No                                     | Nama Kelas                  | Jenis Kelas | Keterangan                                                                                                           |
| -------------------------------------- | --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| **BOUNDARY CLASSES - USER INTERFACES** |
| 1                                      | HomeView                    | Boundary    | Halaman utama aplikasi yang dilihat pengguna sebelum login, berisi informasi umum.                                   |
| 2                                      | RegisterView                | Boundary    | Halaman formulir pendaftaran untuk pengguna baru.                                                                    |
| 3                                      | VerifikasiOTPView           | Boundary    | Halaman untuk memasukkan kode OTP yang diterima pengguna melalui email.                                              |
| 4                                      | LoginView                   | Boundary    | Halaman formulir login untuk semua jenis pengguna.                                                                   |
| 5                                      | LupaPasswordView            | Boundary    | Halaman untuk proses pemulihan akun dan reset kata sandi                                                             |
| 6                                      | ProfilView                  | Boundary    | Halaman untuk melihat dan mengubah data profil serta mengubah kata sandi                                             |
| **BOUNDARY CLASSES - MASYARAKAT**      |
| 7                                      | RiwayatView                 | Boundary    | Halaman untuk melihat daftar transaksi penjemputan yang telah selesai.                                               |
| 8                                      | DashboardMasyarakatView     | Boundary    | Halaman utama untuk Masyarakat setelah login, menampilkan ringkasan poin dan riwayat.                                |
| 9                                      | PermintaanPenjemputanView   | Boundary    | Halaman formulir untuk membuat permintaan penjemputan sampah                                                         |
| 10                                     | LacakPenjemputanView        | Boundary    | Halaman untuk melacak status progres permintaan penjemputan yang sedang aktif                                        |
| 11                                     | EdukasiView                 | Boundary    | Halaman untuk menampilkan daftar dan detail konten edukatif kepada masyarakat.                                       |
| **BOUNDARY CLASSES - MITRA KURIR**     |
| 12                                     | DashboardKurirView          | Boundary    | Halaman utama untuk Mitra Kurir, menampilkan daftar permintaan penjemputan yang tersedia.                            |
| 13                                     | DetailPermintaanKurirView   | Boundary    | Halaman untuk menampilkan detail lengkap dari satu permintaan yang dipilih oleh Kurir.                               |
| 14                                     | UnggahDokumenView           | Boundary    | Halaman khusus bagi Mitra Kurir untuk mengunggah dokumen pendukung                                                   |
| **BOUNDARY CLASSES - ADMIN**           |
| 15                                     | AdminDashboardView          | Boundary    | Halaman utama untuk Admin setelah login                                                                              |
| 16                                     | AdminVerifikasiView         | Boundary    | Halaman Admin untuk melihat daftar dan detail akun yang menunggu verifikasi                                          |
| 17                                     | AdminDataMasterView         | Boundary    | Halaman Admin untuk menampilkan semua data master (Kategori, Jenis, Dropbox, Daerah, Poin).                          |
| 18                                     | AdminKelolaKategoriView     | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus kategori sampah elektronik.                                   |
| 19                                     | AdminKelolaJenisView        | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus jenis sampah elektronik.                                      |
| 20                                     | AdminKelolaDropboxView      | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus lokasi dropbox.                                               |
| 21                                     | AdminKelolaDaerahView       | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus daerah.                                                       |
| 22                                     | AdminKelolaKonversiPoinView | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus konversi poin.                                                |
| 23                                     | AdminTransaksiView          | Boundary    | Halaman Admin untuk memantau semua transaksi penjemputan yang terjadi di sistem                                      |
| 24                                     | AdminKelolaEdukasiView      | Boundary    | Halaman Admin untuk menambah, mengubah, atau menghapus konten edukasi.                                               |
| **CONTROLLER CLASSES**                 |
| 25                                     | AuthController              | Controller  | Mengelola semua logika terkait otentikasi: registrasi, login, verifikasi OTP, dan pemulihan akun                     |
| 26                                     | ProfilController            | Controller  | Mengelola logika untuk melihat dan memperbarui profil pengguna, serta proses unggah dokumen kurir.                   |
| 27                                     | PenjemputanController       | Controller  | Mengelola seluruh siklus hidup proses penjemputan dari sisi Masyarakat.                                              |
| 28                                     | PenjemputanKurirController  | Controller  | Mengelola seluruh siklus hidup proses penjemputan dari sisi Mitra Kurir.                                             |
| 29                                     | KategoriController          | Controller  | Mengelola proses CRUD untuk data master kategori sampah elektronik.                                                  |
| 30                                     | JenisController             | Controller  | Mengelola proses CRUD untuk data master jenis sampah elektronik.                                                     |
| 31                                     | DropboxController           | Controller  | Mengelola proses CRUD untuk data master lokasi dropbox.                                                              |
| 32                                     | DaerahController            | Controller  | Mengelola proses CRUD untuk data master daerah.                                                                      |
| 33                                     | KonversiPoinController      | Controller  | Mengelola proses CRUD untuk data master konversi poin.                                                               |
| 34                                     | AdminTransaksiController    | Controller  | Mengelola logika untuk pemantauan transaksi oleh Admin, seperti menampilkan daftar dan detail transaksi penjemputan. |
| 35                                     | EdukasiController           | Controller  | Mengelola proses CRUD untuk data master konten edukasi.                                                              |
| **ENTITY CLASSES**                     |
| 36                                     | Peran                       | Entity      | Menyimpan data peran untuk mengatur hak akses dalam sistem.                                                          |
| 37                                     | Pengguna                    | Entity      | Merepresentasikan data profil untuk semua pengguna yang berinteraksi dengan sistem.                                  |
| 38                                     | JenisDokumenPendukung       | Entity      | Menyimpan jenis dokumen yang dapat diunggah untuk menjaga konsistensi data.                                          |
| 39                                     | DokumenPendukung            | Entity      | Menyimpan data file dokumen yang diunggah oleh Mitra Kurir untuk proses verifikasi.                                  |
| 40                                     | KategoriSampah              | Entity      | Menyimpan data master untuk kategori utama sampah elektronik                                                         |
| 41                                     | JenisSampah                 | Entity      | Menyimpan data master untuk rincian jenis sampah yang terhubung ke sebuah kategori sampah elektronik.                |
| 42                                     | WaktuOperasional            | Entity      | Merepresentasikan waktu operasional yang dapat dipilih Mitra Kurir.                                                  |
| 43                                     | Daerah                      | Entity      | Menyimpan wilayah operasional untuk mengelompokkan dropbox.                                                          |
| 44                                     | Dropbox                     | Entity      | Menyimpan data lokasi dropbox sebagai tujuan penyerahan sampah.                                                      |
| 45                                     | Penjemputan                 | Entity      | Merepresentasikan data transaksi utama yang mencatat seluruh siklus hidup layanan penjemputan.                       |
| 46                                     | Sampah                      | Entity      | Menyimpan rincian item sampah yang ada di dalam satu transaksi penjemputan.                                          |
| 47                                     | KontenEdukasi               | Entity      | Menyimpan data konten edukatif yang ditampilkan kepada pengguna.                                                     |

---

## Identifikasi Atribut

---

## Identifikasi Atribut

### Tabel 2. Identifikasi Atribut per Kelas

| No                                 | Nama Kelas                  | Nama Atribut              | Keterangan                                                                                         |
| ---------------------------------- | --------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------- |
| **BOUNDARY CLASSES - ATRIBUT UI**  |
| 1                                  | HomeView                    | daftarKategori            | Menyimpan array objek kategori untuk ditampilkan di halaman utama.                                 |
|                                    |                             | daftarArtikel             | Menyimpan array objek artikel edukasi untuk ditampilkan.                                           |
| 2                                  | RegisterView                | nama                      | Menyimpan nilai dari input formulir nama.                                                          |
|                                    |                             | email                     | Menyimpan nilai dari input formulir email.                                                         |
|                                    |                             | password                  | Menyimpan nilai dari input formulir password.                                                      |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state pada tombol.                           |
|                                    |                             | error                     | Menyimpan teks pesan kesalahan jika registrasi gagal.                                              |
| 3                                  | VerifikasiOTPView           | kodeOTP                   | Menyimpan nilai input OTP dari pengguna.                                                           |
|                                    |                             | timer                     | Menyimpan waktu hitung mundur untuk fitur kirim ulang OTP.                                         |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk loading state saat verifikasi.                                   |
|                                    |                             | error                     | Menyimpan teks pesan kesalahan jika OTP tidak valid.                                               |
| 4                                  | LoginView                   | email                     | Menyimpan nilai dari input formulir email untuk login.                                             |
|                                    |                             | password                  | Menyimpan nilai dari input formulir password untuk login.                                          |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk loading state saat proses login.                                 |
|                                    |                             | error                     | Menyimpan teks pesan kesalahan jika login gagal.                                                   |
| 5                                  | LupaPasswordView            | email                     | Menyimpan email pengguna untuk proses reset kata sandi.                                            |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk loading state saat pengiriman tautan                             |
|                                    |                             | successMessage            | Menyimpan pesan konfirmasi setelah tautan berhasil dikirim.                                        |
|                                    |                             | error                     | Menyimpan teks pesan kesalahan jika email tidak ditemukan.                                         |
| 6                                  | ProfilView                  | nama                      | Menyimpan nama yang dapat diedit oleh pengguna.                                                    |
|                                    |                             | email                     | Menyimpan email yang dapat diedit oleh pengguna.                                                   |
|                                    |                             | alamat                    | Menyimpan alamat yang dapat diedit oleh pengguna.                                                  |
|                                    |                             | passwordLama              | Menyimpan input kata sandi lama untuk verifikasi saat ubah sandi                                   |
|                                    |                             | passwordBaru              | Menyimpan input kata sandi baru.                                                                   |
| **BOUNDARY CLASSES - MASYARAKAT**  |
| 7                                  | RiwayatView                 | daftarRiwayat             | Menyimpan array objek riwayat transaksi untuk ditampilkan dalam daftar.                            |
|                                    |                             | filter                    | Menyimpan nilai filter yang dipilih pengguna.                                                      |
|                                    |                             | search                    | Menyimpan teks yang diketik pengguna di kolom pencarian.                                           |
| 8                                  | DashboardMasyarakatView     | namaPengguna              | Menyimpan nama pengguna yang login untuk sapaan personal.                                          |
|                                    |                             | totalPoin                 | Menyimpan total poin akumulasi milik pengguna.                                                     |
|                                    |                             | riwayatTerakhir           | Menyimpan array berisi beberapa transaksi terakhir untuk ditampilkan                               |
| 9                                  | PermintaanPenjemputanView   | jenisSampahDipilih        | Menyimpan array item sampah yang dipilih pengguna untuk dijemput.                                  |
|                                    |                             | alamat                    | Menyimpan data alamat penjemputan yang diisi pengguna                                              |
|                                    |                             | jadwal                    | Menyimpan data tanggal dan waktu penjemputan yang dipilih                                          |
|                                    |                             | catatan                   | Menyimpan catatan tambahan dari pengguna untuk kurir.                                              |
| 10                                 | LacakPenjemputanView        | detailPermintaan          | Menyimpan objek detail dari permintaan yang sedang dilacak.                                        |
|                                    |                             | statusProgres             | Menyimpan array tahapan progres penjemputan untuk ditampilkan sebagai timeline.                    |
| 11                                 | EdukasiView                 | daftarArtikel             | Menyimpan array objek semua artikel edukasi.                                                       |
|                                    |                             | artikelTerpilih           | Menyimpan satu objek artikel yang sedang dibaca detailnya oleh pengguna.                           |
| **BOUNDARY CLASSES - MITRA KURIR** |
| 12                                 | DashboardKurirView          | namaKurir                 | Menyimpan nama kurir yang login untuk sapaan personal.                                             |
|                                    |                             | daftarPermintaan          | Menyimpan array objek permintaan penjemputan yang tersedia untuk diambil.                          |
| 13                                 | DetailPermintaanKurirView   | jenisSampahDipilih        | Menyimpan array item sampah yang dipilih pengguna untuk dijemput.                                  |
|                                    |                             | alamat                    | Menyimpan data alamat penjemputan yang diisi pengguna                                              |
|                                    |                             | jadwal                    | Menyimpan data tanggal dan waktu penjemputan yang dipilih                                          |
|                                    |                             | catatan                   | Menyimpan catatan tambahan dari pengguna.                                                          |
| 14                                 | UnggahDokumenView           | fileKTP                   | Menyimpan file KTP yang dipilih pengguna dari perangkatnya.                                        |
|                                    |                             | fileSIM                   | Menyimpan file SIM yang dipilih pengguna dari perangkatnya.                                        |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk loading state saat proses unggah.                                |
|                                    |                             | error                     | Menyimpan teks pesan kesalahan jika unggah gagal.                                                  |
| **BOUNDARY CLASSES - ADMIN**       |
| 15                                 | AdminDashboardView          | statistikPengguna         | Menyimpan ringkasan pengguna untuk ditampilkan di halaman utama Admin.                             |
|                                    |                             | statistikTransaksi        | Menyimpan ringkasan transaksi untuk ditampilkan di halaman utama Admin.                            |
| 16                                 | AdminDataMasterView         | daftarDataMaster          | Menyimpan array data utama yang dikelola di halaman tersebut.                                      |
| 17                                 | AdminVerifikasiView         | daftarAkunPengguna        | Menyimpan array objek akun pengguna yang perlu diverifikasi oleh admin.                            |
| 18                                 | AdminKelolaKategoriView     | daftarDataKategori        | Menyimpan array kategori sampah yang dikelola admin.                                               |
|                                    |                             | formDataKategori          | Menyimpan data kategori sampah yang sedang dikelola atau diubah oleh admin.                        |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form kategori.                |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data kategori sedang dimuat.      |
| 19                                 | AdminKelolaJenisView        | daftarDataJenis           | Menyimpan array jenis sampah yang dikelola admin                                                   |
|                                    |                             | formDataJenis             | Menyimpan data jenis sampah yang sedang dikelola atau diubah oleh admin                            |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form jenis sampah.            |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data jenis sedang dimuat.         |
| 20                                 | AdminKelolaDropboxView      | daftarDataDropbox         | Menyimpan array dropbox yang dikelola admin.                                                       |
|                                    |                             | formDataDropbox           | Menyimpan data dropbox yang sedang dikelola atau diubah oleh admin.                                |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form dropbox.                 |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data dropbox sedang dimuat.       |
| 21                                 | AdminKelolaDaerahView       | daftarDataDaerah          | Menyimpan array daerah yang dikelola admin.                                                        |
|                                    |                             | formDataDaerah            | Menyimpan data daerah yang sedang dikelola atau diubah oleh admin.                                 |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form daerah.                  |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data daerah sedang dimuat.        |
| 22                                 | AdminKelolaKonversiPoinView | daftarDataPoin            | Menyimpan array konversi poin yang dikelola admin.                                                 |
|                                    |                             | formDataPoin              | Menyimpan data konversi poin yang sedang dikelola atau diubah oleh admin.                          |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form konversi poin.           |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data konversi poin sedang dimuat. |
| 23                                 | AdminTransaksiView          | daftarDataTransaksi       | Menyimpan array objek transaksi yang dikelola admin.                                               |
| 24                                 | AdminKelolaEdukasiView      | daftarDataEdukasi         | Menyimpan array konten edukasi yang dikelola admin.                                                |
|                                    |                             | formDataEdukasi           | Menyimpan data konten edukasi yang sedang dikelola atau diubah oleh admin.                         |
|                                    |                             | showModal                 | Menyimpan status boolean untuk menampilkan atau menyembunyikan modal form edukasi.                 |
|                                    |                             | isLoading                 | Menyimpan status true/false untuk menampilkan loading state saat data edukasi sedang dimuat.       |
| **CONTROLLER CLASSES**             |
| 25-35                              | Controllers                 | -                         | Controller fokus pada operasi, bukan penyimpanan atribut.                                          |
| **ENTITY CLASSES**                 |
| 36                                 | Peran                       | id_peran                  | Menyimpan ID dari peran yang ada dalam aplikasi.                                                   |
|                                    |                             | nama_peran                | Menyimpan nama dari peran yang ada dalam aplikasi.                                                 |
| 37                                 | Pengguna                    | id_pengguna               | Menyimpan ID unik pengguna.                                                                        |
|                                    |                             | nama_lengkap              | Menyimpan nama lengkap pengguna.                                                                   |
|                                    |                             | email                     | Menyimpan email pengguna.                                                                          |
|                                    |                             | kata_sandi                | Menyimpan kata sandi pengguna dalam bentuk terenkripsi.                                            |
|                                    |                             | no_telepon                | Menyimpan nomor telepon pengguna.                                                                  |
|                                    |                             | poin_pengguna             | Menyimpan jumlah poin yang dimiliki pengguna.                                                      |
|                                    |                             | alamat_pengguna           | Menyimpan alamat pengguna.                                                                         |
|                                    |                             | gambar_pengguna           | Menyimpan gambar profil pengguna.                                                                  |
|                                    |                             | kode_otp                  | Menyimpan kode OTP untuk verifikasi pengguna.                                                      |
|                                    |                             | kadaluarsa_otp            | Menyimpan waktu kadaluarsa OTP.                                                                    |
|                                    |                             | waktu_dibuat              | Menyimpan waktu saat pengguna dibuat atau terdaftar.                                               |
|                                    |                             | waktu_diubah              | Menyimpan waktu terakhir kali data pengguna diperbarui.                                            |
|                                    |                             | id_peran                  | Menyimpan ID peran pengguna.                                                                       |
| 38                                 | JenisDokumenPendukung       | id_jenis_dokumen          | Menyimpan ID jenis dokumen pendukung                                                               |
|                                    |                             | nama_jenis_dokumen        | Menyimpan nama jenis dokumen pendukung                                                             |
| 39                                 | DokumenPendukung            | id_dokumen                | Menyimpan ID dokumen pendukung yang diunggah oleh pengguna.                                        |
|                                    |                             | dokumen                   | Menyimpan file dokumen yang diunggah pengguna.                                                     |
|                                    |                             | id_pengguna               | Menyimpan ID pengguna yang mengunggah dokumen.                                                     |
|                                    |                             | id_jenis_dokumen          | Menyimpan ID jenis dokumen pendukung yang diunggah.                                                |
| 40                                 | KategoriSampah              | id_kategori_sampah        | Menyimpan ID kategori sampah.                                                                      |
|                                    |                             | nama_kategori_sampah      | Menyimpan nama kategori sampah.                                                                    |
|                                    |                             | poin_kategori_sampah      | Menyimpan jumlah poin yang diberikan untuk kategori sampah tertentu.                               |
|                                    |                             | deskripsi_kategori_sampah | Menyimpan deskripsi dari kategori sampah.                                                          |
| 41                                 | JenisSampah                 | id_jenis_sampah           | Menyimpan ID jenis sampah                                                                          |
|                                    |                             | nama_jenis_sampah         | Menyimpan nama jenis sampah.                                                                       |
|                                    |                             | deskripsi_jenis_sampah    | Menyimpan deskripsi mengenai jenis sampah yang dimaksud.                                           |
|                                    |                             | id_kategori_sampah        | Menyimpan ID kategori sampah yang terkait dengan jenis sampah ini.                                 |
| 42                                 | WaktuOperasional            | id_waktu_operasional      | Menyimpan ID waktu operasional untuk pengelolaan waktu layanan.                                    |
|                                    |                             | nama_operasional          | Menyimpan nama atau deskripsi terkait waktu operasional.                                           |
|                                    |                             | jam_mulai_operasional     | Menyimpan jam mulai operasional untuk layanan.                                                     |
|                                    |                             | jam_selesai_operasional   | Menyimpan jam selesai operasional untuk layanan.                                                   |
| 43                                 | Daerah                      | id_daerah                 | Menyimpan ID daerah untuk pengelolaan dropbox atau layanan lain yang terhubung dengan daerah       |
|                                    |                             | nama_daerah               | Menyimpan nama daerah                                                                              |
| 44                                 | Dropbox                     | id_dropbox                | Menyimpan ID dropbox                                                                               |
|                                    |                             | nama_dropbox              | Menyimpan nama dropbox yang digunakan untuk penampungan sampah.                                    |
|                                    |                             | longitude                 | Menyimpan koordinat longitude lokasi dropbox.                                                      |
|                                    |                             | latitude                  | Menyimpan koordinat latitude lokasi dropbox.                                                       |
|                                    |                             | id_daerah                 | Menyimpan ID daerah yang terkait dengan dropbox ini.                                               |
| 45                                 | Penjemputan                 | id_penjemputan            | Menyimpan ID unik untuk setiap permintaan penjemputan sampah.                                      |
|                                    |                             | kode_penjemputan          | Menyimpan kode unik untuk identifikasi permintaan penjemputan sampah.                              |
|                                    |                             | alamat_jemput             | Menyimpan alamat lengkap lokasi penjemputan sampah.                                                |
|                                    |                             | waktu_dijemput            | Menyimpan waktu penjemputan sampah yang dijadwalkan.                                               |
|                                    |                             | waktu_diantar             | Menyimpan waktu pengantaran sampah setelah diambil.                                                |
|                                    |                             | waktu_sampai              | Menyimpan waktu sampai di dropbox atau lokasi tujuan.                                              |
|                                    |                             | waktu_dibatalkan          | Menyimpan waktu pembatalan permintaan penjemputan, jika ada.                                       |
|                                    |                             | waktu_ditambah            | Menyimpan waktu saat permintaan penjemputan ditambahkan.                                           |
|                                    |                             | waktu_diubah              | Menyimpan waktu terakhir kali permintaan penjemputan diubah.                                       |
|                                    |                             | id_masyarakat             | Menyimpan ID masyarakat yang mengajukan permintaan penjemputan.                                    |
|                                    |                             | id_kurir                  | Menyimpan ID kurir yang akan melakukan penjemputan.                                                |
|                                    |                             | id_waktu_operasional      | Menyimpan ID waktu operasional untuk penjemputan.                                                  |
|                                    |                             | id_dropbox                | Menyimpan ID dropbox tempat sampah akan diantar.                                                   |
| 46                                 | Sampah                      | id_sampah                 | Menyimpan ID unik sampah yang akan dikelola.                                                       |
|                                    |                             | nama_sampah               | Menyimpan nama jenis sampah.                                                                       |
|                                    |                             | berat_sampah              | Menyimpan berat sampah yang akan dijemput.                                                         |
|                                    |                             | poin_sampah               | Menyimpan jumlah poin yang diberikan berdasarkan jenis sampah ini.                                 |
|                                    |                             | gambar                    | Menyimpan gambar sampah, misalnya gambar sampah yang diambil untuk identifikasi atau verifikasi.   |
|                                    |                             | id_penjemputan            | Menyimpan ID permintaan penjemputan terkait dengan sampah ini.                                     |
|                                    |                             | id_kategori               | Menyimpan ID kategori sampah                                                                       |
|                                    |                             | id_jenis                  | Menyimpan ID jenis sampah                                                                          |
| 47                                 | KontenEdukasi               | id_konten                 | Menyimpan ID unik untuk setiap artikel atau konten edukasi.                                        |
|                                    |                             | judul_konten              | Menyimpan judul dari artikel edukasi.                                                              |
|                                    |                             | isi_konten                | Menyimpan isi atau teks lengkap dari artikel edukasi.                                              |
|                                    |                             | gambar                    | Menyimpan gambar terkait dengan artikel edukasi                                                    |

---

## Identifikasi Fungsi

| No                               | Nama Kelas                  | Nama Fungsi                 | Keterangan                                                               |
| -------------------------------- | --------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| **BOUNDARY CLASSES - FUNGSI UI** |
| 1                                | HomeView                    | muatDaftarKategori()        | Memuat daftar kategori sampah untuk ditampilkan di halaman utama.        |
|                                  |                             | muatDaftarArtikel()         | Memuat daftar artikel edukasi untuk ditampilkan di halaman utama.        |
|                                  |                             | tanganiKlikKategori()       | Menangani klik pada kategori untuk navigasi ke halaman kategori terkait. |
|                                  |                             | tanganiKlikArtikel()        | Menangani klik pada artikel untuk navigasi ke halaman detail artikel.    |
| 2                                | RegisterView                | tanganiInputNama()          | Menangani perubahan input nama dan validasi format nama.                 |
|                                  |                             | tanganiInputEmail()         | Menangani perubahan input email dan validasi format email.               |
|                                  |                             | tanganiInputPassword()      | Menangani perubahan input password dan validasi kekuatan password.       |
|                                  |                             | tanganiSubmitRegistrasi()   | Menangani proses submit form registrasi ke backend.                      |
|                                  |                             | validasiForm()              | Melakukan validasi form sebelum submit.                                  |
|                                  |                             | tampilkanError()            | Menampilkan pesan kesalahan jika registrasi gagal.                       |
| 3                                | VerifikasiOTPView           | tanganiInputOTP()           | Menangani perubahan input kode OTP.                                      |
|                                  |                             | tanganiSubmitOTP()          | Menangani submit kode OTP untuk verifikasi.                              |
|                                  |                             | jalankanTimer()             | Menjalankan countdown timer untuk fitur kirim ulang OTP.                 |
|                                  |                             | kirimUlangOTP()             | Mengirimkan ulang kode OTP ke email/telefon pengguna.                    |
|                                  |                             | tampilkanError()            | Menampilkan pesan kesalahan jika OTP tidak valid.                        |
| 4                                | LoginView                   | tanganiInputEmail()         | Menangani perubahan input email dan validasi format.                     |
|                                  |                             | tanganiInputPassword()      | Menangani perubahan input password.                                      |
|                                  |                             | tanganiSubmitLogin()        | Menangani proses submit form login ke backend.                           |
|                                  |                             | validasiForm()              | Melakukan validasi form sebelum submit.                                  |
|                                  |                             | tampilkanError()            | Menampilkan pesan kesalahan jika login gagal.                            |
|                                  |                             | ingatSaya()                 | Menangani checkbox "Ingat Saya" untuk auto-login.                        |
| 5                                | LupaPasswordView            | tanganiInputEmail()         | Menangani perubahan input email untuk reset password.                    |
|                                  |                             | tanganiSubmitReset()        | Menangani submit form reset password.                                    |
|                                  |                             | kirimTautanReset()          | Mengirimkan tautan reset password ke email pengguna.                     |
|                                  |                             | tampilkanPesanSukses()      | Menampilkan pesan konfirmasi setelah tautan berhasil dikirim.            |
|                                  |                             | tampilkanError()            | Menampilkan pesan kesalahan jika email tidak ditemukan.                  |
| 6                                | ProfilView                  | muatDataProfil()            | Memuat data profil pengguna dari backend.                                |
|                                  |                             | tanganiPerubahanData()      | Menangani perubahan data profil yang dapat diedit.                       |
|                                  |                             | simpanPerubahan()           | Menyimpan perubahan data profil ke backend.                              |
|                                  |                             | ubahKataSandi()             | Menangani proses ubah kata sandi pengguna.                               |
|                                  |                             | validasiKataSandiLama()     | Memvalidasi kata sandi lama sebelum mengubah.                            |
| 7                                | RiwayatView                 | muatDaftarRiwayat()         | Memuat daftar riwayat transaksi dari backend.                            |
|                                  |                             | terapkanFilter()            | Menerapkan filter pada daftar riwayat berdasarkan kriteria.              |
|                                  |                             | cariRiwayat()               | Melakukan pencarian riwayat berdasarkan teks input.                      |
|                                  |                             | tampilkanDetailRiwayat()    | Menampilkan detail riwayat transaksi yang dipilih.                       |
| 8                                | DashboardMasyarakatView     | muatDataDashboard()         | Memuat data dashboard untuk ditampilkan ke masyarakat.                   |
|                                  |                             | tampilkanSapaan()           | Menampilkan sapaan personal berdasarkan nama pengguna.                   |
|                                  |                             | tampilkanTotalPoin()        | Menampilkan total poin akumulasi milik pengguna.                         |
|                                  |                             | muatRiwayatTerakhir()       | Memuat beberapa transaksi terakhir untuk preview.                        |
| 9                                | PermintaanPenjemputanView   | pilihJenisSampah()          | Menangani pemilihan jenis sampah untuk dijemput.                         |
|                                  |                             | isiAlamat()                 | Menangani input alamat penjemputan.                                      |
|                                  |                             | pilihJadwal()               | Menangani pemilihan tanggal dan waktu penjemputan.                       |
|                                  |                             | isiCatatan()                | Menangani input catatan tambahan untuk kurir.                            |
|                                  |                             | submitPermintaan()          | Mengirimkan permintaan penjemputan ke backend.                           |
|                                  |                             | validasiData()              | Melakukan validasi data sebelum submit permintaan.                       |
| 10                               | LacakPenjemputanView        | muatDetailPermintaan()      | Memuat detail permintaan penjemputan yang dilacak.                       |
|                                  |                             | muatStatusProgres()         | Memuat tahapan progres penjemputan untuk timeline.                       |
|                                  |                             | updateStatusSecara          | Melakukan refresh status penjemputan secara realtime.                    |
| 11                               | EdukasiView                 | muatDaftarArtikel()         | Memuat semua artikel edukasi dari backend.                               |
|                                  |                             | tampilkanDetailArtikel()    | Menampilkan detail artikel yang dipilih.                                 |
|                                  |                             | cariArtikel()               | Melakukan pencarian artikel berdasarkan kata kunci.                      |
|                                  |                             | filterArtikel()             | Menerapkan filter kategori pada daftar artikel.                          |
| 12                               | DashboardKurirView          | muatDataDashboard()         | Memuat data dashboard untuk kurir.                                       |
|                                  |                             | muatDaftarPermintaan()      | Memuat daftar permintaan penjemputan yang tersedia.                      |
|                                  |                             | ambilPermintaan()           | Mengambil permintaan penjemputan untuk dikerjakan.                       |
|                                  |                             | tampilkanSapaan()           | Menampilkan sapaan personal untuk kurir.                                 |
| 13                               | DetailPermintaanKurirView   | muatDetailPermintaan()      | Memuat detail lengkap permintaan penjemputan.                            |
|                                  |                             | konfirmasiPengambilan()     | Mengkonfirmasi pengambilan permintaan oleh kurir.                        |
|                                  |                             | updateStatusPenjemputan()   | Mengupdate status penjemputan (dijemput, diantar, selesai).              |
|                                  |                             | batalkanPermintaan()        | Membatalkan permintaan jika ada masalah.                                 |
| 14                               | UnggahDokumenView           | pilihFileKTP()              | Menangani pemilihan file KTP dari perangkat.                             |
|                                  |                             | pilihFileSIM()              | Menangani pemilihan file SIM dari perangkat.                             |
|                                  |                             | validasiFile()              | Memvalidasi format dan ukuran file yang dipilih.                         |
|                                  |                             | unggahDokumen()             | Mengunggah dokumen ke server.                                            |
|                                  |                             | tampilkanError()            | Menampilkan pesan kesalahan jika unggah gagal.                           |
| 15                               | AdminDashboardView          | muatStatistikPengguna()     | Memuat ringkasan statistik pengguna untuk admin.                         |
|                                  |                             | muatStatistikTransaksi()    | Memuat ringkasan statistik transaksi untuk admin.                        |
|                                  |                             | tampilkanGrafikAnalitik()   | Menampilkan grafik analitik untuk admin.                                 |
| 16                               | AdminDataMasterView         | muatDaftarDataMaster()      | Memuat daftar data master yang dikelola admin.                           |
|                                  |                             | cariDataMaster()            | Melakukan pencarian pada data master.                                    |
|                                  |                             | exportDataMaster()          | Mengexport data master ke format file.                                   |
| 17                               | AdminVerifikasiView         | muatDaftarAkunPengguna()    | Memuat daftar akun yang perlu diverifikasi.                              |
|                                  |                             | verifikasiAkun()            | Melakukan verifikasi akun pengguna.                                      |
|                                  |                             | tolakVerifikasi()           | Menolak verifikasi akun dengan alasan.                                   |
|                                  |                             | kirimNotifikasiVerifikasi() | Mengirim notifikasi hasil verifikasi ke pengguna.                        |
| 18                               | AdminKelolaKategoriView     | muatDaftarKategori()        | Memuat daftar kategori sampah untuk admin.                               |
|                                  |                             | tambahKategori()            | Menambah kategori sampah baru.                                           |
|                                  |                             | ubahKategori()              | Mengubah data kategori sampah yang ada.                                  |
|                                  |                             | hapusKategori()             | Menghapus kategori sampah.                                               |
|                                  |                             | cariKategori()              | Melakukan pencarian kategori sampah.                                     |
|                                  |                             | validasiDataKategori()      | Memvalidasi data kategori sebelum simpan.                                |
| 19                               | AdminKelolaJenisView        | muatDaftarJenis()           | Memuat daftar jenis sampah untuk admin.                                  |
|                                  |                             | tambahJenis()               | Menambah jenis sampah baru.                                              |
|                                  |                             | ubahJenis()                 | Mengubah data jenis sampah yang ada.                                     |
|                                  |                             | hapusJenis()                | Menghapus jenis sampah.                                                  |
|                                  |                             | cariJenis()                 | Melakukan pencarian jenis sampah.                                        |
|                                  |                             | validasiDataJenis()         | Memvalidasi data jenis sebelum simpan.                                   |
| 20                               | AdminKelolaDropboxView      | muatDaftarDropbox()         | Memuat daftar dropbox untuk admin.                                       |
|                                  |                             | tambahDropbox()             | Menambah dropbox baru.                                                   |
|                                  |                             | ubahDropbox()               | Mengubah data dropbox yang ada.                                          |
|                                  |                             | hapusDropbox()              | Menghapus dropbox.                                                       |
|                                  |                             | cariDropbox()               | Melakukan pencarian dropbox.                                             |
|                                  |                             | validasiDataDropbox()       | Memvalidasi data dropbox sebelum simpan.                                 |
| 21                               | AdminKelolaDaerahView       | muatDaftarDaerah()          | Memuat daftar daerah untuk admin.                                        |
|                                  |                             | tambahDaerah()              | Menambah daerah baru.                                                    |
|                                  |                             | ubahDaerah()                | Mengubah data daerah yang ada.                                           |
|                                  |                             | hapusDaerah()               | Menghapus daerah.                                                        |
|                                  |                             | cariDaerah()                | Melakukan pencarian daerah.                                              |
|                                  |                             | validasiDataDaerah()        | Memvalidasi data daerah sebelum simpan.                                  |
| 22                               | AdminKelolaKonversiPoinView | muatDaftarKonversiPoin()    | Memuat daftar konversi poin untuk admin.                                 |
|                                  |                             | tambahKonversiPoin()        | Menambah aturan konversi poin baru.                                      |
|                                  |                             | ubahKonversiPoin()          | Mengubah aturan konversi poin yang ada.                                  |
|                                  |                             | hapusKonversiPoin()         | Menghapus aturan konversi poin.                                          |
|                                  |                             | cariKonversiPoin()          | Melakukan pencarian konversi poin.                                       |
|                                  |                             | validasiDataKonversiPoin()  | Memvalidasi data konversi poin sebelum simpan.                           |
| 23                               | AdminTransaksiView          | muatDaftarTransaksi()       | Memuat daftar semua transaksi untuk admin.                               |
|                                  |                             | cariTransaksi()             | Melakukan pencarian transaksi.                                           |
|                                  |                             | filterTransaksi()           | Menerapkan filter pada daftar transaksi.                                 |
|                                  |                             | exportTransaksi()           | Mengexport data transaksi ke format file.                                |
|                                  |                             | lihatDetailTransaksi()      | Melihat detail lengkap transaksi.                                        |
| 24                               | AdminKelolaEdukasiView      | muatDaftarEdukasi()         | Memuat daftar konten edukasi untuk admin.                                |
|                                  |                             | tambahEdukasi()             | Menambah konten edukasi baru.                                            |
|                                  |                             | ubahEdukasi()               | Mengubah konten edukasi yang ada.                                        |
|                                  |                             | hapusEdukasi()              | Menghapus konten edukasi.                                                |
|                                  |                             | cariEdukasi()               | Melakukan pencarian konten edukasi.                                      |
|                                  |                             | validasiDataEdukasi()       | Memvalidasi data edukasi sebelum simpan.                                 |
| **CONTROLLER CLASSES**           |
| 25                               | AuthController              | registrasiPengguna()        | Mengontrol proses registrasi pengguna baru.                              |
|                                  |                             | loginPengguna()             | Mengontrol proses login pengguna.                                        |
|                                  |                             | verifikasiOTP()             | Mengontrol proses verifikasi OTP.                                        |
|                                  |                             | lupaPassword()              | Mengontrol proses reset password.                                        |
|                                  |                             | logoutPengguna()            | Mengontrol proses logout pengguna.                                       |
| 26                               | ProfilController            | ambilDataProfil()           | Mengontrol pengambilan data profil pengguna.                             |
|                                  |                             | updateProfil()              | Mengontrol update data profil pengguna.                                  |
|                                  |                             | ubahPassword()              | Mengontrol proses ubah password.                                         |
| 27                               | PenjemputanController       | buatPermintaanPenjemputan() | Mengontrol pembuatan permintaan penjemputan baru.                        |
|                                  |                             | ambilDaftarPermintaan()     | Mengontrol pengambilan daftar permintaan.                                |
|                                  |                             | updateStatusPenjemputan()   | Mengontrol update status penjemputan.                                    |
|                                  |                             | batalkanPenjemputan()       | Mengontrol pembatalan penjemputan.                                       |
| 28                               | KategoriController          | ambilDaftarKategori()       | Mengontrol pengambilan daftar kategori sampah.                           |
|                                  |                             | tambahKategori()            | Mengontrol penambahan kategori baru.                                     |
|                                  |                             | updateKategori()            | Mengontrol update kategori yang ada.                                     |
|                                  |                             | hapusKategori()             | Mengontrol penghapusan kategori.                                         |
| 29                               | JenisController             | ambilDaftarJenis()          | Mengontrol pengambilan daftar jenis sampah.                              |
|                                  |                             | tambahJenis()               | Mengontrol penambahan jenis baru.                                        |
|                                  |                             | updateJenis()               | Mengontrol update jenis yang ada.                                        |
|                                  |                             | hapusJenis()                | Mengontrol penghapusan jenis.                                            |
| 30                               | DropboxController           | ambilDaftarDropbox()        | Mengontrol pengambilan daftar dropbox.                                   |
|                                  |                             | tambahDropbox()             | Mengontrol penambahan dropbox baru.                                      |
|                                  |                             | updateDropbox()             | Mengontrol update dropbox yang ada.                                      |
|                                  |                             | hapusDropbox()              | Mengontrol penghapusan dropbox.                                          |
| 31                               | DaerahController            | ambilDaftarDaerah()         | Mengontrol pengambilan daftar daerah.                                    |
|                                  |                             | tambahDaerah()              | Mengontrol penambahan daerah baru.                                       |
|                                  |                             | updateDaerah()              | Mengontrol update daerah yang ada.                                       |
|                                  |                             | hapusDaerah()               | Mengontrol penghapusan daerah.                                           |
| 32                               | KonversiPoinController      | ambilDaftarKonversiPoin()   | Mengontrol pengambilan daftar konversi poin.                             |
|                                  |                             | tambahKonversiPoin()        | Mengontrol penambahan konversi poin baru.                                |
|                                  |                             | updateKonversiPoin()        | Mengontrol update konversi poin yang ada.                                |
|                                  |                             | hapusKonversiPoin()         | Mengontrol penghapusan konversi poin.                                    |
| 33                               | TransaksiController         | ambilDaftarTransaksi()      | Mengontrol pengambilan daftar transaksi.                                 |
|                                  |                             | prosesTransaksi()           | Mengontrol pemrosesan transaksi baru.                                    |
|                                  |                             | updateStatusTransaksi()     | Mengontrol update status transaksi.                                      |
| 34                               | EdukasiController           | ambilDaftarEdukasi()        | Mengontrol pengambilan daftar konten edukasi.                            |
|                                  |                             | tambahEdukasi()             | Mengontrol penambahan konten edukasi baru.                               |
|                                  |                             | updateEdukasi()             | Mengontrol update konten edukasi yang ada.                               |
|                                  |                             | hapusEdukasi()              | Mengontrol penghapusan konten edukasi.                                   |
| 35                               | DokumenController           | unggahDokumen()             | Mengontrol proses unggah dokumen pendukung.                              |
|                                  |                             | validasiDokumen()           | Mengontrol validasi dokumen yang diunggah.                               |
|                                  |                             | hapusDokumen()              | Mengontrol penghapusan dokumen.                                          |
| **ENTITY CLASSES**               |
| 36-47                            | Entity Classes              | createEntity()              | Membuat instance entity baru.                                            |
|                                  |                             | updateEntity()              | Mengupdate data entity yang ada.                                         |
|                                  |                             | deleteEntity()              | Menghapus entity dari database.                                          |
|                                  |                             | findEntity()                | Mencari entity berdasarkan kriteria.                                     |
|                                  |                             | validateEntity()            | Memvalidasi data entity sebelum operasi database.                        |

---

## Skenario Use Case

**Aktor Utama:** Calon Pengguna
**Aktor Sekunder:** Sistem Email

**Precondition:**

- Calon pengguna mengakses halaman registrasi aplikasi
- Email yang digunakan belum pernah terdaftar sebelumnya

**Main Flow:**

1. Calon pengguna mengakses halaman registrasi
2. Sistem menampilkan form registrasi (nama lengkap, email, kata sandi, konfirmasi kata sandi)
3. Calon pengguna mengisi semua field yang required
4. Calon pengguna menekan tombol "Daftar"
5. Sistem memvalidasi format email dan kekuatan kata sandi
6. Sistem mengecek apakah email sudah terdaftar atau belum
7. Sistem membuat akun pengguna baru dengan status "Belum Verifikasi"
8. Sistem mengirimkan kode OTP ke email yang didaftarkan
9. Sistem mengarahkan pengguna ke halaman verifikasi OTP
10. Use case berhasil

**Alternative Flow:**

- 5a. Email tidak valid atau kata sandi terlalu lemah
  - 5a1. Sistem menampilkan pesan error validasi
  - 5a2. Kembali ke step 3
- 6a. Email sudah terdaftar
  - 6a1. Sistem menampilkan pesan "Email sudah terdaftar"
  - 6a2. Kembali ke step 3
- 8a. Gagal mengirim OTP
  - 8a1. Sistem menampilkan pesan error
  - 8a2. Berikan opsi untuk mengirim ulang

**Postcondition:**

- Akun pengguna baru tersimpan di database dengan status "Belum Verifikasi"
- OTP dikirimkan ke email pengguna
- Pengguna diarahkan ke halaman verifikasi OTP

---

### UC-002: Verifikasi OTP

**Aktor Utama:** Pengguna yang Belum Verifikasi
**Aktor Sekunder:** Sistem Email

**Precondition:**

- Pengguna sudah melakukan registrasi
- OTP sudah dikirim ke email pengguna
- Pengguna berada di halaman verifikasi OTP

**Main Flow:**

1. Sistem menampilkan form input OTP dengan 6 digit
2. Sistem menampilkan countdown timer (5 menit)
3. Pengguna memasukkan kode OTP yang diterima di email
4. Pengguna menekan tombol "Verifikasi"
5. Sistem memvalidasi kode OTP yang dimasukkan
6. Sistem mengecek apakah OTP belum kadaluarsa
7. Sistem mengubah status akun menjadi "Terverifikasi"
8. Sistem menampilkan pesan sukses verifikasi
9. Sistem mengarahkan pengguna ke halaman login
10. Use case berhasil

**Alternative Flow:**

- 5a. Kode OTP salah
  - 5a1. Sistem menampilkan pesan "Kode OTP tidak valid"
  - 5a2. Kembali ke step 3
- 6a. OTP sudah kadaluarsa
  - 6a1. Sistem menampilkan pesan "Kode OTP sudah kadaluarsa"
  - 6a2. Sistem menyediakan tombol "Kirim Ulang OTP"
- 2a. Pengguna menekan "Kirim Ulang OTP"
  - 2a1. Sistem generate OTP baru
  - 2a2. Sistem kirim OTP baru ke email
  - 2a3. Sistem reset countdown timer
  - 2a4. Kembali ke step 2

**Postcondition:**

- Status akun pengguna berubah menjadi "Terverifikasi"
- Pengguna dapat melakukan login ke aplikasi
- OTP yang lama tidak dapat digunakan lagi

---

### UC-003: Login Pengguna

**Aktor Utama:** Pengguna Terverifikasi

**Precondition:**

- Pengguna memiliki akun yang sudah terverifikasi
- Pengguna berada di halaman login

**Main Flow:**

1. Sistem menampilkan form login (email, kata sandi)
2. Pengguna memasukkan email dan kata sandi
3. Pengguna dapat mencentang checkbox "Ingat Saya" (opsional)
4. Pengguna menekan tombol "Masuk"
5. Sistem memvalidasi format email
6. Sistem mengecek kecocokan email dan kata sandi di database
7. Sistem mengecek status verifikasi akun
8. Sistem membuat session/token untuk pengguna
9. Jika "Ingat Saya" dicentang, sistem menyimpan kredensial di localStorage
10. Sistem mengarahkan pengguna ke dashboard sesuai peran
11. Use case berhasil

**Alternative Flow:**

- 6a. Email atau kata sandi salah
  - 6a1. Sistem menampilkan pesan "Email atau kata sandi salah"
  - 6a2. Kembali ke step 2
- 7a. Akun belum terverifikasi
  - 7a1. Sistem menampilkan pesan "Akun belum terverifikasi"
  - 7a2. Sistem menyediakan link untuk verifikasi ulang
- Jika pengguna sebelumnya menggunakan "Ingat Saya"
  - Auto-fill email dan kata sandi dari localStorage

**Postcondition:**

- Pengguna berhasil login dan memiliki session aktif
- Pengguna diarahkan ke dashboard sesuai peran (Masyarakat/Kurir/Admin)
- Jika "Ingat Saya" digunakan, kredensial tersimpan untuk login otomatis

---

### UC-004: Kelola Profil Pengguna

**Aktor Utama:** Pengguna (Masyarakat/Kurir)

**Precondition:**

- Pengguna sudah login ke aplikasi
- Pengguna berada di halaman profil

**Main Flow:**

1. Sistem menampilkan data profil pengguna saat ini
2. Sistem menyediakan form edit profil (nama, email, alamat, foto profil)
3. Pengguna mengubah data yang ingin diperbarui
4. Pengguna menekan tombol "Simpan Perubahan"
5. Sistem memvalidasi format data yang diubah
6. Sistem menyimpan perubahan ke database
7. Sistem menampilkan pesan konfirmasi berhasil
8. Use case berhasil

**Sub Flow - Ubah Kata Sandi:**

1. Pengguna mengklik tab "Ubah Kata Sandi"
2. Sistem menampilkan form ubah kata sandi
3. Pengguna memasukkan kata sandi lama
4. Pengguna memasukkan kata sandi baru
5. Pengguna mengkonfirmasi kata sandi baru
6. Pengguna menekan tombol "Ubah Kata Sandi"
7. Sistem memvalidasi kata sandi lama
8. Sistem memvalidasi kekuatan kata sandi baru
9. Sistem menyimpan kata sandi baru (terenkripsi)
10. Sistem menampilkan pesan sukses

**Alternative Flow:**

- 5a. Format data tidak valid
  - 5a1. Sistem menampilkan pesan error validasi
  - 5a2. Kembali ke step 3
- 7a. Kata sandi lama salah
  - 7a1. Sistem menampilkan pesan "Kata sandi lama tidak benar"
  - 7a2. Kembali ke step 3
- 8a. Kata sandi baru terlalu lemah
  - 8a1. Sistem menampilkan kriteria kata sandi yang kuat
  - 8a2. Kembali ke step 4

**Postcondition:**

- Data profil pengguna berhasil diperbarui
- Jika kata sandi diubah, session tetap aktif

---

### UC-005: Lihat Riwayat Transaksi

**Aktor Utama:** Pengguna (Masyarakat)

**Precondition:**

- Pengguna sudah login sebagai Masyarakat
- Pengguna memiliki riwayat transaksi

**Main Flow:**

1. Pengguna mengakses menu "Riwayat" di dashboard
2. Sistem menampilkan daftar riwayat transaksi penjemputan
3. Sistem menyediakan fitur filter (semua, selesai, dibatalkan, diproses)
4. Sistem menyediakan fitur pencarian berdasarkan kode transaksi
5. Pengguna dapat memilih filter atau melakukan pencarian
6. Sistem menampilkan hasil sesuai filter/pencarian
7. Pengguna dapat mengklik salah satu riwayat untuk melihat detail
8. Sistem menampilkan detail transaksi lengkap
9. Use case berhasil

**Alternative Flow:**

- 2a. Belum ada riwayat transaksi
  - 2a1. Sistem menampilkan pesan "Belum ada riwayat transaksi"
  - 2a2. Sistem menyediakan tombol untuk membuat permintaan penjemputan baru
- 6a. Hasil pencarian kosong
  - 6a1. Sistem menampilkan pesan "Data tidak ditemukan"
  - 6a2. Sistem menyediakan saran untuk mengubah kata kunci

**Postcondition:**

- Pengguna dapat melihat semua riwayat transaksi
- Pengguna dapat melihat detail transaksi yang dipilih

---

### UC-006: Lupa Kata Sandi

**Aktor Utama:** Pengguna
**Aktor Sekunder:** Sistem Email

**Precondition:**

- Pengguna berada di halaman login
- Pengguna lupa kata sandi

**Main Flow:**

1. Pengguna mengklik link "Lupa Kata Sandi?" di halaman login
2. Sistem menampilkan form reset kata sandi
3. Pengguna memasukkan email yang terdaftar
4. Pengguna menekan tombol "Kirim Tautan Reset"
5. Sistem memvalidasi format email
6. Sistem mengecek apakah email terdaftar di database
7. Sistem generate token reset password dengan expire time
8. Sistem mengirimkan email berisi link reset password
9. Sistem menampilkan pesan konfirmasi
10. Pengguna mengklik link dari email
11. Sistem memvalidasi token dan expire time
12. Sistem menampilkan form kata sandi baru
13. Pengguna memasukkan kata sandi baru dan konfirmasi
14. Pengguna menekan tombol "Reset Kata Sandi"
15. Sistem memvalidasi kekuatan kata sandi
16. Sistem menyimpan kata sandi baru (terenkripsi)
17. Sistem menampilkan pesan berhasil
18. Sistem mengarahkan ke halaman login
19. Use case berhasil

**Alternative Flow:**

- 6a. Email tidak terdaftar
  - 6a1. Sistem menampilkan pesan "Email tidak ditemukan"
  - 6a2. Kembali ke step 3
- 8a. Gagal mengirim email
  - 8a1. Sistem menampilkan pesan error
  - 8a2. Menyediakan opsi untuk coba lagi
- 11a. Token sudah kadaluarsa
  - 11a1. Sistem menampilkan pesan "Link sudah kadaluarsa"
  - 11a2. Sistem menyediakan link untuk reset ulang
- 15a. Kata sandi baru terlalu lemah
  - 15a1. Sistem menampilkan kriteria kata sandi
  - 15a2. Kembali ke step 13

**Postcondition:**

- Kata sandi pengguna berhasil direset
- Token reset menjadi tidak valid
- Pengguna dapat login dengan kata sandi baru

---

### UC-007: Permintaan Penjemputan Sampah

**Aktor Utama:** Masyarakat

**Precondition:**

- Masyarakat sudah login ke aplikasi
- Masyarakat berada di dashboard

**Main Flow:**

1. Masyarakat mengklik tombol "Buat Permintaan Penjemputan"
2. Sistem menampilkan form permintaan penjemputan
3. Sistem menampilkan daftar jenis sampah yang tersedia
4. Masyarakat memilih jenis sampah yang akan dijemput
5. Masyarakat mengisi perkiraan berat untuk setiap jenis sampah
6. Masyarakat mengisi alamat penjemputan lengkap
7. Masyarakat memilih tanggal dan waktu penjemputan
8. Masyarakat menambahkan catatan khusus (opsional)
9. Sistem menampilkan ringkasan permintaan dan estimasi poin
10. Masyarakat menekan tombol "Buat Permintaan"
11. Sistem memvalidasi semua data yang dimasukkan
12. Sistem menyimpan permintaan dengan status "Menunggu Kurir"
13. Sistem generate kode unik untuk permintaan
14. Sistem menampilkan konfirmasi berhasil dengan kode permintaan
15. Use case berhasil

**Alternative Flow:**

- 11a. Data tidak lengkap atau tidak valid
  - 11a1. Sistem menampilkan pesan error validasi
  - 11a2. Kembali ke step yang bermasalah
- 7a. Slot waktu tidak tersedia
  - 7a1. Sistem menampilkan pesan "Slot waktu penuh"
  - 7a2. Sistem menyarankan waktu alternatif
- 12a. Gagal menyimpan ke database
  - 12a1. Sistem menampilkan pesan error teknis
  - 12a2. Menyediakan opsi untuk coba lagi

**Postcondition:**

- Permintaan penjemputan tersimpan di database
- Masyarakat mendapat kode permintaan untuk tracking
- Status permintaan adalah "Menunggu Kurir"

---

### UC-008: Lacak Status Penjemputan

**Aktor Utama:** Masyarakat

**Precondition:**

- Masyarakat sudah membuat permintaan penjemputan
- Masyarakat memiliki kode permintaan

**Main Flow:**

1. Masyarakat mengakses menu "Lacak Penjemputan"
2. Sistem menampilkan daftar permintaan aktif
3. Masyarakat memilih permintaan yang ingin dilacak
4. Sistem menampilkan detail permintaan dan timeline status
5. Sistem menunjukkan status saat ini (Menunggu, Dikonfirmasi, Dalam Perjalanan, Selesai)
6. Jika status "Dalam Perjalanan", sistem menampilkan estimasi waktu tiba
7. Sistem menyediakan informasi kontak kurir (jika sudah ada)
8. Use case berhasil

**Alternative Flow:**

- 2a. Tidak ada permintaan aktif
  - 2a1. Sistem menampilkan pesan "Tidak ada permintaan aktif"
  - 2a2. Sistem menyediakan tombol untuk buat permintaan baru
- 6a. Kurir terlambat dari jadwal
  - 6a1. Sistem menampilkan notifikasi keterlambatan
  - 6a2. Sistem menyediakan opsi untuk menghubungi kurir

**Postcondition:**

- Masyarakat mengetahui status terkini permintaan penjemputan
- Masyarakat dapat menghubungi kurir jika diperlukan

---

### UC-009: Ambil Permintaan Penjemputan (Kurir)

**Aktor Utama:** Kurir

**Precondition:**

- Kurir sudah login dan terverifikasi
- Ada permintaan penjemputan yang tersedia

**Main Flow:**

1. Kurir mengakses dashboard kurir
2. Sistem menampilkan daftar permintaan penjemputan yang tersedia
3. Sistem menunjukkan informasi ringkas (lokasi, jenis sampah, jadwal)
4. Kurir memilih permintaan yang ingin diambil
5. Sistem menampilkan detail lengkap permintaan
6. Kurir menekan tombol "Ambil Permintaan"
7. Sistem mengecek apakah permintaan masih tersedia
8. Sistem mengupdate status permintaan menjadi "Dikonfirmasi"
9. Sistem mengassign permintaan ke kurir tersebut
10. Sistem mengirim notifikasi ke masyarakat bahwa permintaan sudah dikonfirmasi
11. Sistem menampilkan informasi kontak masyarakat
12. Use case berhasil

**Alternative Flow:**

- 2a. Tidak ada permintaan tersedia
  - 2a1. Sistem menampilkan pesan "Belum ada permintaan tersedia"
  - 2a2. Sistem menyediakan notifikasi untuk permintaan baru
- 7a. Permintaan sudah diambil kurir lain
  - 7a1. Sistem menampilkan pesan "Permintaan sudah diambil"
  - 7a2. Kembali ke daftar permintaan
- 8a. Kurir sudah memiliki permintaan aktif
  - 8a1. Sistem menampilkan pesan "Selesaikan permintaan aktif terlebih dahulu"

**Postcondition:**

- Permintaan ter-assign ke kurir
- Status permintaan berubah menjadi "Dikonfirmasi"
- Masyarakat mendapat notifikasi konfirmasi

---

### UC-010: Update Status Penjemputan (Kurir)

**Aktor Utama:** Kurir

**Precondition:**

- Kurir sudah mengambil permintaan penjemputan
- Kurir sedang melaksanakan penjemputan

**Main Flow:**

1. Kurir mengakses detail permintaan yang sedang dikerjakan
2. Sistem menampilkan tombol update status sesuai tahapan
3. Kurir menekan tombol status yang sesuai:
   - "Menuju Lokasi" - ketika kurir mulai perjalanan
   - "Sampah Dijemput" - ketika sudah mengambil sampah
   - "Menuju Dropbox" - ketika menuju ke dropbox
   - "Selesai" - ketika sampah sudah diantar ke dropbox
4. Sistem mengupdate status di database
5. Sistem mencatat waktu update status
6. Sistem mengirim notifikasi real-time ke masyarakat
7. Jika status "Selesai", sistem menghitung dan menambah poin masyarakat
8. Use case berhasil

**Alternative Flow:**

- 7a. Gagal menghitung poin
  - 7a1. Sistem tetap update status tapi tandai untuk kalkulasi ulang poin
- 4a. Koneksi internet bermasalah
  - 4a1. Sistem simpan status secara offline
  - 4a2. Sinkronisasi otomatis ketika koneksi kembali

**Postcondition:**

- Status penjemputan terupdate secara real-time
- Masyarakat mendapat notifikasi perubahan status
- Jika selesai, poin masyarakat bertambah

---

### UC-011: Kelola Data Master Kategori (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Admin memiliki akses ke menu data master

**Main Flow:**

1. Admin mengakses menu "Data Master" > "Kategori Sampah"
2. Sistem menampilkan daftar kategori sampah yang ada
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Kategori:**
   - Admin mengklik tombol "Tambah Kategori"
   - Sistem menampilkan form kategori baru
   - Admin mengisi nama kategori, deskripsi, dan poin
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Kategori:**
   - Admin mengklik tombol edit pada kategori tertentu
   - Sistem menampilkan form dengan data kategori saat ini
   - Admin mengubah data yang diperlukan
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Kategori:**
   - Admin mengklik tombol hapus pada kategori tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem mengecek apakah kategori sedang digunakan
   - Sistem menghapus kategori dari database
7. Use case berhasil

**Alternative Flow:**

- 4d/5d. Nama kategori sudah ada
  - Sistem menampilkan pesan "Kategori sudah ada"
  - Kembali ke form input
- 6d. Kategori sedang digunakan
  - 6d1. Sistem menampilkan pesan "Kategori tidak dapat dihapus, sedang digunakan"
  - 6d2. Menyediakan opsi untuk non-aktifkan kategori

**Postcondition:**

- Data kategori sampah berhasil dikelola
- Perubahan tersimpan di database
- Daftar kategori terupdate

---

### UC-012: Kelola Data Master Jenis Sampah (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Sudah ada kategori sampah yang tersedia

**Main Flow:**

1. Admin mengakses menu "Data Master" > "Jenis Sampah"
2. Sistem menampilkan daftar jenis sampah dengan kategorinya
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Jenis:**
   - Admin mengklik tombol "Tambah Jenis"
   - Sistem menampilkan form jenis baru
   - Admin memilih kategori sampah dari dropdown
   - Admin mengisi nama jenis dan deskripsi
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Jenis:**
   - Admin mengklik tombol edit pada jenis tertentu
   - Sistem menampilkan form dengan data jenis saat ini
   - Admin mengubah data yang diperlukan
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Jenis:**
   - Admin mengklik tombol hapus pada jenis tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem mengecek apakah jenis sedang digunakan
   - Sistem menghapus jenis dari database
7. Use case berhasil

**Alternative Flow:**

- 4d/5d. Nama jenis sudah ada dalam kategori yang sama
  - Sistem menampilkan pesan "Jenis sudah ada dalam kategori ini"
  - Kembali ke form input
- 6d. Jenis sedang digunakan dalam transaksi
  - 6d1. Sistem menampilkan pesan "Jenis tidak dapat dihapus, sedang digunakan"

**Postcondition:**

- Data jenis sampah berhasil dikelola
- Relasi dengan kategori sampah terjaga
- Daftar jenis sampah terupdate

---

### UC-013: Kelola Data Dropbox (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Sudah ada data daerah yang tersedia

**Main Flow:**

1. Admin mengakses menu "Data Master" > "Dropbox"
2. Sistem menampilkan daftar dropbox dengan informasi lokasi
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Dropbox:**
   - Admin mengklik tombol "Tambah Dropbox"
   - Sistem menampilkan form dropbox baru
   - Admin mengisi nama dropbox
   - Admin memilih daerah dari dropdown
   - Admin mengisi koordinat (latitude, longitude) atau memilih dari peta
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Dropbox:**
   - Admin mengklik tombol edit pada dropbox tertentu
   - Sistem menampilkan form dengan data dropbox saat ini
   - Admin mengubah data yang diperlukan
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Dropbox:**
   - Admin mengklik tombol hapus pada dropbox tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem mengecek apakah dropbox sedang digunakan
   - Sistem menghapus dropbox dari database
7. Use case berhasil

**Alternative Flow:**

- 4e/5e. Koordinat tidak valid
  - Sistem menampilkan pesan "Koordinat tidak valid"
  - Kembali ke form input
- 6d. Dropbox sedang digunakan dalam penjemputan aktif
  - 6d1. Sistem menampilkan pesan "Dropbox tidak dapat dihapus, sedang digunakan"

**Postcondition:**

- Data dropbox berhasil dikelola
- Informasi lokasi tersimpan dengan benar
- Daftar dropbox terupdate

---

### UC-014: Kelola Data Daerah (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem

**Main Flow:**

1. Admin mengakses menu "Data Master" > "Daerah"
2. Sistem menampilkan daftar daerah yang ada
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Daerah:**
   - Admin mengklik tombol "Tambah Daerah"
   - Sistem menampilkan form daerah baru
   - Admin mengisi nama daerah
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Daerah:**
   - Admin mengklik tombol edit pada daerah tertentu
   - Sistem menampilkan form dengan data daerah saat ini
   - Admin mengubah nama daerah
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Daerah:**
   - Admin mengklik tombol hapus pada daerah tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem mengecek apakah daerah sedang digunakan
   - Sistem menghapus daerah dari database
7. Use case berhasil

**Alternative Flow:**

- 4c/5c. Nama daerah sudah ada
  - Sistem menampilkan pesan "Daerah sudah ada"
  - Kembali ke form input
- 6d. Daerah sedang digunakan oleh dropbox
  - 6d1. Sistem menampilkan pesan "Daerah tidak dapat dihapus, sedang digunakan oleh dropbox"

**Postcondition:**

- Data daerah berhasil dikelola
- Daftar daerah terupdate

---

### UC-015: Kelola Konversi Poin (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Sudah ada kategori sampah yang tersedia

**Main Flow:**

1. Admin mengakses menu "Data Master" > "Konversi Poin"
2. Sistem menampilkan daftar aturan konversi poin
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Konversi:**
   - Admin mengklik tombol "Tambah Konversi"
   - Sistem menampilkan form konversi baru
   - Admin memilih kategori sampah dari dropdown
   - Admin mengisi poin per kilogram
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Konversi:**
   - Admin mengklik tombol edit pada konversi tertentu
   - Sistem menampilkan form dengan data konversi saat ini
   - Admin mengubah poin per kilogram
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Konversi:**
   - Admin mengklik tombol hapus pada konversi tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem menghapus konversi dari database
7. Use case berhasil

**Alternative Flow:**

- 4d/5d. Poin harus berupa angka positif
  - Sistem menampilkan pesan "Poin harus berupa angka positif"
  - Kembali ke form input
- 4c. Konversi untuk kategori sudah ada
  - Sistem menampilkan pesan "Konversi untuk kategori ini sudah ada"
  - Menyediakan opsi untuk edit yang sudah ada

**Postcondition:**

- Aturan konversi poin berhasil dikelola
- Sistem dapat menghitung poin berdasarkan aturan baru
- Daftar konversi poin terupdate

---

### UC-016: Lihat Data Transaksi (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Ada data transaksi dalam sistem

**Main Flow:**

1. Admin mengakses menu "Transaksi"
2. Sistem menampilkan daftar semua transaksi penjemputan
3. Sistem menyediakan filter berdasarkan:
   - Status (Semua, Selesai, Dibatalkan, Dalam Proses)
   - Tanggal (Hari ini, Minggu ini, Bulan ini, Custom range)
   - Kurir
   - Daerah
4. Admin dapat menggunakan filter untuk menyaring data
5. Sistem menampilkan hasil sesuai filter
6. Admin dapat mengklik transaksi tertentu untuk melihat detail
7. Sistem menampilkan detail lengkap transaksi
8. Admin dapat mengexport data transaksi ke Excel/PDF
9. Use case berhasil

**Alternative Flow:**

- 2a. Belum ada data transaksi
  - 2a1. Sistem menampilkan pesan "Belum ada data transaksi"
- 5a. Hasil filter kosong
  - 5a1. Sistem menampilkan pesan "Data tidak ditemukan untuk filter yang dipilih"
  - 5a2. Sistem menyediakan opsi untuk reset filter

**Postcondition:**

- Admin dapat melihat semua data transaksi
- Admin dapat menganalisis pola transaksi
- Data dapat diexport untuk laporan

---

### UC-017: Kelola Konten Edukasi (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem

**Main Flow:**

1. Admin mengakses menu "Konten" > "Edukasi"
2. Sistem menampilkan daftar artikel edukasi yang ada
3. Admin dapat memilih aksi: Tambah, Edit, atau Hapus
4. **Jika Tambah Artikel:**
   - Admin mengklik tombol "Tambah Artikel"
   - Sistem menampilkan form artikel baru
   - Admin mengisi judul artikel
   - Admin mengisi konten menggunakan rich text editor
   - Admin mengunggah gambar header artikel
   - Admin menekan tombol "Simpan"
   - Sistem memvalidasi data dan menyimpan
5. **Jika Edit Artikel:**
   - Admin mengklik tombol edit pada artikel tertentu
   - Sistem menampilkan form dengan data artikel saat ini
   - Admin mengubah konten yang diperlukan
   - Admin menekan tombol "Update"
   - Sistem memvalidasi dan menyimpan perubahan
6. **Jika Hapus Artikel:**
   - Admin mengklik tombol hapus pada artikel tertentu
   - Sistem menampilkan konfirmasi penghapusan
   - Admin mengkonfirmasi penghapusan
   - Sistem menghapus artikel dari database
7. Use case berhasil

**Alternative Flow:**

- 4d/5d. Judul artikel kosong
  - Sistem menampilkan pesan "Judul artikel harus diisi"
  - Kembali ke form input
- 4e. Gambar tidak sesuai format atau terlalu besar
  - Sistem menampilkan pesan error tentang format/ukuran gambar
  - Kembali ke form input

**Postcondition:**

- Konten edukasi berhasil dikelola
- Artikel dapat diakses oleh pengguna masyarakat
- Daftar artikel terupdate

---

### UC-018: Unggah Dokumen Pendukung (Kurir)

**Aktor Utama:** Kurir

**Precondition:**

- Kurir sudah registrasi tapi belum terverifikasi
- Kurir memiliki dokumen KTP dan SIM dalam format digital

**Main Flow:**

1. Kurir mengakses halaman "Unggah Dokumen"
2. Sistem menampilkan form unggah dokumen dengan field:
   - KTP (wajib)
   - SIM (wajib)
3. Kurir mengklik tombol "Pilih File" untuk KTP
4. Sistem membuka dialog pemilihan file
5. Kurir memilih file KTP dari perangkat
6. Sistem memvalidasi format dan ukuran file
7. Kurir mengklik tombol "Pilih File" untuk SIM
8. Kurir memilih file SIM dari perangkat
9. Sistem memvalidasi format dan ukuran file SIM
10. Kurir menekan tombol "Unggah Dokumen"
11. Sistem mengunggah file ke server
12. Sistem menyimpan informasi dokumen ke database
13. Sistem mengubah status kurir menjadi "Menunggu Verifikasi"
14. Sistem menampilkan pesan konfirmasi berhasil
15. Use case berhasil

**Alternative Flow:**

- 6a/9a. Format file tidak didukung
  - Sistem menampilkan pesan "Format file harus JPG, PNG, atau PDF"
  - Kembali ke pemilihan file
- 6b/9b. Ukuran file terlalu besar
  - Sistem menampilkan pesan "Ukuran file maksimal 5MB"
  - Kembali ke pemilihan file
- 11a. Gagal mengunggah file
  - 11a1. Sistem menampilkan pesan error
  - 11a2. Menyediakan opsi untuk coba lagi

**Postcondition:**

- Dokumen kurir tersimpan di server
- Status kurir berubah menjadi "Menunggu Verifikasi"
- Admin dapat melakukan verifikasi dokumen

---

### UC-019: Verifikasi Akun Kurir (Admin)

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem
- Ada kurir yang mengajukan verifikasi

**Main Flow:**

1. Admin mengakses menu "Verifikasi" > "Akun Kurir"
2. Sistem menampilkan daftar kurir yang menunggu verifikasi
3. Admin memilih salah satu kurir untuk diverifikasi
4. Sistem menampilkan detail kurir dan dokumen yang diunggah
5. Admin memeriksa dokumen KTP dan SIM
6. Admin dapat mengklik dokumen untuk melihat dalam ukuran penuh
7. **Jika dokumen valid:**
   - Admin mengklik tombol "Setujui Verifikasi"
   - Sistem mengubah status kurir menjadi "Terverifikasi"
   - Sistem mengirim notifikasi persetujuan ke kurir
8. **Jika dokumen tidak valid:**
   - Admin mengklik tombol "Tolak Verifikasi"
   - Admin mengisi alasan penolakan
   - Sistem mengubah status kurir menjadi "Ditolak"
   - Sistem mengirim notifikasi penolakan dengan alasan ke kurir
9. Use case berhasil

**Alternative Flow:**

- 2a. Tidak ada kurir yang menunggu verifikasi
  - 2a1. Sistem menampilkan pesan "Tidak ada pengajuan verifikasi"
- 8c. Admin tidak mengisi alasan penolakan
  - 8c1. Sistem menampilkan pesan "Alasan penolakan harus diisi"
  - 8c2. Kembali ke form input alasan

**Postcondition:**

- Status kurir berubah sesuai keputusan admin
- Kurir mendapat notifikasi hasil verifikasi
- Jika disetujui, kurir dapat mulai mengambil permintaan penjemputan

---

### UC-020: Lihat Dashboard Masyarakat

**Aktor Utama:** Masyarakat

**Precondition:**

- Masyarakat sudah login ke aplikasi

**Main Flow:**

1. Masyarakat mengakses dashboard utama
2. Sistem menampilkan sapaan personal dengan nama masyarakat
3. Sistem menampilkan total poin yang dimiliki
4. Sistem menampilkan ringkasan riwayat transaksi terakhir (5 terakhir)
5. Sistem menampilkan menu navigasi utama:
   - Buat Permintaan Penjemputan
   - Lacak Penjemputan
   - Riwayat Transaksi
   - Edukasi
   - Profil
6. Sistem menampilkan notifikasi jika ada update status penjemputan
7. Sistem menampilkan artikel edukasi terbaru (3 artikel)
8. Use case berhasil

**Alternative Flow:**

- 4a. Belum ada riwayat transaksi
  - 4a1. Sistem menampilkan pesan "Belum ada transaksi"
  - 4a2. Sistem menyediakan shortcut ke pembuatan permintaan
- 6a. Tidak ada notifikasi
  - 6a1. Sistem tidak menampilkan section notifikasi

**Postcondition:**

- Masyarakat dapat melihat overview akun dan aktivitas
- Masyarakat dapat mengakses semua fitur utama

---

### UC-021: Lihat Dashboard Kurir

**Aktor Utama:** Kurir

**Precondition:**

- Kurir sudah login dan terverifikasi

**Main Flow:**

1. Kurir mengakses dashboard kurir
2. Sistem menampilkan sapaan personal dengan nama kurir
3. Sistem menampilkan statistik kurir:
   - Total penjemputan yang diselesaikan
   - Penjemputan bulan ini
   - Rating kurir
4. Sistem menampilkan daftar permintaan penjemputan yang tersedia
5. Sistem menampilkan permintaan yang sedang dikerjakan (jika ada)
6. Sistem menampilkan menu navigasi:
   - Daftar Permintaan
   - Permintaan Aktif
   - Riwayat Penjemputan
   - Profil
7. Use case berhasil

**Alternative Flow:**

- 4a. Tidak ada permintaan tersedia
  - 4a1. Sistem menampilkan pesan "Belum ada permintaan tersedia"
  - 4a2. Sistem menyediakan notifikasi untuk permintaan baru
- 5a. Tidak ada permintaan aktif
  - 5a1. Sistem tidak menampilkan section permintaan aktif

**Postcondition:**

- Kurir dapat melihat overview kinerja dan permintaan
- Kurir dapat mengakses semua fitur kurir

---

### UC-022: Lihat Dashboard Admin

**Aktor Utama:** Admin

**Precondition:**

- Admin sudah login ke sistem

**Main Flow:**

1. Admin mengakses dashboard admin
2. Sistem menampilkan statistik pengguna:
   - Total pengguna terdaftar
   - Pengguna baru bulan ini
   - Total kurir aktif
   - Kurir menunggu verifikasi
3. Sistem menampilkan statistik transaksi:
   - Total transaksi
   - Transaksi bulan ini
   - Total poin yang terdistribusi
   - Transaksi per daerah
4. Sistem menampilkan grafik analitik:
   - Grafik transaksi per bulan
   - Grafik jenis sampah paling populer
   - Grafik aktivitas per daerah
5. Sistem menampilkan notifikasi admin:
   - Kurir menunggu verifikasi
   - Laporan masalah dari pengguna
6. Sistem menampilkan menu navigasi admin lengkap
7. Use case berhasil

**Alternative Flow:**

- 2a/3a. Data statistik masih kosong
  - Sistem menampilkan nilai 0 atau "Belum ada data"
- 5a. Tidak ada notifikasi
  - 5a1. Sistem menampilkan "Tidak ada notifikasi baru"

**Postcondition:**

- Admin dapat melihat overview sistem secara menyeluruh
- Admin dapat mengakses semua fitur administrasi

---

### UC-023: Lihat Halaman Utama (Public)

**Aktor Utama:** Pengunjung (belum login)

**Precondition:**

- Pengunjung mengakses aplikasi web

**Main Flow:**

1. Pengunjung mengakses URL aplikasi
2. Sistem menampilkan halaman utama dengan:
   - Hero section dengan judul dan deskripsi aplikasi
   - Informasi tentang cara kerja aplikasi
   - Kategori sampah yang diterima
   - Manfaat menggunakan aplikasi
   - Artikel edukasi terbaru
3. Sistem menyediakan navigasi untuk:
   - Login
   - Registrasi
   - Edukasi
   - Tentang Aplikasi
4. Pengunjung dapat mengklik artikel edukasi untuk membaca
5. Pengunjung dapat mengklik kategori untuk melihat detail
6. Use case berhasil

**Alternative Flow:**

- 4a. Pengunjung mengklik "Login"
  - 4a1. Sistem mengarahkan ke halaman login
- 4b. Pengunjung mengklik "Registrasi"
  - 4b1. Sistem mengarahkan ke halaman registrasi

**Postcondition:**

- Pengunjung mendapat informasi tentang aplikasi
- Pengunjung dapat memutuskan untuk mendaftar atau login

---

### UC-024: Lihat Halaman Edukasi

**Aktor Utama:** Pengunjung/Pengguna

**Precondition:**

- Ada konten edukasi dalam sistem

**Main Flow:**

1. Pengguna mengakses menu "Edukasi"
2. Sistem menampilkan daftar artikel edukasi
3. Sistem menyediakan fitur pencarian artikel
4. Sistem menyediakan filter kategori artikel (jika ada)
5. Pengguna dapat mencari atau memfilter artikel
6. Pengguna mengklik artikel yang ingin dibaca
7. Sistem menampilkan detail artikel lengkap
8. Sistem menampilkan artikel terkait di bagian bawah
9. Use case berhasil

**Alternative Flow:**

- 2a. Belum ada artikel edukasi
  - 2a1. Sistem menampilkan pesan "Konten sedang dalam pengembangan"
- 5a. Hasil pencarian kosong
  - 5a1. Sistem menampilkan pesan "Artikel tidak ditemukan"
  - 5a2. Sistem menyarankan kata kunci alternatif

**Postcondition:**

- Pengguna mendapat informasi edukasi tentang pengelolaan sampah
- Pengguna lebih memahami pentingnya daur ulang

---

### UC-025: Lihat Halaman Kategori Sampah

**Aktor Utama:** Pengunjung/Pengguna

**Precondition:**

- Ada data kategori sampah dalam sistem

**Main Flow:**

1. Pengguna mengakses halaman "Kategori Sampah"
2. Sistem menampilkan daftar kategori sampah yang diterima
3. Sistem menampilkan informasi untuk setiap kategori:
   - Nama kategori
   - Deskripsi
   - Contoh jenis sampah
   - Poin yang didapat per kilogram
4. Pengguna dapat mengklik kategori tertentu untuk detail
5. Sistem menampilkan detail kategori dan daftar jenis sampah di dalamnya
6. Use case berhasil

**Alternative Flow:**

- 2a. Belum ada kategori sampah
  - 2a1. Sistem menampilkan pesan "Data kategori sedang dalam pengembangan"

**Postcondition:**

- Pengguna memahami jenis sampah yang diterima
- Pengguna mengetahui estimasi poin yang bisa didapat

---

### UC-026: Logout Pengguna

**Aktor Utama:** Pengguna (Masyarakat/Kurir/Admin)

**Precondition:**

- Pengguna sudah login ke aplikasi

**Main Flow:**

1. Pengguna mengklik tombol "Logout" di menu
2. Sistem menampilkan konfirmasi logout
3. Pengguna mengkonfirmasi logout
4. Sistem menghapus session/token pengguna
5. Sistem menghapus data "Ingat Saya" dari localStorage (jika ada)
6. Sistem mengarahkan pengguna ke halaman utama
7. Use case berhasil

**Alternative Flow:**

- 3a. Pengguna membatalkan logout
  - 3a1. Sistem kembali ke halaman sebelumnya
  - 3a2. Session tetap aktif

**Postcondition:**

- Session pengguna dihapus
- Pengguna diarahkan ke halaman publik
- Data login otomatis dihapus

---

## Kesimpulan

Dokumentasi ini menyediakan panduan lengkap untuk pengembangan aplikasi **EwasteHub** dengan arsitektur berbasis kelas yang terstruktur. Setiap use case telah dirancang untuk mencakup semua skenario yang mungkin terjadi dalam aplikasi pengelolaan sampah elektronik.

### Rekomendasi Implementasi:

1. **Mulai dengan Authentication Flow** (UC-001 s/d UC-006)
2. **Implementasi Dashboard** untuk setiap role (UC-020 s/d UC-022)
3. **Fitur Core Business** - Penjemputan sampah (UC-007 s/d UC-010)
4. **Admin Features** - Data master (UC-011 s/d UC-017)
5. **Supporting Features** - Edukasi dan halaman publik (UC-023 s/d UC-026)

### Struktur Kelas yang Direkomendasikan:

- **24 Boundary Classes** untuk UI components
- **11 Controller Classes** untuk business logic
- **12 Entity Classes** untuk data modeling

Dokumentasi ini dapat dijadikan acuan dalam pengembangan aplikasi dan memastikan konsistensi implementasi di seluruh tim development.
