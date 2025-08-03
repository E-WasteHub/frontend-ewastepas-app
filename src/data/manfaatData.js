import {
  Box,
  CircleDollarSign,
  Globe,
  Leaf,
  Recycle,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  UsersRound,
} from 'lucide-react';

export const manfaatData = [
  {
    id: 1,
    title: 'Memulihkan Nilai Ekonomi',
    description:
      'Sampah elektronik mengandung logam berharga seperti emas dan tembaga. Daur ulang adalah "tambang perkotaan" yang mengurangi kebutuhan akan penambangan baru.',
    Icon: CircleDollarSign,
    stats: '$91 Miliar potensi nilai material mentah global pada 2022.',
  },
  {
    id: 2,
    title: 'Melindungi Lingkungan & Iklim',
    description:
      'Mencegah bahan beracun seperti merkuri meresap ke tanah dan air. Daur ulang material juga menghemat energi dan mengurangi emisi CO2 secara signifikan.',
    Icon: Globe,
    stats:
      'Hanya 22.3% sampah elektronik dunia yang didaur ulang dengan benar pada 2022.',
  },
  {
    id: 3,
    title: 'Menjaga Kesehatan Manusia',
    description:
      'Mengelola sampah elektronik secara formal dan aman dapat mencegah paparan zat berbahaya bagi pekerja dan masyarakat sekitar, tidak seperti praktik daur ulang informal.',
    Icon: ShieldCheck,
    stats:
      'sampah elektronik global mengandung 55 ton merkuri yang sangat beracun.',
  },
  {
    id: 4,
    title: 'Mendorong Ekonomi Sirkular',
    description:
      'Material hasil daur ulang dapat digunakan kembali untuk membuat produk baru, mengurangi ketergantungan pada sumber daya alam primer yang terbatas.',
    Icon: Recycle,
    stats: 'Mengurangi $62 Miliar kerugian nilai material per tahun.',
  },
  {
    id: 5,
    title: 'Menciptakan Lapangan Kerja Hijau',
    description:
      'Industri daur ulang sampah elektronik yang formal dan tersertifikasi menciptakan peluang kerja yang aman dan berkelanjutan di sektor teknologi hijau.',
    Icon: Users,
    stats: 'Potensi jutaan pekerjaan di sektor daur ulang formal.',
  },
  {
    id: 6,
    title: 'Menjawab Tantangan Global',
    description:
      'Tingkat pertumbuhan sampah elektronik jauh melampaui tingkat daur ulang. Edukasi diperlukan untuk menutup kesenjangan ini sebelum menjadi masalah yang lebih besar.',
    Icon: TrendingUp,
    stats:
      'Sampah elektronik global diprediksi mencapai 82 juta ton pada 2030.',
  },
];

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
