import React, { useState } from 'react';
import { Search, Bell, ShoppingBag, Smartphone, Monitor, Sparkles, X, User, Headphones } from 'lucide-react';
import { AlpsLogo } from './AlpsLogo';
import { ViewMode, ActiveTab, UserProfile } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMobileFrame?: boolean;
  user?: UserProfile | null;
  onOpenAccount?: () => void;
  onOpenSupport?: () => void;
  onOpenPolicies?: (tab?: 'returns' | 'privacy' | 'shipping') => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  cartCount = 0,
  onOpenCart,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  isMobileFrame = false,
  user,
  onOpenAccount,
  onOpenSupport,
  onOpenPolicies,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f4]/90 backdrop-blur-md border-b border-[#202022]/5">
      {/* Top Announcement Bar - visible in desktop or wide view */}
      {!isMobileFrame && (
        <div className="bg-[#202022] text-[#fcf9f4] text-xs py-1.5 px-4 hidden md:flex items-center justify-between tracking-wider font-light">
          <div className="flex items-center space-x-2 text-[11px] mx-auto">
            <span className="text-[#fed8c9]">✦</span>
            <span>BỘ SƯU TẬP MỚI 2025: MIỄN PHÍ GIAO HÀNG TOÀN QUỐC ĐƠN TỪ 500.000₫ • TẶNG THÌA BẠC CAO CẤP</span>
            <span className="text-[#fed8c9]">✦</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            {onOpenSupport && (
              <button
                onClick={onOpenSupport}
                className="text-[#fed8c9] hover:underline flex items-center space-x-1"
              >
                <Headphones className="w-3 h-3" />
                <span>CSKH: 1900 8899</span>
              </button>
            )}
            <span className="opacity-75">Thụy Sĩ • Zurich</span>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className={`px-4 ${isMobileFrame ? 'py-2.5' : 'py-3.5 max-w-7xl mx-auto'} flex items-center justify-between`}>
        {/* Left Side: Search or Mobile Navigation */}
        <div className="flex items-center space-x-3">
          {showSearchInput ? (
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#77767b] absolute left-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm serum, kem dưỡng, toner..."
                className="pl-8 pr-7 py-1 text-xs md:text-sm bg-[#f0ede9] rounded-full focus:outline-none focus:ring-1 focus:ring-[#74584d] w-44 md:w-60 transition-all text-[#1c1c19]"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2 text-[#77767b] hover:text-[#1c1c19]"
                title="Đóng tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="header-search-btn"
              onClick={() => setShowSearchInput(true)}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}

          {/* Desktop Navigation Links */}
          {!isMobileFrame && (
            <nav className="hidden lg:flex items-center space-x-6 pl-4 text-xs font-medium tracking-wider text-[#46464a]">
              <button
                onClick={() => onSelectTab('home')}
                className={`transition-colors hover:text-[#1c1c19] ${activeTab === 'home' ? 'text-[#1c1c19] font-semibold underline underline-offset-4 decoration-[#74584d]' : ''}`}
              >
                TRANG CHỦ
              </button>
              <button
                onClick={() => onSelectTab('catalog')}
                className={`transition-colors hover:text-[#1c1c19] ${activeTab === 'catalog' ? 'text-[#1c1c19] font-semibold underline underline-offset-4 decoration-[#74584d]' : ''}`}
              >
                DANH MỤC
              </button>
              <button
                onClick={() => onSelectTab('routine')}
                className={`transition-colors hover:text-[#1c1c19] ${activeTab === 'routine' ? 'text-[#1c1c19] font-semibold underline underline-offset-4 decoration-[#74584d]' : ''}`}
              >
                NGHI THỨC DƯỠNG SÁNG
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('minimalist-packaging');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="transition-colors hover:text-[#1c1c19]"
              >
                THIẾT KẾ BAO BÌ
              </button>
              <button
                onClick={() => {
                  if (onOpenAccount) onOpenAccount();
                  else onSelectTab('account');
                }}
                className={`transition-colors hover:text-[#1c1c19] ${activeTab === 'account' ? 'text-[#1c1c19] font-semibold underline underline-offset-4 decoration-[#74584d]' : ''}`}
              >
                DANH MỤC ĐÃ MUA
              </button>
              {onOpenSupport && (
                <button
                  id="nav-support-btn"
                  onClick={onOpenSupport}
                  className="transition-colors text-[#74584d] hover:text-[#1c1c19] font-semibold flex items-center space-x-1"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>CHĂM SÓC KHÁCH HÀNG</span>
                </button>
              )}
              {onOpenPolicies && (
                <button
                  id="nav-policies-btn"
                  onClick={() => onOpenPolicies('returns')}
                  className="transition-colors hover:text-[#1c1c19]"
                >
                  CHÍNH SÁCH
                </button>
              )}
            </nav>
          )}
        </div>

        {/* Center: Brand Logo with Alps Mountain Peak Icon */}
        <div
          onClick={() => onSelectTab('home')}
          className="cursor-pointer text-center select-none group py-1"
        >
          <AlpsLogo
            iconColor="#74584d"
            textColor="text-[#1c1c19] group-hover:text-[#74584d] transition-colors"
            subtitle="PURE ESSENCE"
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* View Mode Toggle (on standard desktop screen) */}
          {!isMobileFrame && (
            <div className="hidden sm:flex items-center bg-[#f0ede9] rounded-full p-0.5 border border-[#ebe8e3] text-xs">
              <button
                onClick={() => onViewModeChange('desktop')}
                className={`px-2.5 py-1 rounded-full flex items-center space-x-1 transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-[#202022] text-[#ffffff] shadow-xs'
                    : 'text-[#46464a] hover:text-[#1c1c19]'
                }`}
                title="Xem giao diện máy tính toàn màn hình"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden md:inline">Máy tính</span>
              </button>
              <button
                onClick={() => onViewModeChange('mobile')}
                className={`px-2.5 py-1 rounded-full flex items-center space-x-1 transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-[#202022] text-[#ffffff] shadow-xs'
                    : 'text-[#46464a] hover:text-[#1c1c19]'
                }`}
                title="Xem giao diện chuẩn điện thoại mô phỏng"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden md:inline">Điện thoại</span>
              </button>
            </div>
          )}

          {/* Customer Support Button */}
          {onOpenSupport && (
            <button
              id="header-support-btn"
              onClick={onOpenSupport}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative"
              title="Chăm sóc khách hàng & Tư vấn da liễu 24/7"
            >
              <Headphones className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8a9a86] rounded-full ring-2 ring-[#fcf9f4]" />
            </button>
          )}

          {/* Notifications button with indicator dot */}
          <div className="relative">
            <button
              id="header-bell-btn"
              onClick={() => setShowNotification(!showNotification)}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative"
              title="Thông báo"
            >
              <Bell className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#fcf9f4]" />
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-72 bg-[#ffffff] border border-[#ebe8e3] rounded-2xl shadow-xl p-3.5 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                  <span className="font-medium text-[#1c1c19]">Thông báo thương hiệu</span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-[#77767b] hover:text-[#1c1c19]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2.5 space-y-2">
                  <div className="p-2 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]/60">
                    <p className="font-medium text-[#74584d]">✦ Ra mắt BST Pure Radiance 2025</p>
                    <p className="text-[#46464a] text-[11px] mt-0.5">
                      Tặng kèm thìa bạc cao cấp cho mọi đơn hàng có Alps Regenerating Cream.
                    </p>
                  </div>
                  <div className="p-2 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]/60">
                    <p className="font-medium text-[#1c1c19]">Ưu đãi mã ALPS2025</p>
                    <p className="text-[#46464a] text-[11px] mt-0.5">
                      Giảm ngay 10% khi nhập mã tại bước thanh toán.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Order History Button */}
          {onOpenAccount && (
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors flex items-center space-x-1"
              title={user ? `Tài khoản (${user.name}) - Xem danh mục đã mua` : 'Đăng nhập / Đăng ký'}
            >
              {user ? (
                <div className="w-6 h-6 rounded-full bg-[#74584d] text-white text-[10px] font-medium flex items-center justify-center shadow-xs">
                  {user.avatarInitials}
                </div>
              ) : (
                <User className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          )}

          {/* Shopping Bag Button (No badge when empty) */}
          {onOpenCart && (
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative"
              title="Giỏ hàng của bạn"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#1c1c19] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
