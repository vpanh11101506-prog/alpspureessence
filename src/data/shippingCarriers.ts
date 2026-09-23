import { ShippingCarrier } from '../types';

export const SHIPPING_CARRIERS: ShippingCarrier[] = [
  {
    id: 'ghtk',
    name: 'GHTK Tiết Kiệm',
    fullName: 'Giao Hàng Tiết Kiệm (Standard)',
    estimatedTime: '2 - 3 ngày',
    price: 15000,
    freeThreshold: 500000,
    badge: 'Phổ biến',
    description: 'Vận chuyển tiêu chuẩn, phủ sóng 63 tỉnh thành, tiết kiệm tối ưu.',
  },
  {
    id: 'ghn',
    name: 'GHN Express Nhanh',
    fullName: 'Giao Hàng Nhanh Express 24h',
    estimatedTime: '24h - 36h',
    price: 25000,
    badge: 'Khuyên dùng',
    description: 'Chuyển phát nhanh bằng đường hàng không, giao tận tay trong 24h - 36h.',
  },
  {
    id: 'express',
    name: 'Hỏa Tốc Zurich 2H',
    fullName: 'ALPS VIP Zurich Express (Ahamove / Grab)',
    estimatedTime: '1 - 2 giờ',
    price: 45000,
    badge: 'Hỏa tốc 2h',
    description: 'Giao ngay trong 2 giờ nội thành TP.HCM và Hà Nội bằng thùng giữ nhiệt dược mỹ phẩm chuyên dụng.',
  },
  {
    id: 'viettel',
    name: 'Viettel Post',
    fullName: 'Viettel Post An Toàn Toàn Quốc',
    estimatedTime: '2 - 4 ngày',
    price: 20000,
    badge: 'Bảo đảm',
    description: 'Mạng lưới bưu chính quân đội, bảo hiểm 100% hàng vỡ hỏng và kiểm tra trước khi nhận.',
  },
];
