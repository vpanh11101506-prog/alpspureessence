import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onBuyNow?: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-[#202022]/6 p-2.5 sm:p-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f6f3ee] flex items-center justify-center">
        {/* Top Tag */}
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-block bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider text-[#1c1c19] border border-[#202022]/5 shadow-xs whitespace-nowrap">
            {product.tag}
          </span>
        </div>

        {/* Product Photo */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = product.fallbackImage;
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Product Information */}
      <div className="pt-2.5 sm:pt-3 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Volume/Capacity */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#77767b] font-medium">
            <span>ALPS • {product.capacity}</span>
            <span className="text-[9px] font-semibold text-[#74584d] tracking-normal bg-[#f7f2ee] px-1.5 py-0.2 rounded border border-[#74584d]/20">
              Pure Alps
            </span>
          </div>

          {/* Product Title */}
          <h4 className="font-serif text-sm sm:text-base font-normal text-[#1c1c19] tracking-tight mt-0.5 line-clamp-2 min-h-[2.5rem] group-hover:text-[#74584d] transition-colors">
            {product.name}
          </h4>

          {/* Subtitle / Key Ingredient */}
          <p className="text-[11px] sm:text-xs text-[#77767b] font-light mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Pricing & Actions */}
        <div className="mt-2.5 sm:mt-3 pt-2.5 border-t border-[#202022]/5 flex items-center justify-between gap-1.5">
          <div className="min-w-0 flex-grow">
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="font-serif text-sm sm:text-base font-semibold text-[#1c1c19]">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-[#77767b] line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
            {product.note && (
              <span className="block text-[10px] text-[#8a9a86] font-medium tracking-wide truncate">
                {product.note}
              </span>
            )}
          </div>

          {/* Action Buttons: Mua ngay & Thêm vào giỏ */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {onBuyNow && (
              <button
                id={`buy-now-btn-${product.id}`}
                onClick={(e) => onBuyNow(product, e)}
                className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider bg-[#202022] hover:bg-black text-white active:scale-95 transition-all whitespace-nowrap shadow-xs"
                title="Mua ngay (Chuyển sang thanh toán)"
              >
                MUA NGAY
              </button>
            )}

            {onAddToCart && (
              <button
                id={`add-cart-btn-${product.id}`}
                onClick={(e) => onAddToCart(product, e)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f6f3ee] hover:bg-[#ede7df] text-[#1c1c19] flex items-center justify-center active:scale-95 transition-all border border-[#202022]/8"
                title="Thêm vào giỏ hàng"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.6]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
