import React from 'react';
import { Download, Receipt, CheckCircle2, AlertCircle, CreditCard, Calendar, FileText } from 'lucide-react';
import { UserAccount } from '../types';

interface BillingScreenProps {
  account: UserAccount;
}

export const BillingScreen: React.FC<BillingScreenProps> = ({ account }) => {
  const invoices = [
    {
      id: 'FC-A-00042-00192841',
      period: 'Agosto 2026',
      dueDate: '28/08/2026',
      amount: '$ 385.000,00',
      status: account.balanceStatus === 'al_dia' ? 'Pagada (Débito Automático)' : 'Pendiente de Pago',
      statusType: account.balanceStatus === 'al_dia' ? 'paid' : 'pending'
    },
    {
      id: 'FC-A-00042-00189104',
      period: 'Julio 2026',
      dueDate: '28/07/2026',
      amount: '$ 385.000,00',
      status: 'Pagada',
      statusType: 'paid'
    },
    {
      id: 'FC-A-00042-00185420',
      period: 'Junio 2026',
      dueDate: '28/06/2026',
      amount: '$ 362.500,00',
      status: 'Pagada',
      statusType: 'paid'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          FACTURACIÓN & COBRANZAS
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Consultá y descargá tus comprobantes fiscales oficiales de IPLAN Argentina (Facturas Tipo A).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-700/80 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">Comprobante</th>
                <th className="pb-3 px-3">Período</th>
                <th className="pb-3 px-3">Vencimiento</th>
                <th className="pb-3 px-3">Importe</th>
                <th className="pb-3 px-3">Estado</th>
                <th className="pb-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60 font-medium">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{inv.id}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">{inv.period}</td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      inv.statusType === 'paid' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => alert(`Descargando comprobante PDF ${inv.id}...`)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-[#2B75F6] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
