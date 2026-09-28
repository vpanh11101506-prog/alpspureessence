import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Droplets,
  ArrowRight,
  Check,
  ShoppingBag,
  ShieldCheck,
  Clock,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Star,
  MessageSquare,
} from 'lucide-react';
import { Product, UserProfile } from '../types';
import { ProductReviewsSection } from './ProductReviewsSection';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  user?: UserProfile | null;
  onShowToast?: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  user,
  onShowToast,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'usage' | 'benefits' | 'ingredients' | 'reviews'>('usage');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleOpenReviews = () => {
    setActiveTab('reviews');
    const tabsElement = document.getElementById('product-detail-tabs');
    if (tabsElement) {
      tabsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[92vh] flex flex-col">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#1c1c19] hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Left: Product Image Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xs border border-[#202022]/6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = product.fallbackImage;
                  }}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badge on photo */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#1c1c19] text-white text-[11px] px-3 py-1 rounded-full font-medium tracking-wider uppercase shadow-sm">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* Ritual Step callout badge */}
              <div className="bg-[#f0ede9] rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#74584d] text-white flex items-center justify-center font-serif text-[11px]">
                    0{product.routineStepNumber}
                  </span>
                  <div>
                    <span className="text-[#77767b] text-[10px] uppercase tracking-wider block">BƯỚC RITUAL</span>
                    <span className="font-medium text-[#1c1c19]">{product.routineStepTitle}</span>
                  </div>
                </div>
                <span className="text-[#8a9a86] font-medium text-[11px] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Alps Pure Essence</span>
                </span>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* Brand & Volume */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                    ALPS • {product.capacity}
                  </span>
                  <span className="text-xs text-[#8a9a86] font-medium bg-[#8a9a86]/10 px-2.5 py-0.5 rounded-full">
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19] tracking-tight mt-1">
                  {product.name}
                </h2>

                {/* Rating trigger: shows "Chưa có đánh giá nào (0)" */}
                <button
                  type="button"
                  onClick={handleOpenReviews}
                  className="flex items-center space-x-2 mt-2 group text-left cursor-pointer focus:outline-none"
                  title="Nhấn để xem hoặc viết đánh giá đầu tiên"
                >
                  <div className="flex items-center text-[#d6d4cf]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 text-[#d6d4cf]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#77767b] group-hover:text-[#74584d] transition-colors">
                    Chưa có đánh giá nào (0)
                  </span>
                  <span className="text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                    Viết nhận xét đầu tiên ↓
                  </span>
                </button>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#77767b] font-light mt-2">
                  {product.subtitle}
                </p>

                {/* Pricing Box */}
                <div className="mt-3.5 p-4 rounded-2xl bg-white border border-[#202022]/6 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs sm:text-sm text-[#77767b] line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>
                    {product.note && (
                      <p className="text-xs text-[#8a9a86] font-medium mt-0.5">
                        ✦ Đặc quyền: {product.note}
                      </p>
                    )}
                  </div>
                  <div className="text-[11px] text-[#77767b] text-right">
                    Đã gồm thuế VAT<br />Giao nhanh 24h
                  </div>
                </div>

                {/* Description paragraph */}
                <p className="text-xs sm:text-sm text-[#46464a] leading-relaxed mt-4 font-light">
                  {product.description}
                </p>

                {/* Quick Key Highlights preview */}
                <div className="mt-4 pt-4 border-t border-[#202022]/6 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#74584d] font-semibold block">
                    ĐIỂM NỔI BẬT CÔNG THỨC:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.keyIngredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[11px] bg-white px-2.5 py-1 rounded-lg border border-[#202022]/5 text-[#46464a]">
                        • {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#202022]/15 rounded-full bg-white px-3 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-base text-[#77767b] hover:text-[#1c1c19] px-2 py-0.5 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-xs px-2 text-[#1c1c19]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-base text-[#77767b] hover:text-[#1c1c19] px-2 py-0.5 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#77767b]">
                    Tổng cộng: <strong className="text-[#1c1c19] font-serif text-sm">{(product.price * quantity).toLocaleString('vi-VN')}₫</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border flex items-center justify-center space-x-1.5 cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-[#f6f3ee] text-[#1c1c19] border-[#202022]/20 active:scale-98 shadow-xs'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedAnimation ? 'ĐÃ THÊM VÀO GIỎ' : 'THÊM VÀO GIỎ'}</span>
                  </button>

                  <button
                    onClick={() => onBuyNow && onBuyNow(product, quantity)}
                    className="py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-[#1c1c19] hover:bg-black text-white active:scale-98 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>MUA NGAY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#fed8c9]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Detailed Usage & Clinical Benefits & Reviews */}
          <div id="product-detail-tabs" className="mt-8 pt-6 border-t border-[#202022]/8">
            <div className="flex border-b border-[#202022]/10 space-x-2 sm:space-x-6 text-xs tracking-wider overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'usage'
                    ? 'border-b-2 border-[#74584d] text-[#74584d] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CÁCH SỬ DỤNG CHI TIẾT</span>
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                HIỆU QUẢ LÂM SÀNG
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                THÀNH PHẦN (INCI)
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>ĐÁNH GIÁ (CHƯA CÓ KHÁCH HÀNG)</span>
                <span className="text-[10px] bg-[#f0ede9] text-[#77767b] px-2 py-0.5 rounded-full font-semibold">
                  0
                </span>
              </button>
            </div>

            <div className="py-5 text-xs sm:text-sm text-[#46464a]">
              {/* TAB 1: DETAILED USAGE INSTRUCTIONS */}
              {activeTab === 'usage' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Summary Metric Cards */}
                  {product.detailedUsage && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6 shadow-2xs space-y-1">
                        <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Thời Điểm Sử Dụng</span>
                        </div>
                        <p className="text-xs text-[#1c1c19] font-medium leading-relaxed">
                          {product.detailedUsage.timing}
                        </p>
                      </div>

                      <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6 shadow-2xs space-y-1">
                        <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold text-xs">
                          <Droplets className="w-3.5 h-3.5" />
                          <span>Định Lượng Chuẩn</span>
                        </div>
                        <p className="text-xs text-[#1c1c19] font-medium leading-relaxed">
                          {product.detailedUsage.amount}
                        </p>
                      </div>

                      <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6 shadow-2xs space-y-1">
                        <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Phù Hợp Với</span>
                        </div>
                        <p className="text-xs text-[#1c1c19] font-medium leading-relaxed">
                          {product.detailedUsage.suitableFor}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step-by-step Detailed Guide */}
                  {product.detailedUsage?.steps && product.detailedUsage.steps.length > 0 ? (
                    <div className="bg-white rounded-2xl p-5 border border-[#202022]/6 shadow-2xs space-y-4">
                      <h4 className="font-serif text-base font-normal text-[#1c1c19] flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#74584d]" />
                        <span>Quy Trình 4 Bước Thao Tác Chuẩn Y Khoa</span>
                      </h4>

                      <div className="space-y-3.5">
                        {product.detailedUsage.steps.map((s) => (
                          <div key={s.step} className="flex items-start space-x-3 p-3 rounded-xl bg-[#fcf9f4] border border-[#f0ede9]">
                            <div className="w-6 h-6 rounded-full bg-[#74584d] text-white flex items-center justify-center font-serif text-xs shrink-0 mt-0.5">
                              0{s.step}
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="font-semibold text-xs sm:text-sm text-[#1c1c19]">
                                {s.title}
                              </h5>
                              <p className="text-xs text-[#5f5d58] leading-relaxed font-light">
                                {s.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-2xl border border-[#202022]/6 space-y-2">
                      <p className="text-xs text-[#1c1c19] leading-relaxed">
                        {product.usage}
                      </p>
                    </div>
                  )}

                  {/* Expert Advice Box */}
                  {product.detailedUsage?.expertTip && (
                    <div className="p-4 rounded-2xl bg-[#f7f2ee] border border-[#ecdcd0] space-y-1.5 text-xs text-[#74584d]">
                      <div className="flex items-center space-x-2 font-semibold">
                        <Lightbulb className="w-4 h-4 text-[#74584d]" />
                        <span>Lời Khuyên Vàng Từ Chuyên Gia Alps:</span>
                      </div>
                      <p className="text-xs text-[#584137] leading-relaxed pl-6 font-light">
                        {product.detailedUsage.expertTip}
                      </p>
                    </div>
                  )}

                  {/* Precautions Box */}
                  {product.detailedUsage?.precautions && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#202022]/6 text-xs text-[#77767b] flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-[#8a9a86] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>Lưu ý bảo quản & sử dụng:</strong> {product.detailedUsage.precautions}
                      </span>
                    </div>
                  )}

                  <div className="pt-1 text-[11px] text-[#77767b] flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-[#74584d]" />
                    <span>Nên kết hợp trọn bộ nghi thức 5 bước Alps Pure Essence để đạt hiệu quả dưỡng sáng và phục hồi tối đa sau 28 ngày.</span>
                  </div>
                </div>
              )}

              {/* TAB 2: CLINICAL BENEFITS */}
              {activeTab === 'benefits' && (
                <div className="space-y-3 animate-fadeIn">
                  <p className="text-xs text-[#77767b] italic">
                    Kiểm nghiệm lâm sàng trên 120 phụ nữ từ 22-45 tuổi:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-white p-3 rounded-xl border border-[#202022]/5">
                        <Check className="w-4 h-4 text-[#8a9a86] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#1c1c19]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: KEY INGREDIENTS */}
              {activeTab === 'ingredients' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.keyIngredients.map((ing, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-[#202022]/5">
                        <div className="text-[10px] text-[#74584d] uppercase font-semibold">Thành phần cốt lõi #{idx + 1}</div>
                        <div className="text-xs font-medium text-[#1c1c19] mt-0.5">{ing}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#77767b] pt-1">
                    Công thức 100% không cồn khô, không dầu khoáng, không hương liệu tổng hợp, không paraben, an toàn dịu nhẹ cho mọi loại da.
                  </p>
                </div>
              )}

              {/* TAB 4: REVIEWS (STARTS WITH 0 REVIEWS - CHƯA CÓ KHÁCH HÀNG) */}
              {activeTab === 'reviews' && (
                <div className="animate-fadeIn">
                  <ProductReviewsSection
                    product={product}
                    user={user || null}
                    onShowToast={onShowToast}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
