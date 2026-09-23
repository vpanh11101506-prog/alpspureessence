import React, { useState } from 'react';
import { X, ShieldCheck, RefreshCw, Truck, Check, Lock, AlertCircle, FileText, Phone } from 'lucide-react';

export type PolicyTabType = 'returns' | 'privacy' | 'shipping';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTabType;
  onOpenSupport?: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'returns',
  onOpenSupport,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTabType>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#202022]/10 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f6f3ee] flex items-center justify-center text-[#74584d]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                ALPS PURE ESSENCE • ZURICH
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] tracking-tight">
                Chính Sách & Cam Kết Dịch Vụ
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#202022]/8 bg-[#f6f3ee]/60 px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('returns')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'returns'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ĐỔI TRẢ & HOÀN TIỀN (30 NGÀY)</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'shipping'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>VẬN CHUYỂN & GIAO NHẬN</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'privacy'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>BẢO MẬT THÔNG TIN</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-grow space-y-6 text-[#1c1c19] text-xs leading-relaxed">
          {activeTab === 'returns' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Highlight Banner */}
              <div className="bg-gradient-to-r from-[#fed8c9]/30 to-[#f6f3ee] border border-[#fed8c9] rounded-2xl p-4 flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-[#74584d] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-[#1c1c19]">
                    Cam kết Đổi Trả Miễn Phí 30 Ngày & Bảo Hiểm Kích Ứng Da Liễu
                  </h4>
                  <p className="text-[11px] text-[#77767b] mt-0.5">
                    Alps tự hào về độ lành tính chuẩn Thụy Sĩ. Nếu làn da bạn gặp bất kỳ kích ứng nào dù nhỏ nhất, chúng tôi hoàn tiền 100% không phiền hà.
                  </p>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>1. Điều kiện áp dụng đổi trả 30 ngày</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-[#46464a] pl-1">
                    <li>Sản phẩm còn nguyên tem niêm phong hoặc đã mở nắp sử dụng dưới 20% dung tích.</li>
                    <li>Khách hàng muốn đổi sang dòng sản phẩm khác phù hợp hơn với tình trạng da.</li>
                    <li>Sản phẩm có lỗi từ nhà sản xuất (vòi pump không hoạt động, dung dịch bị đổi màu, vỡ vỡ trong vận chuyển).</li>
                    <li>Có hình ảnh hoặc số điện thoại đặt hàng để đối soát nhanh trong 60 giây.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>2. Chi phí đổi trả hàng</span>
                  </h5>
                  <p className="text-[#46464a]">
                    <strong>Hoàn toàn MIỄN PHÍ 100% 2 chiều:</strong> Shipper sẽ mang sản phẩm mới đến tận nhà đổi cho bạn và thu hồi sản phẩm cũ cùng lúc. Bạn không cần phải ra bưu cục hay thanh toán thêm bất cứ chi phí nào.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>3. Quy trình hoàn tiền</span>
                  </h5>
                  <p className="text-[#46464a]">
                    Tiền hoàn trả sẽ được chuyển khoản tức thì qua Napas 247 vào số tài khoản ngân hàng của bạn trong vòng 2 giờ làm việc kể từ khi yêu cầu được xác nhận.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Highlight Banner */}
              <div className="bg-[#f0ede9] border border-[#ebe8e3] rounded-2xl p-4 flex items-start space-x-3">
                <Truck className="w-6 h-6 text-[#74584d] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-[#1c1c19]">
                    Quy Chuẩn Vận Chuyển Phòng Sạch & Đồng Kiểm Khi Nhận
                  </h4>
                  <p className="text-[11px] text-[#77767b] mt-0.5">
                    100% đơn hàng Alps được bảo quản trong hộp giữ nhiệt 3 lớp, chống tia UV và chống sốc nhiệt dược mỹ phẩm.
                  </p>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>1. Thời gian giao hàng</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]">
                      <span className="font-semibold block text-[#1c1c19]">Hỏa Tốc 2 Giờ</span>
                      <span className="text-[11px] text-[#77767b]">Nội thành TP.HCM & Hà Nội (giao bằng Grab / Ahamove).</span>
                    </div>
                    <div className="p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]">
                      <span className="font-semibold block text-[#1c1c19]">Nhanh 24h - 36h</span>
                      <span className="text-[11px] text-[#77767b]">Các thành phố trực thuộc trung ương (GHN Express).</span>
                    </div>
                    <div className="p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]">
                      <span className="font-semibold block text-[#1c1c19]">Tiêu Chuẩn 2 - 3 Ngày</span>
                      <span className="text-[11px] text-[#77767b]">Tất cả các tỉnh thành trên toàn quốc (GHTK / Viettel Post).</span>
                    </div>
                    <div className="p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]">
                      <span className="font-semibold block text-[#1c1c19]">Miễn Phí Vận Chuyển</span>
                      <span className="text-[11px] text-[#8a9a86] font-medium">Áp dụng cho mọi đơn hàng từ 500.000₫ trở lên.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>2. Quyền lợi Đồng Kiểm (Kiểm tra hàng trước khi thanh toán)</span>
                  </h5>
                  <p className="text-[#46464a]">
                    Quý khách có quyền mở kiện hàng kiểm tra số lượng, tên sản phẩm, tem niêm phong và tình trạng vỏ chai trước khi thanh toán cho nhân viên giao nhận. Nếu kiện hàng có dấu hiệu móp méo nặng hoặc thiếu hàng, quý khách hoàn toàn có quyền từ chối nhận hàng.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Highlight Banner */}
              <div className="bg-white border border-[#202022]/8 rounded-2xl p-4 flex items-start space-x-3">
                <Lock className="w-6 h-6 text-[#74584d] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-[#1c1c19]">
                    Cam Kết Bảo Mật Thông Tin & Quyền Riêng Tư Tuyệt Đối
                  </h4>
                  <p className="text-[11px] text-[#77767b] mt-0.5">
                    Tuân thủ nghiêm ngặt Luật Bảo Vệ Dữ Liệu Cá Nhân (Nghị định 13/2023/NĐ-CP) và Tiêu chuẩn Dữ liệu Thụy Sĩ (FADP).
                  </p>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>1. Mục đích thu thập thông tin</span>
                  </h5>
                  <p className="text-[#46464a]">
                    Họ tên, số điện thoại và địa chỉ giao hàng của quý khách chỉ được sử dụng duy nhất cho mục đích xử lý đơn hàng, điều phối giao vận và hỗ trợ tư vấn chăm sóc da liễu cá nhân.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>2. Cam kết KHÔNG chia sẻ cho bên thứ ba</span>
                  </h5>
                  <p className="text-[#46464a]">
                    Alps cam kết không bán, không thương mại hóa, không chia sẻ số điện thoại hoặc dữ liệu mua hàng của quý khách cho bất kỳ mục đích quảng cáo rác nào.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-2">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
                    <span>3. Quyền chỉnh sửa và xóa dữ liệu</span>
                  </h5>
                  <p className="text-[#46464a]">
                    Quý khách có quyền cập nhật địa chỉ, số điện thoại trực tiếp tại mục <strong>Hồ Sơ & Danh Mục Đã Mua</strong> hoặc yêu cầu xóa toàn bộ lịch sử tư vấn bất kỳ lúc nào thông qua bộ phận CSKH 24/7.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info & CSKH shortcut */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#202022]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-[#77767b]">
            <Phone className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Cần tư vấn thêm về chính sách? Hotline: <strong className="text-[#1c1c19]">1900 8899</strong> (Miễn cước)</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {onOpenSupport && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="flex-1 sm:flex-none py-2 px-4 rounded-full text-xs font-semibold bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] transition-colors"
              >
                GẶP CSKH 24/7
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none py-2 px-6 rounded-full text-xs font-semibold bg-[#1c1c19] text-white hover:bg-black transition-colors"
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
