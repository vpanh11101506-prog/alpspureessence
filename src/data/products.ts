import { Product } from '../types';
import glowSerumImg from '../assets/images/alps_serum_champagne_1789839140054.jpg';
import faceCreamImg from '../assets/images/alps_cream_champagne_1789839152375.jpg';
import botanicalTonerImg from '../assets/images/alps_toner_champagne_1789839113008.jpg';
import hydroMaskImg from '../assets/images/alps_mask_champagne_1789839165550.jpg';
import cleanserImg from '../assets/images/alps_clean_champagne_1789839128537.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'cleanser-gentle-purifying',
    name: 'Alps Gentle Purifying Cleanser',
    shortName: 'Gentle Purifying Cleanser',
    capacity: '120ML • 4.0 FL. OZ',
    category: 'cleanser',
    categoryLabel: 'SỮA RỬA MẶT',
    tag: 'LÀM SẠCH SÂU',
    tagType: 'cleanser',
    subtitle: 'Purifying Foaming Wash - Bọt mịn dịu nhẹ, sạch sâu',
    description:
      'Sữa rửa mặt tạo bọt dịu nhẹ Alps Gentle Purifying Cleanser (Purifying Foaming Wash) với lớp bọt bông micro-foam siêu mịn, giúp làm sạch sâu bụi mịn PM2.5, bã nhờn và cặn trang điểm mà vẫn duy trì độ ẩm tự nhiên, không gây cảm giác khô căng kin kít sau khi rửa.',
    rating: 4.9,
    reviewCount: 184,
    soldCount: '1.4k',
    price: 280000,
    originalPrice: 350000,
    note: 'Purifying Foaming Wash',
    image: cleanserImg,
    fallbackImage: '/cleanser.jpg',
    keyIngredients: [
      'Hệ chất hoạt động bề mặt Amino Acid gốc táo hữu cơ',
      'Nước khoáng sông băng Alpine Thụy Sĩ giàu khoáng chất',
      'Chiết xuất hoa nhung tuyết Edelweiss Thụy Sĩ',
      'Hyaluronic Acid và Ceramide bảo toàn lớp lipid biểu bì'
    ],
    benefits: [
      'Làm sạch sâu bụi mịn và bã nhờn mà không phá vỡ màng ẩm sinh học',
      'Độ pH 5.5 cân bằng lý tưởng cho mọi loại da, kể cả da nhạy cảm',
      'Bọt mịn xốp như mây, giảm tối đa ma sát tổn thương bề mặt da',
      'Bảo toàn độ ẩm tự nhiên, không gây cảm giác khô căng sau khi rửa'
    ],
    usage: 'Lấy lượng cỡ hạt đậu ra lòng bàn tay ướt, xoa tạo bọt dày mịn. Massage nhẹ nhàng toàn mặt trong 60 giây và rửa sạch lại với nước ấm.',
    routineStepNumber: 1,
    routineStepTitle: 'Làm sạch & Thanh lọc',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'toner-botanical',
    name: 'Alps Botanical Balancing Toner',
    shortName: 'Botanical Balancing Toner',
    capacity: '100ML • 3.4 FL. OZ',
    category: 'toner',
    categoryLabel: 'NƯỚC CÂN BẰNG',
    tag: 'CẤP ẨM',
    tagType: 'hydrate',
    subtitle: 'Hydrating Botanical Toner - Cân bằng pH, thanh lọc da dịu nhẹ',
    description:
      'Nước cân bằng thảo mộc Alps Botanical Balancing Toner kết hợp khuynh diệp thanh khiết và nước khoáng sông băng Alpine Thụy Sĩ, cân bằng pH 5.5 lý tưởng, làm dịu và se mịn bề mặt da.',
    rating: 4.8,
    reviewCount: 215,
    soldCount: '950',
    price: 340000,
    originalPrice: 380000,
    note: 'Hydrating Botanical',
    image: botanicalTonerImg,
    fallbackImage: '/toner.jpg',
    keyIngredients: [
      'Nước khoáng sông băng Alpine Thụy Sĩ',
      'Chiết xuất khuynh diệp và thảo mộc tự nhiên',
      'Chiết xuất hoa cúc La Mã làm dịu sâu',
      'Panthenol (Pro-Vitamin B5) 5%'
    ],
    benefits: [
      'Cân bằng độ pH chuẩn 5.5 ngay sau bước rửa mặt',
      'Thanh lọc bụi bẩn còn sót lại và se mịn lỗ chân lông',
      'Làm dịu làn da mệt mỏi, stress do nhiệt độ và ánh sáng xanh',
      'Củng cố hàng rào lipid tự nhiên, chuẩn bị nền da thông thoáng hấp thu dưỡng chất'
    ],
    usage: 'Nhấn 2 lần vòi pump ra bông cotton mềm lau nhẹ nhàng khắp mặt hoặc vỗ trực tiếp bằng tay cho đến khi ráo mịn.',
    routineStepNumber: 2,
    routineStepTitle: 'Cân bằng & Cấp ẩm',
    inStock: true,
    isFeatured: false,
  },
  {
    id: 'serum-radiance',
    name: 'Alps Radiance Glow Serum',
    shortName: 'Radiance Glow Serum',
    capacity: '30ML • 1 FL. OZ',
    category: 'serum',
    categoryLabel: 'SERUM TÁI SINH',
    tag: 'BÁN CHẠY',
    tagType: 'bestseller',
    subtitle: 'Bột ngọc trai & Niacinamide dưỡng sáng chuyên sâu',
    description:
      'Huyết thanh dưỡng sáng sinh học phân tử Alps Radiance Glow Serum chứa chiết xuất bột ngọc trai hữu cơ kết hợp cùng 10% Niacinamide tinh khiết và Hyaluronic Acid đa tầng, giúp phục hồi ánh sáng tự nhiên và làm đều màu da rõ rệt sau 14 ngày.',
    rating: 4.9,
    reviewCount: 342,
    soldCount: '1.8k',
    price: 390000,
    originalPrice: 450000,
    note: 'Ngọc trai & Niacinamide',
    image: glowSerumImg,
    fallbackImage: '/glow serum.jpg',
    keyIngredients: [
      'Bột ngọc trai hữu cơ Akoya tán siêu mịn',
      'Niacinamide tinh khiết 10% (Vitamin B3)',
      'Phức hợp Hyaluronic Acid 5 tầng phân tử',
      'Chiết xuất hoa nhung tuyết Thụy Sĩ (Edelweiss)'
    ],
    benefits: [
      'Làm sáng và đều màu da sau 14 ngày sử dụng',
      'Mờ thâm mụn, giảm đỏ và ức chế hắc sắc tố Melanin',
      'Tạo hiệu ứng da bóng khỏe sương mai (Glass Skin)',
      'Thẩm thấu nhanh chóng, tạo màng dưỡng bóng khỏe không nhờn rít'
    ],
    usage: 'Sử dụng 3-4 giọt mỗi sáng và tối sau bước toner. Vỗ nhẹ toàn mặt và cổ theo chuyển động hướng lên.',
    routineStepNumber: 3,
    routineStepTitle: 'Tái sinh & Dưỡng sáng',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'cream-regenerating',
    name: 'Alps Regenerating Face Cream',
    shortName: 'Regenerating Face Cream',
    capacity: '50G',
    category: 'cream',
    categoryLabel: 'KEM DƯỠNG DA',
    tag: 'TÁI SINH',
    tagType: 'regen',
    subtitle: 'Ceramide Complex 3-6-9 phục hồi rào cản da ẩm mịn 72h',
    description:
      'Kem dưỡng tái tạo kết cấu màng ẩm sinh học Alps Regenerating Face Cream với Ceramide Complex 3-6-9 và Bơ hạt mỡ hữu cơ. Nuôi dưỡng sâu, khóa ẩm 72 giờ và phục hồi hàng rào bảo vệ da yếu, nhạy cảm trước tác nhân môi trường.',
    rating: 5.0,
    reviewCount: 289,
    soldCount: '1.2k',
    price: 395000,
    originalPrice: 480000,
    note: 'Tái tạo da 72H',
    image: faceCreamImg,
    fallbackImage: '/face cream.jpg',
    keyIngredients: [
      'Ceramide Complex 3-6-9 đồng hóa sinh học',
      'Bơ hạt mỡ hữu cơ lạnh (Shea Butter)',
      'Peptides sinh học tái cấu trúc collagen',
      'Squalane thực vật chiết xuất từ quả ô-liu'
    ],
    benefits: [
      'Khóa ẩm bền bỉ 72 giờ liên tục',
      'Phục hồi và làm dày hàng rào biểu bì bảo vệ da',
      'Làm dịu tức thì tình trạng khô rát, bong tróc',
      'Bảo toàn trọn vẹn hoạt tính sinh học tế bào gốc tuyết Thụy Sĩ'
    ],
    usage: 'Lấy lượng vừa đủ chấm lên 5 điểm và thoa đều, áp nhẹ lòng bàn tay ấm để dưỡng chất thẩm thấu.',
    routineStepNumber: 4,
    routineStepTitle: 'Khóa ẩm & Phục hồi',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'mask-hydro-lifting',
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: 'Hydro-Lifting Sheet Mask',
    capacity: 'HỘP 5 MIẾNG • 5 x 29G',
    category: 'mask',
    categoryLabel: 'MẶT NẠ SINH HỌC',
    tag: 'HỘP 5 MIẾNG',
    tagType: 'mask',
    subtitle: 'Premium Hydrogel Sheet Mask - Intense Hydration & Firming',
    description:
      'Mặt nạ thạch sinh học Alps Hydro-Lifting Sheet Mask (Premium Hydrogel Sheet Mask - Intense Hydration & Firming) cao cấp ôm khít từng đường nét gương mặt. Tinh chất đậm đặc chứa Collagen thủy phân phân tử siêu nhỏ và dịch chiết tảo tuyết Thụy Sĩ, mang đến hiệu ứng nâng cơ và căng bóng tức thì.',
    rating: 4.9,
    reviewCount: 198,
    soldCount: '780',
    price: 260000,
    originalPrice: 300000,
    note: 'Premium Hydrogel',
    image: hydroMaskImg,
    fallbackImage: '/facemask.jpg',
    keyIngredients: [
      'Màng thạch dừa sinh học Bio-Cellulose Thụy Sĩ',
      'Collagen vi phân tử thủy phân thẩm thấu sâu',
      'Chiết xuất tảo tuyết đỏ Thụy Sĩ chống lão hóa',
      'Ceramide NP và Amino Acid tự nhiên'
    ],
    benefits: [
      'Cấp ẩm chuyên sâu gấp 10 lần mặt nạ giấy thông thường',
      'Nâng cơ và cải thiện độ đàn hồi rõ rệt sau 20 phút',
      'Hạ nhiệt độ da tức thì -4.5°C, giải tỏa kích ứng',
      'Thư giãn làn da mệt mỏi, mang lại vẻ tươi mới và tràn đầy sức sống'
    ],
    usage: 'Đắp mặt nạ trong 20-30 phút sau khi làm sạch da. Gỡ mặt nạ và massage nhẹ nhàng dưỡng chất còn lại trên da, không cần rửa lại.',
    routineStepNumber: 5,
    routineStepTitle: 'Nâng cơ chuyên sâu',
    inStock: true,
    isFeatured: false,
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'TẤT CẢ' },
  { id: 'cleanser', label: 'SỮA RỬA MẶT' },
  { id: 'toner', label: 'NƯỚC CÂN BẰNG' },
  { id: 'serum', label: 'SERUM TÁI SINH' },
  { id: 'cream', label: 'KEM DƯỠNG DA' },
  { id: 'mask', label: 'MẶT NẠ SINH HỌC' },
];

export const ROUTINE_STEPS = [
  {
    step: '01',
    name: 'Làm Sạch Sâu Dịu Nhẹ',
    product: 'Alps Gentle Purifying Cleanser',
    time: '1 phút • Sáng & Tối',
    desc: 'Lớp bọt amino acid siêu mịn giải phóng bụi bẩn, bã nhờn mà vẫn bảo toàn hàng rào bảo vệ tự nhiên của da.',
    productId: 'cleanser-gentle-purifying',
    image: cleanserImg
  },
  {
    step: '02',
    name: 'Cân Bằng & Thanh Lọc',
    product: 'Alps Botanical Balancing Toner',
    time: '2 phút • Sáng & Tối',
    desc: 'Lấy lại độ pH 5.5 lý tưởng và đánh thức màng ẩm tự nhiên với nước khoáng sông băng Alpine và khuynh diệp thanh khiết.',
    productId: 'toner-botanical',
    image: botanicalTonerImg
  },
  {
    step: '03',
    name: 'Tái Sinh & Dưỡng Sáng',
    product: 'Alps Radiance Glow Serum',
    time: '3 phút • Sáng & Tối',
    desc: 'Thẩm thấu tinh chất ngọc trai và 10% Niacinamide vào tầng biểu bì sâu để làm đều màu và tạo hiệu ứng da bóng khỏe sương mai.',
    productId: 'serum-radiance',
    image: glowSerumImg
  },
  {
    step: '04',
    name: 'Khóa Ẩm & Phục Hồi',
    product: 'Alps Regenerating Face Cream',
    time: '2 phút • Sáng & Tối',
    desc: 'Củng cố hàng rào màng Ceramide 3-6-9, nuôi dưỡng sâu và khóa chặt dưỡng chất suốt 72 giờ.',
    productId: 'cream-regenerating',
    image: faceCreamImg
  },
  {
    step: '05',
    name: 'Nâng Cơ Chuyên Sâu',
    product: 'Alps Hydro-Lifting Sheet Mask',
    time: '20 phút • 2-3 lần/tuần',
    desc: 'Bổ sung dồi dào Collagen vi phân tử với mặt nạ thạch Premium Hydrogel, đem lại hiệu ứng căng mịn tức thì.',
    productId: 'mask-hydro-lifting',
    image: hydroMaskImg
  }
];
