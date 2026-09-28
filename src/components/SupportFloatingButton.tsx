import React from 'react';
import { Sparkles, Activity } from 'lucide-react';

interface SupportFloatingButtonProps {
  onOpenSupport: () => void;
  onOpenSkinQuiz?: () => void;
  isMobileFrame?: boolean;
}

export const SupportFloatingButton: React.FC<SupportFloatingButtonProps> = ({
  onOpenSupport,
  onOpenSkinQuiz,
  isMobileFrame = false,
}) => {
  if (isMobileFrame) {
    // In simulated mobile screen, position nicely above bottom nav
    return (
      <div className="absolute bottom-16 right-3 z-40 flex flex-col items-end space-y-1.5">
        {onOpenSkinQuiz && (
          <button
            onClick={onOpenSkinQuiz}
            className="bg-[#fcf9f4] text-[#74584d] hover:bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 border border-[#fed8c9] text-xs transition-all active:scale-95"
            title="Làm bài trắc nghiệm soi da AI"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold">Soi Da AI</span>
          </button>
        )}

        <button
          id="mobile-floating-support-btn"
          onClick={onOpenSupport}
          className="bg-[#1c1c19] hover:bg-black text-white px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-1.5 border border-[#fed8c9]/40 active:scale-95 transition-all text-xs group"
          title="Chat với AI & Chăm sóc khách hàng 24/7"
        >
          <div className="relative">
            <Sparkles className="w-3.5 h-3.5 text-[#fed8c9] animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-[11px] font-medium tracking-wide">Chat AI • CSKH</span>
        </button>
      </div>
    );
  }

  // On standard desktop or responsive layout
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {onOpenSkinQuiz && (
        <button
          onClick={onOpenSkinQuiz}
          className="bg-white/95 hover:bg-white text-[#74584d] hover:text-[#584137] px-3.5 py-2 rounded-full shadow-lg flex items-center space-x-2 border border-[#fed8c9] hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer group"
          title="Làm bài trắc nghiệm soi da AI (1 phút)"
        >
          <div className="w-5 h-5 rounded-full bg-[#f4ece3] flex items-center justify-center text-emerald-700">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide">Trắc Nghiệm Soi Da AI</span>
          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">
            1 PHÚT
          </span>
        </button>
      )}

      <button
        id="desktop-floating-support-btn"
        onClick={onOpenSupport}
        className="bg-[#1c1c19] hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-[#fed8c9]/50 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        title="Chat AI tư vấn da liễu & Chăm sóc khách hàng 24/7"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#fed8c9] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#1c1c19] animate-pulse" />
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
            Tư vấn mọi câu hỏi • Hotline 1900 8899
          </span>
        </div>
      </button>
    </div>
  );
};
