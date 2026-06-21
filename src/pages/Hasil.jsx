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

function ConfidenceRing({ value, size = 100 }) {
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.05)" strokeWidth="5" fill="none" />
        <circle
          cx="50" cy="50" r={r}
          stroke="url(#purple-grad)" strokeWidth="5" fill="none"
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
        <span className="text-2xl font-black text-white leading-none">{value}</span>
        <span className="text-[10px] text-white/40 font-medium mt-0.5">PERSEN</span>
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
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-5">
          <Award className="w-7 h-7 text-white/20" />
        </div>
        <p className="text-white/50 font-medium mb-1 text-[15px]">Belum ada hasil</p>
        <p className="text-white/30 text-sm mb-6">Mulai konsultasi untuk mendapatkan rekomendasi OS.</p>
        <Link
          to="/konsultasi"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition-colors text-sm"
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
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-yellow-300/80 text-xs font-medium tracking-wide">
            <Trophy className="w-3 h-3" /> Hasil Rekomendasi
          </div>
        </div>

        {/* Main result card */}
        <div className="glass-accent rounded-2xl p-6 sm:p-8 mb-5 animate-scale-in animate-pulse-glow">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ConfidenceRing value={top.confidence} />
            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="text-purple-400/70 text-[11px] font-semibold uppercase tracking-widest mb-1">
                Rekomendasi Utama
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
                {top.os.name}
              </h1>
              <p className="text-white/45 text-[13px] leading-relaxed mb-3">{top.os.description}</p>
              <a
                href={top.os.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors"
              >
                Website resmi <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Reasons */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <h3 className="text-white font-semibold text-[13px] mb-3">Mengapa OS ini cocok untuk Anda</h3>
            <div className="space-y-2">
              {top.alasan.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 text-white/60 text-[13px] leading-relaxed">
                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4 bg-emerald-500/[0.04] border border-emerald-500/10">
              <div className="flex items-center gap-2 mb-2.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-emerald-300/80 font-semibold text-xs">Kelebihan</h4>
              </div>
              <div className="space-y-1.5">
                {top.os.kelebihan.map((k, i) => (
                  <p key={i} className="text-white/50 text-[12px] flex items-start gap-1.5 leading-relaxed">
                    <span className="text-emerald-400/60 mt-px shrink-0">+</span> {k}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-red-500/[0.04] border border-red-500/10">
              <div className="flex items-center gap-2 mb-2.5">
                <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                <h4 className="text-red-300/80 font-semibold text-xs">Kekurangan</h4>
              </div>
              <div className="space-y-1.5">
                {top.os.kekurangan.map((k, i) => (
                  <p key={i} className="text-white/50 text-[12px] flex items-start gap-1.5 leading-relaxed">
                    <span className="text-red-400/60 mt-px shrink-0">-</span> {k}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-5 animate-fade-up delay-200">
            <button
              onClick={() => setShowAlts(!showAlts)}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl glass text-white/70 text-[13px] font-medium hover:bg-white/[0.06] transition-colors"
            >
              <span>Alternatif Lainnya ({alternatives.length})</span>
              {showAlts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAlts && (
              <div className="mt-2.5 space-y-2.5 animate-fade-in">
                {alternatives.map((alt, i) => (
                  <div key={i} className="rounded-xl glass-light p-4 flex items-center gap-4">
                    <div className="shrink-0 w-12 text-center">
                      <span className="text-lg font-bold text-purple-300">{alt.confidence}%</span>
                      <div className="h-0.5 mt-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500/50 rounded-full" style={{ width: `${alt.confidence}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-[13px]">{alt.os.name}</h4>
                      <p className="text-white/35 text-[11px] truncate mt-0.5">{alt.os.description}</p>
                    </div>
                    <a
                      href={alt.os.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400/60 hover:text-purple-300 shrink-0 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input summary */}
        <div className="glass-light rounded-xl p-5 mb-6 animate-fade-up delay-300">
          <h3 className="text-white/70 font-semibold text-xs uppercase tracking-wider mb-3">Ringkasan Input</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5">
            {Object.entries(record.answers).map(([key, val]) => (
              <div key={key}>
                <p className="text-white/25 text-[11px]">{criteriaLabels[key] || key}</p>
                <p className="text-white/70 font-medium text-[13px]">{answerLabels[key]?.[val] || val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up delay-400">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl glass-light text-white/50 text-[13px] font-medium hover:text-white/70 hover:bg-white/[0.06] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Cetak
          </button>
          <button
            onClick={() => navigate('/konsultasi')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Konsultasi Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
