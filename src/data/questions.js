import { MemoryStick, HardDrive, Cpu, Briefcase, GraduationCap, User, Target, Wallet } from 'lucide-react';

const questions = [
  {
    id: 'ram',
    title: 'Berapa kapasitas RAM laptop Anda?',
    subtitle: 'RAM mempengaruhi kemampuan multitasking dan software yang bisa dijalankan.',
    icon: MemoryStick,
    options: [
      { value: '2', label: '2 GB', desc: 'Sangat terbatas' },
      { value: '4', label: '4 GB', desc: 'Cukup untuk tugas ringan' },
      { value: '8', label: '8 GB', desc: 'Standar modern' },
      { value: '16', label: '16 GB', desc: 'Lebih dari cukup' },
    ],
  },
  {
    id: 'storage',
    title: 'Jenis storage laptop Anda?',
    subtitle: 'Tipe penyimpanan sangat mempengaruhi kecepatan booting dan membuka aplikasi.',
    icon: HardDrive,
    options: [
      { value: 'hdd', label: 'HDD', desc: 'Hard Disk Drive (lebih lambat)' },
      { value: 'ssd', label: 'SSD', desc: 'Solid State Drive (lebih cepat)' },
    ],
  },
  {
    id: 'processor',
    title: 'Generasi processor laptop Anda?',
    subtitle: 'Cek model processor di System Information atau stiker di laptop Anda.',
    icon: Cpu,
    options: [
      { value: 'lama', label: 'Lama', desc: 'Sebelum 2015' },
      { value: 'menengah', label: 'Menengah', desc: '2015 - 2020' },
      { value: 'baru', label: 'Baru', desc: 'Setelah 2020' },
    ],
  },
  {
    id: 'kebutuhan',
    title: 'Apa kebutuhan utama Anda?',
    subtitle: 'Pilih aktivitas yang paling sering Anda lakukan di laptop.',
    icon: Briefcase,
    options: [
      { value: 'office', label: 'Office & Browsing', desc: 'Word, PowerPoint, Browser, Zoom' },
      { value: 'coding', label: 'Coding / Programming', desc: 'VS Code, Terminal, IDE' },
      { value: 'desain', label: 'Desain / Editing', desc: 'Adobe Suite, Figma, Video Editing' },
      { value: 'gaming', label: 'Gaming', desc: 'Game PC, Steam' },
    ],
  },
  {
    id: 'jurusan',
    title: 'Apa jurusan Anda?',
    subtitle: 'Jurusan mempengaruhi software yang dibutuhkan.',
    icon: GraduationCap,
    options: [
      { value: 'umum', label: 'Umum', desc: 'Tidak spesifik' },
      { value: 'it', label: 'IT / Informatika', desc: 'Teknik Informatika, Sistem Informasi' },
      { value: 'desain', label: 'Desain / Multimedia', desc: 'DKV, Multimedia, Animasi' },
      { value: 'teknik', label: 'Teknik', desc: 'Teknik Mesin, Elektro, Sipil' },
      { value: 'bisnis', label: 'Bisnis / Manajemen', desc: 'Manajemen, Akuntansi, Ekonomi' },
    ],
  },
  {
    id: 'kemampuan',
    title: 'Seberapa familiar Anda dengan komputer?',
    subtitle: 'Ini membantu kami merekomendasikan OS dengan tingkat kemudahan yang tepat.',
    icon: User,
    options: [
      { value: 'pemula', label: 'Pemula', desc: 'Baru mengenal komputer' },
      { value: 'terbiasa', label: 'Terbiasa Linux', desc: 'Pernah pakai Linux' },
      { value: 'expert', label: 'Expert', desc: 'Mahir menggunakan berbagai OS' },
    ],
  },
  {
    id: 'prioritas',
    title: 'Apa prioritas utama Anda?',
    subtitle: 'Aspek yang paling penting bagi Anda dalam memilih OS.',
    icon: Target,
    options: [
      { value: 'ringan', label: 'Ringan', desc: 'OS yang tidak membebani laptop' },
      { value: 'mudah', label: 'Mudah Dipakai', desc: 'Antarmuka yang intuitif' },
      { value: 'aman', label: 'Aman', desc: 'Keamanan dan privasi' },
      { value: 'kompatibel', label: 'Kompatibel Software', desc: 'Bisa jalankan semua software' },
    ],
  },
  {
    id: 'lisensi',
    title: 'Status lisensi OS Anda?',
    subtitle: 'Status lisensi mempengaruhi rekomendasi OS yang legal dan sesuai.',
    icon: Wallet,
    options: [
      { value: 'gratis', label: 'Gratis', desc: 'Tidak ingin/bisa membeli lisensi' },
      { value: 'berbayar', label: 'Berbayar', desc: 'Bersedia membeli lisensi' },
      { value: 'punya-lisensi', label: 'Sudah Punya Lisensi', desc: 'Laptop sudah ada lisensi Windows' },
    ],
  },
];

export default questions;
