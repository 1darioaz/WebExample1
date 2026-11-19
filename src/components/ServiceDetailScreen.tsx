import React, { useState } from 'react';
import { 
  BarChart3, 
  Zap, 
  Plus, 
  ArrowLeft, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ExternalLink,
  Shield,
  RefreshCw,
  Server,
  Wifi,
  Globe
} from 'lucide-react';
import { internetLinksData } from '../data/mockData';
import { InternetLink, ActiveTab } from '../types';
import confetti from 'canvas-confetti';

interface ServiceDetailScreenProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenUpgradeModal: () => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  onNavigate,
  onOpenUpgradeModal
}) => {
  const [links, setLinks] = useState<InternetLink[]>(internetLinksData);
  const [testingLinkId, setTestingLinkId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ speed: number; ping: number } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');

  const handleRunSpeedTest = (linkId: string, baseSpeed: number) => {
    setTestingLinkId(linkId);
    setTestResult(null);
    setTimeout(() => {
      setTestingLinkId(null);
      setTestResult({
        speed: Math.round(baseSpeed * 0.98),
        ping: Math.floor(Math.random() * 3) + 2
      });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }, 2000);
  };

  const filteredLinks = selectedFilter === 'todos' 
    ? links 
    : links.filter(l => l.address.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Sticky Header upon scrolling */}
      <div className="sticky top-16 z-20 glass-header rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('servicios')}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Volver a Mis Servicios"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                DETALLE DE ENLACES DE INTERNET DEDICADO
              </h2>
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-200 dark:border-emerald-800">
                {links.length} Enlaces Activos
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Fibra óptica punto a punto con SLA 99.98% corporativo</p>
          </div>
        </div>

        {/* Quick actions in Sticky Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenUpgradeModal}
            id="btn-sticky-aumentar-velocidad"
            className="px-4 py-2 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>AUMENTAR VELOCIDAD</span>
          </button>

          <button
            onClick={() => alert("Solicitud de nuevo enlace iniciada. Nuestro equipo de ingeniería realizará el estudio de factibilidad técnica para la nueva dirección.")}
            id="btn-sticky-agregar-enlaces"
            className="px-4 py-2 bg-[#2B75F6] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>AGREGAR MÁS ENLACES</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Capacidad Total Contratada</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-xl font-black text-slate-900 dark:text-white">1.700</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Mbps Simétricos</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Disponibilidad Promedio (SLA)</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">99.98%</span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Garantizado</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Latencia Media Nacional</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-xl font-black text-[#2B75F6] dark:text-blue-400">4.2</span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">ms (Ultra baja)</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">IPs Públicas Ruteadas</span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-xl font-black text-slate-900 dark:text-white">20</span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">IPs Fijas BGP</span>
          </div>
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-700/80">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{link.name}</h3>
                  <span className="text-[10px] font-bold bg-blue-50/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2 py-0.2 rounded-md border border-blue-200 dark:border-blue-800">
                    {link.serviceType}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  📍 <strong>{link.address}</strong>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Velocidad Actual</span>
                  <span className="text-lg font-black text-[#E60067] dark:text-pink-400">
                    {link.currentSpeed} Mbps
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics & MRTG Graph Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="glass-panel-subtle p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-slate-500 dark:text-slate-400 font-bold block mb-1">Rango IP Fija / Asignación:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 block">
                  {link.ipRange}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 block">✓ BGP Multihoming Activo</span>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold">Consumo Pico de Tráfico (MRTG):</span>
                  <span className="font-bold text-[#2B75F6] dark:text-blue-400">{link.utilizationPeak}%</span>
                </div>
                <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      link.utilizationPeak > 80 ? 'bg-[#E60067]' : 'bg-[#2B75F6]'
                    }`}
                    style={{ width: `${link.utilizationPeak}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {link.utilizationPeak > 80 ? '⚠️ Cercano al límite: se aconseja upgrade' : 'Nivel de tráfico óptimo'}
                </span>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-bold">Latencia / Ping NOC:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{link.ping} ms</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-500 dark:text-slate-400 font-bold">SLA Garantizado:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{link.sla}</span>
                </div>
              </div>
            </div>

            {/* Test speed & Action button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRunSpeedTest(link.id, link.currentSpeed)}
                  disabled={testingLinkId === link.id}
                  className="px-3.5 py-1.5 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingLinkId === link.id ? 'animate-spin text-blue-600' : ''}`} />
                  <span>{testingLinkId === link.id ? 'Midiendo enlace...' : 'Test de Velocidad en Vivo'}</span>
                </button>

                {testingLinkId === link.id && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                    Probando throughput simétrico...
                  </span>
                )}

                {testResult && testingLinkId === null && (
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50/90 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    Resultado: {testResult.speed} Mbps reales / {testResult.ping} ms ping
                  </span>
                )}
              </div>

              <button
                onClick={onOpenUpgradeModal}
                className="px-4 py-1.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer hover:scale-105"
              >
                SOLICITAR UPGRADE DE ESTE ENLACE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
