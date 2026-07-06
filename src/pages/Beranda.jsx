import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Zap, Users, Sparkles, ChevronDown } from 'lucide-react';

export default function Beranda() {
  const stats = JSON.parse(localStorage.getItem('konsultasi_history') || '[]');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const faqs = [
    {
      question: 'Apa itu Sistem Pakar?',
      answer: 'Sistem pakar adalah program komputer yang dirancang untuk meniru keahlian seorang ahli di bidang tertentu. Dalam hal ini, sistem kami menggunakan pengetahuan dari para ahli teknologi untuk merekomendasikan sistem operasi yang paling sesuai dengan kebutuhan Anda.',
    },
    {
      question: 'Bagaimana cara sistem menentukan OS terbaik?',
      answer: 'Sistem kami menggunakan metode forward chaining, yang bekerja dengan menganalisis jawaban Anda tentang spesifikasi laptop (RAM, storage, processor) dan kebutuhan Anda (jurusan, prioritas, kemampuan). Berdasarkan aturan-aturan yang telah didefinisikan oleh para pakar, sistem memberikan skor kepercayaan untuk setiap OS yang tersedia.',
    },
    {
      question: 'Berapa lama proses konsultasi?',
      answer: 'Proses konsultasi sangat cepat! Anda hanya perlu menjawab 8 pertanyaan sederhana tentang spesifikasi laptop dan kebutuhan Anda. Biasanya hanya membutuhkan waktu 2-3 menit untuk menyelesaikan seluruh proses.',
    },
    {
      question: 'OS apa saja yang bisa direkomendasikan?',
      answer: 'Sistem kami dapat merekomendasikan 10 sistem operasi, termasuk: Windows 11, Windows 10, Ubuntu, Linux Mint, Lubuntu, Xubuntu, ChromeOS Flex, Fedora, Pop!_OS, dan Zorin OS. Setiap OS dipilih berdasarkan kesesuaiannya dengan kriteria dan kebutuhan Anda.',
    },
    {
      question: 'Apakah hasil rekomendasi selalu akurat?',
      answer: 'Rekomendasi kami didasarkan pada pengetahuan dari para ahli dan aturan-aturan yang telah teruji. Namun, keakuratan tergantung pada ketepatan informasi yang Anda berikan. Kami menyarankan untuk memilih opsi yang paling sesuai dengan situasi Anda untuk hasil terbaik.',
    },
    {
      question: 'Dapatkah saya melihat riwayat konsultasi saya?',
      answer: 'Ya! Semua hasil konsultasi Anda disimpan secara otomatis di perangkat Anda. Anda dapat melihatnya di halaman "Riwayat" dan mengakses kembali hasil konsultasi sebelumnya kapan saja. Data disimpan secara lokal di browser Anda.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-5 pt-28 pb-24 sm:pt-40 sm:pb-32 min-h-[85vh]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 rounded-full glass-light text-purple-300 font-medium tracking-wide" style={{ fontSize: '13px' }}>
            <Sparkles className="w-4 h-4" />
            Sistem Pakar Berbasis Web
          </div>
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.15] max-w-2xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Temukan OS Terbaik
          <br />
          <span className="shimmer-text">untuk Laptop Anda</span>
        </h1>

        <p className="animate-fade-up delay-200 mt-8 text-lg sm:text-xl max-w-lg leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
          Jawab 8 pertanyaan sederhana dan biarkan mesin inferensi kami
          merekomendasikan sistem operasi yang paling sesuai.
        </p>

        <div className="animate-fade-up delay-300 mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/konsultasi"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontSize: '16px' }}
          >
            Mulai Konsultasi
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          {stats.length > 0 && (
            <Link
              to="/riwayat"
              className="inline-flex items-center gap-2 px-7 py-4 glass-light rounded-xl font-medium transition-colors"
              style={{ color: 'var(--text-tertiary)', fontSize: '15px' }}
            >
              Lihat Riwayat ({stats.length})
            </Link>
          )}
        </div>

        {stats.length > 0 && (
          <p className="animate-fade-in delay-500 mt-8" style={{ color: 'var(--text-quaternary)', fontSize: '13px' }}>
            {stats.length} konsultasi telah dilakukan
          </p>
        )}
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-28">
        <h2 className="text-center font-semibold uppercase tracking-widest mb-12" style={{ color: 'var(--text-quaternary)', fontSize: '14px' }}>
          Cara Kerja
        </h2>
        <div className="grid w-full max-w-4xl mx-auto sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-7 text-center animate-fade-up" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>
              <span className="text-purple-500/40 font-black" style={{ fontSize: '50px' }}>{s.num}</span>
              <h3 className="font-semibold mt-3 mb-2" style={{ color: 'var(--text-primary)', fontSize: '17px' }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-32">
        <h2 className="text-center font-semibold uppercase tracking-widest mb-12" style={{ color: 'var(--text-quaternary)', fontSize: '14px' }}>
          Fitur Utama
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-light rounded-xl p-6 text-center hover:bg-white/[0.06] transition-colors duration-300 group animate-fade-up"
              style={{ animationDelay: `${i * 0.08 + 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                <f.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{f.title}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-32">
        <h2 className="text-center font-semibold uppercase tracking-widest mb-14" style={{ color: 'var(--text-quaternary)', fontSize: '14px' }}>
          Pertanyaan Umum
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden animate-fade-up transition-all duration-300"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between transition-colors"
                style={{
                  backgroundColor: openFaqIndex === index ? 'var(--glass-accent-bg)' : 'transparent',
                }}
              >
                <h3 className="font-semibold text-left" style={{ color: 'var(--text-primary)', fontSize: '16px' }}>
                  {faq.question}
                </h3>
                <ChevronDown
                  className="w-5 h-5 text-purple-400 transition-transform duration-300 shrink-0"
                  style={{
                    transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {openFaqIndex === index && (
                <div className="px-6 pb-5 animate-fade-in border-t" style={{ borderColor: 'var(--glass-border)' }}>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
