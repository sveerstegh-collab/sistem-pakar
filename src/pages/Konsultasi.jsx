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
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center px-5 py-10 sm:py-14">
      <div className="w-full max-w-xl">
        {/* Progress header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between text-[13px] text-white/40 mb-2.5 font-medium">
            <span>Langkah {step + 1} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex gap-1 mt-3 justify-center">
            {questions.map((q, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    done
                      ? 'w-4 bg-purple-500'
                      : active
                      ? 'w-6 bg-purple-400'
                      : 'w-1.5 bg-white/10'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Question card */}
        <div
          className={`glass rounded-2xl p-6 sm:p-8 transition-all duration-200 ${
            transitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Question header */}
          <div className="flex items-start gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[17px] sm:text-lg font-bold text-white leading-snug">{current.title}</h2>
              <p className="text-white/40 text-[13px] mt-1">{current.subtitle}</p>
            </div>
          </div>

          {/* Options */}
          <div className="grid gap-2.5 mt-6">
            {current.options.map(opt => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isSelected
                      ? 'glass-accent shadow-lg shadow-purple-500/[0.08]'
                      : 'glass-light hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio indicator */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500'
                        : 'border-white/15 group-hover:border-white/25'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <span className={`font-semibold text-[14px] block ${isSelected ? 'text-purple-200' : 'text-white/80'}`}>
                        {opt.label}
                      </span>
                      <span className="text-white/35 text-xs">{opt.desc}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-light text-white/50 text-[13px] font-medium hover:text-white/70 hover:bg-white/[0.06] disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali
          </button>
          <button
            onClick={next}
            disabled={!selected}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 ${
              selected
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/[0.06] text-white/20 cursor-not-allowed'
            }`}
          >
            {step === total - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
