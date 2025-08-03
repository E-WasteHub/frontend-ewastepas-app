import {
  Laptop,
  Lightbulb,
  PlugZap,
  Refrigerator,
  Tv,
  WashingMachine,
} from 'lucide-react';

export const kategoriData = [
  // Kategori ini baru ditambahkan sesuai standar ITU
  {
    id: 1,
    name: 'Peralatan Penukar Suhu',
    Icon: Refrigerator,
    description:
      'Peralatan yang berfungsi untuk pendinginan atau pemanasan, seperti kulkas, AC, dan freezer.',
    items: ['Kulkas', 'Freezer', 'Air Conditioner (AC)'],
    points: 500,
    category: 'Besar',
  },
  {
    id: 2,
    name: 'Layar & Monitor',
    Icon: Tv,
    description:
      'Semua jenis layar termasuk TV, monitor komputer, dan laptop. Luas permukaan lebih dari 100 cm².',
    items: ['TV LED/LCD', 'TV Tabung', 'Monitor PC', 'Layar Laptop'],
    points: 300,
    category: 'Besar',
  },
  {
    id: 3,
    name: 'Lampu',
    Icon: Lightbulb,
    description:
      'Berbagai jenis lampu seperti lampu neon (LFL), LED, bohlam, dan lampu lainnya.',
    items: ['Lampu Neon', 'Bohlam LED', 'Lampu Meja Belajar'],
    points: 75,
    category: 'Kecil',
  },
  {
    id: 4,
    name: 'Peralatan Besar',
    Icon: WashingMachine,
    description:
      'Peralatan dengan dimensi eksternal lebih dari 50 cm, seperti mesin cuci, oven, atau mesin fotokopi besar.',
    items: [
      'Mesin Cuci',
      'Microwave Besar',
      'Mesin Pencuci Piring',
      'Kompor Listrik',
    ],
    points: 450,
    category: 'Besar',
  },
  {
    id: 5,
    name: 'Peralatan Kecil',
    Icon: PlugZap,
    description:
      'Peralatan dengan dimensi eksternal kurang dari 50 cm, seperti vacuum cleaner, blender, mainan elektronik, dan alat-alat kecil lainnya.',
    items: [
      'Blender',
      'Setrika',
      'Mainan RC',
      'Remote Control',
      'Baterai Bekas',
      'Power Bank',
    ],
    points: 100,
    category: 'Kecil',
  },
  {
    id: 6,
    name: 'Peralatan IT & Telekomunikasi Kecil',
    Icon: Laptop,
    description:
      'Peralatan IT dengan dimensi eksternal kurang dari 50 cm, seperti ponsel, laptop, printer, router, dan GPS.',
    items: [
      'Smartphone',
      'Laptop',
      'PC Desktop',
      'Keyboard',
      'Mouse',
      'Printer',
      'Konsol Game',
    ],
    points: 250,
    category: 'Sedang',
  },
];
