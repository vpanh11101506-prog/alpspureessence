import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/initialOrders';
import { Product, CartItem, ActiveTab, ViewMode, Order, UserProfile } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RitualCallout } from './components/RitualCallout';
import { CatalogSection } from './components/CatalogSection';
import { MinimalistPackagingDesign } from './components/MinimalistPackagingDesign';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RitualModal } from './components/RitualModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { AccountDrawer } from './components/AccountDrawer';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { SupportFloatingButton } from './components/SupportFloatingButton';
import { CheckoutModal } from './components/CheckoutModal';
import { PoliciesModal, PolicyTabType } from './components/PoliciesModal';
import { Footer } from './components/Footer';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Device view mode: 'desktop' | 'mobile' | 'responsive'
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic User Profile State (Logged out by default, sanitized of demo users)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('alps_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed?.email?.includes('vophuonganh') ||
          parsed?.name?.includes('Phương Anh') ||
          parsed?.email?.includes('khachhang@alps.id.vn')
        ) {
          localStorage.removeItem('alps_user_profile');
          return null;
        }
        if (parsed?.isLoggedIn && parsed?.name) return parsed;
      }
    } catch {}
    return null;
  });

  // Dynamic Shopping Cart State: Starts strictly with NO PRODUCTS (Empty: 0 items)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alps_active_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return []; // Empty cart by default
  });

  // Save Cart state
  useEffect(() => {
    try {
      localStorage.setItem('alps_active_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Pending purchase action when customer is prompted to log in before purchasing
  const [pendingPurchaseAction, setPendingPurchaseAction] = useState<{
    type: 'buy_now' | 'full_set';
    product?: Product;
    quantity?: number;
  } | null>(null);

  // Dynamic Order History State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('alps_purchased_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (o) =>
              !o.buyerName?.includes('Phương Anh') &&
              !o.shippingAddress?.includes('Landmark 81')
          );
          if (filtered.length !== parsed.length) {
            localStorage.setItem('alps_purchased_orders', JSON.stringify(filtered));
          }
          return filtered;
        }
      }
    } catch {}
    return INITIAL_ORDERS;
  });

  // Persist User and Orders
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('alps_user_profile', JSON.stringify(user));
      } else {
        localStorage.removeItem('alps_user_profile');
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('alps_purchased_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'orders' | 'profile'>('orders');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [policiesInitialTab, setPoliciesInitialTab] = useState<PolicyTabType>('returns');
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [latestOrderNumber, setLatestOrderNumber] = useState('ALPS-89421');
  const [latestRecipient, setLatestRecipient] = useState<{
    name: string;
    phone: string;
    address: string;
  }>({
    name: '',
    phone: '',
    address: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart total items
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // User Actions: Login, Logout, Update Profile
  const handleLogin = (name: string, email: string, phone?: string, address?: string) => {
    const initials =
      name
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(-2)
        .toUpperCase() || 'AL';

    const updatedUser: UserProfile = {
      name,
      email,
      phone: phone || '',
      address: address || '',
      tier: 'Hội Viên Alps Pure Privileges',
      points: 100,
      avatarInitials: initials,
      isLoggedIn: true,
    };
    setUser(updatedUser);
    setLatestRecipient({
      name,
      phone: phone || '',
      address: address || '',
    });
    setIsAccountOpen(false);
    showToast(`Đăng nhập thành công! Chào mừng ${name}`);

    // If customer clicked Buy Now prior to logging in, resume it immediately
    if (pendingPurchaseAction) {
      if (pendingPurchaseAction.type === 'buy_now' && pendingPurchaseAction.product) {
        setCheckoutItems([
          { product: pendingPurchaseAction.product, quantity: pendingPurchaseAction.quantity || 1 },
        ]);
        setIsCheckoutOpen(true);
      } else if (pendingPurchaseAction.type === 'full_set') {
        setCheckoutItems(PRODUCTS.map((product) => ({ product, quantity: 1 })));
        setIsCheckoutOpen(true);
      }
      setPendingPurchaseAction(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Đã đăng xuất tài khoản thành công');
  };

  const handleUpdateProfile = (updated: { name: string; phone: string; address: string }) => {
    setUser((prev) => {
      const initials =
        updated.name
          .trim()
          .split(' ')
          .filter(Boolean)
          .map((part) => part[0])
          .join('')
          .slice(-2)
          .toUpperCase() || (prev ? prev.avatarInitials : 'AL');

      return {
        ...(prev || {
          email: '',
          tier: 'Hội Viên Alps Pure Privileges',
          points: 100,
          isLoggedIn: true,
        }),
        name: updated.name,
        phone: updated.phone,
        address: updated.address,
        avatarInitials: initials,
      };
    });
    setLatestRecipient({
      name: updated.name,
      phone: updated.phone,
      address: updated.address,
    });
    showToast('Đã lưu thông tin người nhận và địa chỉ giao hàng!');
  };

  const handleUpdateOrderAddress = (orderId: string, newAddress: string, newPhone?: string, newName?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            shippingAddress: newAddress,
            ...(newPhone ? { phone: newPhone } : {}),
            ...(newName ? { buyerName: newName } : {}),
          };
        }
        return order;
      })
    );
    showToast('Đã cập nhật thông tin giao hàng cho đơn hàng thành công!');
  };

  // CART HANDLERS
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Đã làm trống giỏ hàng');
  };

  const handleAddFullSetToCart = () => {
    setCart(PRODUCTS.map((product) => ({ product, quantity: 1 })));
    setIsCartOpen(true);
    showToast('Đã thêm trọn bộ 5 sản phẩm vào giỏ hàng');
  };

  const handleOpenCheckoutFromCart = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống');
      return;
    }
    if (!user || !user.isLoggedIn) {
      setIsCartOpen(false);
      setAccountInitialTab('profile');
      setIsAccountOpen(true);
      showToast('Quý khách vui lòng đăng nhập tài khoản để tiến hành thanh toán');
      return;
    }
    setCheckoutItems(cart);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // BUY NOW Action: Direct Checkout
  const handleBuyNow = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!user || !user.isLoggedIn) {
      setPendingPurchaseAction({ type: 'buy_now', product, quantity });
      setAccountInitialTab('profile');
      setIsAccountOpen(true);
      showToast('Quý khách vui lòng đăng nhập tài khoản để tiến hành mua hàng');
      return;
    }
    setCheckoutItems([{ product, quantity }]);
    setIsCheckoutOpen(true);
    showToast(`Chuyển đến thanh toán: ${product.name}`);
  };

  // BUY FULL SET RITUAL (5 STEPS)
  const handleBuyFullSet = () => {
    if (!user || !user.isLoggedIn) {
      setPendingPurchaseAction({ type: 'full_set' });
      setAccountInitialTab('profile');
      setIsAccountOpen(true);
      showToast('Quý khách vui lòng đăng nhập tài khoản để đặt mua trọn bộ');
      return;
    }
    setCheckoutItems(PRODUCTS.map((product) => ({ product, quantity: 1 })));
    setIsCheckoutOpen(true);
    showToast('Chuyển sang thanh toán trọn bộ Nghi thức 5 bước Alps');
  };

  // Re-order past purchased order
  const handleReorder = (order: Order) => {
    setCheckoutItems(
      order.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }))
    );
    setIsAccountOpen(false);
    setIsCheckoutOpen(true);
    showToast(`Chuyển đến thanh toán cho ${order.items.length} sản phẩm từ đơn #${order.orderNumber}`);
  };

  // Open Policies Modal
  const handleOpenPolicies = (tab: PolicyTabType = 'returns') => {
    setPoliciesInitialTab(tab);
    setIsPoliciesOpen(true);
  };

  // Checkout and place order dynamically from CheckoutModal
  const handleCompleteOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setLatestOrderNumber(order.orderNumber);
    setLatestRecipient({
      name: order.buyerName || user?.name || 'Khách Hàng',
      phone: order.phone || user?.phone || '',
      address: order.shippingAddress || user?.address || '',
    });

    // Clear cart if checkout was from cart
    setCart([]);

    setIsCheckoutOpen(false);
    setIsCheckoutSuccessOpen(true);
    showToast(`Đặt hàng #${order.orderNumber} thành công!`);
  };

  // Tab switcher
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'account') {
      setAccountInitialTab('orders');
      setIsAccountOpen(true);
    } else if (tab === 'routine') {
      setIsRitualModalOpen(true);
    } else if (tab === 'cart') {
      setIsCartOpen(true);
    }
  };

  const handleOpenPurchasedCategory = () => {
    setAccountInitialTab('orders');
    setIsAccountOpen(true);
  };

  // Scroll to catalog helper
  const handleScrollToCatalog = () => {
    const el = document.getElementById('desktop-catalog') || document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Determine if we should wrap in simulated phone frame
  const isMobileSimulation = viewMode === 'mobile';

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      {/* Top Device Mode Toolbar for testing desktop vs phone views */}
      <div className="bg-[#202022] text-[#fcf9f4] px-4 py-1.5 flex items-center justify-between text-xs border-b border-[#202022]/20 select-none z-50">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#8a9a86] animate-pulse" />
          <span className="font-medium tracking-wide">ALPS PURE ESSENCE • ZÜRICH</span>
          <span className="text-[#fed8c9]/80 hidden sm:inline">| Dược Mỹ Phẩm Thuần Chay Thụy Sĩ</span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-1 bg-black/40 p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1.5 text-[11px] ${
              viewMode === 'desktop' ? 'bg-[#74584d] text-white shadow-xs' : 'text-[#fed8c9]/70 hover:text-white'
            }`}
            title="Xem giao diện máy tính để bàn"
          >
            <span>Máy tính</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1.5 text-[11px] ${
              viewMode === 'mobile' ? 'bg-[#74584d] text-white shadow-xs' : 'text-[#fed8c9]/70 hover:text-white'
            }`}
            title="Xem khung mô phỏng điện thoại di động"
          >
            <span>Điện thoại</span>
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`px-2.5 py-1 rounded-md transition-colors text-[11px] ${
              viewMode === 'responsive' ? 'bg-[#74584d] text-white shadow-xs' : 'text-[#fed8c9]/70 hover:text-white'
            }`}
            title="Chế độ co giãn theo kích thước trình duyệt"
          >
            Tự động
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      {isMobileSimulation ? (
        /* Phone Frame Wrapper */
        <div className="flex-grow flex items-center justify-center p-2 sm:p-6 bg-[#202022]/10 overflow-x-hidden">
          <div className="w-full max-w-[390px] h-[844px] bg-[#fcf9f4] rounded-[48px] shadow-2xl border-[10px] border-[#202022] overflow-hidden flex flex-col relative">
            {/* Phone Notch / Dynamic Island */}
            <div className="w-32 h-4.5 bg-[#202022] rounded-full mx-auto mt-2 z-50 shrink-0" />

            {/* Simulated Phone Content Scroll Area */}
            <div className="overflow-y-auto flex-grow relative pb-20 scrollbar-none">
              <Header
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isMobileFrame={true}
                user={user}
                onOpenAccount={handleOpenPurchasedCategory}
                onOpenSupport={() => setIsSupportOpen(true)}
                onOpenPolicies={handleOpenPolicies}
              />

              <HeroBanner
                onExploreClick={handleScrollToCatalog}
                isMobileFrame={true}
              />

              <RitualCallout
                onOpenRitual={() => setIsRitualModalOpen(true)}
                isMobileFrame={true}
              />

              <div id="catalog-section">
                <CatalogSection
                  products={PRODUCTS}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
                  searchQuery={searchQuery}
                  isMobileFrame={true}
                />
              </div>

              <MinimalistPackagingDesign
                onOpenCollection={handleScrollToCatalog}
                isMobileFrame={true}
              />

              <BrandPhilosophy isMobileFrame={true} />

              <Footer
                isMobileFrame={true}
                onOpenSupport={() => setIsSupportOpen(true)}
                onOpenPolicies={handleOpenPolicies}
              />
            </div>

            {/* Floating CSKH button inside simulated mobile frame */}
            <SupportFloatingButton
              onOpenSupport={() => setIsSupportOpen(true)}
              isMobileFrame={true}
            />

            {/* Bottom Nav inside Phone Frame */}
            <div className="absolute bottom-0 left-0 right-0 z-40">
              <BottomNav
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Full Layout (Desktop & Fluid Responsive Mode) */
        <div className="flex-grow flex flex-col">
          <Header
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isMobileFrame={false}
            user={user}
            onOpenAccount={handleOpenPurchasedCategory}
            onOpenSupport={() => setIsSupportOpen(true)}
            onOpenPolicies={handleOpenPolicies}
          />

          <main className="flex-grow pb-16 sm:pb-0">
            <HeroBanner
              onExploreClick={handleScrollToCatalog}
              isMobileFrame={false}
            />

            <RitualCallout
              onOpenRitual={() => setIsRitualModalOpen(true)}
              isMobileFrame={false}
            />

            <div id="desktop-catalog">
              <CatalogSection
                products={PRODUCTS}
                onSelectProduct={setSelectedProduct}
                onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
                searchQuery={searchQuery}
                isMobileFrame={false}
              />
            </div>

            <MinimalistPackagingDesign
              onOpenCollection={handleScrollToCatalog}
              isMobileFrame={false}
            />

            <BrandPhilosophy isMobileFrame={false} />
          </main>

          <Footer
            isMobileFrame={false}
            onOpenSupport={() => setIsSupportOpen(true)}
            onOpenPolicies={handleOpenPolicies}
          />

          {/* Floating CSKH 24/7 button on desktop / tablet / mobile web */}
          <SupportFloatingButton
            onOpenSupport={() => setIsSupportOpen(true)}
            isMobileFrame={false}
          />

          {/* Bottom Nav appears on small screens when in responsive mode */}
          <div className="block sm:hidden">
            <BottomNav
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              cartCount={totalCartCount}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Cart Drawer (Starts completely empty with elegant empty state) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenCheckout={handleOpenCheckoutFromCart}
        onExploreProducts={handleScrollToCatalog}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
      />

      {/* Full Checkout & Payment Modal (COD, VietQR, Bank Transfer) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        user={user}
        onCompleteOrder={handleCompleteOrder}
        onShowToast={showToast}
        onOpenPolicies={handleOpenPolicies}
        onOpenLogin={() => {
          setIsCheckoutOpen(false);
          setAccountInitialTab('profile');
          setIsAccountOpen(true);
        }}
      />

      {/* Policies Modal (Đổi trả, Bảo mật, Vận chuyển) */}
      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
        initialTab={policiesInitialTab}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Ritual 5-Step Modal */}
      <RitualModal
        isOpen={isRitualModalOpen}
        onClose={() => setIsRitualModalOpen(false)}
        onSelectProduct={setSelectedProduct}
        onBuyFullSet={handleBuyFullSet}
        onAddFullSetToCart={handleAddFullSetToCart}
      />

      {/* Account Profile Drawer with Dynamic Login/Logout & Purchased Orders */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        orders={orders}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
        onUpdateOrderAddress={handleUpdateOrderAddress}
        onSelectProduct={setSelectedProduct}
        onReorder={handleReorder}
        onOpenSupport={() => setIsSupportOpen(true)}
        initialTab={accountInitialTab}
      />

      {/* Order Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderNumber={latestOrderNumber}
        recipientName={latestRecipient.name}
        phone={latestRecipient.phone}
        shippingAddress={latestRecipient.address}
        onViewOrders={handleOpenPurchasedCategory}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Customer Support Center Modal (CSKH 24/7 & AI) */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        user={user}
        onShowToast={showToast}
        onOpenLogin={() => {
          setIsSupportOpen(false);
          setAccountInitialTab('profile');
          setIsAccountOpen(true);
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#202022] text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in border border-[#46464a]">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
