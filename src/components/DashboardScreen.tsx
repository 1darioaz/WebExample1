import React, { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  Building, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { UserAccount, ActiveTab } from '../types';

interface DashboardScreenProps {
  account: UserAccount;
  onNavigate: (tab: ActiveTab) => void;
  onOpenOffer: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  account,
  onNavigate,
  onOpenOffer
}) => {
  const [showCbuModal, setShowCbuModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [cbuInput, setCbuInput] = useState('');
  const [bankAlias, setBankAlias] = useState('');
  const [cbuSuccess, setCbuSuccess] = useState(false);

  const handleSaveCbu = (e: React.FormEvent) => {
    e.preventDefault();
    setCbuSuccess(true);
    setTimeout(() => {
      setCbuSuccess(false);
      setShowCbuModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Promotional Network Upgrade Banner */}
      <div 
        id="banner-oportunidad-red"
        className="relative overflow-hidden rounded-2xl glass-banner p-6 text-white shadow-lg transition-transform hover:shadow-xl hover:scale-[1.01]"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-yellow-300 shrink-0 border border-white/20 shadow-xs">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-pink-200 block mb-0.5">
                OPORTUNIDAD DE RED PARA TU EMPRESA
              </span>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight drop-shadow-xs">
                Tenés una oportunidad para aumentar tu velocidad... ¡Aprovechá y ganá un descuento x 3 meses!
              </h2>
              <p className="text-xs text-blue-100 mt-1">
                Duplicá tu enlace de fibra óptica simétrica de 300 Mbps a 1 Gbps con tarifa promocional garantizada.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenOffer}
            id="btn-ver-oferta-banner"
            className="self-start md:self-center px-6 py-2.5 bg-white/95 text-[#E60067] hover:bg-white font-black text-xs md:text-sm rounded-full tracking-wider uppercase shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer flex items-center space-x-2 backdrop-blur-xs"
          >
            <span>VER OFERTA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. ESTADO DE CUENTA */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
          ESTADO DE CUENTA
        </h3>

        {account.balanceStatus === 'al_dia' ? (
          <div className="bg-emerald-500/90 dark:bg-emerald-600/80 backdrop-blur-xs text-white rounded-xl py-3 px-4 flex items-center space-x-2.5 text-sm font-bold shadow-xs border border-emerald-400/40">
            <span className="text-lg">💚</span>
            <span>Tu saldo se encuentra al día.</span>
          </div>
        ) : (
          <div className="bg-amber-500/90 dark:bg-amber-600/80 backdrop-blur-xs text-white rounded-xl py-3.5 px-4 flex items-center justify-between text-sm font-bold shadow-xs border border-amber-400/40">
            <div className="flex items-center space-x-2.5">
              <AlertTriangle className="w-5 h-5" />
              <span>Factura pendiente de pago: $ 385.000 (Vencimiento: 28/08/2026)</span>
            </div>
            <button 
              onClick={() => onNavigate('facturacion')}
              className="px-3 py-1 bg-white text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-50 shadow-xs cursor-pointer"
            >
              Pagar Online
            </button>
          </div>
        )}
      </div>

      {/* 3. ADHESIÓN DÉBITO AUTOMÁTICO */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          ADHESIÓN DÉBITO AUTOMÁTICO
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium">
          Actualmente estás adherido al débito automático con:
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 dark:bg-blue-500 text-white font-mono font-bold text-xs px-3.5 py-2 rounded-xl tracking-wider shadow-xs">
              {account.autoDebitCard}
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tipo: <span className="font-bold text-slate-900 dark:text-white">{account.autoDebitType}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCbuModal(true)}
            id="btn-cambiar-debito-cbu"
            className="px-5 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer w-fit hover:scale-105"
          >
            CAMBIAR A DÉBITO CON CBU
          </button>
        </div>
      </div>

      {/* 4. PERFIL DE EMPRESA */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
          PERFIL DE EMPRESA
        </h3>

        <div className="glass-panel-subtle rounded-xl p-5 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
            <div className="inline-flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs">
              <Building className="w-4 h-4" />
              <span>{account.companyName}</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              CGP: <strong className="text-slate-900 dark:text-white font-bold">{account.cgp}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Dir facturación:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{account.billingAddress}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-0.5">CUIT:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{account.cuit}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Cond. impositiva:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{account.taxCondition}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CONTACTO PRINCIPAL */}
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
          CONTACTO PRINCIPAL
        </h3>

        <div className="glass-panel-subtle rounded-xl p-5 border border-slate-200/60 dark:border-slate-700/60 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center space-x-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs">
              <User className="w-3.5 h-3.5" />
              <span>{account.primaryContact.name} ★</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-xs">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{account.primaryContact.email}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-xs">
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{account.primaryContact.phone}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            * Este contacto recibirá las comunicaciones importantes de IPLAN acerca de facturación, avisos de deuda y cortes de servicio programado.
          </p>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowContactsModal(true)}
              id="btn-ver-mas-contactos"
              className="px-5 py-2 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer hover:scale-105"
            >
              VER MÁS CONTACTOS
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Cambiar Débito a CBU */}
      {showCbuModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full relative">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
              Adhesión a Débito Automático con CBU
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
              Ingresá los datos de la cuenta bancaria corporativa para procesar las facturas de IPLAN de forma automática.
            </p>

            {cbuSuccess ? (
              <div className="bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-sm font-semibold mb-4 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>¡CBU validado con éxito! Se aplicará a partir de la próxima liquidación.</span>
              </div>
            ) : (
              <form onSubmit={handleSaveCbu} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Número de CBU (22 dígitos)
                  </label>
                  <input
                    type="text"
                    maxLength={22}
                    value={cbuInput}
                    onChange={(e) => setCbuInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="0720000000000000000000"
                    className="w-full px-4 py-2.5 glass-input rounded-xl text-sm font-mono focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Alias CBU
                  </label>
                  <input
                    type="text"
                    value={bankAlias}
                    onChange={(e) => setBankAlias(e.target.value)}
                    placeholder="IPLAN.NETWORKS.PAGOS"
                    className="w-full px-4 py-2.5 glass-input rounded-xl text-sm focus:outline-hidden"
                  />
                </div>

                <div className="bg-blue-50/80 dark:bg-blue-950/60 p-3.5 rounded-xl text-xs text-blue-900 dark:text-blue-200 border border-blue-200/60 dark:border-blue-800/60 backdrop-blur-xs">
                  <strong>Nota:</strong> El titular de la cuenta bancaria debe coincidir con el CUIT {account.cuit} ({account.companyName}).
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCbuModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:scale-105"
                  >
                    CONFIRMAR Y ADHERIR
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Ver más contactos */}
      {showContactsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Contactos Registrados de la Empresa</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">CGP {account.cgp} - {account.companyName}</p>
              </div>
              <button
                onClick={() => setShowContactsModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm p-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/70 p-4 rounded-xl flex items-center justify-between backdrop-blur-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Guido A Giovana</span>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.2 rounded-full shadow-xs">Principal / Admin</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">sfandino@iplan.com.ar • 1154850248</div>
                </div>
                <span className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold">Notificaciones Legales</span>
              </div>

              <div className="glass-panel-subtle p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Mariano R. Peralta</span>
                    <span className="bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold px-2 py-0.2 rounded-full">Técnico NOC</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">mperalta@iplan.com.ar • 1144901234</div>
                </div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Alertas de Caídas / Mantenimiento</span>
              </div>

              <div className="glass-panel-subtle p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Lucía Benítez</span>
                    <span className="bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold px-2 py-0.2 rounded-full">Facturación / Cobranzas</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">facturacion@iplan.com.ar • 1144905678</div>
                </div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Recepción de Facturas Electrónicas</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <button
                onClick={() => alert("Para agregar un nuevo contacto autorizado, complete la solicitud formal o hable con PatricIA.")}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2B75F6] dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Solicitar alta de nuevo contacto</span>
              </button>

              <button
                onClick={() => setShowContactsModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
