import React from 'react';
import { ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';

interface BrandPhilosophyProps {
  isMobileFrame?: boolean;
}

export const BrandPhilosophy: React.FC<BrandPhilosophyProps> = ({ isMobileFrame = false }) => {
  return (
    <section className={`w-full ${isMobileFrame ? 'px-3 py-6' : 'max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14'}`}>
      <div className="bg-[#f6f3ee]/80 border border-[#202022]/6 rounded-[2rem] p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#fed8c9]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Label */}
        <span className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#74584d] uppercase mb-2">
          <AlpsIcon className="w-3.5 h-3.5" color="#74584d" />
          <span>CẢM HỨNG NGHỆ THUẬT ALPS</span>
        </span>

        {/* Heading */}
        <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-normal text-[#1c1c19] tracking-tight max-w-2xl mx-auto">
          Sự Thuần Khiết Tột Cùng
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-[#46464a] font-light leading-relaxed max-w-2xl mx-auto mt-3 sm:mt-4">
          Mỗi công thức Alps được chưng cất tỉ mỉ tại Zurich, phối hợp giữa tinh hoa thảo mộc thượng hạng và công nghệ dưỡng sáng sinh học phân tử giúp đánh thức năng lượng tinh khôi bên trong bạn.
        </p>

        {/* Key Metrics / Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto mt-6 sm:mt-10 pt-6 border-t border-[#202022]/8">
          <div className="text-center">
            <div className="font-serif text-xl sm:text-3xl md:text-4xl font-normal text-[#1c1c19]">
              99.4%
            </div>
            <div className="text-[10px] sm:text-xs tracking-wider uppercase text-[#77767b] mt-1 font-medium">
              TỰ NHIÊN
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif text-xl sm:text-3xl md:text-4xl font-normal text-[#1c1c19]">
              28 Ngày
            </div>
            <div className="text-[10px] sm:text-xs tracking-wider uppercase text-[#77767b] mt-1 font-medium">
              SÁNG MỊN
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif text-xl sm:text-3xl md:text-4xl font-normal text-[#1c1c19]">
              0%
            </div>
            <div className="text-[10px] sm:text-xs tracking-wider uppercase text-[#77767b] mt-1 font-medium">
              Paraben • LÀNH TÍNH
            </div>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#77767b]">
          <span className="flex items-center space-x-1.5 bg-white/60 px-3 py-1 rounded-full border border-[#ebe8e3]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8a9a86]" />
            <span>Chuẩn Da Liễu Thụy Sĩ</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-white/60 px-3 py-1 rounded-full border border-[#ebe8e3]">
            <Leaf className="w-3.5 h-3.5 text-[#8a9a86]" />
            <span>100% Thuần Chay</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-white/60 px-3 py-1 rounded-full border border-[#ebe8e3]">
            <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Không Thử Nghiệm Trên Động Vật</span>
          </span>
        </div>
      </div>
    </section>
  );
};
