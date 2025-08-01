import {
  Box,
  CircleDollarSign,
  Globe,
  Leaf,
  Recycle, // Ikon baru untuk nilai ekonomi
  ShieldCheck, // Ikon baru untuk kesehatan
  TrendingUp,
  Truck,
  Users,
  UsersRound,
} from 'lucide-react';

// --- Data for ManfaatPage (DIUBAH SESUAI LAPORAN GLOBAL E-WASTE MONITOR 2024) ---

export const manfaatData = [
  {
    id: 1,
    title: 'Memulihkan Nilai Ekonomi', // FOKUS: Urban Mining
    description:
      'Sampah elektronik mengandung logam berharga seperti emas dan tembaga. Daur ulang adalah "tambang perkotaan" yang mengurangi kebutuhan akan penambangan baru.',
    Icon: CircleDollarSign, // Mengganti Recycle dengan ikon nilai
    stats: '$91 Miliar potensi nilai material mentah global pada 2022.',
  },
  {
    id: 2,
    title: 'Melindungi Lingkungan & Iklim', // FOKUS: Polusi & Emisi
    description:
      'Mencegah bahan beracun seperti merkuri meresap ke tanah dan air. Daur ulang material juga menghemat energi dan mengurangi emisi CO2 secara signifikan.',
    Icon: Globe,
    stats:
      'Hanya 22.3% e-waste dunia yang didaur ulang dengan benar pada 2022.',
  },
  {
    id: 3,
    title: 'Menjaga Kesehatan Manusia', // FOKUS: Zat Beracun
    description:
      'Mengelola e-waste secara formal dan aman dapat mencegah paparan zat berbahaya bagi pekerja dan masyarakat sekitar, tidak seperti praktik daur ulang informal.',
    Icon: ShieldCheck, // Mengganti HeartPulse dengan ikon proteksi
    stats: 'E-waste global mengandung 55 ton merkuri yang sangat beracun.',
  },
  {
    id: 4,
    title: 'Mendorong Ekonomi Sirkular', // FOKUS: Penggunaan Kembali Material
    description:
      'Material hasil daur ulang dapat digunakan kembali untuk membuat produk baru, mengurangi ketergantungan pada sumber daya alam primer yang terbatas.',
    Icon: Recycle, // Ikon Recycle lebih cocok di sini
    stats: 'Mengurangi $62 Miliar kerugian nilai material per tahun.',
  },
  {
    id: 5,
    title: 'Menciptakan Lapangan Kerja Hijau', // FOKUS: Pekerjaan Formal
    description:
      'Industri daur ulang e-waste yang formal dan tersertifikasi menciptakan peluang kerja yang aman dan berkelanjutan di sektor teknologi hijau.',
    Icon: Users,
    stats: 'Potensi jutaan pekerjaan di sektor daur ulang formal.',
  },
  {
    id: 6,
    title: 'Menjawab Tantangan Global', // FOKUS: Edukasi & Urgensi
    description:
      'Tingkat pertumbuhan e-waste jauh melampaui tingkat daur ulang. Edukasi diperlukan untuk menutup kesenjangan ini sebelum menjadi masalah yang lebih besar.',
    Icon: TrendingUp, // Ikon untuk menunjukkan tren/tantangan
    stats: 'E-waste global diprediksi mencapai 82 juta ton pada 2030.',
  },
];

// --- Impact Stats (DIUBAH UNTUK BAHASA YANG LEBIH BERDAMPAK) ---

export const impactStats = [
  {
    id: 1,
    label: 'Material Berharga Dipulihkan',
    value: '15,420',
    unit: 'kg',
    Icon: Box,
  },
  {
    id: 2,
    label: 'Emisi CO2 Dihindari',
    value: '2,500',
    unit: 'ton',
    Icon: Leaf,
  },
  {
    id: 3,
    label: 'Kontributor Lingkungan',
    value: '25,000',
    unit: '+',
    Icon: UsersRound,
  },
  {
    id: 4,
    label: 'Mitra Daur Ulang Formal',
    value: '150',
    unit: '+',
    Icon: Truck,
  },
];
