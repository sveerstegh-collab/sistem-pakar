import { Link, useLocation } from 'react-router-dom';
import { Monitor, Home, ClipboardList, History, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import PixelBlast from '../PixelBlast';

export default function Layout({ children }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/konsultasi', label: 'Konsultasi', icon: ClipboardList },
    { to: '/riwayat', label: 'Riwayat', icon: History },
  ];

  const pixelBlastColor = theme === 'dark' ? '#B497CF' : '#C8A2C8';
  const pixelBlastOpacity = theme === 'dark' ? 0.9 : 0.5;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* PixelBlast background - visible in both themes */}
      <div className="fixed inset-0 z-0" style={{ opacity: pixelBlastOpacity }}>
        <PixelBlast
          variant="square"
          pixelSize={4}
          color={pixelBlastColor}
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Gradient overlay - theme aware */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(7,7,13,0.55) 0%, rgba(7,7,13,0.35) 40%, rgba(7,7,13,0.55) 100%)'
            : 'linear-gradient(180deg, rgba(248,247,252,0.3) 0%, rgba(248,247,252,0.1) 40%, rgba(248,247,252,0.3) 100%)',
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b transition-colors duration-300" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="max-w-5xl mx-auto px-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors">
              <Monitor className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
            </div>
            <span className="font-bold tracking-tight hidden sm:inline" style={{ color: 'var(--text-primary)', fontSize: '17px' }}>
              SistemPakar<span className="text-purple-400">OS</span>
            </span>
            <span className="font-bold tracking-tight sm:hidden" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>
              SP<span className="text-purple-400">OS</span>
            </span>
          </Link>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map(item => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? 'bg-purple-500/20 text-purple-300 shadow-sm shadow-purple-500/10'
                      : ''
                  }`}
                  style={{
                    color: active ? undefined : 'var(--text-tertiary)',
                    fontSize: 'clamp(12px, 2vw, 15px)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--text-tertiary)';
                  }}
                  title={item.label}
                >
                  <item.icon className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-lg ml-1 sm:ml-2 transition-all duration-200 glass-light hover:bg-white/[0.08]"
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 sm:w-5 h-4 sm:h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-6 sm:py-8 text-center transition-colors duration-300" style={{ borderColor: 'var(--glass-border)' }}>
        <p style={{ color: 'var(--text-quaternary)', fontSize: 'clamp(12px, 2vw, 14px)' }}>
          Sistem Pakar Rekomendasi OS &middot; Berbasis Forward Chaining
        </p>
      </footer>
    </div>
  );
}
