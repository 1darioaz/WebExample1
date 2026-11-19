import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SubHeader } from './components/SubHeader';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { ServiceDetailScreen } from './components/ServiceDetailScreen';
import { NewsScreen } from './components/NewsScreen';
import { BillingScreen } from './components/BillingScreen';
import { TicketsScreen } from './components/TicketsScreen';
import { CompanyProfileScreen } from './components/CompanyProfileScreen';
import { UpsellModal } from './components/UpsellModal';
import { VirtualPabxWizard } from './components/VirtualPabxWizard';
import { PatriciaChat } from './components/PatriciaChat';
import { DemoDrawer } from './components/DemoDrawer';
import { ExecutiveModal } from './components/ExecutiveModal';
import { 
  initialAccountData, 
  serviceCategoriesData, 
  initialNotificationsData 
} from './data/mockData';
import { 
  ActiveTab, 
  UserAccount, 
  ServiceCategory, 
  NotificationItem, 
  CentralVirtualState 
} from './types';
import confetti from 'canvas-confetti';

export default function App() {
  // Global States
  const [currentTab, setCurrentTab] = useState<ActiveTab>('inicio');
  const [account, setAccount] = useState<UserAccount>(initialAccountData);
  const [categories, setCategories] = useState<ServiceCategory[]>(serviceCategoriesData);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotificationsData);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('iplan_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('iplan_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('iplan_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Modals and Drawers
  const [selectedUpsellCategory, setSelectedUpsellCategory] = useState<ServiceCategory | null>(null);
  const [isVirtualPabxOpen, setIsVirtualPabxOpen] = useState(false);
  const [isExecutiveModalOpen, setIsExecutiveModalOpen] = useState(false);
  const [isPatriciaOpen, setIsPatriciaOpen] = useState(false);
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);

  // Notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleTriggerNotification = () => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: '⚡ Monitoreo de Red: Enlace Simétrico Optimizado',
      tag: 'RED',
      tagType: 'update',
      date: 'Hace instantes',
      description: 'El NOC de IPLAN completó la calibración de latencia en tu enlace de Reconquista 885. Ping reducido a 2.8 ms.',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleResetDemo = () => {
    setAccount(initialAccountData);
    setCategories(serviceCategoriesData);
    setNotifications(initialNotificationsData);
    setCurrentTab('inicio');
  };

  const handleUpsellModalAction = (categoryId: string) => {
    setSelectedUpsellCategory(null);
    if (categoryId === 'telefonia') {
      setIsVirtualPabxOpen(true);
    } else if (categoryId === 'internet') {
      setCurrentTab('servicios');
    } else if (categoryId === 'colaboracion') {
      setCurrentTab('servicios');
    } else {
      setIsExecutiveModalOpen(true);
    }
  };

  const handleVirtualPabxSuccess = (pabxState: CentralVirtualState) => {
    setIsVirtualPabxOpen(false);
    // Update category to active
    setCategories(prev => prev.map(c => {
      if (c.id === 'telefonia') {
        return {
          ...c,
          count: pabxState.extensions,
          active: true,
          badge: { label: '💡 Activo', type: 'upgrade', color: 'bg-emerald-600' }
        };
      }
      return c;
    }));
    alert(`¡Felicitaciones! Tu Central Virtual con ${pabxState.extensions} internos y código ${pabxState.areaCode} ha sido dada de alta con éxito.`);
  };

  // If on login screen
  if (currentTab === 'login') {
    return (
      <>
        <LoginScreen
          account={account}
          onLoginSuccess={() => setCurrentTab('inicio')}
          onOpenDemo={() => setIsDemoDrawerOpen(true)}
        />
        {/* Demo control drawer is always accessible */}
        <DemoDrawer
          isOpen={isDemoDrawerOpen}
          onClose={() => setIsDemoDrawerOpen(false)}
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          account={account}
          onUpdateAccount={setAccount}
          categories={categories}
          onUpdateCategories={setCategories}
          onTriggerNotification={handleTriggerNotification}
          onResetDemo={handleResetDemo}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0A1128] text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased relative overflow-x-hidden transition-colors duration-300">
      {/* Frosted Glass Ambient Lighting Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#2B75F6]/10 dark:bg-[#2B75F6]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-80 h-80 bg-[#E60067]/10 dark:bg-[#E60067]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Global Header with Frosted Glass & Dark Mode Switch */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        unreadCount={unreadCount}
        onOpenExecutive={() => setIsExecutiveModalOpen(true)}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenDemo={() => setIsDemoDrawerOpen(true)}
      />

      {/* 2. Blue SubHeader bar */}
      <SubHeader
        account={account}
        onOpenExecutive={() => setIsExecutiveModalOpen(true)}
      />

      {/* 3. Main Container with Sidebar + Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Menu */}
          <Sidebar
            currentTab={currentTab}
            onNavigate={setCurrentTab}
            unreadNewsCount={unreadCount}
            darkMode={darkMode}
            onToggleTheme={handleToggleTheme}
          />

          {/* Dynamic Content Views */}
          <div className="flex-1 min-w-0">
            {currentTab === 'inicio' && (
              <DashboardScreen
                account={account}
                onNavigate={setCurrentTab}
                onOpenOffer={() => {
                  const internetCat = categories.find(c => c.id === 'internet');
                  if (internetCat) setSelectedUpsellCategory(internetCat);
                }}
              />
            )}

            {currentTab === 'servicios' && (
              <ServicesScreen
                categories={categories}
                onSelectCategory={(cat) => setSelectedUpsellCategory(cat)}
                onOpenVirtualPabx={() => setIsVirtualPabxOpen(true)}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'detalle_internet' && (
              <ServiceDetailScreen
                onNavigate={setCurrentTab}
                onOpenUpgradeModal={() => {
                  const internetCat = categories.find(c => c.id === 'internet');
                  if (internetCat) setSelectedUpsellCategory(internetCat);
                }}
              />
            )}

            {currentTab === 'novedades' && (
              <NewsScreen
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onOpenPatricia={() => setIsPatriciaOpen(true)}
                onOpenUpgradeOffer={() => {
                  const internetCat = categories.find(c => c.id === 'internet');
                  if (internetCat) setSelectedUpsellCategory(internetCat);
                }}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'facturacion' && (
              <BillingScreen account={account} />
            )}

            {(currentTab === 'tickets' || currentTab === 'soporte' || currentTab === 'gestiones') && (
              <TicketsScreen />
            )}

            {currentTab === 'perfil' && (
              <CompanyProfileScreen account={account} />
            )}
          </div>
        </div>
      </main>

      {/* Frosted Glass Footer */}
      <footer className="glass-header py-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-12 border-t border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-black text-slate-800 dark:text-slate-200">IPLAN Argentina</span>
            <span>•</span>
            <span>Centro de Operaciones de Red (NOC) 24/7: 0800-345-IPLAN</span>
          </div>
          <div>
            <span>© 2026 IPLAN Telecomunicaciones. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>

      {/* Upsell / Cross-sell Pop-up Modal */}
      <UpsellModal
        category={selectedUpsellCategory}
        onClose={() => setSelectedUpsellCategory(null)}
        onActionClick={handleUpsellModalAction}
      />

      {/* Virtual PABX 4-step Wizard Modal */}
      {isVirtualPabxOpen && (
        <VirtualPabxWizard
          onClose={() => setIsVirtualPabxOpen(false)}
          onSuccess={handleVirtualPabxSuccess}
        />
      )}

      {/* Dedicated Executive Modal */}
      {isExecutiveModalOpen && (
        <ExecutiveModal
          account={account}
          onClose={() => setIsExecutiveModalOpen(false)}
        />
      )}

      {/* Floating AI Assistant PatricIA */}
      <PatriciaChat
        isOpen={isPatriciaOpen}
        onToggle={() => setIsPatriciaOpen(!isPatriciaOpen)}
        onNavigate={setCurrentTab}
        onOpenUpgradeOffer={() => {
          const internetCat = categories.find(c => c.id === 'internet');
          if (internetCat) setSelectedUpsellCategory(internetCat);
        }}
        onOpenVirtualPabx={() => setIsVirtualPabxOpen(true)}
      />

      {/* Lateral Live Demo Control Drawer */}
      <DemoDrawer
        isOpen={isDemoDrawerOpen}
        onClose={() => setIsDemoDrawerOpen(false)}
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        account={account}
        onUpdateAccount={setAccount}
        categories={categories}
        onUpdateCategories={setCategories}
        onTriggerNotification={handleTriggerNotification}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}
