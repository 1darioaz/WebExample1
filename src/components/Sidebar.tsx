import React from 'react';
import { 
  Home, 
  Building2, 
  Layers, 
  Bell, 
  Receipt, 
  FileCheck, 
  Ticket, 
  HeadphonesIcon, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { ActiveTab } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  unreadNewsCount: number;
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  unreadNewsCount,
  darkMode = false,
  onToggleTheme
}) => {
  const menuItems = [
    { id: 'inicio' as ActiveTab, label: 'INICIO', icon: Home },
    { id: 'perfil' as ActiveTab, label: 'PERFIL DE EMPRESA', icon: Building2 },
    { id: 'servicios' as ActiveTab, label: 'MIS SERVICIOS', icon: Layers },
    { 
      id: 'novedades' as ActiveTab, 
      label: 'NOVEDADES', 
      icon: Bell, 
      badge: 'NUEVO',
      badgeColor: 'bg-[#E60067] text-white'
    },
    { id: 'facturacion' as ActiveTab, label: 'FACTURACIÓN', icon: Receipt },
    { id: 'gestiones' as ActiveTab, label: 'GESTIONES', icon: FileCheck },
    { id: 'tickets' as ActiveTab, label: 'GESTIÓN DE TICKETS', icon: Ticket },
    { id: 'soporte' as ActiveTab, label: 'SOPORTE TÉCNICO', icon: HeadphonesIcon },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="glass-panel rounded-2xl p-3 shadow-xs sticky top-24">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === 'servicios' && currentTab === 'detalle_internet');
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                id={`sidebar-link-${item.id}`}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/10 dark:bg-blue-500/20 text-[#2B75F6] dark:text-blue-400 border-l-4 border-[#2B75F6] shadow-xs backdrop-blur-xs font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white hover:backdrop-blur-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2B75F6] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 text-[9px] font-black tracking-wider uppercase rounded-full shadow-xs ${item.badgeColor} animate-pulse`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 mt-2 space-y-2">
            {/* Dark mode switch in sidebar */}
            {onToggleTheme && (
              <ThemeToggle
                darkMode={darkMode}
                onToggle={onToggleTheme}
                variant="labeled"
                className="mt-1"
              />
            )}

            <button
              onClick={() => onNavigate('login')}
              id="sidebar-link-salir"
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide text-[#E60067] hover:bg-pink-500/10 dark:hover:bg-pink-500/20 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#E60067]" />
              <span>SALIR</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

