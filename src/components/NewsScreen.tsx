import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Zap, 
  Wrench, 
  Users, 
  CheckCheck, 
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';
import { NotificationItem, ActiveTab } from '../types';

interface NewsScreenProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onOpenPatricia: () => void;
  onOpenUpgradeOffer: () => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({
  notifications,
  onMarkAllRead,
  onOpenPatricia,
  onOpenUpgradeOffer,
  onNavigate
}) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'promo' | 'maint'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.tagType === filter;
  });

  const getTagBadgeStyle = (tagType: string) => {
    switch (tagType) {
      case 'new':
        return 'bg-[#E60067] text-white';
      case 'promo':
        return 'bg-[#2B75F6] text-white';
      case 'maint':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  const getBorderColor = (id: string, tagType: string) => {
    if (id === 'notif-1') return 'border-pink-300/80 dark:border-pink-800/60 bg-pink-50/40 dark:bg-pink-950/30 backdrop-blur-xs'; // Pink border as in screenshot 14
    if (id === 'notif-2') return 'border-blue-300/80 dark:border-blue-800/60 bg-blue-50/40 dark:bg-blue-950/30 backdrop-blur-xs'; // Blue border as in screenshot 14
    return 'border-slate-200/80 dark:border-slate-700/80 glass-panel-subtle';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header matching screenshot 14 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0 shadow-2xs">
            <Bell className="w-6 h-6 fill-current animate-bell-shake" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-[#E60067] dark:text-pink-400 uppercase tracking-wide">
              CENTRO DE NOVEDADES Y NOTIFICACIONES
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enterate antes que nadie sobre nuevas funcionalidades y ofertas exclusivas.
            </p>
          </div>
        </div>

        <button
          onClick={onMarkAllRead}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-center border border-slate-200 dark:border-slate-700 shadow-2xs"
        >
          <CheckCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Marcar todo como leído</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'Todas las Novedades' },
          { id: 'new', label: 'Lanzamientos' },
          { id: 'promo', label: 'Promociones' },
          { id: 'maint', label: 'Mantenimientos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-[#2B75F6] text-white shadow-xs'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications Feed */}
      <div className="space-y-4">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-2xl border-2 transition-all hover:shadow-xs ${getBorderColor(notif.id, notif.tagType)}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2.5">
                {notif.id === 'notif-1' && (
                  <div className="w-8 h-8 bg-pink-100 dark:bg-pink-950/80 text-[#E60067] dark:text-pink-400 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    🤖
                  </div>
                )}
                {notif.id === 'notif-2' && (
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/80 text-[#2B75F6] dark:text-blue-400 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    ⚡
                  </div>
                )}
                {notif.id === 'notif-3' && (
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    🔧
                  </div>
                )}
                {notif.id === 'notif-4' && (
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    ✨
                  </div>
                )}

                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {notif.title}
                </h3>

                <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md shadow-2xs ${getTagBadgeStyle(notif.tagType)}`}>
                  {notif.tag}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {notif.date}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 pl-1 sm:pl-10 leading-relaxed">
              {notif.description}
            </p>

            {notif.actionUrl && (
              <div className="mt-3 pl-1 sm:pl-10 flex items-center space-x-3">
                {notif.actionUrl === 'patricia' && (
                  <button
                    onClick={onOpenPatricia}
                    className="px-4 py-1.5 bg-[#E60067] hover:bg-[#CC005A] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
                  >
                    <span>{notif.actionLabel || 'Probar PatricIA'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {notif.actionUrl === 'upgrade_internet' && (
                  <button
                    onClick={onOpenUpgradeOffer}
                    className="px-4 py-1.5 bg-[#2B75F6] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
                  >
                    <span>{notif.actionLabel || 'Aprovechar Oferta'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {notif.actionUrl === 'colaboracion' && (
                  <button
                    onClick={() => onNavigate('servicios')}
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
                  >
                    <span>{notif.actionLabel || 'Ver Planes de IA'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
