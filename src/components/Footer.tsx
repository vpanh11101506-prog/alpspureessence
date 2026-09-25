import React from 'react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake, Phone, Headphones, Mail, MapPin } from 'lucide-react';
import { AlpsLogo } from './AlpsLogo';
import { PaymentBadgesGroup, VisaBadge, VisaDebitBadge, MastercardBadge, NapasBadge, VietQRBadge } from './PaymentBadges';

interface FooterProps {
  isMobileFrame?: boolean;
  onOpenSupport?: () => void;
  onOpenPolicies?: (tab: 'returns' | 'privacy' | 'shipping') => void;
}

export const Footer: React.FC<FooterProps> = ({ isMobileFrame = false, onOpenSupport, onOpenPolicies }) => {
  return (
    <footer className={`bg-[#202022] text-[#fcf9f4] border-t border-[#31302d] ${isMobileFrame ? 'pb-24 pt-8 px-4' : 'pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6'}`}>
      <div className={`${isMobileFrame ? 'w-full' : 'max-w-7xl mx-auto'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#31302d]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <AlpsLogo
                iconColor="#fed8c9"
                textColor="text-white"
                subtitle="SKINCARE • PURE ESSENCE"
                className="items-start text-left"
              />
            </div>
            <p className="text-xs text-[#c7c6ca] font-light leading-relaxed">
              Thương hiệu dược mỹ phẩm thuần chay tiên phong chưng cất tại Zurich, Thụy Sĩ. Đánh thức vẻ rạng ngời thuần khiết của làn da.
            </p>
            <div className="pt-2 text-[11px] text-[#898789] space-y-1">
              <p><span className="text-[#fed8c9] font-medium">Chi nhánh TPHCM:</span> 30 D. Trịnh Đình Thảo, Tân Phú, Hồ Chí Minh</p>
            </div>
            {/* Visa payment images directly under HCM branch */}
            <div className="pt-2.5 space-y-1.5">
              <span className="block text-[10px] text-[#fed8c9] font-medium tracking-wide uppercase">
                Chấp nhận thẻ & thanh toán nhanh:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <VisaBadge className="h-6" />
                <VisaDebitBadge className="h-6" />
                <MastercardBadge className="h-6" />
                <NapasBadge className="h-6" />
                <VietQRBadge className="h-6" />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              BỘ SƯU TẬP
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="hover:text-white cursor-pointer transition-colors">Alps Gentle Purifying Cleanser (120ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Botanical Balancing Toner (100ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Radiance Glow Serum (30ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Regenerating Face Cream (50g)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Hydro-Lifting Sheet Mask (5x29g)</li>
            </ul>
          </div>

          {/* Customer Care & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase flex items-center space-x-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>CHĂM SÓC KHÁCH HÀNG</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">Hotline 24/7:</span>
                <a href="tel:19008899" className="text-white font-bold hover:text-[#fed8c9] transition-colors">
                  1900 8899 (Miễn cước)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">Email CSKH:</span>
                <a href="mailto:pure@alps.com" className="hover:text-white transition-colors">
                  pure@alps.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">Website:</span>
                <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">
                  alps.id.vn
                </a>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>Đổi trả & Hoàn tiền 30 ngày</span>
                <span className="text-[10px] text-[#fed8c9]">↗</span>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>Chính sách giao nhận & đồng kiểm</span>
                <span className="text-[10px] text-[#fed8c9]">↗</span>
              </li>
            </ul>

            {onOpenSupport && (
              <div className="pt-2">
                <button
                  onClick={onOpenSupport}
                  className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-[#fed8c9] hover:text-white text-xs font-semibold rounded-full border border-white/15 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>MỞ TRUNG TÂM CSKH</span>
                </button>
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              ĐẶC QUYỀN THÀNH VIÊN
            </h4>
            <p className="text-xs text-[#c7c6ca]">
              Đăng ký để nhận ưu đãi 10% cho đơn hàng đầu tiên và cẩm nang dưỡng da cá nhân hóa.
            </p>
            <div className="flex rounded-full overflow-hidden bg-[#31302d] p-1 border border-[#46464a]">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none flex-grow min-w-0"
              />
              <button
                className="bg-white hover:bg-[#fed8c9] text-[#1c1c19] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center shrink-0"
                title="Đăng ký"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-[#898789] pt-1">
              Phục vụ từ 8:00 đến 22:00 hàng ngày (kể cả Lễ, Tết).
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Strip (Visa, Mastercard, JCB, Napas, VietQR, MoMo, Apple Pay) */}
        <div className="py-6 border-b border-[#31302d] flex flex-col md:flex-row items-center justify-between gap-4">
          <PaymentBadgesGroup theme="dark" showLabel={true} badgeSize="h-7" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-[#898789]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#fed8c9]" />
              <span>Giao dịch mã hóa SSL 256-bit</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4 text-[#fed8c9]" />
              <span>Bảo vệ quyền lợi & Đồng kiểm khi nhận</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#898789] gap-3 text-center sm:text-left">
          <p>© 2025 Alps Pure Essence. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center space-x-3 text-[11px]">
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('privacy') : undefined}
              className="hover:text-white transition-colors"
            >
              Chính sách bảo mật
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
              className="hover:text-white transition-colors"
            >
              Đổi trả & Hoàn tiền
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
              className="hover:text-white transition-colors"
            >
              Vận chuyển
            </button>
            <span>•</span>
            {onOpenSupport ? (
              <button
                onClick={onOpenSupport}
                className="hover:text-[#fed8c9] text-[#c7c6ca] underline underline-offset-2 transition-colors"
              >
                Hỗ trợ & CSKH 24/7
              </button>
            ) : (
              <span className="hover:text-white cursor-pointer">Hotline: 1900 8899</span>
            )}
            <span>•</span>
            <a href="mailto:pure@alps.com" className="hover:text-white transition-colors">pure@alps.com</a>
            <span>•</span>
            <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">alps.id.vn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
