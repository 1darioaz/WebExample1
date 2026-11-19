import React from 'react';
import { Bell } from 'lucide-react';
import { ActiveTab } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  unreadCount: number;
  onOpenExecutive: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  unreadCount,
  darkMode,
  onToggleTheme,
  onOpenDemo
}) => {
  return (
    <header className="glass-header sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Subtle pencil for demo & Logo and Main Portals */}
          <div className="flex items-center space-x-3 sm:space-x-8">
            {/* Imperceptible Grey Pencil Emoji for Demo Control */}
            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                id="btn-header-demo-pencil"
                title="Control Demo"
                aria-label="Abrir panel de control demo"
                className="text-slate-400/40 dark:text-slate-600/50 hover:text-slate-600 dark:hover:text-slate-300 hover:opacity-100 transition-all p-1 -ml-2 rounded text-xs sm:text-sm cursor-pointer select-none"
              >
                ✏️
              </button>
            )}

            <button 
              onClick={() => onNavigate('inicio')}
              className="flex items-center space-x-1.5 focus:outline-hidden group text-left cursor-pointer"
            >
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-xs transition-colors">iplan</span>
              <span className="text-2xl font-black text-[#E60067] transition-transform duration-300 group-hover:scale-125">★</span>
            </button>

            <nav className="hidden md:flex items-center space-x-6 h-16 pt-1">
              <button 
                onClick={() => alert("Portal Hogar: Conectividad residencial IPLAN Liv.")}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Hogar
              </button>
              <div className="h-full flex items-center border-b-2 border-[#2B75F6] text-xs font-black uppercase tracking-wider text-[#2B75F6]">
                Empresas
              </div>
            </nav>
          </div>

          {/* Right section: theme switch, user badge and Notification Bell */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button */}
            <ThemeToggle
              darkMode={darkMode}
              onToggle={onToggleTheme}
              variant="pill"
            />

            <div className="hidden sm:flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
              <span className="font-medium text-slate-500 dark:text-slate-400">mi iplan</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-700/50 backdrop-blur-xs">
                B2B Empresas
              </span>
            </div>

            {/* Notification Bell with shake animation */}
            <div className="relative">
              <button
                onClick={() => onNavigate('novedades')}
                title="Centro de Novedades y Notificaciones"
                className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:text-[#E60067] dark:hover:text-[#E60067] transition-all rounded-full hover:bg-white/80 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60 focus:outline-hidden cursor-pointer shadow-2xs"
                id="header-bell-button"
              >
                <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-bell-shake text-[#2B75F6]' : ''}`} />
                
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E60067] opacity-75"></span>
                    <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-[#E60067] text-[10px] font-bold text-white shadow-xs">
                      {unreadCount}
                    </span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

