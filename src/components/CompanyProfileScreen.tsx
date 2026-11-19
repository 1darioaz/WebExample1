import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, FileCheck, CheckCircle2 } from 'lucide-react';
import { UserAccount } from '../types';

interface CompanyProfileScreenProps {
  account: UserAccount;
}

export const CompanyProfileScreen: React.FC<CompanyProfileScreenProps> = ({ account }) => {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 shadow-xs">
        <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          DATOS FISCALES & PERFIL CORPORATIVO
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Información registrada en el padrón de clientes corporativos de IPLAN.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="glass-panel-subtle p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Razón Social:</span>
              <strong className="text-slate-900 dark:text-white text-sm font-black">{account.companyName}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Identificador CGP:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold font-mono">{account.cgp}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">CUIT:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">{account.cuit}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Condición frente al IVA:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">{account.taxCondition}</strong>
            </div>
          </div>

          <div className="glass-panel-subtle p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Dirección Legal y Facturación:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{account.billingAddress}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Sede Operativa Principal:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">Reconquista 885, Piso 5° (CABA)</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Sedes Conectadas:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">4 Ubicaciones (CABA, Barracas DC, Córdoba, Rosario)</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Categoría de Cliente:</span>
              <span className="inline-block bg-purple-100/90 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-bold px-2 py-0.5 rounded-full text-[10px] border border-purple-200 dark:border-purple-800 backdrop-blur-xs">
                Tier 1 - Corporativo Dedicado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
