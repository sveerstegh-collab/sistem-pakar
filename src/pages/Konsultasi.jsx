import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import questions from '../data/questions';
import { runInference } from '../engine/inferensi';

export default function Konsultasi() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const total = questions.length;
  const current = questions[step];
  const progress = ((step + 1) / total) * 100;
  const selected = answers[current.id];

  const select = useCallback((value) => {
    setAnswers(prev => ({ ...prev, [current.id]: value }));
  }, [current.id]);

  const animateTransition = (cb) => {
    setTransitioning(true);
    setTimeout(() => {
      cb();
      setTransitioning(false);
    }, 200);
  };

  const next = useCallback(() => {
    if (!selected) return;
    if (step < total - 1) {
      animateTransition(() => setStep(s => s + 1));
    } else {
      const results = runInference(answers);
      const record = {
        id: Date.now(),
        date: new Date().toISOString(),
        answers: { ...answers },
        results,
      };
      const history = JSON.parse(localStorage.getItem('konsultasi_history') || '[]');
      history.unshift(record);
      localStorage.setItem('konsultasi_history', JSON.stringify(history));
      navigate('/hasil', { state: record });
    }
  }, [step, total, selected, answers, navigate]);

  const prev = useCallback(() => {
    if (step > 0) animateTransition(() => setStep(s => s - 1));
  }, [step]);

  const Icon = current.icon;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center px-5 py-14 sm:py-20">
      <div className="w-full max-w-xl">
        {/* Progress header */}
        <div className="mb-14 animate-fade-in">
          <div className="flex items-center justify-between mb-4 font-medium" style={{ color: 'var(--text-quaternary)', fontSize: '19px' }}>
            <span>Langkah {step + 1} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex gap-1.5 mt-5 justify-center">
            {questions.map((q, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    done
                      ? 'w-6 bg-purple-500'
                      : active
                      ? 'w-7 bg-purple-400'
                      : 'w-2.5 bg-white/10'
                  }`}
                  style={{ height: '2.5px' }}
                />
              );
            })}
          </div>
        </div>

        {/* Question card */}
        <div
          className={`glass rounded-2xl p-10 sm:p-14 transition-all duration-200 ${
            transitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Question header */}
          <div className="flex items-start gap-4 mb-2">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 mt-1">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold leading-snug" style={{ color: 'var(--text-primary)', fontSize: '26px' }}>{current.title}</h2>
              <p className="mt-2" style={{ color: 'var(--text-tertiary)', fontSize: '19px' }}>{current.subtitle}</p>
            </div>
          </div>

          {/* Options */}
          <div className="grid gap-4 mt-10">
            {current.options.map(opt => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  className={`w-full text-left px-6 py-5 rounded-xl transition-all duration-200 group ${
                    isSelected
                      ? 'glass-accent shadow-lg shadow-purple-500/[0.08]'
                      : 'glass-light hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio indicator */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500'
                        : 'border-white/15 group-hover:border-white/25'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <span className={`font-semibold block ${isSelected ? 'text-purple-200' : 'text-white/80'}`} style={{ fontSize: '20px' }}>
                        {opt.label}
                      </span>
                      <span className="text-white/35" style={{ fontSize: '16px' }}>{opt.desc}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-light text-white/50 font-medium hover:text-white/70 hover:bg-white/[0.06] disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
            style={{ fontSize: '18px' }}
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <button
            onClick={next}
            disabled={!selected}
            className={`flex items-center gap-3 px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              selected
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/[0.06] text-white/20 cursor-not-allowed'
            }`}
            style={{ fontSize: '18px' }}
          >
            {step === total - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
