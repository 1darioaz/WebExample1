import React, { useState } from 'react';
import { Ticket, HeadphonesIcon, Plus, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TicketsScreen: React.FC = () => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Conectividad / Enlace');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 'TCK-2026-8910',
      subject: 'Solicitud de asignación de bloque IP pública /29 en Sede Reconquista',
      category: 'Configuración de Red',
      date: '20/08/2026',
      status: 'En Proceso (NOC Nivel 2)',
      priority: 'Media'
    },
    {
      id: 'TCK-2026-7421',
      subject: 'Prueba de redundancia de fibra en anillo Microcentro',
      category: 'Mantenimiento',
      date: '10/08/2026',
      status: 'Cerrado / Resuelto',
      priority: 'Baja'
    }
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTck = {
      id: `TCK-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: ticketSubject,
      category: ticketCategory,
      date: new Date().toLocaleDateString('es-AR'),
      status: 'Abierto / Asignado a Guardia NOC',
      priority: 'Alta'
    };

    setTickets([newTck, ...tickets]);
    setTicketCreated(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      setTicketCreated(false);
      setShowNewTicketModal(false);
      setTicketSubject('');
      setTicketDescription('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              GESTIÓN DE TICKETS & SOPORTE TÉCNICO NOC
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Guardia técnica activa 24 horas los 365 días del año.
            </p>
          </div>

          <button
            onClick={() => setShowNewTicketModal(true)}
            className="px-5 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>NUEVO TICKET TÉCNICO</span>
          </button>
        </div>

        <div className="space-y-3">
          {tickets.map((tck) => (
            <div key={tck.id} className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{tck.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900 dark:text-white">{tck.subject}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 flex items-center space-x-2">
                  <span>Categoría: {tck.category}</span>
                  <span>•</span>
                  <span>Fecha: {tck.date}</span>
                  <span>•</span>
                  <span className="text-pink-600 dark:text-pink-400 font-bold">Prioridad {tck.priority}</span>
                </div>
              </div>

              <span className="px-3 py-1 bg-blue-100/90 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[11px] font-bold rounded-full w-fit border border-blue-200 dark:border-blue-800 backdrop-blur-xs">
                {tck.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showNewTicketModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Abrir Nuevo Ticket con Guardia NOC</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">El equipo de ingeniería asignará un técnico de inmediato.</p>

            {ticketCreated ? (
              <div className="bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 p-4 rounded-2xl flex items-center space-x-3 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>¡Ticket generado con éxito! Un ingeniero se comunicará en breve.</span>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Motivo / Asunto</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Ej. Solicitud de cambio de DNS o verificación de latencia"
                    className="w-full px-3.5 py-2 glass-input rounded-xl font-medium focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Categoría</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3.5 py-2 glass-input rounded-xl font-bold focus:outline-hidden cursor-pointer"
                  >
                    <option value="Conectividad / Enlace">Conectividad / Enlace de Fibra</option>
                    <option value="Telefonía / Central Virtual">Telefonía / Central Virtual</option>
                    <option value="Cloud / VPS Data Center">Cloud / VPS Data Center</option>
                    <option value="Colaboración Google / Microsoft">Colaboración Google / Microsoft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Descripción del requerimiento</label>
                  <textarea
                    rows={3}
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    placeholder="Detalle sede, IP afectada o síntoma..."
                    className="w-full px-3.5 py-2 glass-input rounded-xl font-medium focus:outline-hidden"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="px-4 py-2 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white font-black uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:scale-105 transition-all"
                  >
                    CREAR TICKET
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
