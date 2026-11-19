import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  PhoneCall, 
  Receipt, 
  Key, 
  CornerDownLeft,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ChatMessage, ActiveTab } from '../types';
import { quickFaqAnswers } from '../data/mockData';

interface PatriciaChatProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onOpenUpgradeOffer: () => void;
  onOpenVirtualPabx: () => void;
}

export const PatriciaChat: React.FC<PatriciaChatProps> = ({
  isOpen,
  onToggle,
  onNavigate,
  onOpenUpgradeOffer,
  onOpenVirtualPabx
}) => {
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'patricia',
      text: '¡Hola Guido! Soy **PatricIA**, tu asistente virtual con Inteligencia Artificial de IPLAN Argentina. 🇦🇷\n\n¿En qué puedo ayudarte hoy?',
      timestamp: 'Ahora',
      quickActions: [
        { label: '🚀 ¿Cómo pedir un upgrade?', action: 'upgrade' },
        { label: '📄 Estado de mis facturas', action: 'saldo' },
        { label: '📞 Cotizar Central Virtual', action: 'central' },
        { label: '🔑 ¿Qué es el Transfer Token?', action: 'token' },
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('upgrade') || lower.includes('velocidad') || lower.includes('aumentar') || lower.includes('ancho de banda')) {
        botResponse = quickFaqAnswers.upgrade;
      } else if (lower.includes('saldo') || lower.includes('factura') || lower.includes('deuda') || lower.includes('pago')) {
        botResponse = quickFaqAnswers.saldo;
      } else if (lower.includes('central') || lower.includes('telefono') || lower.includes('interno') || lower.includes('llamada')) {
        botResponse = quickFaqAnswers.central;
      } else if (lower.includes('ivr') || lower.includes('bienvenida') || lower.includes('menu')) {
        botResponse = quickFaqAnswers.ivr;
      } else if (lower.includes('token') || lower.includes('transfer') || lower.includes('workspace') || lower.includes('microsoft')) {
        botResponse = quickFaqAnswers.token;
      } else if (lower.includes('soporte') || lower.includes('caida') || lower.includes('corte') || lower.includes('problema') || lower.includes('noc')) {
        botResponse = quickFaqAnswers.soporte;
      } else {
        botResponse = `Comprendo tu consulta sobre "${text}". Como cliente corporativo de IPLAN con CGP 1111111, tus enlaces de fibra óptica y servicios cloud se encuentran operativos. Si precisás una cotización inmediata o asistencia técnica especializada, puedo derivarte con tu ejecutivo asignado Alejandro Gómez o ayudarte a solicitarlo desde tu panel.`;
      }

      const botMsg: ChatMessage = {
        id: `p-${Date.now()}`,
        sender: 'patricia',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'upgrade') {
      handleSendMessage('¿Cómo solicitar un upgrade de velocidad?');
    } else if (action === 'saldo') {
      handleSendMessage('¿Cuál es el estado de mi saldo y próxima factura?');
    } else if (action === 'central') {
      handleSendMessage('Quiero cotizar una Central Virtual Cloud');
    } else if (action === 'token') {
      handleSendMessage('¿Cómo funciona el Transfer Token de Google/Microsoft?');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Button with Noticeable Heartbeat Pulse & Greeting CTA Bubble */}
      {!isOpen && (
        <div className="relative flex items-center">
          {/* Greeting CTA Speech Bubble */}
          {showGreetingBubble && (
            <div 
              className="absolute right-18 sm:right-20 bottom-0 mb-1 w-64 sm:w-72 glass-panel-elevated p-3.5 rounded-2xl shadow-2xl border border-pink-300/60 dark:border-pink-500/40 animate-pop-in z-30 cursor-pointer group"
              onClick={onToggle}
            >
              {/* Little Arrow pointing right towards the robot */}
              <div className="absolute -right-2 bottom-5 w-4 h-4 bg-white/90 dark:bg-slate-800/90 border-r border-t border-pink-300/60 dark:border-pink-500/40 rotate-45" />

              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base animate-wave-hand">👋</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight">
                    ¡Hola! Soy PatricIA
                  </span>
                  <span className="bg-[#E60067] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                    IA 24/7
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGreetingBubble(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Cerrar saludo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5">
                ¿Tenés alguna consulta sobre tus <strong className="text-slate-900 dark:text-white">enlaces, facturas o upgrades</strong>? ¡Estoy acá para ayudarte!
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">En línea ahora</span>
                </div>
                <span className="inline-flex items-center space-x-1 text-[11px] font-black text-[#E60067] dark:text-pink-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Chatear</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          )}

          {/* Floating Robot Button with Pulsing Radar Rings and Heartbeat Animation */}
          <div className="relative">
            {/* Outer radar pulse aura waves */}
            <span className="absolute -inset-2 rounded-full bg-[#E60067] opacity-30 animate-ping pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-[#2B75F6] opacity-20 animate-pulse pointer-events-none" />

            <button
              onClick={onToggle}
              id="btn-floating-patricia"
              aria-label="Abrir asistente inteligente PatricIA"
              className="relative w-15 h-15 bg-gradient-to-tr from-[#CC005A] via-[#E60067] to-[#FF2D88] hover:from-[#B3004F] hover:to-[#E60067] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-115 active:scale-95 cursor-pointer ring-4 ring-pink-300/80 dark:ring-pink-500/60 animate-heartbeat z-20"
            >
              <div className="relative flex items-center justify-center">
                <Bot className="w-8 h-8 drop-shadow-md" />
                
                {/* Active Green Online status indicator with ping */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 shadow-xs"></span>
                </span>

                {/* AI Sparkle badge */}
                <span className="absolute -bottom-1.5 -left-1.5 bg-blue-600 text-white text-[8px] font-black px-1 rounded-full border border-white dark:border-slate-900 shadow-xs">
                  IA
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="glass-panel-elevated rounded-3xl shadow-2xl w-[92vw] sm:w-96 h-[540px] max-h-[85vh] flex flex-col overflow-hidden animate-fadeIn">
          {/* Top Header */}
          <div className="glass-banner text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#E60067] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">
                🤖
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-black tracking-tight">PatricIA</h3>
                  <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">Asistente IA de IPLAN Argentina</p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="text-blue-100 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40 dark:bg-slate-900/40 backdrop-blur-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#2B75F6] dark:bg-blue-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">{m.timestamp}</span>

                {/* Quick action buttons if available */}
                {m.quickActions && m.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {m.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickAction(qa.action)}
                        className="text-[10px] font-bold bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 px-2.5 py-1 rounded-xl transition-all shadow-2xs hover:border-blue-400 cursor-pointer backdrop-blur-xs"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
                <div className="w-2 h-2 bg-[#E60067] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#2B75F6] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium ml-1">PatricIA está escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribí tu consulta a PatricIA..."
              className="flex-1 px-3.5 py-2.5 glass-input rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#E60067] hover:bg-[#CC005A] disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
