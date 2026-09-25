import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Award,
  Clock,
  LogOut,
  Package,
  CheckCircle2,
  Truck,
  RotateCcw,
  Mail,
  Lock,
  Phone,
  MapPin,
  Edit3,
  Check,
  Headphones,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { UserProfile, Order, Product } from '../types';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  orders: Order[];
  onLogin: (name: string, email: string, phone?: string, address?: string) => void;
  onLogout: () => void;
  onUpdateProfile?: (updated: { name: string; phone: string; address: string }) => void;
  onUpdateOrderAddress?: (orderId: string, newAddress: string, newPhone?: string, newName?: string) => void;
  onSelectProduct: (product: Product) => void;
  onReorder: (order: Order) => void;
  onOpenSupport?: () => void;
  initialTab?: 'orders' | 'profile';
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  onLogin,
  onLogout,
  onUpdateProfile,
  onUpdateOrderAddress,
  onSelectProduct,
  onReorder,
  onOpenSupport,
  initialTab = 'orders',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile'>(initialTab);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // UI state
  const [authError, setAuthError] = useState('');
  const [showForgotTip, setShowForgotTip] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'processing' | 'shipping' | 'delivered'>('all');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Order Address Edit State (for pending/processing orders)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderNewAddress, setOrderNewAddress] = useState('');
  const [orderNewPhone, setOrderNewPhone] = useState('');
  const [orderNewName, setOrderNewName] = useState('');

  // Sync state whenever user changes or modal opens
  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setEditAddress(user.address || '');
    } else {
      setEditName('');
      setEditPhone('');
      setEditAddress('');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const identifier = loginIdentifier.trim();
    if (!identifier) {
      setAuthError('Vui lòng nhập email hoặc số điện thoại của bạn.');
      return;
    }
    if (!loginPassword.trim()) {
      setAuthError('Vui lòng nhập mật khẩu tài khoản.');
      return;
    }

    // Check if there is a saved account registry in localStorage
    let storedName = '';
    let storedEmail = identifier.includes('@') ? identifier : '';
    let storedPhone = !identifier.includes('@') ? identifier : '';
    let storedAddress = '';

    try {
      const accountsJson = localStorage.getItem('alps_registered_accounts');
      if (accountsJson) {
        const accounts: Array<{ name: string; email: string; phone?: string; address?: string }> = JSON.parse(accountsJson);
        const matched = accounts.find(
          (acc) =>
            (acc.email && acc.email.toLowerCase() === identifier.toLowerCase()) ||
            (acc.phone && acc.phone === identifier)
        );
        if (matched) {
          storedName = matched.name;
          storedEmail = matched.email;
          storedPhone = matched.phone || '';
          storedAddress = matched.address || '';
        }
      }
    } catch {}

    if (!storedName) {
      // Derive a polite display name from the email or phone if first-time sign-in
      if (identifier.includes('@')) {
        const localPart = identifier.split('@')[0];
        storedName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
      } else {
        storedName = `Khách hàng (${identifier.slice(-4)})`;
      }
    }

    onLogin(storedName, storedEmail || `${identifier}@khachhang.alps.vn`, storedPhone, storedAddress);
    setLoginIdentifier('');
    setLoginPassword('');
    setAuthError('');
  };

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const name = registerName.trim();
    const phone = registerPhone.trim();
    const email = registerEmail.trim();
    const password = registerPassword.trim();

    if (!name) {
      setAuthError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email && !phone) {
      setAuthError('Vui lòng nhập số điện thoại hoặc email liên hệ.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Mật khẩu cần tối thiểu 6 ký tự để bảo vệ tài khoản.');
      return;
    }

    // Save newly registered account to local registry for subsequent sign-ins
    try {
      const accountsJson = localStorage.getItem('alps_registered_accounts');
      const accounts = accountsJson ? JSON.parse(accountsJson) : [];
      accounts.push({ name, email, phone, address: '' });
      localStorage.setItem('alps_registered_accounts', JSON.stringify(accounts));
    } catch {}

    onLogin(name, email || `${phone}@khachhang.alps.vn`, phone, '');
    setRegisterName('');
    setRegisterPhone('');
    setRegisterEmail('');
    setRegisterPassword('');
    setAuthError('');
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      alert('Vui lòng nhập họ tên người mua');
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        address: editAddress.trim(),
      });
    }

    setIsEditingProfile(false);
    setSaveSuccessMsg('Đã cập nhật thông tin và địa chỉ giao hàng thành công!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleSaveOrderAddress = (orderId: string) => {
    if (!orderNewAddress.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng mới');
      return;
    }
    if (onUpdateOrderAddress) {
      onUpdateOrderAddress(
        orderId,
        orderNewAddress.trim(),
        orderNewPhone.trim() || undefined,
        orderNewName.trim() || undefined
      );
    }
    setEditingOrderId(null);
  };

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#74584d]">✦</span>
            <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
              {user ? 'Tài Khoản Thành Viên ALPS' : 'Tài Khoản ALPS Pure Essence'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation when logged in */}
        {user ? (
          <div className="bg-white px-4 pt-2 border-b border-[#202022]/8 flex space-x-6">
            <button
              onClick={() => {
                setActiveSubTab('orders');
                setIsEditingProfile(false);
              }}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative ${
                activeSubTab === 'orders'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span>Danh Mục Đã Mua</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#f0ede9] text-[#1c1c19]">
                {orders.length}
              </span>
              {activeSubTab === 'orders' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('profile')}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative ${
                activeSubTab === 'profile'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span>Hồ Sơ & Địa Chỉ Giao Hàng</span>
              {activeSubTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>
          </div>
        ) : null}

        {/* Body Container */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
          {saveSuccessMsg && (
            <div className="bg-[#8a9a86]/20 border border-[#8a9a86]/40 text-[#2f4a2b] px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3d5a39]" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {!user ? (
            /* --- LOGGED OUT STATE: CLEAN AUTHENTICATION --- */
            <div className="space-y-4">
              {/* Brand Privilege Intro */}
              <div className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto mb-2 border border-[#ebe8e3]">
                  <User className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-normal text-[#1c1c19]">
                  Đăng Nhập Khách Hàng
                </h4>
                <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                  Đăng nhập tài khoản để theo dõi đơn hàng, quản lý địa chỉ nhận hàng và nhận ưu đãi độc quyền chuẩn Thụy Sĩ.
                </p>

                {/* Auth Mode Switcher */}
                <div className="flex bg-[#f6f3ee] rounded-full p-1 border border-[#ebe8e3] mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError('');
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'login'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Đăng nhập</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'register'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Tạo tài khoản</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              {authMode === 'login' ? (
                <form
                  onSubmit={handleLoginFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Email hoặc Số điện thoại <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => {
                          setLoginIdentifier(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Nhập email hoặc số điện thoại của bạn"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-[#1c1c19]">
                        Mật khẩu <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotTip(!showForgotTip)}
                        className="text-[11px] text-[#74584d] hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Nhập mật khẩu"
                        className="w-full text-xs pl-9 pr-9 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-2.5 text-[#77767b] hover:text-[#1c1c19]"
                        title={showLoginPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {showForgotTip && (
                    <div className="p-3 bg-[#f6f3ee] border border-[#ebe8e3] rounded-xl text-[11px] text-[#74584d] flex items-start space-x-2 animate-fadeIn">
                      <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        Để bảo vệ an toàn thông tin khách hàng, vui lòng liên hệ hotline chăm sóc khách hàng <strong>1900 8899</strong> hoặc gửi yêu cầu tới <strong>pure@alps.com</strong> để đặt lại mật khẩu tức thì.
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center space-x-2 text-[#46464a] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-[#ebe8e3] text-[#74584d] focus:ring-[#74584d]"
                      />
                      <span>Ghi nhớ đăng nhập</span>
                    </label>
                  </div>

                  {authError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    ĐĂNG NHẬP
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthError('');
                      }}
                      className="text-xs text-[#74584d] hover:underline"
                    >
                      Chưa có tài khoản? Đăng ký ngay
                    </button>
                  </div>
                </form>
              ) : (
                /* Register Form */
                <form
                  onSubmit={handleRegisterFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Họ và tên của bạn <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => {
                          setRegisterName(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Nhập họ và tên đầy đủ"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Số điện thoại nhận hàng <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => {
                          setRegisterPhone(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Nhập số điện thoại của bạn"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Địa chỉ Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => {
                          setRegisterEmail(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Nhập địa chỉ email của bạn"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Mật khẩu <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
                        className="w-full text-xs pl-9 pr-9 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-2.5 text-[#77767b] hover:text-[#1c1c19]"
                        title={showRegisterPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    TẠO TÀI KHOẢN MỚI
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                      className="text-xs text-[#74584d] hover:underline"
                    >
                      Đã có tài khoản? Đăng nhập ngay
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : activeSubTab === 'orders' ? (
            /* --- TAB 1: DANH MỤC ĐÃ MUA (ORDER HISTORY) --- */
            <div className="space-y-3.5">
              {/* Order Status Filters */}
              <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setOrderStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    orderStatusFilter === 'all'
                      ? 'bg-[#202022] text-white'
                      : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                  }`}
                >
                  Tất cả ({orders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('processing')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    orderStatusFilter === 'processing'
                      ? 'bg-[#202022] text-white'
                      : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                  }`}
                >
                  Đang chuẩn bị ({orders.filter((o) => o.status === 'processing').length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('shipping')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    orderStatusFilter === 'shipping'
                      ? 'bg-[#202022] text-white'
                      : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                  }`}
                >
                  Đang giao ({orders.filter((o) => o.status === 'shipping').length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    orderStatusFilter === 'delivered'
                      ? 'bg-[#202022] text-white'
                      : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                  }`}
                >
                  Đã nhận hàng ({orders.filter((o) => o.status === 'delivered' || o.status === 'completed').length})
                </button>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-[#202022]/6">
                  <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#1c1c19]">
                    Chưa có đơn hàng nào
                  </h4>
                  <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                    Khám phá ngay bộ sưu tập chăm sóc da thuần chay chuẩn Thụy Sĩ của ALPS.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 bg-[#202022] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
                  >
                    Xem sản phẩm
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isDelivered = order.status === 'delivered' || order.status === 'completed';
                  const isShipping = order.status === 'shipping';
                  const isProcessing = order.status === 'processing';
                  const isEditingThisOrder = editingOrderId === order.id;

                  const currentRecipientName = order.buyerName || user?.name || 'Khách hàng ALPS';
                  const currentPhone = order.phone || user?.phone || '';
                  const currentAddress = order.shippingAddress || user?.address || '';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif text-sm font-semibold text-[#1c1c19]">
                              #{order.orderNumber}
                            </span>
                            <span className="text-[10px] text-[#77767b]">
                              • {order.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider ${
                            isDelivered
                              ? 'bg-[#8a9a86]/15 text-[#3d5a39]'
                              : isShipping
                              ? 'bg-[#4a6b82]/15 text-[#2c4a60]'
                              : 'bg-[#d4974f]/15 text-[#855418]'
                          }`}
                        >
                          {isDelivered ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : isShipping ? (
                            <Truck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{order.statusLabel}</span>
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              onSelectProduct(item.product);
                              onClose();
                            }}
                            className="flex items-center space-x-3 cursor-pointer group hover:bg-[#fcf9f4] p-1.5 rounded-xl transition-colors"
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/8">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = item.product.fallbackImage;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0 flex-grow">
                              <h5 className="font-serif text-xs font-normal text-[#1c1c19] truncate group-hover:text-[#74584d] transition-colors">
                                {item.product.name}
                              </h5>
                              <div className="text-[10px] text-[#77767b] flex items-center space-x-2 mt-0.5">
                                <span>{item.product.capacity}</span>
                                <span>• SL: x{item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-xs font-medium text-[#1c1c19] shrink-0 text-right">
                              {(item.unitPrice * item.quantity).toLocaleString('vi-VN')}₫
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Recipient Details on each order */}
                      {(currentAddress || currentRecipientName) && (
                        <div className="bg-[#fcf9f4] rounded-2xl p-3 border border-[#ebe8e3] text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5 text-[#1c1c19] font-medium text-[11px]">
                              <MapPin className="w-3.5 h-3.5 text-[#74584d]" />
                              <span>
                                {currentRecipientName} {currentPhone ? `• ${currentPhone}` : ''}
                              </span>
                            </div>

                            {/* Allow changing delivery info for processing orders */}
                            {isProcessing && onUpdateOrderAddress && (
                              <button
                                onClick={() => {
                                  if (isEditingThisOrder) {
                                    setEditingOrderId(null);
                                  } else {
                                    setEditingOrderId(order.id);
                                    setOrderNewName(currentRecipientName);
                                    setOrderNewPhone(currentPhone);
                                    setOrderNewAddress(currentAddress);
                                  }
                                }}
                                className="text-[10px] text-[#74584d] font-semibold hover:underline flex items-center space-x-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>{isEditingThisOrder ? 'Đóng' : 'Đổi địa chỉ'}</span>
                              </button>
                            )}
                          </div>

                          {!isEditingThisOrder ? (
                            currentAddress ? (
                              <p className="text-[11px] text-[#77767b] pl-5 leading-relaxed">
                                {currentAddress}
                              </p>
                            ) : null
                          ) : (
                            /* Inline Edit for Pending Order Delivery Info */
                            <div className="pt-2 border-t border-[#ebe8e3] space-y-2 mt-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                    Tên người nhận
                                  </label>
                                  <input
                                    type="text"
                                    value={orderNewName}
                                    onChange={(e) => setOrderNewName(e.target.value)}
                                    placeholder="Nhập họ và tên người nhận"
                                    className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                    Số điện thoại
                                  </label>
                                  <input
                                    type="text"
                                    value={orderNewPhone}
                                    onChange={(e) => setOrderNewPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                  Địa chỉ giao hàng mới
                                </label>
                                <textarea
                                  rows={2}
                                  value={orderNewAddress}
                                  onChange={(e) => setOrderNewAddress(e.target.value)}
                                  placeholder="Nhập địa chỉ giao hàng chi tiết"
                                  className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setEditingOrderId(null)}
                                  className="px-3 py-1 bg-white text-[#77767b] border border-[#ebe8e3] rounded-full text-[11px]"
                                >
                                  Hủy
                                </button>
                                <button
                                  onClick={() => handleSaveOrderAddress(order.id)}
                                  className="px-3 py-1 bg-[#202022] text-white rounded-full text-[11px] font-medium hover:bg-black"
                                >
                                  Lưu địa chỉ đơn này
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Order Footer & Action */}
                      <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[11px] text-[#77767b] block">Tổng thanh toán</span>
                          <span className="font-serif text-base font-semibold text-[#1c1c19]">
                            {order.totalAmount.toLocaleString('vi-VN')}₫
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onReorder(order)}
                            className="inline-flex items-center space-x-1.5 bg-[#f6f3ee] hover:bg-[#f0ede9] text-[#1c1c19] px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
                            title="Đặt mua lại các sản phẩm này ngay"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#74584d]" />
                            <span>Mua lại</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Customer Care Banner in Orders Tab */}
              {onOpenSupport && (
                <div className="bg-[#fcf9f4] rounded-2xl p-4 border border-[#ebe8e3] text-xs space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d]">
                      <Headphones className="w-4 h-4" />
                      <span>Cần hỗ trợ tra cứu hoặc đổi thông tin đơn hàng?</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">1900 8899</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    Bạn có thể liên hệ trực tiếp với bộ phận Chăm Sóc Khách Hàng 24/7 để được hỗ trợ điều hướng vận chuyển, đổi địa chỉ hoặc tư vấn phác đồ sử dụng.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>LIÊN HỆ CHĂM SÓC KHÁCH HÀNG</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* --- TAB 2: HỒ SƠ & ĐẶC QUYỀN (PROFILE & EDIT FORM) --- */
            <div className="space-y-4">
              {/* User Profile Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#74584d] font-serif text-lg border border-[#ebe8e3] shrink-0 font-medium">
                    {user.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-base font-normal text-[#1c1c19] truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-[#77767b] truncate">{user.email}</p>
                    <div className="inline-flex items-center space-x-1 mt-1 text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium">
                      <Award className="w-3 h-3" />
                      <span>{user.tier}</span>
                    </div>
                  </div>
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="p-2 text-[#74584d] hover:bg-[#f6f3ee] rounded-full transition-colors shrink-0"
                    title="Chỉnh sửa thông tin"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Edit Mode vs Display Mode for Buyer Info & Shipping Address */}
              {isEditingProfile ? (
                <form
                  onSubmit={handleSaveProfileSubmit}
                  className="bg-white rounded-3xl p-5 border-2 border-[#74584d]/30 shadow-md space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                    <div className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4 text-[#74584d]" />
                      <h5 className="font-serif text-sm font-semibold text-[#1c1c19]">
                        Thay Đổi Thông Tin Giao Hàng & Người Mua
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs text-[#77767b] hover:text-[#1c1c19]"
                    >
                      Hủy
                    </button>
                  </div>

                  {/* Buyer Name Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Họ và tên người mua / nhận hàng <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Nhập họ và tên người mua"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Số điện thoại nhận hàng
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="Nhập số điện thoại nhận hàng"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Shipping Address Textarea */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Địa chỉ nhận hàng chi tiết
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        className="w-full text-xs p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] leading-relaxed font-medium"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 py-2.5 bg-[#f6f3ee] text-[#1c1c19] rounded-full text-xs font-medium hover:bg-[#ebe8e3] transition-colors"
                    >
                      HỦY BỎ
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#202022] hover:bg-black text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>LƯU THÔNG TIN</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Saved Shipping Info Display Card with Edit Button */
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                    <div className="flex items-center space-x-2 text-[#1c1c19] font-medium text-xs">
                      <MapPin className="w-4 h-4 text-[#74584d]" />
                      <span>Thông Tin Người Nhận & Địa Chỉ Mặc Định</span>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center space-x-1 text-xs text-[#74584d] font-semibold hover:underline bg-[#fed8c9]/25 px-2.5 py-1 rounded-full"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Thay đổi</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-28 shrink-0">Họ và tên:</span>
                      <span className="text-[#1c1c19] font-semibold text-right">{user.name}</span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-28 shrink-0">Số điện thoại:</span>
                      <span className="text-[#1c1c19] font-medium text-right">
                        {user.phone || <span className="text-[#77767b] font-normal italic">Chưa cập nhật</span>}
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-28 shrink-0">Địa chỉ giao:</span>
                      <span className="text-[#46464a] text-right max-w-xs leading-relaxed">
                        {user.address || <span className="text-[#77767b] font-normal italic">Chưa cập nhật địa chỉ</span>}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    ĐIỂM TÍCH LŨY
                  </span>
                  <span className="font-serif text-xl text-[#1c1c19] font-medium mt-0.5 block">
                    {user.points.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-[#8a9a86]">
                    Đổi {(user.points * 100).toLocaleString('vi-VN')}₫ ưu đãi
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    ĐƠN ĐÃ HOÀN TẤT
                  </span>
                  <span className="font-serif text-xl text-[#74584d] font-medium mt-0.5 block">
                    {orders.length} đơn
                  </span>
                  <span className="text-[10px] text-[#77767b]">Thành viên VIP</span>
                </div>
              </div>

              {/* Quality Guarantee note */}
              <div className="bg-[#f0ede9] rounded-2xl p-4 text-xs text-[#46464a] leading-relaxed border border-[#ebe8e3]">
                <p className="font-serif font-medium text-[#1c1c19] mb-1">
                  Cam kết giao hàng & bảo chứng Thụy Sĩ:
                </p>
                Đơn hàng sẽ được chuyển tới đúng địa chỉ của bạn trong 24-48 giờ với quy chuẩn vận chuyển bảo mật, miễn phí đổi trả trong 30 ngày nếu phát hiện bất kỳ kích ứng nào.
              </div>

              {/* Customer Care Banner */}
              {onOpenSupport && (
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d] text-xs">
                      <Headphones className="w-4 h-4" />
                      <span>Hỗ Trợ & Tư Vấn Da Liễu 24/7</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">1900 8899</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    Đội ngũ chuyên viên tư vấn da liễu Thụy Sĩ luôn sẵn sàng hỗ trợ phác đồ sử dụng hoặc chính sách đổi trả hàng 30 ngày.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>MỞ TRUNG TÂM CHĂM SÓC KHÁCH HÀNG</span>
                  </button>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full py-3 bg-white hover:bg-[#fff5f5] text-[#ba1a1a] border border-[#ba1a1a]/20 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-2xs"
              >
                <LogOut className="w-4 h-4" />
                <span>ĐĂNG XUẤT TÀI KHOẢN</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
