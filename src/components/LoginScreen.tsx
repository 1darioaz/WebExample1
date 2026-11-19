import React, { useState } from 'react';
import { Lock, User, Building, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginScreenProps {
  account: UserAccount;
  onLoginSuccess: () => void;
  onOpenDemo?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  account,
  onLoginSuccess,
  onOpenDemo
}) => {
  const [cgpInput, setCgpInput] = useState(account.cgp);
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1E3D] via-[#1B3566] to-[#0A1326] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle demo pencil button at top-left corner */}
      {onOpenDemo && (
        <button
          onClick={onOpenDemo}
          title="Control Demo"
          id="btn-login-demo-pencil"
          aria-label="Abrir panel de control demo"
          className="absolute top-4 left-4 text-slate-400/40 hover:text-slate-200 hover:opacity-100 transition-opacity p-2 rounded text-sm z-30 cursor-pointer select-none"
        >
          ✏️
        </button>
      )}

      {/* Subtle background glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E60067]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2B75F6]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* IPLAN Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 mb-4 shadow-xl">
            <span className="text-3xl font-black text-white tracking-tight">iplan</span>
            <span className="text-3xl font-black text-[#E60067]">★</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Zona de Clientes Corporativos</h1>
          <p className="text-blue-200 text-sm mt-1">Gestión integral de conectividad, cloud e IT</p>
        </div>

        {/* Login Box */}
        <div className="glass-panel-elevated rounded-3xl p-8 shadow-2xl relative">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 text-[#2B75F6] px-3 py-1 rounded-full text-xs font-bold mb-6 border border-blue-200/80 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#2B75F6]" />
            <span>Acceso Seguro B2B - Demo CGP {account.cgp}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Número de CGP / DNI
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={cgpInput}
                  onChange={(e) => setCgpInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-input rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden transition-all"
                  placeholder="Ej. 1111111"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-input rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden transition-all"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2B75F6] focus:ring-[#2B75F6]"
                />
                <span>Recordar sesión</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Se ha enviado un enlace de recuperación al correo registrado del contacto principal: sfandino@iplan.com.ar")}
                className="text-[#2B75F6] hover:text-[#1A5BC7] font-semibold hover:underline cursor-pointer"
              >
                ¿Olvidaste tu clave?
              </button>
            </div>

            {/* Submit Button in Magenta */}
            <button
              type="submit"
              disabled={isLoading}
              id="btn-login-submit"
              className="w-full bg-[#E60067] hover:bg-[#CC005A] text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2 cursor-pointer hover:scale-102"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ingresando a Mi IPLAN...</span>
                </div>
              ) : (
                <>
                  <span>INGRESAR A MI IPLAN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick preset banner */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Empresa vinculada: <strong className="text-slate-800">{account.companyName}</strong>
            </p>
            <div className="mt-2 flex items-center justify-center space-x-3 text-[11px] text-slate-400">
              <span>Soporte NOC 24/7</span>
              <span>•</span>
              <span>Fibra Directa</span>
              <span>•</span>
              <span>Cloud B2B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
