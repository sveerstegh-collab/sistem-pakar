import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Zap, Users, Sparkles } from 'lucide-react';

export default function Beranda() {
  const stats = JSON.parse(localStorage.getItem('konsultasi_history') || '[]');

  const features = [
    {
      icon: Cpu,
      title: 'Analisis Spesifikasi',
      desc: 'RAM, storage, dan processor dianalisis untuk menentukan OS yang optimal.',
    },
    {
      icon: Shield,
      title: 'Rekomendasi Legal',
      desc: 'Hanya OS resmi, gratis, atau berlisensi. Tanpa versi bajakan.',
    },
    {
      icon: Zap,
      title: 'Hasil Instan',
      desc: 'Jawab 8 pertanyaan, dapatkan rekomendasi dengan confidence score.',
    },
    {
      icon: Users,
      title: 'Berbasis Pakar',
      desc: 'Knowledge base dari wawancara langsung dengan teknisi komputer.',
    },
  ];

  const steps = [
    { num: '01', title: 'Isi Spesifikasi', desc: 'Masukkan info laptop Anda: RAM, storage, processor.' },
    { num: '02', title: 'Pilih Kebutuhan', desc: 'Tentukan kebutuhan, jurusan, dan prioritas Anda.' },
    { num: '03', title: 'Dapatkan Hasil', desc: 'Sistem merekomendasikan OS terbaik beserta alasannya.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-5 pt-24 pb-20 sm:pt-32 sm:pb-28 min-h-[85vh]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass-light text-purple-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3 h-3" />
            Sistem Pakar Berbasis Web
          </div>
        </div>

        <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.15] max-w-2xl tracking-tight">
          Temukan OS Terbaik
          <br />
          <span className="shimmer-text">untuk Laptop Anda</span>
        </h1>

        <p className="animate-fade-up delay-200 mt-6 text-[15px] sm:text-base text-white/50 max-w-lg leading-relaxed">
          Jawab 8 pertanyaan sederhana dan biarkan mesin inferensi kami
          merekomendasikan sistem operasi yang paling sesuai.
        </p>

        <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/konsultasi"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Mulai Konsultasi
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          {stats.length > 0 && (
            <Link
              to="/riwayat"
              className="inline-flex items-center gap-2 px-5 py-3 glass-light rounded-xl text-white/60 text-sm font-medium hover:text-white/80 transition-colors"
            >
              Lihat Riwayat ({stats.length})
            </Link>
          )}
        </div>

        {stats.length > 0 && (
          <p className="animate-fade-in delay-500 mt-6 text-white/25 text-xs">
            {stats.length} konsultasi telah dilakukan
          </p>
        )}
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <h2 className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-10">
          Cara Kerja
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>
              <span className="text-purple-500/40 text-4xl font-black">{s.num}</span>
              <h3 className="text-white font-semibold text-[15px] mt-3 mb-1.5">{s.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
        <h2 className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-10">
          Fitur Utama
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-light rounded-xl p-5 hover:bg-white/[0.06] transition-colors duration-300 group animate-fade-up"
              style={{ animationDelay: `${i * 0.08 + 0.1}s` }}
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mb-3 transition-colors">
                <f.icon className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold text-[13px] mb-1">{f.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
