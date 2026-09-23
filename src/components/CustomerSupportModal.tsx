import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  HelpCircle,
  Send,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { UserProfile } from '../types';
import { AICustomerSupportChat } from './AICustomerSupportChat';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onShowToast: (msg: string) => void;
  onOpenLogin?: () => void;
  initialTab?: 'ai_chat' | 'contact' | 'ticket' | 'faq';
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
  user,
  onShowToast,
  onOpenLogin,
  initialTab = 'ai_chat',
}) => {
  const [activeTab, setActiveTab] = useState<'ai_chat' | 'contact' | 'ticket' | 'faq'>(initialTab);

  // Ticket form state
  const [ticketTopic, setTicketTopic] = useState('Tư vấn chăm sóc da & chọn sản phẩm');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderPhone, setSenderPhone] = useState(user?.phone || '0908 123 489');
  const [senderEmail, setSenderEmail] = useState(user?.email || '');
  const [orderCode, setOrderCode] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  // FAQ collapse state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim() || !message.trim()) {
      onShowToast('Vui lòng điền đủ họ tên, số điện thoại và nội dung cần hỗ trợ');
      return;
    }

    const ticketId = `ALPS-CSKH-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setSubmittedTicket({ id: ticketId, time: now });
    onShowToast(`Đã tiếp nhận phiếu hỗ trợ #${ticketId}. Chuyên viên sẽ gọi lại trong 15 phút!`);
  };

  const resetTicketForm = () => {
    setMessage('');
    setSubmittedTicket(null);
  };

  const faqs = [
    {
      question: 'Chính sách đổi trả 30 ngày của Alps hoạt động như thế nào?',
      answer:
        'Alps cam kết đổi trả miễn phí hoặc hoàn tiền 100% trong vòng 30 ngày kể từ ngày nhận hàng, ngay cả khi quý khách đã mở nắp và trải nghiệm sản phẩm nếu xảy ra bất kỳ hiện tượng không tương thích hay kích ứng da nào.',
    },
    {
      question: 'Tôi có thể thay đổi địa chỉ hoặc số điện thoại sau khi đặt hàng không?',
      answer:
        'Hoàn toàn được. Nếu đơn hàng của bạn đang ở trạng thái "Đang chuẩn bị hàng", bạn có thể bấm nút "Đổi địa chỉ" ngay trong mục "Danh Mục Đã Mua" trên website. Hoặc gọi trực tiếp đến Hotline CSKH 1900 8899 để chuyên viên điều hướng ngay lập tức.',
    },
    {
      question: 'Thời gian giao hàng tiêu chuẩn là bao lâu?',
      answer:
        'Tại khu vực nội thành TP. Hồ Chí Minh và Hà Nội: Hỗ trợ giao hỏa tốc trong 2-4 giờ hoặc trong ngày. Đối với các tỉnh thành khác: Giao hàng từ 24 - 48 giờ với thùng bảo ôn đạt chuẩn phòng sạch Zurich.',
    },
    {
      question: 'Sản phẩm Alps có an toàn cho phụ nữ mang thai và da nhạy cảm?',
      answer:
        'Tất cả sản phẩm Alps đều đạt tiêu chuẩn Thuần Chay Châu Âu (Vegan Certified) và được kiểm định da liễu nghiêm ngặt tại Zurich, Thụy Sĩ. 100% không cồn khô, không paraben, không hương liệu tổng hợp, đặc biệt an toàn cho phụ nữ mang thai, mẹ bỉm sữa và làn da nhạy cảm nhất.',
    },
    {
      question: 'Làm thế nào để được chuyên gia da liễu Thụy Sĩ lên phác đồ dưỡng da 1:1?',
      answer:
        'Quý khách có thể gửi yêu cầu trong tab "Gửi Yêu Cầu Hỗ Trợ" hoặc nhắn tin trực tiếp qua Zalo Official Account của Alps. Chuyên viên sẽ phân tích ảnh chụp nền da và thiết lập phác đồ cá nhân hóa hoàn toàn miễn phí.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-[2rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 my-4 flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="bg-[#202022] text-[#fcf9f4] p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#c7c6ca] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-[#fed8c9] text-xs font-semibold uppercase tracking-[0.2em] mb-1.5">
            <Headphones className="w-4 h-4 text-[#fed8c9]" />
            <span>TRUNG TÂM CHĂM SÓC KHÁCH HÀNG ALPS</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
            Dịch Vụ Hỗ Trợ Chuẩn Da Liễu Thụy Sĩ
          </h3>

          <p className="text-xs text-[#c7c6ca] mt-1.5 leading-relaxed max-w-lg">
            Đội ngũ chuyên viên Alps luôn sẵn sàng lắng nghe, tư vấn phác đồ và giải quyết mọi yêu cầu của bạn 24/7.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 mt-4 pt-3 border-t border-white/10 text-xs overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('ai_chat')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === 'ai_chat'
                  ? 'bg-[#fed8c9] text-[#1c1c19] shadow-xs font-semibold'
                  : 'text-[#fed8c9] hover:text-white bg-white/10 border border-[#fed8c9]/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
              <span>Chat AI Alps 24/7</span>
              <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                MỚI
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === 'contact'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Liên Hệ Nhanh</span>
            </button>

            <button
              onClick={() => setActiveTab('ticket')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === 'ticket'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Phiếu Hỗ Trợ</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === 'faq'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Câu Hỏi Thường Gặp</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-grow text-[#1c1c19] bg-[#fcf9f4]">
          {/* TAB 0: CHAT AI TƯ VẤN KHÁCH HÀNG 24/7 */}
          {activeTab === 'ai_chat' && (
            <div className="animate-fade-in">
              <AICustomerSupportChat user={user} onOpenLogin={onOpenLogin} />
            </div>
          )}
          {/* TAB 1: LIÊN HỆ TRỰC TIẾP */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              {/* Hotlines Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Hotline 1: Tổng đài miễn cước */}
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs hover:border-[#74584d]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded-full">
                        MIỄN PHÍ CƯỚC GỌI
                      </span>
                      <span className="flex items-center text-[10px] text-[#8a9a86] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a86] mr-1 animate-pulse" />
                        Trực tuyến 24/7
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#1c1c19] mt-2">
                      Tổng Đài CSKH & Đơn Hàng
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      Tiếp nhận yêu cầu giao hàng, đổi địa chỉ & khiếu nại dịch vụ
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#1c1c19] tracking-wider block">
                        1900 8899
                      </span>
                      <span className="text-[10px] text-[#77767b]">Phím 1: Đơn hàng • Phím 2: CSKH</span>
                    </div>
                    <a
                      href="tel:19008899"
                      className="px-3.5 py-2 bg-[#202022] hover:bg-black text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Gọi ngay</span>
                    </a>
                  </div>
                </div>

                {/* Hotline 2: Tư vấn da liễu VIP */}
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs hover:border-[#74584d]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded-full">
                        CHUYÊN GIA ZURICH 1:1
                      </span>
                      <span className="flex items-center text-[10px] text-[#8a9a86] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a86] mr-1 animate-pulse" />
                        8:00 - 22:00
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#1c1c19] mt-2">
                      Hotline Bác Sĩ & Chuyên Viên Da Liễu
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      Tư vấn phác đồ kết hợp sản phẩm phục hồi & tái sinh chuyên sâu
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#74584d] tracking-wider block">
                        0908 123 489
                      </span>
                      <span className="text-[10px] text-[#77767b]">Hỗ trợ Zalo & Điện thoại</span>
                    </div>
                    <a
                      href="tel:0908123489"
                      className="px-3.5 py-2 bg-[#74584d] hover:bg-[#5b4339] text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Gọi tư vấn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Chat Channels: Zalo, Email, Messenger */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1c19] flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 text-[#74584d]" />
                    <span>Kênh Trực Tuyến Tức Thì (Phản hồi &lt; 5 phút)</span>
                  </h4>
                  <span className="text-[11px] text-[#77767b]">Miễn phí</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {/* Zalo OA */}
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#fcf9f4] hover:bg-[#f5f1eb] rounded-xl border border-[#ebe8e3] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0068ff]/10 text-[#0068ff] flex items-center justify-center font-bold text-xs">
                        Z
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#1c1c19] group-hover:text-[#0068ff] transition-colors">
                          Zalo Official
                        </div>
                        <div className="text-[10px] text-[#77767b]">Alps Pure Skincare</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#77767b] group-hover:text-[#1c1c19]" />
                  </a>

                  {/* Email Support */}
                  <a
                    href="mailto:cskh@alps.id.vn"
                    className="p-3 bg-[#fcf9f4] hover:bg-[#f5f1eb] rounded-xl border border-[#ebe8e3] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#74584d]/10 text-[#74584d] flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#1c1c19] group-hover:text-[#74584d] transition-colors">
                          Email Hộp Thư CSKH
                        </div>
                        <div className="text-[10px] text-[#77767b]">cskh@alps.id.vn</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#77767b] group-hover:text-[#1c1c19]" />
                  </a>

                  {/* Messenger */}
                  <a
                    href="https://m.me"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#fcf9f4] hover:bg-[#f5f1eb] rounded-xl border border-[#ebe8e3] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#a855f7]/10 text-[#a855f7] flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#1c1c19] group-hover:text-[#a855f7] transition-colors">
                          Facebook Messenger
                        </div>
                        <div className="text-[10px] text-[#77767b]">Chat trực tiếp 24/7</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#77767b] group-hover:text-[#1c1c19]" />
                  </a>
                </div>
              </div>

              {/* Showroom & Trung Tâm Bảo Hành Trực Tiếp */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-2xs space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1c19] flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#74584d]" />
                  <span>Hệ Thống Boutique & Trung Tâm Chăm Sóc Trực Tiếp</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  {/* Boutique TP.HCM */}
                  <div className="p-3.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1c1c19]">Flagship Boutique TP.HCM</span>
                      <span className="text-[10px] text-[#8a9a86] bg-[#8a9a86]/10 px-2 py-0.5 rounded-full font-medium">
                        9:00 - 22:00
                      </span>
                    </div>
                    <p className="text-[#46464a] leading-relaxed text-[11px]">
                      Tầng 1, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh
                    </p>
                    <p className="text-[11px] text-[#77767b] pt-1">
                      Hotline đón tiếp: <strong className="text-[#1c1c19]">028 3912 8899</strong>
                    </p>
                  </div>

                  {/* Boutique Hà Nội */}
                  <div className="p-3.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1c1c19]">Boutique & CSKH Hà Nội</span>
                      <span className="text-[10px] text-[#8a9a86] bg-[#8a9a86]/10 px-2 py-0.5 rounded-full font-medium">
                        9:00 - 22:00
                      </span>
                    </div>
                    <p className="text-[#46464a] leading-relaxed text-[11px]">
                      Tầng 2, Tòa Keangnam Landmark 72, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội
                    </p>
                    <p className="text-[11px] text-[#77767b] pt-1">
                      Hotline đón tiếp: <strong className="text-[#1c1c19]">024 3828 8899</strong>
                    </p>
                  </div>
                </div>

                {/* Global Laboratory */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#77767b] border-t border-[#f0ede9]">
                  <span className="flex items-center space-x-1">
                    <span className="text-[#ba1a1a] font-bold">🇨🇭</span>
                    <span>Zurich Laboratory & HQ: Bahnhofstrasse 45, 8001 Zürich, Thụy Sĩ</span>
                  </span>
                  <span className="text-[#74584d] font-medium hidden sm:inline">Chuẩn Quốc Tế ISO 22716</span>
                </div>
              </div>

              {/* 4 Customer Care Commitments */}
              <div className="bg-[#f0ede9] rounded-2xl p-4 border border-[#ebe8e3] text-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cam kết chất lượng dịch vụ từ Ban Quản Trị Alps</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-[#46464a]">
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ Phản hồi 15 phút</strong>
                    Mọi thắc mắc qua tin nhắn hay biểu mẫu được xử lý trong tối đa 15 phút.
                  </div>
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ Đổi trả 30 ngày</strong>
                    Đổi sản phẩm hoặc hoàn tiền 100% không phiền hà nếu da không tương thích.
                  </div>
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ Chuyên gia 1:1</strong>
                    Mỗi khách hàng sở hữu 1 chuyên viên da liễu riêng hỗ trợ suốt chu trình dưỡng.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GỬI PHIẾU YÊU CẦU CSKH (SUPPORT TICKET FORM) */}
          {activeTab === 'ticket' && (
            <div className="space-y-4 animate-fade-in">
              {submittedTicket ? (
                <div className="bg-white rounded-2xl p-6 border border-[#8a9a86]/30 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#8a9a86]/15 text-[#8a9a86] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#1c1c19]">
                    Đã Gửi Yêu Cầu Hỗ Trợ Thành Công!
                  </h4>
                  <p className="text-xs text-[#46464a] max-w-md mx-auto leading-relaxed">
                    Mã phiếu hỗ trợ của bạn là{' '}
                    <span className="font-bold text-[#74584d]">{submittedTicket.id}</span> (ghi nhận lúc{' '}
                    {submittedTicket.time}). Chuyên viên CSKH Alps đang tiếp nhận hồ sơ và sẽ chủ động gọi điện
                    hoặc nhắn tin cho bạn qua số điện thoại <strong className="text-[#1c1c19]">{senderPhone}</strong> trong vòng 15 phút.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={resetTicketForm}
                      className="px-5 py-2.5 bg-[#202022] hover:bg-black text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
                    >
                      Gửi Yêu Cầu Khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="bg-white rounded-2xl p-5 border border-[#202022]/8 shadow-2xs space-y-4">
                  <div className="border-b border-[#f0ede9] pb-3">
                    <h4 className="font-serif text-base font-medium text-[#1c1c19]">
                      Phiếu Đề Nghị Hỗ Trợ & Khiếu Nại Dịch Vụ
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      Vui lòng nhập thông tin chi tiết bên dưới. Hệ thống sẽ kết nối trực tiếp đến quản lý CSKH.
                    </p>
                  </div>

                  {/* Topic selection */}
                  <div>
                    <label className="block text-xs font-medium text-[#1c1c19] mb-1.5">
                      Chủ đề cần hỗ trợ:
                    </label>
                    <select
                      value={ticketTopic}
                      onChange={(e) => setTicketTopic(e.target.value)}
                      className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                    >
                      <option value="Tư vấn chăm sóc da & chọn sản phẩm">
                        Tư vấn chăm sóc da & Phác đồ dưỡng sáng cá nhân hóa
                      </option>
                      <option value="Đổi địa chỉ & Thông tin người nhận đơn hàng">
                        Tra cứu đơn hàng, Thay đổi địa chỉ & SĐT nhận hàng
                      </option>
                      <option value="Yêu cầu đổi trả hàng hoặc hoàn tiền 30 ngày">
                        Yêu cầu đổi trả sản phẩm 30 ngày chuẩn Thụy Sĩ
                      </option>
                      <option value="Phản ánh thái độ phục vụ & Khiếu nại vận chuyển">
                        Phản ánh chất lượng dịch vụ / Khiếu nại vận chuyển
                      </option>
                      <option value="Hợp tác đại lý & Sự kiện thương hiệu">
                        Hợp tác phân phối & Sự kiện thương hiệu
                      </option>
                    </select>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        Họ và tên của bạn: <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Nhập họ và tên của bạn"
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        Số điện thoại liên hệ: <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="Nhập số điện thoại của bạn"
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Order code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        Địa chỉ Email nhận văn bản:
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="Ví dụ: email@gmail.com"
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        Mã đơn hàng (nếu có):
                      </label>
                      <input
                        type="text"
                        value={orderCode}
                        onChange={(e) => setOrderCode(e.target.value)}
                        placeholder="Ví dụ: GLZ-89421"
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                      />
                    </div>
                  </div>

                  {/* Message content */}
                  <div>
                    <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                      Nội dung yêu cầu chi tiết: <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mô tả cụ thể thắc mắc, tình trạng da, hoặc địa chỉ mới bạn muốn đổi..."
                      className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl p-3 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d] resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#77767b] flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#74584d]" />
                      <span>Cam kết phản hồi trong 15 phút</span>
                    </span>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#202022] hover:bg-black text-white text-xs font-semibold rounded-full shadow-md transition-all active:scale-98 flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>GỬI YÊU CẦU CSKH</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: CÂU HỎI THƯỜNG GẶP (FAQ) */}
          {activeTab === 'faq' && (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 mb-2">
                <h4 className="font-serif text-sm font-semibold text-[#1c1c19]">
                  Các câu hỏi thường gặp về sản phẩm & dịch vụ Alps
                </h4>
                <p className="text-xs text-[#77767b] mt-0.5">
                  Bấm vào từng câu hỏi để xem giải đáp nhanh từ đội ngũ chuyên gia Thụy Sĩ.
                </p>
              </div>

              {faqs.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#202022]/8 overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#fcf9f4] transition-colors"
                    >
                      <span className="font-medium text-xs sm:text-sm text-[#1c1c19] pr-3 flex items-center space-x-2">
                        <span className="text-[#74584d] font-semibold">Q{index + 1}.</span>
                        <span>{faq.question}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#74584d] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#77767b] shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#46464a] leading-relaxed border-t border-[#f0ede9] bg-[#fcf9f4]/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="bg-[#f0ede9] rounded-2xl p-4 text-center text-xs text-[#46464a] mt-4 border border-[#ebe8e3]">
                <span>Bạn vẫn còn câu hỏi chưa được giải đáp? </span>
                <button
                  onClick={() => setActiveTab('ticket')}
                  className="text-[#74584d] font-semibold underline underline-offset-2 ml-1"
                >
                  Gửi câu hỏi cho chúng tôi
                </button>
                <span> hoặc gọi Hotline </span>
                <a href="tel:19008899" className="text-[#1c1c19] font-bold underline">
                  1900 8899
                </a>
                .
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 sm:p-4 bg-[#ffffff] border-t border-[#ebe8e3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77767b] gap-2 shrink-0">
          <div className="flex items-center space-x-2 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Alps Skincare Pure Essence • Zurich, Switzerland</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] font-medium rounded-full text-xs transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
