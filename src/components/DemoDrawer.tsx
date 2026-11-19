import React, { useState } from 'react';
import { 
  Sliders, 
  X, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ActiveTab, UserAccount, ServiceCategory } from '../types';
import confetti from 'canvas-confetti';

interface DemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  account: UserAccount;
  onUpdateAccount: (account: UserAccount) => void;
  categories: ServiceCategory[];
  onUpdateCategories: (categories: ServiceCategory[]) => void;
  onTriggerNotification: () => void;
  onResetDemo: () => void;
}

export const DemoDrawer: React.FC<DemoDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onNavigate,
  account,
  onUpdateAccount,
  categories,
  onUpdateCategories,
  onTriggerNotification,
  onResetDemo
}) => {
  // Toggle collaboration active licenses count
  const toggleLicenses = () => {
    const updated = categories.map(c => {
      if (c.id === 'colaboracion') {
        const newCount = c.count > 0 ? 0 : 1;
        return {
          ...c,
          count: newCount,
          badge: newCount > 0 
            ? { label: "+ Sumar IA", type: "ia" as any, color: "bg-[#E60067]" }
            : { label: "🚀 Descubrir", type: "descubrir" as any, color: "bg-[#2B75F6]" }
        };
      }
      return c;
    });
    onUpdateCategories(updated);
  };

  // Toggle telephony from Upsell (0) to Cross-sell (8)
  const toggleTelephony = () => {
    const updated = categories.map(c => {
      if (c.id === 'telefonia') {
        const isCurrentlyZero = c.count === 0;
        return {
          ...c,
          count: isCurrentlyZero ? 8 : 0,
          active: isCurrentlyZero,
          badge: isCurrentlyZero 
            ? { label: "💡 Upgrade", type: "upgrade" as any, color: "bg-[#E60067]" }
            : { label: "🚀 Descubrir", type: "descubrir" as any, color: "bg-[#2B75F6]" }
        };
      }
      return c;
    });
    onUpdateCategories(updated);
  };

  // Toggle balance status
  const toggleBalance = () => {
    onUpdateAccount({
      ...account,
      balanceStatus: account.balanceStatus === 'al_dia' ? 'pendiente' : 'al_dia'
    });
  };

  const handleReset = () => {
    onResetDemo();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 animate-fadeIn"
        />
      )}

      {/* Drawer Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 glass-panel-elevated shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-700/80 mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/80 text-[#2B75F6] dark:text-blue-400 rounded-xl shadow-2xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Panel Control Demo</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Conmutá estados en vivo para evaluación</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs">
          {/* Quick Screen Jump */}
          <div>
            <label className="block font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              1. Salto Rápido de Pantallas:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'login', label: 'Pantalla 0: Login' },
                { id: 'inicio', label: 'Pantalla 1: Inicio' },
                { id: 'servicios', label: 'Pantalla 2: Servicios' },
                { id: 'detalle_internet', label: 'Pantalla 3: Detalle Enlaces' },
                { id: 'novedades', label: 'Pantalla 4: Novedades' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onNavigate(p.id as any);
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl font-bold border transition-all text-left cursor-pointer ${
                    currentTab === p.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2B75F6] dark:text-blue-400 border-[#2B75F6] dark:border-blue-500 shadow-2xs'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Collaboration Licenses */}
          <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">Estado Licencias Workspace:</span>
              <span className="font-black text-[#E60067] dark:text-pink-400">
                {categories.find(c => c.id === 'colaboracion')?.count || 0} Activa(s)
              </span>
            </div>
            <button
              onClick={toggleLicenses}
              className="w-full py-2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-600 font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Conmutar: Con Licencias (1) ⟷ Sin Licencias (0)
            </button>
          </div>

          {/* Toggle Telephony Status */}
          <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">Módulo Telefonía Central:</span>
              <span className="font-black text-[#2B75F6] dark:text-blue-400">
                {categories.find(c => c.id === 'telefonia')?.count === 0 ? 'Sin Servicio (0)' : 'Tiene Central (8)'}
              </span>
            </div>
            <button
              onClick={toggleTelephony}
              className="w-full py-2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-600 font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Conmutar: Upsell (0) ⟷ Cross-sell (8)
            </button>
          </div>

          {/* Toggle Account Balance */}
          <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">Estado de Saldo / Facturas:</span>
              <span className={`font-black ${account.balanceStatus === 'al_dia' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {account.balanceStatus === 'al_dia' ? 'Saldo al Día 💚' : 'Factura Vencida ⚠️'}
              </span>
            </div>
            <button
              onClick={toggleBalance}
              className="w-full py-2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-600 font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Alternar Estado de Saldo
            </button>
          </div>

          {/* Trigger Notification */}
          <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Simular Evento de Red:</span>
            <button
              onClick={() => {
                onTriggerNotification();
                confetti({ particleCount: 25, spread: 40 });
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-105"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Disparar Nueva Alerta a la Campanita</span>
            </button>
          </div>

          {/* Reset Demo Button */}
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#E60067] hover:bg-[#CC005A] text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESETEAR DEMO A VALORES INICIALES</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
