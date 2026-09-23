import React from 'react';
import { Flower2, ChevronRight } from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';

interface RitualCalloutProps {
  onOpenRitual: () => void;
  isMobileFrame?: boolean;
}

export const RitualCallout: React.FC<RitualCalloutProps> = ({ onOpenRitual, isMobileFrame = false }) => {
  return (
    <div className={`w-full ${isMobileFrame ? 'px-3 pt-3.5' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6'}`}>
      <div
        onClick={onOpenRitual}
        className="cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-[#202022]/6 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Botanical Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#202022] group-hover:bg-[#fed8c9]/40 transition-colors shrink-0">
            <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" />
          </div>

          {/* Texts */}
          <div>
            <h3 className="font-serif text-sm sm:text-base font-normal text-[#1c1c19] tracking-tight">
              Nghi Thức Dưỡng Sáng Tự Nhiên
            </h3>
            <p className="text-[11px] sm:text-xs text-[#77767b] font-light mt-0.5">
              100% Thuần Chay • Chuẩn Da Liễu Thụy Sĩ
            </p>
          </div>
        </div>

        {/* Right Label */}
        <div className="flex items-center space-x-2 text-right">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 text-[10px] uppercase tracking-[0.2em] text-[#77767b] font-semibold">
              <AlpsIcon className="w-3 h-3" color="#74584d" />
              <span>ALPS</span>
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.15em] font-serif text-[#74584d] font-medium">RITUAL</div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#77767b] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
