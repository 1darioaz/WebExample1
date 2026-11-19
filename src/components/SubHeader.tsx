import React from 'react';
import { UserCheck } from 'lucide-react';
import { UserAccount } from '../types';

interface SubHeaderProps {
  account: UserAccount;
  onOpenExecutive: () => void;
}

export const SubHeader: React.FC<SubHeaderProps> = ({
  account,
  onOpenExecutive
}) => {
  return (
    <div className="glass-subheader text-white py-2.5 px-4 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-medium gap-2">
        {/* Left CGP info */}
        <div className="flex items-center space-x-2 tracking-wide truncate">
          <span className="font-extrabold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[11px] border border-white/20 shadow-xs">
            MI IPLAN
          </span>
          <span className="text-blue-200">|</span>
          <span className="font-bold truncate text-white drop-shadow-xs">
            {account.companyName}
          </span>
          <span className="text-blue-100 font-semibold">
            CGP: {account.cgp}
          </span>
        </div>

        {/* Right dedicated executive CTA */}
        <button
          onClick={onOpenExecutive}
          className="inline-flex items-center space-x-1.5 text-white hover:text-white bg-white/15 hover:bg-white/25 backdrop-blur-md px-3.5 py-1 rounded-full transition-all border border-white/30 text-xs font-bold cursor-pointer w-fit shadow-xs hover:scale-105"
          id="btn-executive-subheader"
        >
          <UserCheck className="w-3.5 h-3.5 text-pink-300" />
          <span>Tu ejecutivo dedicado</span>
          <span className="bg-[#E60067] text-white text-[10px] px-2 py-0.2 rounded-full font-black shadow-xs">Directo</span>
        </button>
      </div>
    </div>
  );
};
