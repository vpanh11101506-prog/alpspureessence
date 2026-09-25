import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Download, ShieldCheck, Sparkles, Building, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { VisaBadge, MastercardBadge } from './PaymentBadges';

interface VietQRCardProps {
  orderNumber: string;
  amount: number;
  onShowToast?: (msg: string) => void;
  compact?: boolean;
  isPaymentReceived?: boolean;
  isVerifying?: boolean;
  onCheckPayment?: () => void;
}

export const VietQRCard: React.FC<VietQRCardProps> = ({
  orderNumber,
  amount,
  onShowToast,
  compact = false,
  isPaymentReceived = false,
  isVerifying = false,
  onCheckPayment,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Account details named "ALPS" as requested
  const bankInfo = {
    bankName: 'MB Bank (Ngân hàng TMCP Quân Đội)',
    bankCode: 'MB',
    accountNumber: '9999ALPS88',
    accountDisplayNumber: '9999 ALPS 88',
    accountName: 'ALPS',
    branch: 'Chi nhánh Tân Phú - TP.HCM (30 D. Trịnh Đình Thảo)',
    amount: amount,
    memo: `ALPS ${orderNumber.replace(/[^a-zA-Z0-9]/g, '')}`,
  };

  useEffect(() => {
    // Standard VietQR EMV payload formatted with account, bank, amount, memo
    const qrPayload = `2|99|${bankInfo.accountNumber}|${bankInfo.accountName}|${bankInfo.bankCode}|0|0|${bankInfo.amount}|${bankInfo.memo}|transfer`;

    QRCode.toDataURL(
      qrPayload,
      {
        width: 340,
        margin: 1,
        color: {
          dark: '#1c1c19',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [orderNumber, amount]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    if (onShowToast) {
      onShowToast(`Đã sao chép ${label}: ${text}`);
    }
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `VietQR_ALPS_${orderNumber}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (onShowToast) {
      onShowToast('Đã tải mã VietQR Alps về máy');
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* The authentic VietQR Card with price prominently displayed */}
      <div
        id="vietqr-mb-card"
        className="relative w-full max-w-[340px] bg-white rounded-3xl p-5 border-2 border-[#fed8c9] shadow-xl overflow-hidden text-center transition-all duration-300 hover:shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)',
        }}
      >
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-50/60 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-red-50/50 rounded-full blur-2xl pointer-events-none -ml-8 -mb-8" />

        {/* Top Header: VietQR Logo & MB Bank Logo */}
        <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-[#202022]/8">
          {/* VietQR Logo */}
          <div className="flex items-center space-x-0.5">
            <span className="font-extrabold text-lg tracking-tight text-[#e02020] flex items-center">
              <span className="text-xl">V</span>iet
            </span>
            <span className="font-extrabold text-lg tracking-tight text-[#0052cc]">
              QR
            </span>
          </div>

          {/* MB Bank Logo */}
          <div className="flex items-center space-x-1.5">
            <svg className="w-5 h-5 text-[#e02020]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21.5 9.1L16 13.8L17.8 20.8L12 16.9L6.2 20.8L8 13.8L2.5 9.1L9.6 8.6L12 2Z" />
            </svg>
            <span className="font-black text-xl tracking-tighter text-[#002f87]">
              MB
            </span>
          </div>
        </div>

        {/* PROMINENT PRICE DISPLAY DIRECTLY ON THE QR CARD */}
        <div className="relative z-10 my-3 px-3 py-2.5 bg-[#fdfcf9] rounded-2xl border border-[#fed8c9] shadow-xs">
          <div className="text-[10px] text-[#74584d] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1">
            <span>SỐ TIỀN CẦN THANH TOÁN</span>
          </div>
          <div className="font-serif text-2xl sm:text-[26px] font-extrabold text-[#ba1a1a] tracking-tight leading-none mt-1">
            {amount.toLocaleString('vi-VN')} <span className="text-lg">₫</span>
          </div>
          <div className="text-[10px] text-[#77767b] mt-0.5">
            Miễn phí chuyển khoản 24/7 Napas
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative z-10 my-2 flex flex-col items-center justify-center p-2.5 bg-white rounded-2xl shadow-inner border border-[#202022]/8">
          {qrDataUrl ? (
            <div className="relative">
              <img
                src={qrDataUrl}
                alt={`VietQR thanh toán ${amount.toLocaleString('vi-VN')}đ`}
                className={`w-52 h-52 object-contain transition-opacity ${
                  isVerifying ? 'opacity-40 filter blur-[1px]' : 'opacity-100'
                }`}
              />
              {isVerifying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-white/60 backdrop-blur-xs rounded-xl">
                  <RefreshCw className="w-8 h-8 text-[#74584d] animate-spin" />
                  <span className="text-[11px] font-semibold text-[#1c1c19]">
                    Đang quét giao dịch...
                  </span>
                </div>
              )}
              {isPaymentReceived && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5 bg-emerald-950/85 backdrop-blur-xs rounded-xl text-white animate-in zoom-in-95">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold tracking-wide uppercase">
                    ĐÃ NHẬN TIỀN
                  </span>
                  <span className="text-[10px] text-emerald-200">
                    +{amount.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-xs text-[#77767b]">
              Đang tạo mã VietQR...
            </div>
          )}

          {/* Account and Memo badges */}
          <div className="w-full mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="px-2 py-1 bg-[#f6f3ee] rounded-lg font-semibold text-[#1c1c19] truncate border border-[#202022]/5">
              CHỦ TK: <span className="text-[#74584d]">{bankInfo.accountName}</span>
            </div>
            <div className="px-2 py-1 bg-[#f6f3ee] rounded-lg font-semibold text-[#1c1c19] truncate border border-[#202022]/5">
              NỘI DUNG: <span className="text-[#74584d]">{bankInfo.memo}</span>
            </div>
          </div>
        </div>

        {/* Bottom Brands: VietQR Pay, VietQR Global, napas 247 & Card badges */}
        <div className="relative z-10 pt-2 border-t border-[#202022]/6 flex items-center justify-between text-[10px] text-[#46464a] font-medium px-1">
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-[#e02020]">Viet</span>
            <span className="font-bold text-[#0052cc]">QR</span>
          </div>
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-[#002f87]">napas</span>
            <span className="font-bold text-[#107c41]">247</span>
          </div>
          <div className="flex items-center space-x-1">
            <VisaBadge className="h-4.5 px-1 py-0.2" />
            <MastercardBadge className="h-4.5 px-1 py-0.2" />
          </div>
        </div>
      </div>

      {/* LIVE PAYMENT VERIFICATION & STATUS CONTROLLER */}
      <div className="w-full max-w-[360px]">
        {isPaymentReceived ? (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl shadow-sm text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-emerald-950 uppercase tracking-wide">
                  ĐÃ NHẬN THANH TOÁN THÀNH CÔNG!
                </div>
                <div className="text-[11px] text-emerald-800">
                  Hệ thống MB Bank đã nhận đủ <strong>{amount.toLocaleString('vi-VN')}₫</strong>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-900">
              <span className="font-medium">Nút mua hàng bên dưới đã được kích hoạt:</span>
              <span className="font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                Sẵn sàng đặt
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#ffffff] border border-[#fed8c9] rounded-2xl shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="font-semibold text-xs text-[#1c1c19]">
                  Chờ nhận chuyển khoản...
                </span>
              </div>
              <span className="text-[10px] text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded-full font-medium">
                Kiểm tra tự động 24/7
              </span>
            </div>

            <p className="text-[11px] text-[#77767b]">
              Sau khi quý khách quét mã và hoàn tất chuyển tiền <strong>{amount.toLocaleString('vi-VN')}₫</strong> trên ứng dụng ngân hàng, vui lòng bấm nút dưới để hệ thống nhận diện và kích hoạt nút đặt hàng:
            </p>

            <button
              type="button"
              onClick={onCheckPayment}
              disabled={isVerifying}
              className="w-full py-3 px-4 bg-[#74584d] hover:bg-[#5b4339] active:scale-98 text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>ĐANG KIỂM TRA BIẾN ĐỘNG SỐ DƯ MB BANK...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#fed8c9]" />
                  <span>TÔI ĐÃ CHUYỂN TIỀN - KIỂM TRA NGAY</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#ba1a1a]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Nút xác nhận đặt hàng chỉ mở khóa khi nhận được tiền</span>
            </div>
          </div>
        )}
      </div>

      {/* Account Info Details Box with Fast Copy Buttons */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-xs text-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
          <div className="flex items-center space-x-1.5 font-semibold text-[#1c1c19]">
            <Building className="w-4 h-4 text-[#74584d]" />
            <span>Thông tin chuyển khoản MB Bank</span>
          </div>
          <span className="text-[10px] bg-[#8a9a86]/15 text-[#8a9a86] font-semibold px-2 py-0.5 rounded-full">
            Chính thức
          </span>
        </div>

        {/* Bank & Branch */}
        <div className="flex justify-between items-start text-[11px]">
          <span className="text-[#77767b]">Ngân hàng:</span>
          <span className="font-medium text-[#1c1c19] text-right">
            MB Bank (Quân Đội)
          </span>
        </div>

        {/* Account Name */}
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-[#77767b]">Tên thụ hưởng:</span>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-[#1c1c19] uppercase tracking-wide">
              {bankInfo.accountName}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(bankInfo.accountName, 'Tên người nhận')}
              className="p-1 hover:bg-[#f0ede9] rounded text-[#77767b] hover:text-[#1c1c19] transition-colors"
              title="Sao chép tên người nhận"
            >
              {copiedField === 'Tên người nhận' ? (
                <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Account Number */}
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-[#77767b]">Số tài khoản:</span>
          <div className="flex items-center space-x-1.5">
            <span className="font-mono font-bold text-[#1c1c19] tracking-wider text-xs">
              {bankInfo.accountDisplayNumber}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(bankInfo.accountNumber, 'Số tài khoản')}
              className="p-1 hover:bg-[#f0ede9] rounded text-[#77767b] hover:text-[#1c1c19] transition-colors"
              title="Sao chép số tài khoản"
            >
              {copiedField === 'Số tài khoản' ? (
                <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-[#77767b]">Số tiền cần chuyển:</span>
          <div className="flex items-center space-x-1.5">
            <span className="font-serif font-bold text-[#ba1a1a] text-sm">
              {amount.toLocaleString('vi-VN')}₫
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(amount.toString(), 'Số tiền')}
              className="p-1 hover:bg-[#f0ede9] rounded text-[#77767b] hover:text-[#1c1c19] transition-colors"
              title="Sao chép số tiền"
            >
              {copiedField === 'Số tiền' ? (
                <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Transfer Memo */}
        <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#202022]/6">
          <span className="text-[#77767b]">Nội dung chuyển khoản:</span>
          <div className="flex items-center space-x-1.5">
            <span className="font-mono font-bold text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded text-xs">
              {bankInfo.memo}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(bankInfo.memo, 'Nội dung CK')}
              className="p-1 hover:bg-[#f0ede9] rounded text-[#77767b] hover:text-[#1c1c19] transition-colors"
              title="Sao chép nội dung"
            >
              {copiedField === 'Nội dung CK' ? (
                <Check className="w-3.5 h-3.5 text-[#8a9a86]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Download QR button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleDownloadQR}
            className="w-full py-2 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] font-medium rounded-xl flex items-center justify-center space-x-1.5 transition-colors text-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Tải ảnh mã VietQR về máy</span>
          </button>
        </div>

        {/* Safety Note */}
        <div className="flex items-start space-x-1.5 text-[10px] text-[#77767b] bg-[#fcf9f4] p-2.5 rounded-xl">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8a9a86] shrink-0 mt-0.5" />
          <span>
            Hệ thống ngân hàng Napas 247 và MB Bank sẽ tự động đối soát và khớp đơn hàng tức thì.
          </span>
        </div>
      </div>
    </div>
  );
};
