// DIUBAH: Menambahkan lebih banyak ikon untuk topik dasar yang baru
import {
  Biohazard,
  BookCheck,
  Cpu,
  Gem,
  Globe,
  PieChart,
  Plug,
  Scale, // -> Untuk 'Bahaya'
  ShoppingCart,
  Wrench,
} from 'lucide-react';

export const educationTopics = [
  // --- TOPIK DASAR (BARU DITAMBAHKAN) ---
  {
    id: 'apa-itu-sampah-elektronik',
    title: 'Mengenal Sampah Elektronik (E-Waste)',
    description:
      'Definisi dasar sampah elektronik, dari ponsel lama dan laptop rusak hingga kabel dan baterai. Kenali barang di sekitar Anda yang termasuk e-waste.',
    Icon: Plug,
    category: 'Pengenalan Dasar',
  },
  {
    id: 'mengapa-ewaste-berbahaya',
    title: 'Mengapa E-Waste Sangat Berbahaya?',
    description:
      'Membahas kandungan zat beracun seperti timbal, merkuri, dan kadmium di dalamnya, serta dampaknya yang merusak kesehatan manusia dan lingkungan.',
    Icon: Biohazard,
    category: 'Pengenalan Dasar',
  },
  {
    id: 'sumber-utama-ewaste',
    title: 'Dari Mana Semua E-Waste Ini Berasal?',
    description:
      'Menelusuri sumber utama e-waste, mulai dari siklus hidup produk yang pendek hingga kurangnya pilihan perbaikan dan budaya konsumerisme.',
    Icon: ShoppingCart,
    category: 'Pengenalan Dasar',
  },

  // --- TOPIK LANJUTAN (DISESUAIKAN & DIPERTAHANKAN) ---
  {
    id: 'fakta-krisis-global',
    title: 'Fakta Mengejutkan: Skala Krisis E-Waste Global',
    description:
      'Setelah memahami dasarnya, lihat data dari laporan global: 62 juta ton per tahun dan pertumbuhan yang jauh lebih cepat dari tingkat daur ulang.',
    Icon: Globe,
    category: 'Fakta & Data',
  },
  {
    id: 'lebih-dari-daur-ulang',
    title: 'Lebih dari Daur Ulang: Reduce, Reuse, Repair',
    description:
      'Daur ulang adalah pilihan terakhir. Pelajari cara mengurangi konsumsi, menggunakan kembali, dan memperbaiki perangkat untuk memperpanjang umurnya.',
    Icon: Wrench,
    category: 'Gaya Hidup Lestari',
  },
  {
    id: 'harta-karun-tersembunyi',
    title: 'Harta Karun Tersembunyi: E-Waste sebagai Tambang Kota',
    description:
      'Mengungkap nilai $91 miliar di dalam sampah elektronik. Pelajari tentang emas, tembaga, dan material berharga lainnya yang bisa dipulihkan.',
    Icon: Gem,
    category: 'Ekonomi Sirkular',
  },
  {
    id: 'panduan-daur-ulang-aman',
    title: 'Panduan Daur Ulang yang Benar & Aman',
    description:
      'Langkah praktis memilah e-waste dan pentingnya menyerahkannya ke fasilitas daur ulang formal untuk menghindari bahaya praktik ilegal.',
    Icon: BookCheck,
    category: 'Panduan Praktis',
  },
  {
    id: 'menuju-ekonomi-sirkular',
    title: 'Menuju Ekonomi Sirkular: Masa Depan Tanpa Sampah',
    description:
      'Menjelajahi konsep di mana produk didesain tahan lama, dapat diperbaiki, dan materialnya dapat digunakan kembali tanpa henti.',
    Icon: Cpu,
    category: 'Ekonomi Sirkular',
  },
  {
    id: 'kesenjangan-daur-ulang',
    title: 'Kesenjangan Daur Ulang: Fakta di Balik Angka 22.3%',
    description:
      'Mengapa lebih dari 77% e-waste dunia tidak terkelola dengan baik? Membedah tantangan global dan peran kebijakan.',
    Icon: PieChart,
    category: 'Fakta & Data',
  },
  {
    id: 'regulasi-di-indonesia',
    title: 'Aturan Main di Indonesia: Regulasi E-Waste',
    description:
      'Mengenal peraturan pemerintah (seperti PP No. 22 Tahun 2021) yang mengatur pengelolaan limbah B3, termasuk e-waste, di tingkat nasional.',
    Icon: Scale,
    category: 'Regulasi Lokal',
  },
];
