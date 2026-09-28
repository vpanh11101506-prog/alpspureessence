import React from 'react';
import { CheckCircle2, Sparkles, X, Package, MapPin, Headphones, ArrowRight } from 'lucide-react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  recipientName?: string;
  phone?: string;
  shippingAddress?: string;
  onViewOrders?: () => void;
  onOpenSupport?: () => void;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  recipientName,
  phone,
  shippingAddress,
  onViewOrders,
  onOpenSupport,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 text-center z-10 border border-[#202022]/10 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#77767b] hover:text-[#1c1c19] p-1.5 rounded-full hover:bg-[#f6f3ee] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold block mb-1">
          ĐẶT HÀNG THÀNH CÔNG
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19]">
          Cảm ơn bạn đã lựa chọn Alps
        </h3>

        <p className="text-xs text-[#46464a] mt-2 leading-relaxed">
          Đơn hàng <span className="font-semibold text-[#1c1c19]">#{orderNumber}</span> đã được chuyển đến bộ phận xử lý và chuẩn bị giao hàng theo quy chuẩn Alps Thụy Sĩ.
        </p>

        {/* Shipping address info */}
        {(shippingAddress || recipientName) && (
          <div className="bg-[#fcf9f4] rounded-2xl p-3.5 mt-4 text-left border border-[#ebe8e3] text-xs text-[#46464a] space-y-1">
            <div className="flex items-center space-x-1.5 font-medium text-[#1c1c19]">
              <MapPin className="w-3.5 h-3.5 text-[#74584d]" />
              <span>Giao đến địa chỉ:</span>
            </div>
            <div className="pl-5 space-y-0.5">
              <p className="font-medium text-[#1c1c19] text-[11px]">
                {recipientName || 'Quý khách'} {phone ? `• ${phone}` : ''}
              </p>
              {shippingAddress && (
                <p className="text-[#77767b] text-[11px] leading-relaxed">
                  {shippingAddress}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#fcf9f4] rounded-2xl p-4 mt-3 text-left border border-[#ebe8e3] text-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#74584d] font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Đặc quyền & quà tặng gửi kèm:</span>
          </div>
          <ul className="text-[#46464a] space-y-1 pl-6 list-disc text-[11px]">
            <li>Tem niêm phong bảo chứng chất lượng tinh hoa Thụy Sĩ Alps</li>
            <li>Bộ mẫu thử 3 ngày dòng Serum Tái Sinh Ngọc Trai Thụy Sĩ</li>
            <li>Thư cảm ơn và chứng thư bảo chứng xuất xứ Zurich</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="mt-6 space-y-2.5">
          {/* Main Confirmation Button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#1c1c19] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>XÁC NHẬN HOÀN TẤT & ĐÓNG</span>
          </button>

          {/* Secondary: View Order Details */}
          {onViewOrders && (
            <button
              onClick={() => {
                onClose();
                onViewOrders();
              }}
              className="w-full py-3 bg-[#f6f3ee] hover:bg-[#ece8e2] text-[#1c1c19] text-xs font-semibold tracking-wider uppercase rounded-full border border-[#ebe8e3] transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-[#74584d]" />
              <span>XEM CHI TIẾT ĐƠN HÀNG VỪA ĐẶT (#{orderNumber})</span>
            </button>
          )}

          {onOpenSupport && (
            <div className="pt-1.5 text-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-[#74584d] hover:text-[#1c1c19] font-medium transition-colors cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                <span>Cần đổi địa chỉ gấp hoặc hỗ trợ đơn hàng? Liên hệ CSKH 24/7</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
