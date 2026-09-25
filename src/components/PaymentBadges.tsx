import React from 'react';
import { SiVisa, SiMastercard, SiJcb, SiApplepay } from 'react-icons/si';
import { ShieldCheck, Lock, Wifi } from 'lucide-react';

/**
 * High-fidelity Official Visa Logo Badge
 */
export const VisaBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Thẻ Visa Quốc Tế',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <div className="flex items-center h-full">
      <SiVisa className="h-4 sm:h-4.5 w-auto text-[#1434CB] hover:text-[#1A1F71] transition-colors" />
    </div>
  </div>
);

/**
 * Visa Debit Card Badge with Official Emblem
 */
export const VisaDebitBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Thẻ Visa Debit / Ghi Nợ Quốc Tế',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 space-x-1 ${className}`}
    title={title}
  >
    <SiVisa className="h-3.5 sm:h-4 w-auto text-[#1434CB]" />
    <span className="text-[8px] font-black text-[#1A1F71] tracking-tighter uppercase font-sans border-l border-gray-300 pl-1">
      DEBIT
    </span>
  </div>
);

/**
 * Visa Secure / Verified by Visa Security Badge
 */
export const VisaSecureBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Visa Secure - Xác thực 3D OTP Bảo Mật 100%',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-gradient-to-r from-[#1434CB]/10 to-[#1434CB]/5 rounded-md border border-[#1434CB]/25 px-2 py-0.5 shadow-2xs shrink-0 space-x-1 text-[#1434CB] ${className}`}
    title={title}
  >
    <Lock className="w-3 h-3 text-[#1434CB]" />
    <SiVisa className="h-3 sm:h-3.5 w-auto text-[#1434CB]" />
    <span className="text-[8.5px] font-extrabold tracking-tight uppercase">SECURE</span>
  </div>
);

/**
 * Mastercard Official Badge
 */
export const MastercardBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Thẻ Mastercard Quốc Tế',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <SiMastercard className="h-4 sm:h-4.5 w-auto text-[#EB001B]" />
  </div>
);

/**
 * JCB International Card Badge
 */
export const JcbBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Thẻ JCB Quốc Tế',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-1.5 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <SiJcb className="h-4 sm:h-4.5 w-auto text-[#0079C1]" />
  </div>
);

/**
 * Napas 247 National Card & Payment Badge
 */
export const NapasBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Thẻ ATM Nội địa & Chuyển khoản Napas 247',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <div className="flex items-center space-x-0.5 leading-none">
      <span className="font-black text-[11px] tracking-tight text-[#003580] font-sans">napas</span>
      <span className="font-extrabold text-[11px] tracking-tight text-[#008850] font-sans">247</span>
    </div>
  </div>
);

/**
 * VietQR Instant Payment Badge
 */
export const VietQRBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'VietQR Thanh toán quét mã ngân hàng',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-white rounded-md border border-[#202022]/15 px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <div className="flex items-center space-x-0.5 leading-none">
      <span className="font-black text-[12px] tracking-tighter text-[#E02020]">Viet</span>
      <span className="font-black text-[12px] tracking-tighter text-[#0052CC]">QR</span>
    </div>
  </div>
);

/**
 * MoMo e-Wallet Badge
 */
export const MomoBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Ví điện tử MoMo',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-[#A50064] text-white rounded-md px-1.5 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <span className="font-black text-[10.5px] tracking-tight">MoMo</span>
  </div>
);

/**
 * Apple Pay Badge
 */
export const ApplePayBadge: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-6 sm:h-7',
  title = 'Apple Pay',
}) => (
  <div
    className={`inline-flex items-center justify-center bg-black text-white rounded-md px-2 py-0.5 shadow-2xs hover:shadow-xs transition-shadow shrink-0 ${className}`}
    title={title}
  >
    <div className="flex items-center space-x-0.5">
      <SiApplepay className="h-4 w-auto text-white" />
    </div>
  </div>
);

/**
 * Realistic 3D Virtual Visa / Credit Card Preview Component
 */
interface RealisticCardVisualProps {
  cardNumber?: string;
  cardHolder?: string;
  cardExpiry?: string;
  isAuthorized?: boolean;
}

export const RealisticCardVisual: React.FC<RealisticCardVisualProps> = ({
  cardNumber = '',
  cardHolder = '',
  cardExpiry = '',
  isAuthorized = false,
}) => {
  const displayNum = cardNumber.trim()
    ? cardNumber.padEnd(19, '•')
    : '•••• •••• •••• ••••';
  const displayName = cardHolder.trim() ? cardHolder.toUpperCase() : 'NGUYEN VAN A';
  const displayExpiry = cardExpiry.trim() ? cardExpiry : '12/28';

  // Detect card type
  const clean = cardNumber.replace(/\s/g, '');
  const isMastercard = clean.startsWith('5');
  const isVisa = clean.startsWith('4') || (!isMastercard && clean.length > 0) || !clean;

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl p-5 shadow-xl transition-all duration-300 bg-gradient-to-tr from-[#0F1E4A] via-[#1A2F6C] to-[#1F3D8C] text-white border border-white/20 select-none">
      {/* Hologram / background radial highlight */}
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#fed8c9]/25 to-blue-400/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />

      {/* Top row: Brand & Microchip & Contactless */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* EMV Microchip Graphic */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#ffd778] via-[#e5b842] to-[#b88c1e] p-0.5 shadow-inner border border-[#d6a529] relative overflow-hidden">
            <div className="w-full h-full border border-amber-900/30 rounded-xs grid grid-cols-3 grid-rows-2 gap-0.5 opacity-80">
              <div className="border-r border-b border-amber-900/30" />
              <div className="border-r border-b border-amber-900/30" />
              <div className="border-b border-amber-900/30" />
              <div className="border-r border-amber-900/30" />
              <div className="border-r border-amber-900/30" />
              <div />
            </div>
          </div>
          {/* Contactless Wifi Icon */}
          <Wifi className="w-5 h-5 text-white/70 rotate-90" />
        </div>

        {/* Card Network Logo */}
        <div className="flex items-center bg-white/95 px-2.5 py-1 rounded-md shadow-xs">
          {isMastercard ? (
            <SiMastercard className="h-5 w-auto text-[#EB001B]" />
          ) : (
            <SiVisa className="h-5 w-auto text-[#1434CB]" />
          )}
        </div>
      </div>

      {/* 16-digit Card Number */}
      <div className="relative my-3 font-mono text-base sm:text-lg tracking-[0.18em] text-white font-semibold drop-shadow-sm">
        {displayNum}
      </div>

      {/* Bottom details: Cardholder & Expiry & Status */}
      <div className="relative flex items-end justify-between pt-1 text-xs">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-white/60 font-sans">
            Chủ thẻ / Cardholder
          </span>
          <span className="font-mono font-medium tracking-wider text-white truncate max-w-[170px] block">
            {displayName}
          </span>
        </div>

        <div className="text-right">
          <span className="block text-[8px] uppercase tracking-wider text-white/60 font-sans">
            Hết hạn / Expires
          </span>
          <span className="font-mono font-medium tracking-wider text-white">
            {displayExpiry}
          </span>
        </div>

        {/* 3D Secure / Authorized Seal */}
        <div className="flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/20 text-[9px]">
          {isAuthorized ? (
            <>
              <ShieldCheck className="w-3 h-3 text-[#7fe69b]" />
              <span className="text-[#7fe69b] font-semibold">Đã xác thực 3D OTP</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-[#fed8c9]" />
              <span className="text-white/80">Visa Secure</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface PaymentBadgesGroupProps {
  theme?: 'dark' | 'light';
  showLabel?: boolean;
  className?: string;
  badgeSize?: string;
}

export const PaymentBadgesGroup: React.FC<PaymentBadgesGroupProps> = ({
  theme = 'dark',
  showLabel = true,
  className = '',
  badgeSize = 'h-7',
}) => {
  const textColor = theme === 'dark' ? 'text-[#898789]' : 'text-[#77767b]';
  const labelColor = theme === 'dark' ? 'text-[#fed8c9]' : 'text-[#74584d]';

  return (
    <div className={`flex flex-col space-y-2.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${labelColor}`}>
            CỔNG THANH TOÁN & THẺ ĐƯỢC CHẤP NHẬN
          </span>
          <span className={`text-[9.5px] ${textColor} hidden sm:inline`}>
            (Chuẩn quốc tế PCI-DSS & Visa Secure SSL)
          </span>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <VisaBadge className={badgeSize} />
        <VisaDebitBadge className={badgeSize} />
        <VisaSecureBadge className={badgeSize} />
        <MastercardBadge className={badgeSize} />
        <JcbBadge className={badgeSize} />
        <NapasBadge className={badgeSize} />
        <VietQRBadge className={badgeSize} />
        <MomoBadge className={badgeSize} />
        <ApplePayBadge className={badgeSize} />
      </div>
    </div>
  );
};
