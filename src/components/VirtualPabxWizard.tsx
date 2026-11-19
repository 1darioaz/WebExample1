import React, { useState } from 'react';
import { 
  PhoneCall, 
  Users, 
  Smartphone, 
  Headphones, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  Volume2,
  HardDrive,
  FileText,
  MapPin,
  CheckCircle2,
  X
} from 'lucide-react';
import { hardwareCatalogData } from '../data/mockData';
import { CentralVirtualState } from '../types';
import confetti from 'canvas-confetti';

interface VirtualPabxWizardProps {
  onClose: () => void;
  onSuccess: (state: CentralVirtualState) => void;
}

export const VirtualPabxWizard: React.FC<VirtualPabxWizardProps> = ({
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [wizardState, setWizardState] = useState<CentralVirtualState>({
    extensions: 6,
    includeMobileApp: true,
    has0800: true,
    hasSmartIvr: true,
    hasCallRecording: true,
    hasVirtualFax: false,
    selectedHardwareId: 'softphone-free',
    hardwareQty: 4,
    areaCode: '011 - Buenos Aires (CABA / GBA)',
    contractTermMonths: 12
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Price calculations in ARS
  const pricePerExtension = 3150; // Promo price
  const baseExtensionsCost = wizardState.extensions * pricePerExtension;
  const cost0800 = wizardState.has0800 ? 12000 : 0;
  const costIvr = wizardState.hasSmartIvr ? 8500 : 0;
  const costRecording = wizardState.hasCallRecording ? 6000 : 0;
  
  const selectedHardware = hardwareCatalogData.find(h => h.id === wizardState.selectedHardwareId) || hardwareCatalogData[0];
  const hardwareMonthlyCost = selectedHardware.pricePerMonth * (selectedHardware.category === 'softphone' ? 1 : wizardState.hardwareQty);

  const totalMonthlyCost = baseExtensionsCost + cost0800 + costIvr + costRecording + hardwareMonthlyCost;

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleFinish = () => {
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onSuccess(wizardState);
    }, 1800);
  };

  const playIvrDemo = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Header with close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-11 h-11 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest text-[#E60067] dark:text-pink-400">
              <span>SOLUCIÓN CLOUD B2B</span>
              <span className="bg-pink-100 dark:bg-pink-950/80 text-[#E60067] dark:text-pink-300 px-1.5 py-0.2 rounded-full border border-pink-200 dark:border-pink-800">¡Nuevo Móvil!</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Configurador de Central Virtual IPLAN
            </h2>
          </div>
        </div>

        {/* Step progress indicator */}
        <div className="flex items-center justify-between mb-8 px-2 sm:px-6">
          {[
            { num: 1, label: '1. Plan & Internos' },
            { num: 2, label: '2. Adicionales' },
            { num: 3, label: '3. Dispositivos' },
            { num: 4, label: '4. Resumen & Alta' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === s.num
                    ? 'bg-[#E60067] text-white shadow-md shadow-pink-500/30 ring-4 ring-pink-100 dark:ring-pink-950 scale-110'
                    : step > s.num
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 backdrop-blur-xs'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-[11px] mt-1.5 font-bold tracking-tight text-center hidden sm:block ${
                step === s.num ? 'text-[#E60067] dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Extensions Slider & Mobile App */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="glass-panel-subtle p-5 rounded-2xl border border-blue-200/80 dark:border-blue-800/60">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Cantidad de Internos Requeridos
                </label>
                <span className="text-xl font-black text-[#2B75F6] dark:text-blue-400 bg-white/90 dark:bg-slate-800/90 px-4 py-1 rounded-xl shadow-xs border border-blue-200 dark:border-blue-800 backdrop-blur-xs">
                  {wizardState.extensions} Internos
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={50}
                value={wizardState.extensions}
                onChange={(e) => setWizardState({ ...wizardState, extensions: Number(e.target.value) })}
                className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-[#2B75F6]"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-2">
                <span>2 Internos (Mínimo)</span>
                <span>25 Internos (PyME)</span>
                <span>50+ Internos (Corporativo)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card-hover bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border-2 border-blue-500 dark:border-blue-600 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/80 text-[#2B75F6] dark:text-blue-400 rounded-xl shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Softphone Móvil (iOS & Android)</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Atendé y transferí llamadas de la oficina directo en tu celular personal o corporativo.</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">Incluido sin cargo</span>
                </div>
              </div>

              <div className="glass-card-hover bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border-2 border-blue-500 dark:border-blue-600 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-pink-100 dark:bg-pink-950/80 text-[#E60067] dark:text-pink-400 rounded-xl shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">WebRTC para Computadoras</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hacé llamadas desde Chrome o Edge sin instalar software pesado.</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">Incluido sin cargo</span>
                </div>
              </div>
            </div>

            <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">Subtotal Internos Cloud ({wizardState.extensions} x $ 3.150/mes):</span>
              <strong className="text-sm font-black text-slate-900 dark:text-white">$ {baseExtensionsCost.toLocaleString('es-AR')} /mes</strong>
            </div>
          </div>
        )}

        {/* Step 2: Adicionales (0800, IVR, Grabación) */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Personalizá las funciones corporativas de tu Central Virtual para mejorar la atención de tus clientes:
            </p>

            <div className="space-y-3">
              {/* Línea 0800 */}
              <label className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                wizardState.has0800 ? 'border-[#2B75F6] dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 backdrop-blur-xs' : 'border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle hover:bg-white/70 dark:hover:bg-slate-800/70'
              }`}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={wizardState.has0800}
                    onChange={(e) => setWizardState({ ...wizardState, has0800: e.target.checked })}
                    className="mt-1 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">Línea Nacional 0800 Rotativa</span>
                      <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[10px] font-bold px-2 py-0.2 rounded-full border border-blue-200 dark:border-blue-800">Más Solicitado</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Permite a tus clientes de todo el país llamarte sin costo de larga distancia.</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#2B75F6] dark:text-blue-400 shrink-0">+$ 12.000 /mes</span>
              </label>

              {/* IVR Inteligente */}
              <label className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                wizardState.hasSmartIvr ? 'border-[#2B75F6] dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 backdrop-blur-xs' : 'border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle hover:bg-white/70 dark:hover:bg-slate-800/70'
              }`}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={wizardState.hasSmartIvr}
                    onChange={(e) => setWizardState({ ...wizardState, hasSmartIvr: e.target.checked })}
                    className="mt-1 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">Mensaje de Bienvenida & IVR Automático</span>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); playIvrDemo(); }}
                        className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#E60067] dark:text-pink-400 bg-pink-50 dark:bg-pink-950/80 hover:bg-pink-100 dark:hover:bg-pink-900/80 px-2 py-0.5 rounded-md border border-pink-200 dark:border-pink-800 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{isPlayingAudio ? 'Reproduciendo audio...' : 'Escuchar Demo IVR'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Árbol de opciones de voz con desvío a departamentos (Ventas, Soporte, Administración).</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#2B75F6] dark:text-blue-400 shrink-0">+$ 8.500 /mes</span>
              </label>

              {/* Grabación de Llamadas */}
              <label className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                wizardState.hasCallRecording ? 'border-[#2B75F6] dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 backdrop-blur-xs' : 'border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle hover:bg-white/70 dark:hover:bg-slate-800/70'
              }`}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={wizardState.hasCallRecording}
                    onChange={(e) => setWizardState({ ...wizardState, hasCallRecording: e.target.checked })}
                    className="mt-1 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white block">Grabación de Llamadas en la Nube (Cloud Storage 90 días)</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Registro auditado de conversaciones para control de calidad y cumplimiento normativo.</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#2B75F6] dark:text-blue-400 shrink-0">+$ 6.000 /mes</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Hardware & Dispositivos */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Elegí si deseás sumar teléfonos IP de escritorio o trabajar 100% en la nube con softphones:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hardwareCatalogData.map((item) => {
                const isSelected = wizardState.selectedHardwareId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setWizardState({ ...wizardState, selectedHardwareId: item.id })}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E60067] bg-pink-50/40 dark:bg-pink-950/40 shadow-md ring-2 ring-pink-100 dark:ring-pink-900 backdrop-blur-xs'
                        : 'border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">{item.name}</span>
                        {isSelected && (
                          <span className="bg-[#E60067] text-white p-1 rounded-full text-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.features.slice(0, 2).map((f, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Alquiler mensual:</span>
                      <strong className="font-black text-[#E60067] dark:text-pink-400">
                        {item.pricePerMonth === 0 ? 'Sin cargo ($0)' : `$ ${item.pricePerMonth.toLocaleString('es-AR')} /mes`}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {wizardState.selectedHardwareId !== 'softphone-free' && (
              <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Cantidad de aparatos a entregar:</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min={1}
                    max={wizardState.extensions}
                    value={wizardState.hardwareQty}
                    onChange={(e) => setWizardState({ ...wizardState, hardwareQty: Math.max(1, Number(e.target.value)) })}
                    className="w-16 px-2 py-1 glass-input rounded-lg text-xs font-bold text-center"
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">unidades</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Resumen, Código de Área y Checkout */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Seleccioná el Código de Área para la Numeración Telefónica
              </label>
              <select
                value={wizardState.areaCode}
                onChange={(e) => setWizardState({ ...wizardState, areaCode: e.target.value })}
                className="w-full px-4 py-3 glass-input rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
              >
                <option value="011 - Buenos Aires (CABA / GBA)">011 - Buenos Aires (CABA / GBA)</option>
                <option value="0351 - Córdoba">0351 - Córdoba</option>
                <option value="0341 - Rosario">0341 - Rosario</option>
                <option value="0221 - La Plata">0221 - La Plata</option>
                <option value="0261 - Mendoza">0261 - Mendoza</option>
                <option value="0381 - San Miguel de Tucumán">0381 - San Miguel de Tucumán</option>
              </select>
            </div>

            {/* Resumen del Plan */}
            <div className="glass-panel-subtle rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-700/80 pb-2">
                Resumen de la Solución Central Virtual
              </h4>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>{wizardState.extensions} Internos Cloud con Softphone Web & App</span>
                  <span className="font-bold">$ {baseExtensionsCost.toLocaleString('es-AR')}</span>
                </div>
                {wizardState.has0800 && (
                  <div className="flex justify-between">
                    <span>Línea 0800 Rotativa Nacional</span>
                    <span className="font-bold">$ {cost0800.toLocaleString('es-AR')}</span>
                  </div>
                )}
                {wizardState.hasSmartIvr && (
                  <div className="flex justify-between">
                    <span>Árbol IVR Inteligente & Mensaje de Bienvenida</span>
                    <span className="font-bold">$ {costIvr.toLocaleString('es-AR')}</span>
                  </div>
                )}
                {wizardState.hasCallRecording && (
                  <div className="flex justify-between">
                    <span>Grabación de Llamadas Cloud (90 días)</span>
                    <span className="font-bold">$ {costRecording.toLocaleString('es-AR')}</span>
                  </div>
                )}
                {hardwareMonthlyCost > 0 && (
                  <div className="flex justify-between">
                    <span>Hardware: {wizardState.hardwareQty}x {selectedHardware.name}</span>
                    <span className="font-bold">$ {hardwareMonthlyCost.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-sm">
                  <span className="font-extrabold text-slate-900 dark:text-white">Total Mensual Estimado:</span>
                  <span className="text-lg font-black text-[#E60067] dark:text-pink-400">
                    $ {totalMonthlyCost.toLocaleString('es-AR')} + IVA
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-xs text-emerald-900 dark:text-emerald-300 p-3.5 rounded-xl text-xs border border-emerald-200 dark:border-emerald-800 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Bonificación de Alta:</strong> La instalación y configuración del servidor virtual no tiene costo de setup inicial.
              </span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              disabled={isSubmitted}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl flex items-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#2B75F6] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isSubmitted}
              id="btn-contratar-central-virtual"
              className="px-6 py-3 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-pink-500/25 flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all"
            >
              {isSubmitted ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>¡Solicitud Procesada!</span>
                </div>
              ) : (
                <>
                  <span>CONFIRMAR & ARMAR CENTRAL VIRTUAL</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
