import React, { useState } from 'react';
import { UserCheck, X, Mail, Phone, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { UserAccount } from '../types';
import confetti from 'canvas-confetti';

interface ExecutiveModalProps {
  account: UserAccount;
  onClose: () => void;
}

export const ExecutiveModal: React.FC<ExecutiveModalProps> = ({
  account,
  onClose
}) => {
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Mañana a las 11:00 hs');

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingScheduled(true);
    confetti({ particleCount: 40, spread: 50 });
    setTimeout(() => {
      setMeetingScheduled(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
            AG
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-black text-slate-900 dark:text-white">{account.dedicatedExecutive.name}</h3>
              <span className="bg-blue-100/90 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[10px] font-bold px-2 py-0.2 rounded-full border border-blue-200 dark:border-blue-800 backdrop-blur-xs">
                Asignado
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{account.dedicatedExecutive.role}</p>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Atención exclusiva para CGP: {account.cgp}</p>
          </div>
        </div>

        <div className="glass-panel-subtle p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3 mb-6 text-xs">
          <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <a href={`mailto:${account.dedicatedExecutive.email}`} className="font-semibold hover:underline">
              {account.dedicatedExecutive.email}
            </a>
          </div>
          <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">{account.dedicatedExecutive.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
            <MessageSquare className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
            <span>Horario de atención directa: Lunes a Viernes de 09:00 a 18:00 hs</span>
          </div>
        </div>

        {meetingScheduled ? (
          <div className="bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 p-4 rounded-2xl flex items-center space-x-3 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>¡Reunión reservada! Te enviamos la invitación a Google Meet por correo.</span>
          </div>
        ) : (
          <form onSubmit={handleScheduleMeeting} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Agendar llamada o reunión de consultoría comercial:
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-4 py-2.5 glass-input rounded-xl text-xs font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="Mañana a las 11:00 hs">Mañana a las 11:00 hs (Virtual Google Meet)</option>
                <option value="Mañana a las 15:30 hs">Mañana a las 15:30 hs (Llamada telefónica directa)</option>
                <option value="Jueves a las 10:00 hs">Jueves a las 10:00 hs (Asesoramiento en proyectos IT)</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:scale-105 transition-all"
              >
                CONFIRMAR REUNIÓN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
