import React, { useState } from 'react';
import { 
  BarChart3, 
  Settings, 
  PhoneCall, 
  Server, 
  Users, 
  Search, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Zap, 
  Check, 
  Clock, 
  Key, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { ServiceCategory, ActiveTab, CollaborationState } from '../types';
import confetti from 'canvas-confetti';

interface ServicesScreenProps {
  categories: ServiceCategory[];
  onSelectCategory: (category: ServiceCategory) => void;
  onOpenVirtualPabx: () => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  categories,
  onSelectCategory,
  onOpenVirtualPabx,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('RECONQUISTA 885 5');
  
  // Accordion open states
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    colaboracion: false,
    internet: false,
    telefonia: true,
  });

  // Collaboration State
  const [collabState, setCollabState] = useState<CollaborationState>({
    provider: 'google',
    plan: 'Business Standard (2 TB + Meet grabaciones)',
    starterQty: 10,
    standardQty: 25,
    plusQty: 5,
    hasGeminiCopilotAi: true,
    aiLicenseQty: 15,
    selectedSchedule: 'Martes 15:00 hs',
    transferToken: '',
    tokenValidated: false
  });

  // Upgrade Internet State
  const [selectedSpeedUpgrade, setSelectedSpeedUpgrade] = useState<number>(1000);
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
  const [collabSubmitted, setCollabSubmitted] = useState(false);

  const toggleAccordion = (key: string) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Icon mapper helper
  const renderCategoryIcon = (iconName: string, active: boolean) => {
    const className = `w-6 h-6 ${active ? 'text-[#2B75F6]' : 'text-slate-400'}`;
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Settings': return <Settings className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <Layers className={className} />;
    }
  };

  // Price calculation for Collaboration PxQ
  const priceStarterUsd = 6;
  const priceStandardUsd = 12;
  const pricePlusUsd = 18;
  const priceAiUsd = 20;

  const totalSeats = collabState.starterQty + collabState.standardQty + collabState.plusQty;
  const baseCollabUsd = (collabState.starterQty * priceStarterUsd) + 
                        (collabState.standardQty * priceStandardUsd) + 
                        (collabState.plusQty * pricePlusUsd);
  const aiCostUsd = collabState.hasGeminiCopilotAi ? (collabState.aiLicenseQty * priceAiUsd) : 0;
  const totalCollabUsd = baseCollabUsd + aiCostUsd;
  const totalCollabArs = Math.round(totalCollabUsd * 1420); // Official approximate conversion

  const handleValidateToken = () => {
    if (collabState.transferToken.length >= 6) {
      setCollabState(prev => ({ ...prev, tokenValidated: true }));
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    } else {
      alert("Por favor ingrese un Transfer Token válido generado desde admin.google.com o admin.microsoft.com");
    }
  };

  const handleApplyInternetUpgrade = () => {
    setUpgradeSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setUpgradeSubmitted(false);
      alert(`¡Solicitud de Upgrade a ${selectedSpeedUpgrade} Mbps recibida con éxito! Tu ejecutivo de cuenta te confirmará la habilitación en los próximos minutos.`);
    }, 1200);
  };

  const handleApplyCollab = () => {
    setCollabSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setCollabSubmitted(false);
      alert(`¡Solicitud de licencias enviada! Quedó agendada la sesión de capacitación para el día ${collabState.selectedSchedule}.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 1. Card: SERVICIOS ACTIVOS (Matching exact layout of image 12) */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        {/* Top title & download link */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            SERVICIOS ACTIVOS
          </h2>
          <button
            onClick={() => alert("Generando reporte PDF consolidado de servicios de telecomunicaciones e IT para CGP: 1111111...")}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#E60067] hover:text-[#CC005A] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DESCARGAR DETALLE</span>
          </button>
        </div>

        {/* Search and Address Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
          <div className="md:col-span-6 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Producto, suscripción o número..."
                className="w-full px-3.5 py-2 glass-input rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
              />
            </div>
            <button
              onClick={() => alert(`Buscando servicios con término: "${searchTerm || 'todos'}"`)}
              id="btn-buscar-servicios"
              className="px-5 py-2 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer shrink-0 hover:scale-105"
            >
              BUSCAR
            </button>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full px-3.5 py-2 glass-input rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-hidden appearance-none pr-8 cursor-pointer"
              >
                <option value="RECONQUISTA 885 5">RECONQUISTA 885 5</option>
                <option value="ISABEL LA CATÓLICA 1250">ISABEL LA CATÓLICA 1250</option>
                <option value="AV. COLÓN 450 - CÓRDOBA">AV. COLÓN 450 - CÓRDOBA</option>
                <option value="AV. DE LA COSTA 2400 - ROSARIO">AV. DE LA COSTA 2400 - ROSARIO</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
            <button
              onClick={() => onNavigate('detalle_internet')}
              id="btn-ver-todos-servicios"
              className="px-5 py-2 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer shrink-0 w-full sm:w-auto hover:scale-105"
            >
              VER TODOS
            </button>
          </div>
        </div>

        {/* Categories Grid with Top Badges */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-3">
            Categorías (Hacé clic para ver detalle u ofertas):
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {categories.map((cat) => {
              const isInactive = !cat.active || cat.count === 0;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  id={`cat-card-${cat.id}`}
                  className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center group hover:scale-[1.03] ${
                    isInactive
                      ? 'bg-slate-100/50 dark:bg-slate-800/30 backdrop-blur-xs border-slate-200 dark:border-slate-800 opacity-65 hover:opacity-100 hover:border-blue-400'
                      : 'glass-panel-subtle border-blue-200/80 dark:border-blue-800/50 shadow-xs hover:border-[#2B75F6] hover:shadow-md'
                  }`}
                >
                  {/* Top Badge Pill */}
                  <div className="absolute -top-2.5">
                    <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white rounded-full shadow-xs ${cat.badge.color}`}>
                      {cat.badge.label}
                    </span>
                  </div>

                  <div className="p-3 bg-blue-50/80 dark:bg-blue-950/60 rounded-xl mb-2 group-hover:bg-blue-100/90 dark:group-hover:bg-blue-900/60 transition-colors mt-2 backdrop-blur-xs">
                    {renderCategoryIcon(cat.iconName, cat.active)}
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {cat.title} <span className="text-slate-500 dark:text-slate-400">({cat.count})</span>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Card: AGREGÁ A TU SERVICIO (Accordion section matching screenshot 12) */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <div className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            AGREGÁ A TU SERVICIO
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Optimizá e incrementá la capacidad de tu ecosistema tecnológico IPLAN en tiempo real.
          </p>
        </div>

        <div className="space-y-3">
          {/* Row a: COLABORACIÓN (GOOGLE WORKSPACE / MICROSOFT 365) */}
          <div className="border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-2xs glass-panel-subtle">
            <button
              onClick={() => toggleAccordion('colaboracion')}
              className="w-full p-4.5 bg-white/40 dark:bg-slate-800/40 hover:bg-white/70 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 bg-pink-100 dark:bg-pink-950/80 text-[#E60067] dark:text-pink-400 rounded-xl shrink-0 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    1. COLABORACIÓN (GOOGLE WORKSPACE / MICROSOFT 365)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Sumá licencias, realizá upgrades de plan o agregá asistentes de IA (Gemini / Copilot).
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-[11px] font-bold text-[#E60067] bg-pink-50/80 dark:bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-800 backdrop-blur-xs">
                  1 Servicio Activo
                </span>
                {accordionOpen.colaboracion ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {accordionOpen.colaboracion && (
              <div className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-700/80 space-y-6">
                {/* Provider Selector */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setCollabState({ ...collabState, provider: 'google' })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      collabState.provider === 'google'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                    }`}
                  >
                    Google Workspace + Gemini AI
                  </button>
                  <button
                    onClick={() => setCollabState({ ...collabState, provider: 'microsoft' })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      collabState.provider === 'microsoft'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                    }`}
                  >
                    Microsoft 365 + Copilot
                  </button>
                </div>

                {/* PxQ Interactive License Calculator */}
                <div className="glass-panel-subtle rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Calculadora de Licencias (Precio x Cantidad)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Business Starter (30 GB)</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">USD 6 /usuario/mes</span>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="number"
                          min={0}
                          value={collabState.starterQty}
                          onChange={(e) => setCollabState({ ...collabState, starterQty: Math.max(0, Number(e.target.value)) })}
                          className="w-16 px-2 py-1 glass-input rounded text-xs font-bold text-center"
                        />
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">usuarios</span>
                      </div>
                    </div>

                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs p-3.5 rounded-xl border-2 border-blue-400 dark:border-blue-500 shadow-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Business Standard (2 TB)</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">USD 12 /usuario/mes</span>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="number"
                          min={0}
                          value={collabState.standardQty}
                          onChange={(e) => setCollabState({ ...collabState, standardQty: Math.max(0, Number(e.target.value)) })}
                          className="w-16 px-2 py-1 glass-input rounded text-xs font-bold text-center"
                        />
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">usuarios (Recomendado)</span>
                      </div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Business Plus (5 TB)</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">USD 18 /usuario/mes</span>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="number"
                          min={0}
                          value={collabState.plusQty}
                          onChange={(e) => setCollabState({ ...collabState, plusQty: Math.max(0, Number(e.target.value)) })}
                          className="w-16 px-2 py-1 glass-input rounded text-xs font-bold text-center"
                        />
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">usuarios</span>
                      </div>
                    </div>
                  </div>

                  {/* Add-on IA Gemini/Copilot */}
                  <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xs p-4 rounded-xl border border-pink-200/80 dark:border-pink-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={collabState.hasGeminiCopilotAi}
                        onChange={(e) => setCollabState({ ...collabState, hasGeminiCopilotAi: e.target.checked })}
                        className="mt-1 rounded text-[#E60067] focus:ring-[#E60067] h-4 w-4 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            Sumar Asistente de IA ({collabState.provider === 'google' ? 'Gemini Business' : 'Microsoft Copilot'})
                          </span>
                          <span className="bg-[#E60067] text-white text-[9px] font-black px-2 py-0.2 rounded-full shadow-xs">PROMO</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                          IA generativa integrada en Gmail, Docs, Drive o Microsoft Teams. USD 20 /usuario.
                        </p>
                      </div>
                    </div>

                    {collabState.hasGeminiCopilotAi && (
                      <div className="flex items-center space-x-2 shrink-0">
                        <input
                          type="number"
                          min={1}
                          max={totalSeats || 100}
                          value={collabState.aiLicenseQty}
                          onChange={(e) => setCollabState({ ...collabState, aiLicenseQty: Math.max(1, Number(e.target.value)) })}
                          className="w-16 px-2 py-1 glass-input rounded text-xs font-bold text-center"
                        />
                        <span className="text-xs font-bold text-[#E60067] dark:text-pink-400">licencias IA</span>
                      </div>
                    )}
                  </div>

                  {/* Agenda de Capacitación / Onboarding en 4 chips horizontales */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                      Seleccionar Agenda de Capacitación Gratuita para tu Equipo (4 Slots):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Lunes 10:00 hs', 'Martes 15:00 hs', 'Jueves 11:30 hs', 'Viernes 16:00 hs'].map((slot) => {
                        const isSelected = collabState.selectedSchedule === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setCollabState({ ...collabState, selectedSchedule: slot })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#E60067] text-white border-[#E60067] shadow-xs scale-[1.02]'
                                : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5 mx-auto mb-1 opacity-80" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Flujo Transfer Token */}
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                        <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Validación de Transfer Token (Para migración de facturación a IPLAN)</span>
                      </span>
                      {collabState.tokenValidated && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          ✓ Token Verificado
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={collabState.transferToken}
                        onChange={(e) => setCollabState({ ...collabState, transferToken: e.target.value })}
                        placeholder="Ej. C01abcd987xyz (Generado en consola admin)"
                        className="flex-1 px-3 py-2 glass-input rounded-xl text-xs font-mono focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleValidateToken}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs hover:scale-105"
                      >
                        Validar Token
                      </button>
                    </div>
                  </div>

                  {/* Summary & Apply Button */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Inversión mensual estimada: </span>
                      <strong className="text-base font-black text-slate-900 dark:text-white">
                        USD {totalCollabUsd} /mes
                      </strong>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                        (Aprox. $ {totalCollabArs.toLocaleString('es-AR')} en pesos oficial)
                      </span>
                    </div>

                    <button
                      onClick={handleApplyCollab}
                      disabled={collabSubmitted}
                      className="px-6 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:scale-105"
                    >
                      SOLICITAR LICENCIAS & UPGRADE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row b: UPGRADE DE INTERNET CORPORATIVO */}
          <div className="border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-2xs glass-panel-subtle">
            <button
              onClick={() => toggleAccordion('internet')}
              className="w-full p-4.5 bg-white/40 dark:bg-slate-800/40 hover:bg-white/70 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-950/80 text-[#2B75F6] dark:text-blue-400 rounded-xl shrink-0 shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    2. UPGRADE DE INTERNET CORPORATIVO
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Aumentá la velocidad simétrica de tu enlace dedicado de fibra óptica al instante.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 backdrop-blur-xs">
                  300 Mbps Activo
                </span>
                {accordionOpen.internet ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {accordionOpen.internet && (
              <div className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-700/80 space-y-5">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Seleccioná el nuevo ancho de banda simétrico para tu enlace en <strong className="text-slate-800 dark:text-slate-100">RECONQUISTA 885 5°</strong>:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    { speed: 500, label: '500 Mbps Simétricos', promoPrice: '$ 320.000 /mes', origPrice: '$ 410.000', tag: '+66% Velocidad' },
                    { speed: 1000, label: '1 Gbps (1.000 Mbps)', promoPrice: '$ 440.000 /mes', origPrice: '$ 620.000', tag: 'Más Elegido ⭐', featured: true },
                    { speed: 2000, label: '2 Gbps Enterprise', promoPrice: '$ 780.000 /mes', origPrice: '$ 990.000', tag: 'Ultra Rendimiento' },
                  ].map((plan) => {
                    const isSelected = selectedSpeedUpgrade === plan.speed;
                    return (
                      <div
                        key={plan.speed}
                        onClick={() => setSelectedSpeedUpgrade(plan.speed)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#E60067] bg-pink-50/70 dark:bg-pink-950/50 shadow-md ring-2 ring-pink-100 dark:ring-pink-900/50 backdrop-blur-xs'
                            : 'border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 backdrop-blur-xs'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#E60067] bg-pink-100 dark:bg-pink-950/80 px-2 py-0.5 rounded-full inline-block mb-2 shadow-2xs">
                            {plan.tag}
                          </span>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white">{plan.label}</h4>
                          <div className="mt-2">
                            <span className="text-xs font-black text-[#E60067] dark:text-pink-400 block">{plan.promoPrice}</span>
                            <span className="text-[10px] text-slate-400 line-through">Antes: {plan.origPrice}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>3 meses de descuento garantizado</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Fibra Óptica Punto a Punto Directa • SLA 99.98% Garantizado • IPs Públicas fijas
                  </div>
                  <button
                    onClick={handleApplyInternetUpgrade}
                    disabled={upgradeSubmitted}
                    className="px-6 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:scale-105"
                  >
                    {upgradeSubmitted ? 'Procesando Upgrade...' : `APLICAR UPGRADE A ${selectedSpeedUpgrade} MBPS`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Row c: TELEFONÍA CORPORATIVA (CENTRAL VIRTUAL) (Exact Banner from image 12) */}
          <div className="border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-2xs glass-panel-subtle">
            <button
              onClick={() => toggleAccordion('telefonia')}
              className="w-full p-4.5 bg-white/40 dark:bg-slate-800/40 hover:bg-white/70 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0 shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide">
                      3. TELEFONÍA CORPORATIVA (CENTRAL VIRTUAL)
                    </h3>
                    <span className="bg-[#E60067] text-white text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider shadow-2xs">
                      ¡nuevo móvil + cloud!
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Internos IP, líneas 0800, enrutamiento IVR y Softphone integrado en tu celular/PC.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 backdrop-blur-xs">
                  Llevá tu negocio a la nube
                </span>
                {accordionOpen.telefonia ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {accordionOpen.telefonia && (
              <div className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-700/80">
                {/* The Blue Hero Card matching screenshot 12 */}
                <div className="rounded-2xl glass-banner p-6 text-white shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">
                    SOLUCIÓN CLOUD B2B
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-xs">
                    Llevá tu negocio a la nube con nuestra Central Virtual
                  </h3>
                  <p className="text-xs text-blue-100 mt-1 max-w-xl">
                    Atendé llamadas en celular o PC, configurá IVR inteligente y proyectá imagen profesional.
                  </p>

                  <div className="mt-5">
                    <button
                      onClick={onOpenVirtualPabx}
                      id="btn-armar-central-virtual-banner"
                      className="px-6 py-3 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all hover:scale-105 cursor-pointer flex items-center space-x-2"
                    >
                      <span>ARMAR MI CENTRAL VIRTUAL AHORA</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
