import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles, Truck, Tag } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { AlpsIcon } from './AlpsLogo';
import { VisaBadge, VisaSecureBadge, MastercardBadge, NapasBadge, VietQRBadge } from './PaymentBadges';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user?: UserProfile | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
  onOpenCheckout: () => void;
  onExploreProducts: () => void;
  onOpenSupport?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  onExploreProducts,
}) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedVoucher === 'ALPS2025' ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 30000;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === 'ALPS2025') {
      setAppliedVoucher('ALPS2025');
      setVoucherError(null);
    } else {
      setVoucherError('Mã không hợp lệ. Hãy thử mã ALPS2025');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f4] border-l border-[#202022]/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-5 py-4.5 bg-white border-b border-[#202022]/8 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1c1c19]">
                  Giỏ Hàng Của Bạn
                </h3>
                <p className="text-[11px] text-[#77767b]">
                  {totalItemCount === 0 ? 'Chưa có sản phẩm nào' : `${totalItemCount} sản phẩm được chọn`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {items.length > 0 && onClearCart && (
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-[#77767b] hover:text-[#ba1a1a] transition-colors px-2 py-1"
                  title="Xóa toàn bộ sản phẩm trong giỏ"
                >
                  Xóa hết
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center transition-colors"
                title="Đóng giỏ hàng"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-[#f4eee6] border border-[#d8b4a6]/40 flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-9 h-9 text-[#74584d] stroke-[1.3]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-xs border border-[#ebe8e3] flex items-center justify-center">
                    <AlpsIcon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] mb-2">
                  Giỏ hàng của bạn đang trống
                </h4>

                <p className="text-xs sm:text-sm text-[#77767b] max-w-xs leading-relaxed mb-6">
                  Bạn chưa chọn sản phẩm nào. Hãy khám phá bộ sưu tập tế bào gốc thuần chay tuyết Alps Thụy Sĩ để bắt đầu nghi thức nuôi dưỡng làn da.
                </p>

                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="w-full max-w-xs py-3 px-6 rounded-full bg-[#1c1c19] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
                  <span>KHÁM PHÁ SẢN PHẨM NGAY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Swiss Quality Highlights */}
                <div className="mt-10 pt-6 border-t border-[#202022]/6 w-full max-w-xs space-y-3 text-left">
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <ShieldCheck className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>100% Chính hãng Thụy Sĩ • Thuần chay hữu cơ</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <Truck className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>Miễn phí giao hàng toàn quốc từ 500.000₫</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <Sparkles className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>Tặng kèm quà đặc quyền cho mỗi đơn hàng</span>
                  </div>
                </div>
              </div>
            ) : (
              /* FILLED CART ITEMS */
              <div className="space-y-4">
                {/* Free shipping progress bar */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#1c1c19] font-medium flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#74584d]" />
                      <span>
                        {remainingForFreeShipping === 0
                          ? 'Đã đủ điều kiện Miễn phí vận chuyển!'
                          : `Mua thêm ${remainingForFreeShipping.toLocaleString('vi-VN')}₫ để FREESHIP`}
                      </span>
                    </span>
                    <span className="text-[11px] text-[#74584d] font-semibold">
                      {subtotal >= freeShippingThreshold ? '100%' : `${Math.round((subtotal / freeShippingThreshold) * 100)}%`}
                    </span>
                  </div>
                  <div className="w-full bg-[#f0ede9] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#74584d] h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#202022]/6 bg-white rounded-2xl border border-[#202022]/6 overflow-hidden">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-3.5 flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f6f3ee] shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = item.product.fallbackImage;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-xs sm:text-sm font-medium text-[#1c1c19] line-clamp-1">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-[#77767b] mt-0.5">
                          {item.product.capacity}
                        </p>
                        <p className="font-serif text-xs font-semibold text-[#1c1c19] mt-1">
                          {item.product.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#77767b] hover:text-[#ba1a1a] p-1 transition-colors"
                          title="Xóa khỏi giỏ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center space-x-1.5 bg-[#f6f3ee] rounded-full px-2 py-0.5 border border-[#202022]/5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="text-xs text-[#77767b] hover:text-[#1c1c19] px-1 font-light"
                          >
                            -
                          </button>
                          <span className="text-[11px] font-medium text-[#1c1c19] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="text-xs text-[#77767b] hover:text-[#1c1c19] px-1 font-light"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voucher Box */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6">
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#77767b]" />
                      <input
                        type="text"
                        placeholder="Mã giảm giá (ví dụ: ALPS2025)"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fcf9f4] border border-[#202022]/10 rounded-xl focus:outline-hidden focus:border-[#74584d]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#f6f3ee] hover:bg-[#ede7df] text-[#1c1c19] text-xs font-medium rounded-xl transition-colors shrink-0"
                    >
                      Áp dụng
                    </button>
                  </form>
                  {appliedVoucher && (
                    <p className="text-[11px] text-[#2d4a36] font-medium mt-2 flex items-center space-x-1">
                      <span>✓ Đã áp dụng mã {appliedVoucher} (-10%)</span>
                    </p>
                  )}
                  {voucherError && (
                    <p className="text-[11px] text-[#ba1a1a] mt-1.5">
                      {voucherError}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with totals and checkout button (only if has items) */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#202022]/8 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#77767b]">
                  <span>Tạm tính</span>
                  <span className="font-serif">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2d4a36]">
                    <span>Giảm giá voucher</span>
                    <span className="font-serif">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between text-[#77767b]">
                  <span>Phí vận chuyển</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                </div>
                <div className="pt-2 border-t border-[#202022]/6 flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-[#1c1c19]">Tổng thanh toán</span>
                  <span className="font-serif text-base font-bold text-[#1c1c19]">
                    {totalAmount.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#1c1c19] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>TIẾN HÀNH THANH TOÁN</span>
                <ArrowRight className="w-4 h-4 text-[#fed8c9]" />
              </button>

              {/* Payment badges guarantee */}
              <div className="pt-2 flex flex-col items-center justify-center space-y-1.5 border-t border-[#202022]/6">
                <span className="text-[10px] text-[#77767b]">Chấp nhận thanh toán bảo mật:</span>
                <div className="flex items-center space-x-1.5 flex-wrap justify-center">
                  <VisaBadge className="h-5" />
                  <VisaSecureBadge className="h-5" />
                  <MastercardBadge className="h-5" />
                  <NapasBadge className="h-5" />
                  <VietQRBadge className="h-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
