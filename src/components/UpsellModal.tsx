import React from 'react';
import { Rocket, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../types';
import confetti from 'canvas-confetti';

interface UpsellModalProps {
  category: ServiceCategory | null;
  onClose: () => void;
  onActionClick: (categoryId: string) => void;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({
  category,
  onClose,
  onActionClick
}) => {
  if (!category) return null;

  const handleAction = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onActionClick(category.id);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          id="btn-close-upsell-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Rocket Icon in pink circular badge (as in screenshot 15) */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-pink-100/80 dark:bg-pink-950/80 border border-pink-200 dark:border-pink-800 rounded-full flex items-center justify-center text-2xl shadow-xs backdrop-blur-xs">
            <span className="text-[#E60067]">🚀</span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-6">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">
            {category.modalOffer.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 max-w-md mx-auto">
            {category.modalOffer.subtitle}
          </p>
        </div>

        {/* Benefits Card */}
        <div className="glass-panel-subtle rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 mb-6">
          <h4 className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-3">
            Beneficios Exclusivos para tu Empresa:
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {category.modalOffer.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-[#E60067] dark:text-pink-400 font-bold text-sm leading-4">•</span>
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>

          {category.modalOffer.discountedCost && (
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Inversión bonificada:</span>
              <span className="font-extrabold text-[#E60067] dark:text-pink-400 text-sm bg-pink-50/80 dark:bg-pink-950/80 px-2.5 py-1 rounded-lg border border-pink-200 dark:border-pink-800 backdrop-blur-xs">
                {category.modalOffer.discountedCost}
              </span>
            </div>
          )}
        </div>

        {/* Action Button Magenta */}
        <button
          onClick={handleAction}
          id="btn-propuesta-comercial-modal"
          className="w-full bg-[#E60067] hover:bg-[#CC005A] text-white py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-pink-500/25 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105"
        >
          <span>{category.modalOffer.actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
