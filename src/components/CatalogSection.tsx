import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { AlpsIcon } from './AlpsLogo';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onBuyNow?: (product: Product, e: React.MouseEvent) => void;
  searchQuery?: string;
  isMobileFrame?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  searchQuery = '',
  isMobileFrame = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter products by category and search query
  let filteredProducts = products.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section className={`w-full ${isMobileFrame ? 'px-3 pt-5' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12'}`}>
      {/* Title & Count & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#1c1c19] tracking-tight">
            Danh Mục Sản Phẩm
          </h2>
          <p className="inline-flex items-center space-x-1.5 text-[11px] sm:text-xs text-[#77767b] font-light mt-0.5">
            <AlpsIcon className="w-3 h-3 text-[#74584d]" color="#74584d" />
            <span>Bộ sưu tập dược mỹ phẩm thuần khiết ALPS Skincare</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-[11px] font-semibold tracking-wider text-[#77767b] uppercase whitespace-nowrap">
            {filteredProducts.length} SẢN PHẨM
          </span>
          <span className="text-[#c7c6ca]">|</span>
          <div className="flex items-center space-x-1 text-[11px] text-[#46464a]">
            <span className="text-[#77767b] hidden sm:inline">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sắp xếp danh mục sản phẩm"
              className="bg-transparent border border-[#202022]/10 rounded-lg px-2 py-1 text-xs text-[#1c1c19] focus:outline-none cursor-pointer"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (horizontally scrollable on mobile as in screenshot) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 mb-4 sm:mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider font-medium whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-[#08080a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#46464a] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid: 2 columns on mobile (exactly like Image 1), 4 columns on large screen */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#202022]/6">
          <p className="font-serif text-base text-[#1c1c19]">Không tìm thấy sản phẩm phù hợp</p>
          <p className="text-xs text-[#77767b] mt-1">
            Vui lòng thử tìm kiếm bằng từ khóa khác hoặc chọn danh mục khác.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </section>
  );
};
