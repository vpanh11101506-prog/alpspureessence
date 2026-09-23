import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Download, ShieldCheck, Sparkles, Building, AlertCircle } from 'lucide-react';

interface VietQRCardProps {
  orderNumber: string;
  amount: number;
  onShowToast?: (msg: string) => void;
  compact?: boolean;
}

export const VietQRCard: React.FC<VietQRCardProps> = ({
  orderNumber,
  amount,
  onShowToast,
  compact = false,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Fake account details named "ALPS" as requested:
  const bankInfo = {
    bankName: 'MB Bank (Ngân hàng TMCP Quân Đội)',
    bankCode: 'MB',
    accountNumber: '9999ALPS88',
    accountDisplayNumber: '9999 ALPS 88',
    accountName: 'ALPS',
    branch: 'Chi nhánh Landmark 81 - TP.HCM',
    amount: amount,
    memo: `ALPS ${orderNumber.replace(/[^a-zA-Z0-9]/g, '')}`,
  };

  useEffect(() => {
    // Generate VietQR standard payload
    // Standard payload or banking transfer payload
    const qrPayload = `2|99|${bankInfo.accountNumber}|${bankInfo.accountName}|${bankInfo.bankCode}|0|0|${bankInfo.amount}|${bankInfo.memo}|transfer`;

    QRCode.toDataURL(
      qrPayload,
      {
        width: 320,
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
      {/* The authentic VietQR Card mimicking user's uploaded MB Bank template */}
      <div
        id="vietqr-mb-card"
        className="relative w-full max-w-[320px] bg-white rounded-3xl p-5 border border-[#fed8c9]/50 shadow-xl overflow-hidden text-center transition-transform duration-300 hover:shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)',
        }}
      >
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-50/40 rounded-full blur-2xl pointer-events-none -ml-8 -mb-8" />

        {/* Top Header: VietQR Logo & MB Logo */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#202022]/6">
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
            {/* MB Asterisk Star */}
            <svg className="w-5 h-5 text-[#e02020]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21.5 9.1L16 13.8L17.8 20.8L12 16.9L6.2 20.8L8 13.8L2.5 9.1L9.6 8.6L12 2Z" />
            </svg>
            <span className="font-black text-xl tracking-tighter text-[#002f87]">
              MB
            </span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative z-10 my-3 flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-inner border border-[#202022]/6">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`VietQR thanh toán đơn ${orderNumber}`}
              className="w-52 h-52 object-contain"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-xs text-[#77767b]">
              Đang tạo mã VietQR...
            </div>
          )}

          {/* Beneficiary name badge inside card */}
          <div className="mt-1 px-3 py-1 bg-[#f6f3ee] rounded-full text-[11px] font-semibold text-[#1c1c19] tracking-wider uppercase border border-[#202022]/5">
            CHỦ TK: {bankInfo.accountName}
          </div>
        </div>

        {/* Bottom Brands: VietQR Pay, VietQR Global, napas 247 */}
        <div className="relative z-10 pt-2 border-t border-[#202022]/6 flex items-center justify-between text-[10px] text-[#46464a] font-medium px-1">
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-[#e02020]">VietQR</span>
            <span className="text-[9px] text-[#77767b]">Pay</span>
          </div>
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-[#0052cc]">VietQR</span>
            <span className="text-[9px] text-[#77767b]">Global</span>
          </div>
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-[#002f87]">napas</span>
            <span className="font-bold text-[#107c41]">247</span>
          </div>
        </div>
      </div>

      {/* Account Info Details Box with Fast Copy Buttons */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-xs text-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
          <div className="flex items-center space-x-1.5 font-semibold text-[#1c1c19]">
            <Building className="w-4 h-4 text-[#74584d]" />
            <span>Thông tin chuyển khoản Alps</span>
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
          <span className="text-[#77767b]">Số tiền thanh toán:</span>
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
        <div className="pt-2">
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
            Hệ thống ngân hàng Napas 247 sẽ tự động ghi nhận thanh toán trong 30 giây ngay sau khi bạn hoàn tất chuyển khoản.
          </span>
        </div>
      </div>
    </div>
  );
};
