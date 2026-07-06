import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Trash2, Eye, ClipboardList, ArrowRight } from 'lucide-react';

const answerLabels = {
  ram: { '2': '2 GB', '4': '4 GB', '8': '8 GB', '16': '16 GB' },
  storage: { hdd: 'HDD', ssd: 'SSD' },
  processor: { lama: 'Lama', menengah: 'Menengah', baru: 'Baru' },
  kebutuhan: { office: 'Office', coding: 'Coding', desain: 'Desain', gaming: 'Gaming' },
  jurusan: { umum: 'Umum', it: 'IT', desain: 'Desain', teknik: 'Teknik', bisnis: 'Bisnis' },
  kemampuan: { pemula: 'Pemula', terbiasa: 'Terbiasa', expert: 'Expert' },
  prioritas: { ringan: 'Ringan', mudah: 'Mudah', aman: 'Aman', kompatibel: 'Kompatibel' },
  lisensi: { gratis: 'Gratis', berbayar: 'Berbayar', 'punya-lisensi': 'Punya Lisensi' },
};

export default function Riwayat() {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('konsultasi_history') || '[]')
  );
  const navigate = useNavigate();

  const remove = (id) => {
    const updated = history.filter(r => r.id !== id);
    setHistory(updated);
    localStorage.setItem('konsultasi_history', JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem('konsultasi_history');
  };

  const view = (record) => {
    navigate('/hasil', { state: record });
  };

  if (history.length === 0) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-5 text-center">
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-7 animate-scale-in">
          <ClipboardList className="w-10 h-10 text-white/20" />
        </div>
        <p className="font-medium mb-2 animate-fade-up" style={{ color: 'var(--text-secondary)', fontSize: '22px' }}>Belum ada riwayat</p>
        <p className="mb-10 animate-fade-up delay-100" style={{ color: 'var(--text-tertiary)', fontSize: '18px' }}>Hasil konsultasi Anda akan tersimpan di sini.</p>
        <button
          onClick={() => navigate('/konsultasi')}
          className="inline-flex items-center gap-3 px-10 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition-colors animate-fade-up delay-200"
          style={{ fontSize: '18px' }}
        >
          Mulai Konsultasi <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 animate-fade-up">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <History className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Riwayat</h1>
            <span className="px-3.5 py-1 rounded-full bg-white/[0.06]" style={{ color: 'var(--text-quaternary)', fontSize: '15px', fontWeight: '500' }}>
              {history.length}
            </span>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-red-400/50 hover:text-red-400 font-medium transition-colors"
            style={{ fontSize: '16px' }}
          >
            <Trash2 className="w-4 h-4" /> Hapus Semua
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {history.map((record, idx) => {
            const topOS = record.results?.[0];
            const date = new Date(record.date);
            const formatted = date.toLocaleDateString('id-ID', {
              day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            });

            return (
              <div
                key={record.id}
                className="glass rounded-xl p-6 flex items-center gap-6 hover:bg-white/[0.04] transition-colors group animate-fade-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Confidence */}
                <div className="shrink-0 w-16 text-center">
                  <span className="text-purple-300 font-bold" style={{ fontSize: '22px' }}>{topOS?.confidence || 0}%</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)', fontSize: '18px' }}>{topOS?.os?.name || 'N/A'}</h3>
                  <p className="mt-1" style={{ color: 'var(--text-quaternary)', fontSize: '15px' }}>{formatted}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(record.answers || {}).slice(0, 5).map(([key, val]) => (
                      <span key={key} className="px-2.5 py-1 rounded bg-white/[0.05]" style={{ color: 'var(--text-quaternary)', fontSize: '13px', fontWeight: '500' }}>
                        {answerLabels[key]?.[val] || val}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => view(record)}
                    className="p-2.5 rounded-lg hover:bg-purple-500/10 text-white/40 hover:text-purple-300 transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => remove(record.id)}
                    className="p-2.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
