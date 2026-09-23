import { ProductReview } from '../types';

export const INITIAL_REVIEWS: ProductReview[] = [
  // 1. Cleanser
  {
    id: 'rev-c-1',
    productId: 'cleanser-gentle-purifying',
    authorName: 'Thanh Thảo',
    rating: 5,
    date: '15/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da nhạy cảm, dễ đỏ',
    title: 'Bọt siêu mịn, không hề khô căng một chút nào!',
    comment:
      'Mình bị dị ứng nhiều loại sữa rửa mặt tạo bọt trước đây nhưng em Alps này dùng êm ru. Lớp bọt như mây, rửa xong da mềm mại ẩm mượt chứ không hề kin kít. Rất ưng mùi thảo mộc tuyết nhẹ nhàng thoang thoảng.',
    helpfulCount: 24,
    responseFromBrand:
      'Dạ Alps cảm ơn chị Thanh Thảo rất nhiều ạ! Sản phẩm dùng hệ Amino Acid táo dịu nhẹ bảo vệ hàng rào ẩm tự nhiên nên rất hợp với làn da nhạy cảm của chị ạ.',
  },
  {
    id: 'rev-c-2',
    productId: 'cleanser-gentle-purifying',
    authorName: 'Hoàng Yến',
    rating: 5,
    date: '10/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da hỗn hợp thiên dầu',
    title: 'Sạch sâu bụi mịn và kem chống nắng tốt',
    comment:
      'Rửa buổi tối sau khi đi làm về thấy mặt nhẹ hẳn. Đầu pump thiết kế rất sang và tiết kiệm, chỉ cần nhấn một lượng nhỏ là tạo được lượng bọt dày. Đáng tiền từng giọt!',
    helpfulCount: 18,
  },
  {
    id: 'rev-c-3',
    productId: 'cleanser-gentle-purifying',
    authorName: 'Minh Khang',
    rating: 4,
    date: '02/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da dầu mụn',
    title: 'Dịu nhẹ, kiềm dầu khá ổn',
    comment:
      'Da mình nam giới nhiều dầu vùng chữ T, dùng thấy sạch nhờn tốt, không bị nổi mụn mới. Chai cầm chắc tay thủy tinh mờ cực kỳ đẹp.',
    helpfulCount: 9,
  },

  // 2. Toner
  {
    id: 'rev-t-1',
    productId: 'toner-botanical',
    authorName: 'Bích Trâm',
    rating: 5,
    date: '18/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da thiếu nước, xỉn màu',
    title: 'Cấp ẩm tức thì, làm dịu da rát nắng xuất sắc',
    comment:
      'Vỗ toner lên da thấy mát lịm như đang ở núi Alps thật sự. Nước khoáng sông băng thẩm thấu nhanh, không bị bết rít. Mình dùng phương pháp vỗ 3 lớp da căng mọng bóng khỏe cả ngày.',
    helpfulCount: 31,
    responseFromBrand:
      'Cảm ơn chị Bích Trâm đã chia sẻ phương pháp dưỡng da 3 lớp tuyệt vời cùng Toner Alps ạ! Chúc chị luôn có làn da ngậm nước thanh khiết.',
  },
  {
    id: 'rev-t-2',
    productId: 'toner-botanical',
    authorName: 'Phương Linh',
    rating: 5,
    date: '12/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da thường',
    title: 'Mùi hương khuynh diệp và thảo mộc rất thư giãn',
    comment:
      'Cảm giác sau khi thoa như đang đi spa trị liệu tại Thụy Sĩ. Lỗ chân lông hai bên cánh mũi se mịn rõ rệt sau 2 tuần kiên trì sử dụng.',
    helpfulCount: 14,
  },
  {
    id: 'rev-t-3',
    productId: 'toner-botanical',
    authorName: 'Ngọc Hân',
    rating: 4,
    date: '05/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da hỗn hợp',
    title: 'Chai thủy tinh sang xịn mịn, cân bằng ẩm tốt',
    comment:
      'Chai đẹp quá mức tưởng tượng, để trên bàn trang điểm nhìn sang hẳn. Cấp ẩm êm dịu, chuẩn bị nền da tốt để thoa serum bước tiếp theo.',
    helpfulCount: 11,
  },

  // 3. Serum
  {
    id: 'rev-s-1',
    productId: 'serum-radiance',
    authorName: 'Thảo Nguyên',
    rating: 5,
    date: '20/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da thâm mụn, không đều màu',
    title: 'Sáng da rõ rệt sau 14 ngày, không hề châm chích!',
    comment:
      'Mình từng sợ dùng Niacinamide vì da nhạy cảm dễ kích ứng, nhưng serum Alps dùng tế bào gốc hoa nhung tuyết nên rất êm. Vết thâm mụn mới mờ nhanh trông thấy, nền da sáng bừng có độ glow tự nhiên chứ không bóng dầu.',
    helpfulCount: 42,
    responseFromBrand:
      'Dạ đội ngũ dược sĩ Alps rất vui khi nhận được phản hồi từ chị Thảo Nguyên ạ! Tế bào gốc Edelweiss kết hợp HA đa tầng được chứng minh lâm sàng phục hồi sắc tố da an toàn 100% thuần chay ạ.',
  },
  {
    id: 'rev-s-2',
    productId: 'serum-radiance',
    authorName: 'Lan Chi',
    rating: 5,
    date: '16/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da khô thiếu ẩm',
    title: 'Kết cấu thấm cực nhanh, da mịn màng',
    comment:
      'Serum dạng giọt tinh khiết, xoa nhẹ là thấm hết vào da trong 5 giây. Buổi sáng trang điểm không bị cakey hay mốc nền. Đã mua chai thứ 2!',
    helpfulCount: 27,
  },
  {
    id: 'rev-s-3',
    productId: 'serum-radiance',
    authorName: 'Vũ Hà',
    rating: 5,
    date: '08/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da hỗn hợp thiên khô',
    title: 'Serum tốt nhất mình từng dùng trong năm nay',
    comment:
      'Bao bì tối giản chuẩn Scandinavian - Swiss style. Hiệu quả nâng tông da nhẹ nhàng, tự nhiên và khỏe khoắn. Rất khuyên dùng cho ai muốn sáng da an toàn.',
    helpfulCount: 19,
  },

  // 4. Cream
  {
    id: 'rev-cr-1',
    productId: 'cream-regenerating',
    authorName: 'Khánh Vân',
    rating: 5,
    date: '19/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da khô, bắt đầu có nếp nhăn li ti',
    title: 'Chất kem nhung tuyết mịn màng, khóa ẩm đỉnh cao',
    comment:
      'Chất kem đặc nhưng khi áp lên da lập tức tan ra như tuyết ấm, không hề bí bách hay nặng mặt. Sáng ngủ dậy rửa mặt da mướt rượt đàn hồi rõ rệt. Nếp nhăn khóe mắt và khóe miệng mờ hẳn.',
    helpfulCount: 35,
    responseFromBrand:
      'Alps trân trọng cảm ơn chị Khánh Vân! Phức hợp Ceramide 3 tầng và tế bào gốc sông băng giúp tái tạo mạng lưới collagen dưới da ban đêm tối ưu nhất ạ.',
  },
  {
    id: 'rev-cr-2',
    productId: 'cream-regenerating',
    authorName: 'Hải My',
    rating: 5,
    date: '14/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da lão hóa sớm, ngồi phòng máy lạnh',
    title: 'Cứu tinh cho dân văn phòng ngồi điều hòa cả ngày',
    comment:
      'Trước đây da mình hay bị tróc vảy hai bên má do ngồi máy lạnh 8 tiếng. Thoa kem dưỡng Alps buổi tối là hôm sau da ẩm mượt nguyên ngày. Hũ kem thủy tinh mờ nắp nhôm champagne cầm rất chắc tay.',
    helpfulCount: 22,
  },
  {
    id: 'rev-cr-3',
    productId: 'cream-regenerating',
    authorName: 'Diễm Quỳnh',
    rating: 4,
    date: '07/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da thường',
    title: 'Dưỡng ẩm sâu, mùi thơm thảo mộc tinh tế',
    comment:
      'Kem rất giàu dưỡng chất. Với thời tiết nóng ẩm thì chỉ cần lấy lượng bằng hạt đậu là đủ cho toàn mặt và cổ. Rất thích.',
    helpfulCount: 13,
  },

  // 5. Mask
  {
    id: 'rev-m-1',
    productId: 'mask-hydro-lifting',
    authorName: 'Hồng Nhung',
    rating: 5,
    date: '21/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Mọi loại da, da mệt mỏi',
    title: 'Miếng mặt nạ sinh học ôm khít mặt như làn da thứ hai!',
    comment:
      'Chất liệu Bio-cellulose lên men từ nước dừa tự nhiên ôm sát từng đường nét trên khuôn mặt, cúi đầu hay đi lại cũng không hề rơi. Đắp 20 phút xong da căng bóng như vừa tiêm meso thủy lực ở thẩm mỹ viện.',
    helpfulCount: 46,
    responseFromBrand:
      'Cảm ơn chị Hồng Nhung đã dành lời khen ngợi cho Mặt nạ Alps Bio-Cellulose ạ! Chị có thể bỏ mặt nạ vào ngăn mát tủ lạnh 10 phút trước khi đắp để nâng cao hiệu ứng se lỗ chân lông nhé ạ.',
  },
  {
    id: 'rev-m-2',
    productId: 'mask-hydro-lifting',
    authorName: 'Thu Trang',
    rating: 5,
    date: '17/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da xỉn màu sau chuyến du lịch',
    title: 'Hồi sinh làn da cháy nắng thần tốc',
    comment:
      'Lượng dưỡng chất trong gói mặt nạ siêu nhiều, mình thoa được cả vùng cổ và hai cánh tay. Đắp xong da hạ nhiệt tức thì, bớt đỏ rát và hôm sau da đều màu lại ngay.',
    helpfulCount: 29,
  },
  {
    id: 'rev-m-3',
    productId: 'mask-hydro-lifting',
    authorName: 'Mai Anh',
    rating: 5,
    date: '11/09/2026',
    isVerifiedBuyer: true,
    skinType: 'Da nhạy cảm',
    title: 'Hộp 5 miếng xài cực kỳ kinh tế cho hiệu quả spa',
    comment:
      'Mỗi tuần tự thưởng cho bản thân 1-2 lần đắp mặt nạ Alps cảm giác được nâng niu thật sự. 10/10 điểm cho chất lượng chuẩn Thụy Sĩ.',
    helpfulCount: 17,
  },
];
