import React from 'react';
import { Headphones, Sparkles } from 'lucide-react';

interface SupportFloatingButtonProps {
  onOpenSupport: () => void;
  isMobileFrame?: boolean;
}

export const SupportFloatingButton: React.FC<SupportFloatingButtonProps> = ({
  onOpenSupport,
  isMobileFrame = false,
}) => {
  if (isMobileFrame) {
    // In simulated mobile screen, position nicely above bottom nav
    return (
      <button
        id="mobile-floating-support-btn"
        onClick={onOpenSupport}
        className="absolute bottom-16 right-4 z-40 bg-[#202022] hover:bg-black text-white px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-1.5 border border-[#fed8c9]/40 active:scale-95 transition-all text-xs group"
        title="Chat với AI & Chăm sóc khách hàng 24/7"
      >
        <div className="relative">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9] animate-spin-slow" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#8a9a86] rounded-full animate-ping" />
        </div>
        <span className="text-[11px] font-medium tracking-wide">Chat AI • CSKH</span>
      </button>
    );
  }

  // On standard desktop or responsive layout
  return (
    <button
      id="desktop-floating-support-btn"
      onClick={onOpenSupport}
      className="fixed bottom-6 right-6 z-40 bg-[#202022] hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-[#fed8c9]/50 hover:scale-105 active:scale-95 transition-all group"
      title="Chat AI tư vấn da liễu & Chăm sóc khách hàng 24/7"
    >
      <div className="relative flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-[#fed8c9] group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8a9a86] rounded-full ring-2 ring-[#202022] animate-pulse" />
      </div>
      <div className="text-left">
        <div className="flex items-center space-x-1">
          <span className="block text-[11px] font-semibold tracking-wider uppercase text-white leading-tight">
            Chat AI & CSKH
          </span>
          <span className="text-[8px] bg-[#fed8c9] text-[#1c1c19] px-1 rounded-xs font-bold leading-tight">
            24/7
          </span>
        </div>
        <span className="block text-[9px] text-[#fed8c9] font-light leading-tight">
          Tư vấn da • Hotline 1900 8899
        </span>
      </div>
    </button>
  );
};
