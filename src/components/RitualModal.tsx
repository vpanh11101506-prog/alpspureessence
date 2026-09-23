import React from 'react';
import { X, Check, ArrowRight, Sparkles, Droplet } from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { ROUTINE_STEPS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface RitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onBuyFullSet: () => void;
  onAddFullSetToCart?: () => void;
}

export const RitualModal: React.FC<RitualModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onBuyFullSet,
  onAddFullSetToCart,
}) => {
  if (!isOpen) return null;

  const fullSetPrice = PRODUCTS.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountPrice = fullSetPrice - 200000; // Bundle saving

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#fcf9f4] rounded-[2rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#202022]/8 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#74584d]">
              <AlpsIcon className="w-3.5 h-3.5" color="#74584d" />
              <span>NGHI THỨC ALPS RITUAL</span>
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19]">
              Nghi Thức Dưỡng Sáng Tự Nhiên {ROUTINE_STEPS.length} Bước
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f3ee] text-[#1c1c19] hover:bg-[#ebe8e3] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#46464a] leading-relaxed">
            Thiết kế dựa trên nhịp sinh học biểu bì da, kết hợp tinh chất thực vật sông băng và công nghệ peptide Thụy Sĩ nhằm phục hồi ánh sáng tự nhiên sau 28 ngày chu kỳ tế bào.
          </p>

          <div className="space-y-3">
            {ROUTINE_STEPS.map((step) => {
              const product = PRODUCTS.find((p) => p.id === step.productId);
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-4 border border-[#202022]/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/10">
                        {product && (
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = product.fallbackImage;
                            }}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#202022] text-white flex items-center justify-center font-serif text-[10px]">
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif text-sm sm:text-base font-medium text-[#1c1c19]">
                          {step.name}
                        </h4>
                        <span className="text-[10px] text-[#77767b] bg-[#f0ede9] px-2 py-0.5 rounded-full">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#74584d] font-semibold mt-0.5">
                        {step.product}
                      </p>
                      <p className="text-xs text-[#46464a] font-light mt-1 max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {product && (
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="self-end sm:self-center text-xs font-semibold tracking-wider text-[#1c1c19] hover:text-[#74584d] flex items-center space-x-1 shrink-0 bg-[#f6f3ee] hover:bg-[#f0ede9] px-3 py-1.5 rounded-full transition-colors"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bundle Special Offer */}
          <div className="bg-[#f0ede9] rounded-2xl p-4 sm:p-5 border border-[#ebe8e3] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] text-[#74584d] font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ƯU ĐÃI TRỌN BỘ RITUAL {ROUTINE_STEPS.length} SẢN PHẨM</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#1c1c19]">
                  {bundleDiscountPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-xs sm:text-sm text-[#77767b] line-through">
                  {fullSetPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-[11px] text-[#ba1a1a] font-semibold bg-[#ba1a1a]/10 px-2 py-0.5 rounded-full">
                  Tiết kiệm 200.000₫
                </span>
              </div>
              <p className="text-xs text-[#77767b] mt-1">
                Tặng kèm thìa bạc cao cấp & túi nhung Alps độc quyền.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {onAddFullSetToCart && (
                <button
                  onClick={() => {
                    onAddFullSetToCart();
                    onClose();
                  }}
                  className="px-5 py-3 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-xs font-semibold tracking-wider rounded-full border border-[#202022]/15 transition-all shadow-xs active:scale-98"
                >
                  THÊM TRỌN BỘ VÀO GIỎ
                </button>
              )}

              <button
                onClick={() => {
                  onBuyFullSet();
                  onClose();
                }}
                className="px-6 py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-md shrink-0 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#fed8c9]" />
                <span>MUA NGAY TRỌN BỘ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
