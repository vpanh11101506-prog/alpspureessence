import React from 'react';
import { Sparkles, Droplets, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import duoImg from '../assets/images/alps_toner_mask_duo_1790357381087.jpg';

interface MinimalistPackagingDesignProps {
  onOpenCollection?: () => void;
  onAddDuoToCart?: () => void;
  isMobileFrame?: boolean;
}

export const MinimalistPackagingDesign: React.FC<MinimalistPackagingDesignProps> = ({
  onOpenCollection,
  onAddDuoToCart,
  isMobileFrame = false,
}) => {
  const materialHighlights = [
    'Nước Cân Bằng ALPS (Botanical Balancing Toner 100ml): Nước khoáng sông băng Alpine & khuynh diệp thanh khiết, cân bằng pH 5.5, làm dịu da nhạy cảm & se mịn lỗ chân lông',
    'Mặt Nạ Thạch Sinh Học ALPS (Hydro-Lifting Sheet Mask - Hộp 5 miếng): Màng Bio-Cellulose dồi dào Collagen vi phân tử & Tảo tuyết đỏ Thụy Sĩ, cấp ẩm sâu gấp 10 lần & nâng cơ săn chắc tức thì',
    'Thủy tinh đúc mờ 2 lớp & sachet màng nhôm bảo quản: Cản 99.8% tia UV, bảo toàn trọn vẹn hoạt tính sinh học tế bào gốc tuyết Thụy Sĩ',
    'Thiết kế tối giản thuần khiết: Đường nét tinh gọn, nắp nhôm champagne phay xước sang trọng, giữ trọn thẩm mỹ Quiet Luxury',
  ];

  return (
    <section
      id="minimalist-packaging"
      className="py-12 sm:py-16 bg-[#faf8f5] text-[#1c1c19] border-t border-[#ebe6df] relative overflow-hidden"
    >
      {/* Ambient decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#eadecc]/30 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dfd7cc]/25 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#e4ded5] px-3.5 py-1 rounded-full text-[11px] font-medium tracking-[0.2em] text-[#74584d] uppercase mb-3 shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8b5545]" />
            <span>BỘ ĐÔI THIẾT YẾU • ALPS</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-[#1c1c19] leading-snug">
            Nước Cân Bằng & Mặt Nạ Sinh Học ALPS
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#5f5d58] leading-relaxed font-light">
            Sự kết hợp hoàn hảo giữa bước cân bằng chuẩn pH 5.5 và mặt nạ thạch sinh học Bio-Cellulose Thụy Sĩ. Cấp ẩm đa tầng, phục hồi tức thì và nâng cơ săn chắc cho làn da căng mọng sương mai.
          </p>
        </div>

        {/* Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#ebe5dc] shadow-sm">
          {/* Main Visual Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#f4f0eb] border border-[#e8e1d6] aspect-4/3 sm:aspect-16/10 group shadow-xs">
              <img
                src={duoImg}
                alt="Bộ đôi Nước Cân Bằng Thảo Mộc và Mặt Nạ Sinh Học ALPS"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-75" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-200/90 block">
                    ALPS BOTANICAL TONER & HYDRO-LIFTING MASK
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal mt-0.5">
                    Bộ Đôi Thiết Yếu: Toner & Mặt Nạ ALPS
                  </h3>
                </div>
                <div className="hidden sm:inline-flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] border border-white/20">
                  <Droplets className="w-3 h-3 text-amber-300" />
                  <span>pH 5.5 & Bio-Cellulose Collagen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Design Details & Formula */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8b5545] font-semibold block mb-1">
                TRIẾT LÝ CẤP ẨM & PHỤC HỒI THỤY SĨ
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19] tracking-tight">
                Bộ Đôi Chăm Sóc Thiết Yếu ALPS
              </h3>
              <p className="text-xs sm:text-sm text-[#5f5d58] mt-2.5 leading-relaxed font-light">
                Hai bước cốt lõi đánh thức sức sống làn da: Nước cân bằng thảo mộc làm dịu, cân bằng pH 5.5 ngay sau bước rửa mặt; cùng Mặt nạ thạch sinh học Bio-Cellulose dồi dào Collagen vi phân tử ôm khít khuôn mặt, nâng cơ và phục hồi màng ẩm sinh học sau 20 phút.
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-[#1c1c19] block tracking-wide">
                Đặc Tính Nổi Bật Của Bộ Đôi:
              </span>
              <ul className="space-y-2.5">
                {materialHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#464542] leading-snug">
                    <div className="w-4 h-4 rounded-full bg-[#f2eae1] border border-[#dfd2c1] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#8b5545]" />
                    </div>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Three Micro Metrics */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#ebe5dc]">
              <div className="p-2.5 bg-[#fbf9f6] rounded-xl border border-[#efe7dd] text-center">
                <div className="font-serif text-sm font-semibold text-[#1c1c19]">pH 5.5</div>
                <div className="text-[10px] text-[#77746f] mt-0.5 leading-tight">Cân bằng lý tưởng</div>
              </div>
              <div className="p-2.5 bg-[#fbf9f6] rounded-xl border border-[#efe7dd] text-center">
                <div className="font-serif text-sm font-semibold text-[#1c1c19]">10x Ẩm</div>
                <div className="text-[10px] text-[#77746f] mt-0.5 leading-tight">Bio-Cellulose</div>
              </div>
              <div className="p-2.5 bg-[#fbf9f6] rounded-xl border border-[#efe7dd] text-center">
                <div className="font-serif text-sm font-semibold text-[#1c1c19]">-4.5°C</div>
                <div className="text-[10px] text-[#77746f] mt-0.5 leading-tight">Hạ nhiệt dịu mát</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              {onAddDuoToCart && (
                <button
                  onClick={onAddDuoToCart}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#74584d] hover:bg-[#5e453c] text-white px-5 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Mua Bộ Đôi (Toner + Mask)</span>
                </button>
              )}

              {onOpenCollection && (
                <button
                  onClick={onOpenCollection}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#1c1c19] text-[#f7f5f0] hover:bg-[#323235] px-5 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-xs"
                >
                  <span>Khám Phá Sản Phẩm ALPS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
