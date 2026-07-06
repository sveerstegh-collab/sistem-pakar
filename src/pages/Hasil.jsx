import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Trophy, ThumbsUp, ThumbsDown, RefreshCcw, ExternalLink, ChevronDown, ChevronUp, Printer, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const answerLabels = {
  ram: { '2': '2 GB', '4': '4 GB', '8': '8 GB', '16': '16 GB' },
  storage: { hdd: 'HDD', ssd: 'SSD' },
  processor: { lama: 'Lama (< 2015)', menengah: 'Menengah (2015-2020)', baru: 'Baru (> 2020)' },
  kebutuhan: { office: 'Office & Browsing', coding: 'Coding', desain: 'Desain', gaming: 'Gaming' },
  jurusan: { umum: 'Umum', it: 'IT/Informatika', desain: 'Desain/Multimedia', teknik: 'Teknik', bisnis: 'Bisnis' },
  kemampuan: { pemula: 'Pemula', terbiasa: 'Terbiasa Linux', expert: 'Expert' },
  prioritas: { ringan: 'Ringan', mudah: 'Mudah Dipakai', aman: 'Aman', kompatibel: 'Kompatibel Software' },
  lisensi: { gratis: 'Gratis', berbayar: 'Berbayar', 'punya-lisensi': 'Sudah Punya Lisensi' },
};

const criteriaLabels = {
  ram: 'RAM', storage: 'Storage', processor: 'Processor', kebutuhan: 'Kebutuhan',
  jurusan: 'Jurusan', kemampuan: 'Kemampuan', prioritas: 'Prioritas', lisensi: 'Lisensi',
};

function ConfidenceRing({ value, size = 140 }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.05)" strokeWidth="7" fill="none" />
        <circle
          cx="50" cy="50" r={r}
          stroke="url(#purple-grad)" strokeWidth="7" fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-ring-draw"
        />
        <defs>
          <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black leading-none" style={{ fontSize: '42px', color: 'var(--accent)' }}>{value}</span>
        <span className="font-medium mt-1" style={{ fontSize: '14px', color: 'var(--text-quaternary)' }}>PERSEN</span>
      </div>
    </div>
  );
}

export default function Hasil() {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state;
  const [showAlts, setShowAlts] = useState(false);

  if (!record || !record.results || record.results.length === 0) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-5 text-center">
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-7">
          <Award className="w-10 h-10 text-white/20" />
        </div>
        <p className="font-medium mb-2" style={{ color: 'var(--text-secondary)', fontSize: '22px' }}>Belum ada hasil</p>
        <p className="mb-10" style={{ color: 'var(--text-tertiary)', fontSize: '18px' }}>Mulai konsultasi untuk mendapatkan rekomendasi OS.</p>
        <Link
          to="/konsultasi"
          className="inline-flex items-center gap-3 px-10 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition-colors"
          style={{ fontSize: '18px' }}
        >
          Mulai Konsultasi <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  const top = record.results[0];
  const alternatives = record.results.slice(1, 4);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-light text-yellow-300/80 font-medium tracking-wide" style={{ fontSize: '16px' }}>
            <Trophy className="w-4 h-4" /> Hasil Rekomendasi
          </div>
        </div>

        {/* Main result card */}
        <div className="glass-accent rounded-2xl p-10 sm:p-14 mb-7 animate-scale-in animate-pulse-glow">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <ConfidenceRing value={top.confidence} />
            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="uppercase tracking-widest mb-2 font-semibold" style={{ color: 'var(--text-quaternary)', fontSize: '15px' }}>
                Rekomendasi Utama
              </p>
              <h1 className="font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)', fontSize: '45px' }}>
                {top.os.name}
              </h1>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--text-tertiary)', fontSize: '19px' }}>{top.os.description}</p>
              <a
                href={top.os.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                style={{ fontSize: '16px' }}
              >
                Download <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 bg-emerald-500/[0.04] border border-emerald-500/10">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsUp className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Kelebihan</h4>
              </div>
              <div className="space-y-2.5">
                {top.os.kelebihan.map((k, i) => (
                  <p key={i} className="flex items-start gap-2 leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>
                    <span className="text-emerald-400/60 mt-1 shrink-0">+</span> {k}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-6 bg-red-500/[0.04] border border-red-500/10">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Kekurangan</h4>
              </div>
              <div className="space-y-2.5">
                {top.os.kekurangan.map((k, i) => (
                  <p key={i} className="flex items-start gap-2 leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>
                    <span className="text-red-400/60 mt-1 shrink-0">-</span> {k}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)', fontSize: '20px' }}>Alasan Rekomendasi</h3>
            <ul className="space-y-3">
              {top.alasan.map((alasan, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text-secondary)', fontSize: '17px' }}>
                  <span className="text-purple-400 mt-1 font-bold shrink-0">✓</span>
                  <span>{alasan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-7 animate-fade-up delay-200">
            <button
              onClick={() => setShowAlts(!showAlts)}
              className="w-full flex items-center justify-between px-7 py-4 rounded-xl glass transition-colors"
              style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: '500' }}
            >
              <span>Alternatif Lainnya ({alternatives.length})</span>
              {showAlts ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {showAlts && (
              <div className="mt-4 space-y-4 animate-fade-in">
                {alternatives.map((alt, i) => (
                  <div key={i} className="rounded-xl glass-light p-6 flex items-center gap-6">
                    <div className="shrink-0 w-16 text-center">
                      <span className="font-bold text-purple-300" style={{ fontSize: '22px' }}>{alt.confidence}%</span>
                      <div className="h-1 mt-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500/50 rounded-full" style={{ width: `${alt.confidence}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)', fontSize: '18px' }}>{alt.os.name}</h4>
                      <p className="truncate mt-1" style={{ color: 'var(--text-quaternary)', fontSize: '15px' }}>{alt.os.description}</p>
                    </div>
                    <a
                      href={alt.os.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400/60 hover:text-purple-300 shrink-0 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input summary */}
        <div className="glass-light rounded-xl p-7 mb-9 animate-fade-up delay-300">
          <h3 className="uppercase tracking-wider mb-5 font-semibold" style={{ color: 'var(--text-quaternary)', fontSize: '15px' }}>Ringkasan Input</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-4">
            {Object.entries(record.answers).map(([key, val]) => (
              <div key={key}>
                <p style={{ color: 'var(--text-quaternary)', fontSize: '15px' }}>{criteriaLabels[key] || key}</p>
                <p className="font-medium mt-1" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>{answerLabels[key]?.[val] || val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-400">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl glass-light transition-colors" 
            style={{ color: 'var(--text-tertiary)', fontSize: '18px', fontWeight: '500' }}
          >
            <Printer className="w-5 h-5" /> Cetak
          </button>
          <button
            onClick={() => navigate('/konsultasi')}
            className="flex items-center gap-3 px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontSize: '18px' }}
          >
            <RefreshCcw className="w-5 h-5" /> Konsultasi Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
