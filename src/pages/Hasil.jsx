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

function ConfidenceRing({ value, size = 120 }) {
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
        <span className="font-black leading-none" style={{ fontSize: '32px', color: 'var(--accent)' }}>{value}</span>
        <span className="font-medium mt-0.5" style={{ fontSize: '11px', color: 'var(--text-quaternary)' }}>PERSEN</span>
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
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-5">
          <Award className="w-8 h-8 text-white/20" />
        </div>
        <p className="font-medium mb-1" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Belum ada hasil</p>
        <p className="mb-8" style={{ color: 'var(--text-tertiary)', fontSize: '15px' }}>Mulai konsultasi untuk mendapatkan rekomendasi OS.</p>
        <Link
          to="/konsultasi"
          className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition-colors"
          style={{ fontSize: '15px' }}
        >
          Mulai Konsultasi <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const top = record.results[0];
  const alternatives = record.results.slice(1, 4);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-light text-yellow-300/80 font-medium tracking-wide" style={{ fontSize: '13px' }}>
            <Trophy className="w-3 h-3" /> Hasil Rekomendasi
          </div>
        </div>

        {/* Main result card */}
        <div className="glass-accent rounded-2xl p-8 sm:p-10 mb-5 animate-scale-in animate-pulse-glow">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ConfidenceRing value={top.confidence} />
            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="uppercase tracking-widest mb-1 font-semibold" style={{ color: 'var(--text-quaternary)', fontSize: '12px' }}>
                Rekomendasi Utama
              </p>
              <h1 className="font-extrabold tracking-tight mb-2" style={{ color: 'var(--text-primary)', fontSize: '32px' }}>
                {top.os.name}
              </h1>
              <p className="leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '15px' }}>{top.os.description}</p>
              <a
                href={top.os.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                style={{ fontSize: '13px' }}
              >
                Download <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <div className="rounded-xl p-5 bg-emerald-500/[0.04] border border-emerald-500/10">
              <div className="flex items-center gap-2.5 mb-3">
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <h4 className="font-semibold" style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Kelebihan</h4>
              </div>
              <div className="space-y-2">
                {top.os.kelebihan.map((k, i) => (
                  <p key={i} className="flex items-start gap-1.5 leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
                    <span className="text-emerald-400/60 mt-0.5 shrink-0">+</span> {k}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-5 bg-red-500/[0.04] border border-red-500/10">
              <div className="flex items-center gap-2.5 mb-3">
                <ThumbsDown className="w-4 h-4 text-red-400" />
                <h4 className="font-semibold" style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Kekurangan</h4>
              </div>
              <div className="space-y-2">
                {top.os.kekurangan.map((k, i) => (
                  <p key={i} className="flex items-start gap-1.5 leading-relaxed" style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
                    <span className="text-red-400/60 mt-0.5 shrink-0">-</span> {k}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="mt-7 pt-7 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)', fontSize: '16px' }}>Alasan Rekomendasi</h3>
            <ul className="space-y-2">
              {top.alasan.map((alasan, i) => (
                <li key={i} className="flex items-start gap-2.5" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <span className="text-purple-400 mt-0.5 font-bold shrink-0 text-sm">✓</span>
                  <span>{alasan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-5 animate-fade-up delay-200">
            <button
              onClick={() => setShowAlts(!showAlts)}
              className="w-full flex items-center justify-between px-6 py-3 rounded-xl glass transition-colors"
              style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: '500' }}
            >
              <span>Alternatif Lainnya ({alternatives.length})</span>
              {showAlts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAlts && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {alternatives.map((alt, i) => (
                  <div key={i} className="rounded-xl glass-light p-5 flex items-center gap-5">
                    <div className="shrink-0 w-14 text-center">
                      <span className="font-bold text-purple-300" style={{ fontSize: '17px' }}>{alt.confidence}%</span>
                      <div className="h-0.5 mt-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500/50 rounded-full" style={{ width: `${alt.confidence}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{alt.os.name}</h4>
                      <p className="truncate mt-0.5" style={{ color: 'var(--text-quaternary)', fontSize: '12px' }}>{alt.os.description}</p>
                    </div>
                    <a
                      href={alt.os.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400/60 hover:text-purple-300 shrink-0 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input summary */}
        <div className="glass-light rounded-xl p-6 mb-7 animate-fade-up delay-300">
          <h3 className="uppercase tracking-wider mb-4 font-semibold" style={{ color: 'var(--text-quaternary)', fontSize: '12px' }}>Ringkasan Input</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-3">
            {Object.entries(record.answers).map(([key, val]) => (
              <div key={key}>
                <p style={{ color: 'var(--text-quaternary)', fontSize: '12px' }}>{criteriaLabels[key] || key}</p>
                <p className="font-medium mt-0.5" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{answerLabels[key]?.[val] || val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up delay-400">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass-light transition-colors" 
            style={{ color: 'var(--text-tertiary)', fontSize: '14px', fontWeight: '500' }}
          >
            <Printer className="w-4 h-4" /> Cetak
          </button>
          <button
            onClick={() => navigate('/konsultasi')}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontSize: '14px' }}
          >
            <RefreshCcw className="w-4 h-4" /> Konsultasi Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
