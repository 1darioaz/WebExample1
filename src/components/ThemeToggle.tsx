import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
  className?: string;
  variant?: 'pill' | 'compact' | 'labeled';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  onToggle,
  className = '',
  variant = 'pill'
}) => {
  if (variant === 'labeled') {
    return (
      <button
        onClick={onToggle}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className={`flex items-center justify-between w-full p-2.5 rounded-xl border transition-all cursor-pointer ${
          darkMode
            ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80'
            : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
        } ${className}`}
      >
        <div className="flex items-center space-x-2.5">
          {darkMode ? (
            <div className="p-1.5 bg-amber-400/20 text-amber-300 rounded-lg">
              <Sun className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
              <Moon className="w-4 h-4" />
            </div>
          )}
          <div className="text-left">
            <div className="text-xs font-bold leading-none">
              {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {darkMode ? 'Activo' : 'Predeterminado'}
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div
          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
            darkMode ? 'bg-[#2B75F6]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              darkMode ? 'translate-x-5' : 'translate-x-0'
            }`}
          >
            {darkMode ? (
              <Moon className="w-3 h-3 text-[#2B75F6]" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </div>
        </div>
      </button>
    );
  }

  // Pill variant (standard for Top Header)
  return (
    <button
      onClick={onToggle}
      id="btn-theme-toggle"
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={darkMode ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
      className={`group relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
        darkMode
          ? 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
          : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {darkMode ? (
          <Moon className="w-4 h-4 text-indigo-400 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0" />
        )}
      </div>

      <span className="text-[11px] font-bold hidden sm:inline-block">
        {darkMode ? 'Oscuro' : 'Claro'}
      </span>

      {/* Mini switch track */}
      <div
        className={`w-7 h-4 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
          darkMode ? 'bg-[#2B75F6]' : 'bg-slate-300'
        }`}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-xs transform transition-transform duration-300 ${
            darkMode ? 'translate-x-3' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
};
