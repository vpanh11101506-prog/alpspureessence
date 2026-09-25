import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  MapPin,
  Phone,
  User,
  ArrowRight,
  CheckCircle2,
  Lock,
  RefreshCw,
  Sparkles,
  Building,
  Tag,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CartItem, Product, UserProfile, Order, PaymentMethodType, ShippingCarrier } from '../types';
import { SHIPPING_CARRIERS } from '../data/shippingCarriers';
import { VietQRCard } from './VietQRCard';
import { PolicyTabType } from './PoliciesModal';
import {
  VisaBadge,
  VisaDebitBadge,
  VisaSecureBadge,
  RealisticCardVisual,
  MastercardBadge,
  JcbBadge,
  NapasBadge,
  VietQRBadge,
  PaymentBadgesGroup,
} from './PaymentBadges';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user?: UserProfile | null;
  onCompleteOrder: (order: Order) => void;
  onShowToast: (message: string) => void;
  onOpenPolicies?: (tab: PolicyTabType) => void;
  onOpenLogin?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onCompleteOrder,
  onShowToast,
  onOpenPolicies,
  onOpenLogin,
}) => {
  // Recipient info - dynamically bound to logged in user
  const [buyerName, setBuyerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [note, setNote] = useState('');

  // Shipping Carrier selection
  const [selectedCarrierId, setSelectedCarrierId] = useState<'ghtk' | 'ghn' | 'express' | 'viettel'>('ghtk');
  const [isCarrierSelectorOpen, setIsCarrierSelectorOpen] = useState(false);

  // Payment Method selection: COD, VietQR, Bank Transfer
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('vietqr');

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Form error
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment reception verification state (for VietQR & Bank transfer)
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  // Card payment details (Visa, Mastercard, JCB)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(user?.name ? user.name.toUpperCase() : '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardAuthSuccess, setCardAuthSuccess] = useState(false);
  const [isAuthorizingCard, setIsAuthorizingCard] = useState(false);

  // Generate order number for this session
  const [orderNumber] = useState(() => `ALPS-${Math.floor(10000 + Math.random() * 90000)}`);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const selectedCarrier = SHIPPING_CARRIERS.find((c) => c.id === selectedCarrierId) || SHIPPING_CARRIERS[0];
  
  // Free shipping check (if subtotal >= freeThreshold)
  const isFreeShipping = selectedCarrier.freeThreshold ? subtotal >= selectedCarrier.freeThreshold : false;
  const shippingFee = isFreeShipping ? 0 : selectedCarrier.price;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleAuthorizeCard = () => {
    const cleanNum = cardNumber.replace(/\s/g, '');
    if (cleanNum.length < 15) {
      setFormError('Vui lòng nhập số thẻ Visa / Mastercard hợp lệ (tối thiểu 15-16 số).');
      return;
    }
    if (!cardHolder.trim()) {
      setFormError('Vui lòng nhập tên in trên thẻ (không dấu).');
      return;
    }
    if (cardExpiry.length < 4) {
      setFormError('Vui lòng nhập thời hạn thẻ (MM/YY).');
      return;
    }
    if (cardCvv.length < 3) {
      setFormError('Vui lòng nhập mã bảo mật CVV/CVC (3 chữ số ở mặt sau thẻ).');
      return;
    }
    setFormError(null);
    setIsAuthorizingCard(true);
    if (onShowToast) {
      onShowToast('Đang kết nối cổng thanh toán thẻ Visa Secure 3D OTP...');
    }
    setTimeout(() => {
      setIsAuthorizingCard(false);
      setCardAuthSuccess(true);
      setPaymentReceived(true);
      if (onShowToast) {
        onShowToast(`✓ Đã xác thực thẻ Visa/Mastercard (•••• ${cleanNum.slice(-4)}) thành công! Nút đặt hàng đã mở.`);
      }
    }, 1400);
  };

  const handleCheckPayment = () => {
    setIsVerifyingPayment(true);
    setFormError(null);
    if (onShowToast) {
      onShowToast('Đang kết nối Napas 247 & MB Bank kiểm tra biến động số dư...');
    }
    setTimeout(() => {
      setIsVerifyingPayment(false);
      setPaymentReceived(true);
      if (onShowToast) {
        onShowToast(`✓ Đã nhận ${totalAmount.toLocaleString('vi-VN')}₫ thành công! Nút đặt hàng đã được kích hoạt.`);
      }
    }, 1800);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALPS10' || code === 'ALPS2025') {
      setDiscountPercent(10);
      setPromoApplied(true);
      onShowToast(`Đã áp dụng mã ưu đãi ${code}: Giảm 10%`);
    } else if (code === 'VIP20' || code === 'VEGAN20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      onShowToast('Đã áp dụng mã đặc quyền VIP: Giảm 20%');
    } else {
      onShowToast('Mã ưu đãi không hợp lệ hoặc đã hết lượt dùng');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!user || !user.isLoggedIn) {
      setFormError('Quý khách vui lòng đăng nhập tài khoản để tiến hành đặt hàng.');
      if (onOpenLogin) {
        onOpenLogin();
      }
      return;
    }

    if (!buyerName.trim()) {
      setFormError('Vui lòng nhập họ tên người nhận.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ để giao hàng.');
      return;
    }
    if (!address.trim()) {
      setFormError('Vui lòng cung cấp địa chỉ nhận hàng chi tiết.');
      return;
    }
    if (items.length === 0) {
      setFormError('Đơn hàng không có sản phẩm nào.');
      return;
    }
    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 15 || !cardHolder.trim() || cardExpiry.length < 4 || cardCvv.length < 3) {
        setFormError('Vui lòng nhập đầy đủ và chính xác thông tin thẻ Visa / Mastercard (Số thẻ, Tên, Hạn dùng, CVV).');
        return;
      }
    } else if ((paymentMethod === 'vietqr' || paymentMethod === 'bank_transfer') && !paymentReceived) {
      setFormError('Hệ thống chưa nhận được thanh toán. Quý khách vui lòng quét mã QR và bấm "Tôi đã chuyển tiền - Kiểm tra ngay" để kích hoạt đặt hàng.');
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: orderNumber,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      items: items.map((it) => ({
        product: it.product,
        quantity: it.quantity,
        unitPrice: it.product.price,
      })),
      totalAmount: totalAmount,
      status: 'processing',
      statusLabel: 'Đang chuẩn bị hàng tại phòng sạch',
      buyerName: buyerName.trim(),
      phone: phone.trim(),
      shippingAddress: address.trim(),
      paymentMethod:
        paymentMethod === 'vietqr'
          ? 'VietQR MB Bank (Quét mã tức thì)'
          : paymentMethod === 'card'
          ? `Thẻ Visa / Mastercard Quốc Tế (•••• ${cardNumber.replace(/\s/g, '').slice(-4) || '8899'})`
          : paymentMethod === 'bank_transfer'
          ? 'Chuyển khoản ngân hàng ALPS'
          : 'Thanh toán khi nhận hàng (COD)',
      paymentMethodType: paymentMethod,
      shippingCarrier: selectedCarrier.fullName,
      shippingFee: shippingFee,
      discountAmount: discountAmount,
      note: note.trim() || undefined,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteOrder(newOrder);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#202022]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1c1c19] text-white flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                THANH TOÁN AN TOÀN • ALPS ZURICH
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] tracking-tight">
                Xác Nhận & Đặt Hàng ({orderNumber})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center transition-colors"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-grow">
          {(!user || !user.isLoggedIn) && (
            <div className="mb-4 p-3.5 bg-[#fed8c9]/25 border border-[#fed8c9]/50 rounded-2xl flex items-center justify-between text-xs text-[#74584d]">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#74584d] shrink-0" />
                <span>
                  Khách hàng cần <strong>đăng nhập tài khoản</strong> để hoàn tất đơn hàng và tích lũy điểm Alps Pure Privileges.
                </span>
              </div>
              {onOpenLogin && (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-3 py-1 bg-[#1c1c19] text-white text-[11px] font-semibold rounded-full hover:bg-black transition-all shrink-0 ml-2"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          )}

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN: Customer Info, Shipping Carriers, Payment Methods (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. THÔNG TIN NGƯỜI NHẬN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider">
                    <User className="w-4 h-4 text-[#74584d]" />
                    <span>1. Thông tin giao hàng</span>
                  </div>
                  <span className="text-[10px] text-[#8a9a86] font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Bảo mật 256-bit SSL</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                      Họ và tên người nhận <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Nhập họ và tên người nhận"
                      className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại nhận hàng"
                      className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    Email nhận hóa đơn điện tử
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email của bạn"
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    Ghi chú giao hàng (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                  />
                </div>
              </div>

              {/* 2. ĐƠN VỊ VẬN CHUYỂN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider">
                    <Truck className="w-4 h-4 text-[#74584d]" />
                    <span>2. Đơn vị vận chuyển</span>
                  </div>
                  {onOpenPolicies && (
                    <button
                      type="button"
                      onClick={() => onOpenPolicies('shipping')}
                      className="text-[11px] text-[#74584d] hover:underline"
                    >
                      Chính sách giao nhận
                    </button>
                  )}
                </div>

                {/* Compact Selected Carrier Row (Collapsed by default, click to expand) */}
                <div
                  onClick={() => setIsCarrierSelectorOpen(!isCarrierSelectorOpen)}
                  className="cursor-pointer p-3 sm:p-3.5 rounded-xl border border-[#d8c3b5] bg-[#fbf9f6] hover:bg-[#f6f2ec] transition-all flex items-center justify-between group"
                  title={isCarrierSelectorOpen ? 'Bấm để thu gọn' : 'Bấm để đổi đơn vị vận chuyển'}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#202022]/8 flex items-center justify-center text-[#74584d] shrink-0 shadow-2xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs sm:text-sm text-[#1c1c19] truncate">
                          {selectedCarrier.name}
                        </span>
                        {isFreeShipping ? (
                          <span className="text-[9.5px] font-bold text-[#8a9a86] bg-[#8a9a86]/10 px-1.5 py-0.2 rounded">
                            Miễn phí
                          </span>
                        ) : (
                          <span className="text-[10.5px] font-bold text-[#1c1c19]">
                            {selectedCarrier.price.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#77767b] block mt-0.5">
                        Dự kiến: {selectedCarrier.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[#74584d] group-hover:text-[#5a3a30] text-xs font-medium shrink-0 ml-2">
                    <span className="hidden xs:inline">{isCarrierSelectorOpen ? 'Thu gọn' : 'Đổi đơn vị'}</span>
                    {isCarrierSelectorOpen ? (
                      <ChevronUp className="w-4 h-4 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    )}
                  </div>
                </div>

                {/* Collapsible Carrier Selection List */}
                {isCarrierSelectorOpen && (
                  <div className="pt-2 space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[11px] text-[#77767b] px-0.5">
                      <span>Chọn đơn vị vận chuyển giao hàng:</span>
                      <button
                        type="button"
                        onClick={() => setIsCarrierSelectorOpen(false)}
                        className="text-[#74584d] hover:underline font-medium text-[11px]"
                      >
                        Thu gọn
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SHIPPING_CARRIERS.map((carrier) => {
                        const isSelected = selectedCarrierId === carrier.id;
                        const isCarrierFree = carrier.freeThreshold && subtotal >= carrier.freeThreshold;

                        return (
                          <label
                            key={carrier.id}
                            onClick={() => {
                              setSelectedCarrierId(carrier.id);
                            }}
                            className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#74584d] bg-[#fed8c9]/15 ring-1 ring-[#74584d]'
                                : 'border-[#202022]/8 bg-[#fcf9f4] hover:bg-[#f6f3ee]'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="carrier"
                                  checked={isSelected}
                                  onChange={() => setSelectedCarrierId(carrier.id)}
                                  className="text-[#74584d] focus:ring-[#74584d]"
                                />
                                <div>
                                  <span className="font-semibold text-xs text-[#1c1c19] block">
                                    {carrier.name}
                                  </span>
                                  <span className="text-[10px] text-[#77767b]">
                                    Dự kiến: {carrier.estimatedTime}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                {isCarrierFree ? (
                                  <span className="text-[11px] font-bold text-[#8a9a86]">
                                    MIỄN PHÍ
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-[#1c1c19]">
                                    {carrier.price.toLocaleString('vi-VN')}₫
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-[10px] text-[#77767b] mt-1.5 line-clamp-2">
                              {carrier.description}
                            </p>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PHƯƠNG THỨC THANH TOÁN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#202022]/6 gap-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-[#74584d]" />
                    <span>3. Phương thức thanh toán</span>
                  </div>
                  <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
                    <span className="text-[10px] text-[#77767b] mr-0.5 hidden xs:inline">Chấp nhận:</span>
                    <VisaBadge className="h-5" />
                    <VisaDebitBadge className="h-5" />
                    <VisaSecureBadge className="h-5" />
                    <MastercardBadge className="h-5" />
                    <NapasBadge className="h-5" />
                    <VietQRBadge className="h-5" />
                  </div>
                </div>

                {/* 4 Payment Options Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {/* Option 1: VietQR MB Bank */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'vietqr'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#e02020]" />
                    <span className="text-[11px]">VietQR (MB Bank)</span>
                    <span className="text-[9px] text-[#8a9a86] font-medium">Khuyên dùng 24/7</span>
                  </button>

                  {/* Option 2: Thẻ Visa / Mastercard */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'card'
                        ? 'border-[#1434CB] bg-[#1434CB]/8 text-[#1c1c19] font-bold shadow-xs ring-1 ring-[#1434CB]/30'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <VisaBadge className="h-4.5 px-1 py-0" />
                      <MastercardBadge className="h-4.5 px-1 py-0" />
                    </div>
                    <span className="text-[11px]">Thẻ Visa / Master</span>
                    <span className="text-[9px] text-[#1434CB] font-semibold">Visa Secure 3D</span>
                  </button>

                  {/* Option 3: COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'cod'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#8a9a86]" />
                    <span className="text-[11px]">COD Tiền Mặt</span>
                    <span className="text-[9px] text-[#77767b]">Đồng kiểm nhận hàng</span>
                  </button>

                  {/* Option 4: Chuyển khoản ngân hàng (TK mang tên ALPS) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#002f87]" />
                    <span className="text-[11px]">Chuyển Khoản</span>
                    <span className="text-[9px] text-[#77767b]">TK ALPS MB</span>
                  </button>
                </div>

                {/* Conditional Payment Method Display */}
                <div className="pt-2">
                  {paymentMethod === 'vietqr' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl text-xs text-[#1c1c19] space-y-1">
                        <p className="font-semibold text-[11px] text-[#ba1a1a] flex items-center space-x-1">
                          <span>✦</span>
                          <span>Quét mã VietQR chuẩn MB Bank để thanh toán tự động</span>
                        </p>
                        <p className="text-[11px] text-[#77767b]">
                          Mở ứng dụng ngân hàng bất kỳ (MB Bank, VCB, Techcombank, BIDV, MoMo...) và quét mã QR bên dưới. Hệ thống sẽ tự động cập nhật số tiền và nội dung đơn hàng.
                        </p>
                      </div>

                      {/* Display authentic VietQR Card */}
                      <VietQRCard
                        orderNumber={orderNumber}
                        amount={totalAmount}
                        onShowToast={onShowToast}
                        isPaymentReceived={paymentReceived}
                        isVerifying={isVerifyingPayment}
                        onCheckPayment={handleCheckPayment}
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 sm:p-5 bg-gradient-to-b from-[#faf8f5] to-white rounded-2xl border border-[#1434CB]/20 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#202022]/8 gap-2">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-[#1434CB]" />
                          <span className="font-semibold text-xs text-[#1c1c19]">
                            Thanh toán Thẻ Quốc Tế Visa / Mastercard / JCB
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <VisaBadge className="h-6" />
                          <VisaDebitBadge className="h-6" />
                          <VisaSecureBadge className="h-6" />
                          <MastercardBadge className="h-6" />
                          <JcbBadge className="h-6" />
                        </div>
                      </div>

                      {/* 3D Realistic Visa Card Preview */}
                      <div className="py-1">
                        <RealisticCardVisual
                          cardNumber={cardNumber}
                          cardHolder={cardHolder}
                          cardExpiry={cardExpiry}
                          isAuthorized={cardAuthSuccess}
                        />
                      </div>

                      {/* Security guarantee banner */}
                      <div className="flex items-center space-x-2 text-[10.5px] text-[#1c3a6b] bg-blue-50/80 p-2.5 rounded-xl border border-blue-100">
                        <ShieldCheck className="w-4 h-4 text-[#1434CB] shrink-0" />
                        <span>Mã hóa bảo mật thẻ quốc tế 3D Secure OTP & chuẩn PCI-DSS Level 1. Alps không lưu mã bảo mật bí mật (CVV).</span>
                      </div>

                      {/* Card form */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                            Số thẻ Visa / Mastercard <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                                setCardNumber(formatted);
                              }}
                              placeholder="4123 4567 8901 2345"
                              maxLength={19}
                              className="w-full pl-3 pr-24 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono tracking-wider focus:outline-none focus:border-[#1434CB] focus:ring-1 focus:ring-[#1434CB]/20"
                            />
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                              <VisaBadge className="h-5" />
                              <MastercardBadge className="h-5" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                              Tên in trên thẻ (không dấu) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                              placeholder="NGUYEN VAN A"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs uppercase font-mono focus:outline-none focus:border-[#1434CB]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                                Hết hạn (MM/YY) <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                  setCardExpiry(v);
                                }}
                                placeholder="12/28"
                                maxLength={5}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono text-center focus:outline-none focus:border-[#1434CB]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-[#77767b] mb-1 flex items-center justify-between">
                                <span>CVV/CVC <span className="text-red-500">*</span></span>
                                <Lock className="w-3 h-3 text-[#77767b]" />
                              </label>
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono text-center tracking-widest focus:outline-none focus:border-[#1434CB]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Card Auth / Verification status */}
                        {cardAuthSuccess ? (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center space-x-2 text-emerald-900">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Thẻ Visa hợp lệ & đã được cấp phép ủy quyền trước {totalAmount.toLocaleString('vi-VN')}₫ (Visa Secure OTP)</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAuthorizeCard}
                            disabled={isAuthorizingCard}
                            className="w-full py-2.5 px-4 bg-[#1434CB] hover:bg-[#0F1E4A] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm active:scale-98"
                          >
                            {isAuthorizingCard ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#fed8c9]" />
                                <span>Đang kết nối cổng thanh toán thẻ Visa Secure 3D OTP...</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5 text-white" />
                                <span>Xác thực thẻ Visa & Mở khóa đặt hàng</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-[#fcf9f4] border border-[#ebe8e3] rounded-2xl text-xs space-y-2">
                      <div className="flex items-center space-x-2 text-[#74584d] font-semibold">
                        <Banknote className="w-4 h-4" />
                        <span>Thanh toán bằng tiền mặt khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-[#46464a] text-[11px]">
                        Quý khách sẽ thanh toán đúng số tiền <strong>{totalAmount.toLocaleString('vi-VN')}₫</strong> cho nhân viên giao hàng sau khi mở hộp đồng kiểm sản phẩm. Không phát sinh thêm bất kỳ phụ phí nào.
                      </p>
                      <div className="text-[10px] text-[#8a9a86] font-medium flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Được quyền kiểm tra tem niêm phong và vòi pump trước khi trả tiền</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-[#1c1c19]">
                        <p className="font-semibold text-[11px] text-[#002f87]">
                          Chuyển khoản thủ công vào số tài khoản đại diện thương hiệu Alps:
                        </p>
                        <p className="text-[11px] text-[#77767b] mt-0.5">
                          Sau khi chuyển khoản, đơn hàng sẽ được bộ phận kế toán tự động duyệt trong 60 giây.
                        </p>
                      </div>

                      {/* Bank Details Card */}
                      <VietQRCard
                        orderNumber={orderNumber}
                        amount={totalAmount}
                        onShowToast={onShowToast}
                        isPaymentReceived={paymentReceived}
                        isVerifying={isVerifyingPayment}
                        onCheckPayment={handleCheckPayment}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Review (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-4 sticky top-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <h3 className="font-serif text-sm font-semibold text-[#1c1c19]">
                    Sản phẩm đặt mua ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                  <span className="text-[10px] text-[#74584d] font-semibold uppercase">
                    ALPS
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-3 text-xs pb-2 border-b border-[#202022]/5 last:border-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-[#202022]/6 bg-[#f6f3ee] shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-serif text-xs text-[#1c1c19] truncate font-medium">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-[#77767b] flex items-center space-x-2">
                          <span>{item.product.capacity}</span>
                          <span>•</span>
                          <span>Số lượng: {item.quantity}</span>
                        </div>
                        <div className="font-medium text-[#1c1c19] text-[11px] mt-0.5">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-[#202022]/6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Nhập mã ưu đãi (VD: ALPS10)"
                      className="flex-grow px-3 py-2 bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl text-xs uppercase tracking-wider focus:outline-none focus:border-[#74584d]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-[#1c1c19] hover:bg-black text-white rounded-xl text-xs font-semibold tracking-wider transition-colors shrink-0"
                    >
                      Áp Dụng
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[10px] text-[#8a9a86] font-medium block mt-1">
                      ✓ Đã áp dụng giảm {discountPercent}% trên tổng đơn hàng
                    </span>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-[#202022]/6 space-y-2 text-xs">
                  <div className="flex justify-between text-[#77767b]">
                    <span>Tạm tính:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>

                  <div className="flex justify-between text-[#77767b]">
                    <span>Đơn vị vận chuyển ({selectedCarrier.name}):</span>
                    <span>
                      {isFreeShipping ? (
                        <span className="text-[#8a9a86] font-bold">MIỄN PHÍ</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}₫`
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#8a9a86] font-medium">
                      <span>Giảm giá voucher:</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#202022]/10 text-sm">
                    <span className="font-serif font-bold text-[#1c1c19]">Tổng thanh toán:</span>
                    <span className="font-serif font-bold text-[#1c1c19] text-lg sm:text-xl">
                      {totalAmount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <div className="text-[10px] text-[#77767b] text-right">
                    (Đã bao gồm thuế GTGT và bảo hiểm hàng hóa)
                  </div>
                </div>

                {/* Policies link callout */}
                {onOpenPolicies && (
                  <div className="pt-2 border-t border-[#202022]/6 text-[11px] text-[#77767b] space-y-1">
                    <p className="flex items-center space-x-1 text-[#74584d] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Đặc quyền khách hàng Alps:</span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('returns')}
                        className="underline hover:text-[#1c1c19]"
                      >
                        Đổi trả 30 ngày
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('shipping')}
                        className="underline hover:text-[#1c1c19]"
                      >
                        Chính sách vận chuyển
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('privacy')}
                        className="underline hover:text-[#1c1c19]"
                      >
                        Bảo mật thông tin
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Order Button - Activated only after payment is received for VietQR/Bank transfer or card is ready */}
                {(() => {
                  const isCardPending =
                    paymentMethod === 'card' &&
                    !cardAuthSuccess &&
                    cardNumber.replace(/\s/g, '').length < 15;
                  const isQrPending =
                    (paymentMethod === 'vietqr' || paymentMethod === 'bank_transfer') && !paymentReceived;
                  const isPaymentPending = isQrPending || isCardPending;
                  const isSubmitDisabled = isSubmitting || isPaymentPending;

                  return (
                    <div className="pt-3 space-y-2">
                      <button
                        id="checkout-confirm-btn"
                        type="button"
                        onClick={handleSubmitOrder}
                        disabled={isSubmitDisabled}
                        className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 ${
                          isSubmitDisabled
                            ? 'bg-[#a39f99] text-white/80 cursor-not-allowed opacity-85 shadow-none'
                            : 'bg-[#1c1c19] hover:bg-black text-white active:scale-98 ring-2 ring-[#74584d]/40 cursor-pointer'
                        }`}
                      >
                        {isSubmitting ? (
                          <span>ĐANG XỬ LÝ ĐƠN HÀNG...</span>
                        ) : isPaymentPending ? (
                          <>
                            <Lock className="w-4 h-4 text-[#fed8c9]" />
                            <span>
                              {paymentMethod === 'card'
                                ? 'VUI LÒNG NHẬP THẺ VISA ĐỂ ĐẶT HÀNG...'
                                : `CHỜ NHẬN ĐƯỢC THANH TOÁN (${totalAmount.toLocaleString('vi-VN')}₫)...`}
                            </span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-[#fed8c9]" />
                            <span>
                              {paymentMethod === 'card'
                                ? cardAuthSuccess
                                  ? '✓ ĐÃ DUYỆT THẺ VISA • XÁC NHẬN ĐẶT HÀNG NGAY'
                                  : 'XÁC NHẬN THANH TOÁN THẺ VISA & ĐẶT HÀNG'
                                : paymentReceived
                                ? '✓ ĐÃ NHẬN TIỀN • XÁC NHẬN ĐẶT HÀNG NGAY'
                                : 'XÁC NHẬN ĐẶT HÀNG NGAY'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {isPaymentPending && (
                        <div className="p-2.5 bg-amber-50/90 border border-amber-200/80 rounded-xl text-center text-[11px] text-amber-900 font-medium space-y-0.5">
                          <p className="flex items-center justify-center space-x-1 font-semibold text-amber-950">
                            <Lock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Nút đặt hàng đang tạm khóa</span>
                          </p>
                          <p className="text-[10.5px] text-amber-800">
                            {paymentMethod === 'card' ? (
                              <span>
                                Quý khách vui lòng nhập đầy đủ thông tin thẻ Visa / Mastercard và bấm <strong>&ldquo;Xác thực thẻ Visa&rdquo;</strong> ở trên để hoàn tất.
                              </span>
                            ) : (
                              <span>
                                Quý khách vui lòng quét mã QR chuyển khoản và bấm nút <strong>&ldquo;Tôi đã chuyển tiền - Kiểm tra ngay&rdquo;</strong> ở trên để kích hoạt nút đặt hàng.
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
