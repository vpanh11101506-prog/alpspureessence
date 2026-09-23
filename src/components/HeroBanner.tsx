import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import collectionBannerImg from '../assets/images/alps_banner_champagne_1789839179884.jpg';
import glowSerumImg from '../assets/images/alps_serum_champagne_1789839140054.jpg';
import faceCreamImg from '../assets/images/alps_cream_champagne_1789839152375.jpg';
import hydroMaskImg from '../assets/images/alps_mask_champagne_1789839165550.jpg';
import cleanserImg from '../assets/images/alps_clean_champagne_1789839128537.jpg';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectProduct?: (product: Product) => void;
  isMobileFrame?: boolean;
}

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
  productId?: string;
  buttonText: string;
  secondaryNote: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onSelectProduct,
  isMobileFrame = false,
}) => {
  const slides: BannerSlide[] = [
    {
      id: 'collection',
      badge: 'BỘ SƯU TẬP MỚI 2025 • ALPS',
      title: 'Alps Pure Radiance Essence',
      highlight: 'Tinh hoa phục hồi Thụy Sĩ',
      subtitle: 'Phục hồi ánh sáng làn da tự nhiên từ bột ngọc trai & thảo mộc núi tuyết Alps.',
      image: collectionBannerImg,
      fallbackImage: '/images/alps_banner.jpg',
      buttonText: 'KHÁM PHÁ BỘ SƯU TẬP',
      secondaryNote: 'Limited Signature Edition',
    },
    {
      id: 'serum-glow',
      badge: 'BEST-SELLER • TINH CHẤT TÁI SINH',
      title: 'Alps Radiance Glow Serum',
      highlight: 'Ngọc trai hữu cơ & 10% Niacinamide',
      subtitle: 'Đều màu da sau 14 ngày, tạo hiệu ứng căng bóng sương mai chuẩn Glass Skin.',
      image: glowSerumImg,
      fallbackImage: '/glow serum.jpg',
      productId: 'serum-radiance',
      buttonText: 'XEM CHI TIẾT SERUM',
      secondaryNote: 'Hiệu quả sau 14 ngày',
    },
    {
      id: 'face-cream',
      badge: 'KHÓA ẨM 72H • TẾ BÀO GỐC TUYẾT',
      title: 'Alps Regenerating Face Cream',
      highlight: 'Ceramide Complex 3-6-9',
      subtitle: 'Phục hồi hàng rào biểu bì sinh học, nuôi dưỡng sâu và chống khô ráp lão hóa.',
      image: faceCreamImg,
      fallbackImage: '/face cream.jpg',
      productId: 'cream-regenerating',
      buttonText: 'XEM KEM DƯỠNG',
      secondaryNote: 'Tặng thìa bạc cao cấp',
    },
    {
      id: 'cleanser-purifying',
      badge: 'LÀM SẠCH SÂU • DỊU NHẸ',
      title: 'Alps Gentle Purifying Cleanser',
      highlight: 'Micro-Foam Bọt Mây & Nước Khoáng Sông Băng',
      subtitle: 'Làm sạch sâu bụi mịn PM2.5, cân bằng pH 5.5, mềm mịn màng ẩm tự nhiên.',
      image: cleanserImg,
      fallbackImage: '/cleanser.jpg',
      productId: 'cleanser-gentle-purifying',
      buttonText: 'XEM SỮA RỬA MẶT',
      secondaryNote: 'Amino Acid dịu nhẹ',
    },
    {
      id: 'hydro-mask',
      badge: 'NÂNG CƠ SPA TẠI GIA',
      title: 'Alps Hydro-Lifting Sheet Mask',
      highlight: 'Màng thạch dừa & Tảo tuyết đỏ Thụy Sĩ',
      subtitle: 'Collagen vi phân tử hạ nhiệt tức thì -4.5°C, ôm khít gương mặt nâng cơ săn chắc.',
      image: hydroMaskImg,
      fallbackImage: '/facemask.jpg',
      productId: 'mask-hydro-lifting',
      buttonText: 'XEM MẶT NẠ SINH HỌC',
      secondaryNote: 'Hộp 5 miếng x 29g',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto slide rotation every 5.5 seconds unless user is hovering/interacting
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSlideClick = (slide: BannerSlide) => {
    if (slide.productId && onSelectProduct) {
      const targetProd = PRODUCTS.find((p) => p.id === slide.productId);
      if (targetProd) {
        onSelectProduct(targetProd);
        return;
      }
    }
    onExploreClick();
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[currentSlide];

  return (
    <div className={`w-full ${isMobileFrame ? 'px-3 pt-2' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6'}`}>
      <div
        id="hero-banner-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative group overflow-hidden rounded-[2rem] shadow-md bg-[#1c1c19] text-[#fcf9f4] aspect-[4/3] sm:aspect-[21/9] md:aspect-[2.4/1] select-none"
      >
        {/* All Slides Container with Smooth Sliding Effect */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((s, idx) => (
            <div key={s.id} className="w-full h-full shrink-0 relative">
              <img
                src={s.image}
                alt={s.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = s.fallbackImage;
                }}
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* High contrast gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent hidden sm:block" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-7 md:p-10 pointer-events-none">
          <div className="pointer-events-auto max-w-xl">
            {/* Top Row: Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <div className="inline-flex items-center space-x-1.5 bg-white/95 backdrop-blur-md text-[#1c1c19] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3 h-3 text-[#74584d]" />
                <span>{slide.badge}</span>
              </div>
            </div>

            {/* Slide Heading */}
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight drop-shadow-sm transition-all">
              {slide.title}
            </h2>

            {/* Highlight & Subtitle */}
            <p className="text-amber-200/90 text-xs sm:text-sm font-medium mt-1">
              ✦ {slide.highlight}
            </p>
            <p className="text-white/85 text-xs sm:text-sm md:text-base font-light mt-1 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
              {slide.subtitle}
            </p>

            {/* Bottom Action Bar */}
            <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <button
                  id="hero-explore-btn"
                  onClick={() => handleSlideClick(slide)}
                  className="group inline-flex items-center space-x-2 bg-white text-[#1c1c19] hover:bg-[#fcf9f4] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all transform active:scale-98 shadow-md"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#74584d]" />
                </button>

                <div className="hidden md:flex items-center space-x-1.5 text-xs text-white/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chuẩn Dược Mỹ Phẩm Thụy Sĩ</span>
                </div>
              </div>

              {/* Slide Counter & Next Product Preview */}
              <div className="flex items-center space-x-3 text-right">
                <div className="text-white/80 text-[11px] sm:text-xs font-serif tracking-wide hidden sm:block">
                  <span className="font-mono font-bold text-white">0{currentSlide + 1}</span> / 0{slides.length}
                </div>

                {/* Clickable Indicator Bars */}
                <div className="flex items-center space-x-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? 'w-6 sm:w-8 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left / Right Slide Navigation Arrows */}
        <button
          id="hero-prev-slide-btn"
          onClick={handlePrev}
          aria-label="Slide trước"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          id="hero-next-slide-btn"
          onClick={handleNext}
          aria-label="Slide tiếp theo"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Top-Right Next Slide Peek Chip */}
        <button
          onClick={handleNext}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden xs:inline-flex items-center space-x-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] text-white/90 transition-all hover:scale-102"
        >
          <span className="text-white/60">Tiếp:</span>
          <span className="font-medium text-amber-200 truncate max-w-[130px]">
            {slides[(currentSlide + 1) % slides.length].title.replace('Alps ', '')}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-white/80" />
        </button>
      </div>
    </div>
  );
};
