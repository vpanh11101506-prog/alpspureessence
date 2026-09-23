import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, RefreshCw, MessageSquare, ShieldCheck, ChevronRight, Phone } from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { UserProfile } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AICustomerSupportChatProps {
  user: UserProfile | null;
  onOpenLogin?: () => void;
}

const QUICK_PROMPTS = [
  'Tư vấn chu trình dưỡng da cho da dầu mụn / nhạy cảm',
  'Khách hàng muốn mua hàng cần đăng nhập tài khoản thế nào?',
  'Serum Radiance Glow mờ thâm sáng da có hiệu quả không?',
  'Chính sách đổi trả 30 ngày & phí vận chuyển tại alps.id.vn',
  'Bộ đôi kem chống nắng & tẩy trang Alps có cồn không?',
];

export const AICustomerSupportChat: React.FC<AICustomerSupportChatProps> = ({
  user,
  onOpenLogin,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Dạ kính chào ${
        user?.name || 'quý khách'
      }! Em là Chuyên viên Tư vấn Da liễu & CSKH AI của Alps Skincare Thụy Sĩ (alps.id.vn).\n\nEm có thể hỗ trợ quý khách:\n• Lên chu trình chăm sóc da khoa học chuẩn phòng thí nghiệm Zurich\n• Giải đáp thành phần dược mỹ phẩm tế bào gốc sông băng thuần chay\n• Hướng dẫn quy trình đăng nhập & đặt hàng an toàn\n• Tra cứu chính sách đổi trả 30 ngày hoàn tiền 100%\n\nQuý khách đang quan tâm đến vấn đề gì hôm nay ạ?`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error('Mạng không ổn định');
      }

      const data = await res.json();
      const aiReply = data.reply || 'Dạ cảm ơn quý khách đã nhắn tin. Chuyên viên Alps sẽ tiếp nhận câu hỏi ngay ạ.';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Chat API error, using intelligent client fallback:', err);
      // Fallback answers for key topics
      let fallbackText = `Dạ cảm ơn quý khách. Hệ thống đang bảo trì đường truyền AI ngắn hạn. Quý khách vui lòng gọi Hotline 1900 8899 hoặc gửi email cskh@alps.id.vn để chuyên viên tư vấn ngay 24/7 ạ!`;

      const lower = text.toLowerCase();
      if (lower.includes('đăng nhập') || lower.includes('tài khoản') || lower.includes('mua')) {
        fallbackText = `Dạ kính thưa quý khách, tại website chính thức alps.id.vn, để tiến hành mua hàng và bảo mật đơn hàng, quý khách chỉ cần đăng nhập tài khoản (bấm vào biểu tượng Tài Khoản góc trên bên phải hoặc khi bấm Mua ngay). Việc đăng nhập giúp quý khách lưu địa chỉ giao hàng, tích lũy điểm hội viên Alps Pure Privileges và theo dõi trạng thái đơn hàng trực tiếp ạ!`;
      } else if (lower.includes('đổi trả') || lower.includes('vận chuyển') || lower.includes('ship')) {
        fallbackText = `Dạ chính sách của Alps Skincare:\n• Đổi trả & hoàn tiền 100% trong vòng 30 ngày kể cả khi quý khách đã mở nắp dùng thử nếu có bất kỳ hiện tượng kích ứng.\n• Miễn phí vận chuyển toàn quốc cho đơn từ 500.000đ.\n• Giao hỏa tốc 2-4h tại TP.HCM và Hà Nội.`;
      } else if (lower.includes('serum') || lower.includes('sáng da') || lower.includes('thâm')) {
        fallbackText = `Dạ Serum Alps Radiance Glow (560.000đ/30ml) chứa tế bào gốc hoa tuyết Alpine kết hợp 5% Niacinamide tinh khiết và HA đa tầng. Sản phẩm giúp mờ thâm sau 14 ngày, đều màu da và mang lại hiệu ứng căng bóng ngậm nước tự nhiên mà không gây bết dính ạ.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: `Dạ em đã làm mới cuộc trò chuyện. Quý khách cần tư vấn về làn da hay sản phẩm Alps Skincare nào ạ?`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[560px] bg-[#fcf9f4] rounded-2xl overflow-hidden border border-[#202022]/8">
      {/* Top status bar */}
      <div className="px-4 py-2.5 bg-white border-b border-[#202022]/8 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center p-1.5 shadow-2xs">
              <AlpsIcon color="#fed8c9" className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#8a9a86] border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-semibold text-xs text-[#1c1c19]">
                Chuyên Viên Da Liễu AI Alps
              </span>
              <span className="text-[9px] bg-[#fed8c9]/50 text-[#74584d] font-semibold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                Trực Tuyến 24/7
              </span>
            </div>
            <p className="text-[10px] text-[#77767b]">
              Website: <strong className="text-[#74584d]">alps.id.vn</strong> • Hotline: 1900 8899
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 text-[#77767b] hover:text-[#1c1c19] hover:bg-[#f6f3ee] rounded-full transition-colors"
          title="Làm mới cuộc trò chuyện"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Account requirement note banner */}
      {!user && (
        <div className="px-3.5 py-2 bg-[#fed8c9]/25 border-b border-[#fed8c9]/40 flex items-center justify-between text-[11px] text-[#74584d] shrink-0">
          <div className="flex items-center space-x-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#74584d] shrink-0" />
            <span className="truncate">
              Khách hàng muốn mua hàng cần <strong>đăng nhập tài khoản</strong>
            </span>
          </div>
          {onOpenLogin && (
            <button
              onClick={onOpenLogin}
              className="text-[10px] font-bold text-[#1c1c19] underline uppercase tracking-wider shrink-0 ml-2 hover:text-[#74584d]"
            >
              Đăng nhập ngay
            </button>
          )}
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            {msg.role === 'user' ? (
              <div className="w-7 h-7 rounded-full bg-[#1c1c19] text-white flex items-center justify-center shrink-0 shadow-2xs text-[11px] font-medium">
                {user?.name ? user.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0 shadow-2xs p-1">
                <AlpsIcon color="#fed8c9" className="w-4 h-4" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                msg.role === 'user'
                  ? 'bg-[#1c1c19] text-white rounded-tr-xs'
                  : 'bg-white text-[#1c1c19] border border-[#202022]/8 rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-line break-words">{msg.text}</div>
              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.role === 'user' ? 'text-white/60' : 'text-[#77767b]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0 p-1">
              <AlpsIcon color="#fed8c9" className="w-4 h-4" />
            </div>
            <div className="bg-white text-[#77767b] border border-[#202022]/8 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs flex items-center space-x-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-[#74584d] font-medium ml-1">
                Chuyên viên AI đang phản hồi...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="p-2.5 bg-[#f6f3ee] border-t border-[#202022]/6 shrink-0">
        <div className="text-[10px] uppercase font-semibold text-[#74584d] tracking-wider mb-1.5 flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>Gợi ý câu hỏi thường gặp:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-[11px] text-[#1c1c19] bg-white hover:bg-[#fed8c9]/30 hover:border-[#74584d]/40 px-2.5 py-1 rounded-full border border-[#202022]/10 transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input row */}
      <div className="p-3 bg-white border-t border-[#202022]/8 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập câu hỏi tư vấn da, sản phẩm hoặc chính sách alps.id.vn..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-[#fcf9f4] border border-[#ebe8e3] rounded-full focus:outline-none focus:border-[#74584d] focus:bg-white text-[#1c1c19]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-[#1c1c19] hover:bg-black text-white rounded-full transition-all disabled:opacity-40 shrink-0 active:scale-95 shadow-xs"
            title="Gửi tin nhắn"
          >
            <Send className="w-3.5 h-3.5 text-[#fed8c9]" />
          </button>
        </form>
      </div>
    </div>
  );
};
