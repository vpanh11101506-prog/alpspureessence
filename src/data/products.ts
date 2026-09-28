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
    reviewCount: 0,
    soldCount: '1.4k',
    price: 185000,
    originalPrice: 250000,
    note: 'Purifying Foaming Wash',
    image: cleanserImg,
    fallbackImage: '/cleanser.jpg',
    keyIngredients: [
      'Hệ chất hoạt động bề mặt Amino Acid gốc táo hữu cơ',
      'Nước khoáng sông băng Alpine Thụy Sĩ giàu khoáng chất vi lượng',
      'Chiết xuất hoa nhung tuyết Edelweiss Thụy Sĩ',
      'Phức hợp Tremella Mushroom + Hyaluronic Acid bảo toàn độ ẩm sinh học'
    ],
    benefits: [
      'Làm sạch sâu bụi mịn và bã nhờn mà không phá vỡ màng ẩm sinh học',
      'Độ pH 5.5 cân bằng lý tưởng cho mọi loại da, kể cả da nhạy cảm',
      'Bọt mịn xốp như mây, giảm tối đa ma sát tổn thương bề mặt da',
      'Bảo toàn độ ẩm tự nhiên, không gây cảm giác khô căng sau khi rửa'
    ],
    usage: 'Lấy lượng cỡ hạt đậu ra lòng bàn tay ướt, xoa tạo bọt dày mịn. Massage nhẹ nhàng toàn mặt trong 60 giây và rửa sạch lại với nước ấm.',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối hàng ngày',
      amount: 'Khoảng 1 hạt đậu lớn hoặc 1 - 2 lần nhấn vòi',
      suitableFor: 'Mọi loại da, bao gồm da dầu mụn, da khô mất nước, da nhạy cảm và mẹ bầu',
      steps: [
        {
          step: 1,
          title: 'Làm ướt & Đánh bọt',
          description: 'Rửa sạch hai bàn tay. Làm ướt toàn bộ khuôn mặt bằng nước ấm nhẹ. Lấy một lượng sữa rửa mặt vừa đủ ra lòng bàn tay ướt, xoa đều theo vòng tròn trong 15-20 giây để kích hoạt lớp bọt micro-foam bồng bềnh như mây tuyết.'
        },
        {
          step: 2,
          title: 'Massage làm sạch vùng chữ T',
          description: 'Áp lớp bọt mịn lên mặt, dùng các đầu ngón tay massage nhẹ nhàng vùng chữ T (trán, cánh mũi, cằm) theo hình xoắn ốc từ trong ra ngoài trong 30 giây để bọt len lỏi cuốn trôi bụi mịn PM2.5 và bã nhờn sâu trong lỗ chân lông.'
        },
        {
          step: 3,
          title: 'Làm sạch vùng má & cổ',
          description: 'Lướt nhẹ bọt sang hai bên má và vùng cổ theo chiều nâng cơ trong 20 giây. Tuyệt đối không dùng lực miết mạnh để tránh gây tổn thương hàng rào biểu bì.'
        },
        {
          step: 4,
          title: 'Rửa trôi & Thấm khô',
          description: 'Xả sạch toàn bộ bọt bằng nước mát hoặc nước ấm nhiệt độ phòng (khoảng 28-30°C). Dùng khăn bông cotton mềm hoặc khăn lau dùng một lần thấm nhẹ, giữ lại độ ẩm tự nhiên cho bước toner tiếp theo.'
        }
      ],
      expertTip: 'Tránh dùng nước quá nóng vì sẽ làm tan rã lớp màng lipid bảo vệ tự nhiên. Rửa mặt đúng 60 giây là thời gian vàng để hoạt chất amino acid phát huy tối đa công năng làm sạch mà không gây khô da.',
      precautions: 'Không để bọt dính trực tiếp vào niêm mạc mắt. Nếu dính vào mắt, hãy rửa kỹ lại bằng nước sạch.'
    },
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
    reviewCount: 0,
    soldCount: '950',
    price: 220000,
    originalPrice: 290000,
    note: 'Hydrating Botanical',
    image: botanicalTonerImg,
    fallbackImage: '/toner.jpg',
    keyIngredients: [
      'Nước khoáng sông băng Alpine Thụy Sĩ',
      'Chiết xuất khuynh diệp và thảo mộc tự nhiên',
      'Chiết xuất hoa cúc La Mã làm dịu sâu',
      'Panthenol (Pro-Vitamin B5) 5% & Tremella Mushroom + Hyaluronic Acid'
    ],
    benefits: [
      'Cân bằng độ pH chuẩn 5.5 ngay sau bước rửa mặt',
      'Thanh lọc bụi bẩn còn sót lại và se mịn lỗ chân lông',
      'Làm dịu làn da mệt mỏi, stress do nhiệt độ và ánh sáng xanh',
      'Củng cố hàng rào lipid tự nhiên, chuẩn bị nền da thông thoáng hấp thu dưỡng chất'
    ],
    usage: 'Nhấn 2 lần vòi pump ra bông cotton mềm lau nhẹ nhàng khắp mặt hoặc vỗ trực tiếp bằng tay cho đến khi ráo mịn.',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối ngay sau bước sữa rửa mặt',
      amount: 'Khoảng 3 - 4 giọt hoặc 2 lần nhấn vòi pump',
      suitableFor: 'Mọi loại da, đặc biệt là da dầu thiếu nước, da dễ kích ứng và da sau treatment',
      steps: [
        {
          step: 1,
          title: 'Chuẩn bị nền da ẩm',
          description: 'Sử dụng toner trong vòng 60 giây sau khi rửa mặt khi bề mặt da vẫn còn độ ẩm nhẹ tự nhiên.'
        },
        {
          step: 2,
          title: 'Cách 1: Thấm bông cotton làm sạch sâu',
          description: 'Nhấn 2 lần ra miếng bông tẩy trang mỏng, lau nhẹ nhàng từ trong cánh mũi ra ngoài thái dương, từ cằm lên quai hàm để loại bỏ hoàn toàn cặn vôi cứng trong nước sinh hoạt và cân bằng pH tức thì.'
        },
        {
          step: 3,
          title: 'Cách 2: Vỗ trực tiếp dưỡng ẩm sâu (Khuyên dùng)',
          description: 'Nhỏ 3-4 giọt ra lòng bàn tay sạch, xoa nhẹ hai tay rồi áp đều lên má, trán, cằm và cổ. Dùng các đầu ngón tay vỗ dồn dập nhẹ nhàng như tiếng mưa rơi để tinh chất thẩm thấu sâu vào tầng trung bì.'
        },
        {
          step: 4,
          title: 'Lotion Mask hạ nhiệt cấp cứu (Tùy chọn)',
          description: 'Vào những ngày da bị đỏ rát do cháy nắng hoặc ngồi máy lạnh hanh khô, thấm đẫm 3 miếng bông mỏng đắp lên trán và 2 má trong 3 phút để phục hồi rào cản da khẩn cấp.'
        }
      ],
      expertTip: 'Áp nhẹ lòng bàn tay ấm lên mặt trong 5 giây cuối cùng để nhiệt độ cơ thể giúp các khoáng chất vi lượng sông băng thẩm thấu trọn vẹn nhất.',
      precautions: 'Bảo quản nơi thoáng mát, có thể để ngăn mát tủ lạnh để tăng cảm giác sảng khoái và se khít lỗ chân lông.'
    },
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
      'Huyết thanh dưỡng sáng sinh học phân tử Alps Radiance Glow Serum chứa chiết xuất bột ngọc trai hữu cơ kết hợp cùng 10% Niacinamide tinh khiết và Tremella Mushroom + Hyaluronic Acid đa tầng, giúp phục hồi ánh sáng tự nhiên và làm đều màu da rõ rệt sau 14 ngày.',
    rating: 4.9,
    reviewCount: 0,
    soldCount: '1.8k',
    price: 390000,
    originalPrice: 450000,
    note: 'Ngọc trai & Niacinamide',
    image: glowSerumImg,
    fallbackImage: '/glow serum.jpg',
    keyIngredients: [
      'Bột ngọc trai hữu cơ Akoya tán siêu mịn',
      'Niacinamide tinh khiết 10% (Vitamin B3)',
      'Phức hợp Tremella Mushroom + Hyaluronic Acid 5 tầng phân tử (Nấm tuyết sinh học)',
      'Chiết xuất hoa nhung tuyết Thụy Sĩ (Edelweiss)'
    ],
    benefits: [
      'Làm sáng và đều màu da sau 14 ngày sử dụng',
      'Mờ thâm mụn, giảm đỏ và ức chế hắc sắc tố Melanin',
      'Tạo hiệu ứng da bóng khỏe sương mai (Glass Skin)',
      'Thẩm thấu nhanh chóng, tạo màng dưỡng bóng khỏe không nhờn rít'
    ],
    usage: 'Sử dụng 3-4 giọt mỗi sáng và tối sau bước toner. Vỗ nhẹ toàn mặt và cổ theo chuyển động hướng lên.',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối sau bước Toner và trước bước Kem dưỡng',
      amount: '3 - 4 giọt tinh chất đậm đặc từ ống hút nhỏ giọt dropper',
      suitableFor: 'Da xỉn màu, da có vết thâm sau mụn, tàn nhang, da dầu cần kiềm bã nhờn và dưỡng sáng tự nhiên',
      steps: [
        {
          step: 1,
          title: 'Nhỏ tinh chất trực tiếp hoặc ra tay',
          description: 'Hút một lượng serum vừa đủ vào ống dropper. Nhỏ trực tiếp 3 giọt lên 3 điểm: trán và 2 bên má (chú ý không để đầu ống chạm vào bề mặt da để giữ vệ sinh chai serum).'
        },
        {
          step: 2,
          title: 'Dàn trải tinh chất bằng đầu ngón tay',
          description: 'Dùng ngón áp út và ngón giữa thoa đều serum lướt nhẹ trên da theo chiều từ trong ra ngoài, từ dưới lên trên dọc theo thớ cơ gương mặt.'
        },
        {
          step: 3,
          title: 'Vỗ nhẹ kích hoạt thẩm thấu',
          description: 'Dùng các đầu ngón tay vỗ nhẹ nhàng khắp mặt trong 20-30 giây cho đến khi serum thẩm thấu hoàn toàn, để lại bề mặt da ráo mịn, căng mướt mà không gây cảm giác dính dớp.'
        },
        {
          step: 4,
          title: 'Chăm sóc vùng cổ',
          description: 'Thoa phần tinh chất còn lại trên tay xuống vùng cổ theo chiều vuốt nhẹ hướng lên để chống lão hóa và dưỡng sáng đồng đều giữa mặt và cổ.'
        }
      ],
      expertTip: 'Chờ khoảng 1-2 phút cho serum ngấm hẳn vào da trước khi thoa kem dưỡng để tránh hiện tượng vón cục. Vào buổi sáng, hãy thoa kem chống nắng sau khi dùng serum để bảo vệ thành quả dưỡng sáng tối đa.',
      precautions: 'Công thức chứa 10% Niacinamide tinh khiết đạt chuẩn Thụy Sĩ dịu êm, an toàn khi kết hợp cùng kem chống nắng hoặc các loại kem dưỡng ẩm hàng ngày.'
    },
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
    reviewCount: 0,
    soldCount: '1.2k',
    price: 395000,
    originalPrice: 480000,
    note: 'Tái tạo da 72H',
    image: faceCreamImg,
    fallbackImage: '/face cream.jpg',
    keyIngredients: [
      'Ceramide Complex 3-6-9 đồng hóa sinh học',
      'Bơ hạt mỡ hữu cơ lạnh (Shea Butter)',
      'Tremella Mushroom + Hyaluronic Acid đa tầng tái tạo độ căng mọng',
      'Squalane thực vật chiết xuất từ quả ô-liu Thụy Sĩ'
    ],
    benefits: [
      'Khóa ẩm bền bỉ 72 giờ liên tục',
      'Phục hồi và làm dày hàng rào biểu bì bảo vệ da',
      'Làm dịu tức thì tình trạng khô rát, bong tróc',
      'Bảo toàn trọn vẹn hoạt tính sinh học tế bào gốc tuyết Thụy Sĩ'
    ],
    usage: 'Lấy lượng vừa đủ chấm lên 5 điểm và thoa đều, áp nhẹ lòng bàn tay ấm để dưỡng chất thẩm thấu.',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối ở bước cuối cùng của chu trình chăm sóc da',
      amount: 'Khoảng một hạt đậu nành (sử dụng thìa bạc cao cấp đi kèm)',
      suitableFor: 'Mọi loại da, đặc biệt là da khô ráp, da sau điều trị xâm lấn, da ngồi máy lạnh thường xuyên',
      steps: [
        {
          step: 1,
          title: 'Lấy kem bằng thìa bạc Thụy Sĩ',
          description: 'Dùng đầu thìa bạc chuyên dụng lấy một lượng kem bằng hạt đậu nành ra mu bàn tay. Việc dùng thìa giúp bảo toàn độ vô trùng tuyệt đối cho hũ kem dưỡng.'
        },
        {
          step: 2,
          title: 'Chấm 5 điểm cốt lõi',
          description: 'Chấm đều kem lên 5 điểm trên mặt: trán, 2 bên gò má, đầu mũi và cằm. Có thể chấm thêm 2 điểm dưới cổ nếu muốn dưỡng ẩm vùng cổ.'
        },
        {
          step: 3,
          title: 'Thao tác thoa vuốt nâng cơ',
          description: 'Dùng hai lòng bàn tay thoa nhẹ nhàng theo chuyển động tròn hướng từ trong ra ngoài, từ dưới cánh mũi hướng lên thái dương và từ cằm lên mang tai để tạo hiệu ứng nâng cơ tự nhiên.'
        },
        {
          step: 4,
          title: 'Ép nhiệt lòng bàn tay khóa ẩm',
          description: 'Xoa hai lòng bàn tay vào nhau cho ấm lên, sau đó áp nhẹ lên má, trán và cằm trong 10 giây. Nhiệt độ tự nhiên sẽ giúp phức hợp Ceramide và Tremella Mushroom thẩm thấu sâu, khóa chặt màng ẩm suốt 72 giờ.'
        }
      ],
      expertTip: 'Vào mùa hè hoặc đối với da dầu, bạn chỉ cần dùng một lượng mỏng bằng nửa hạt đậu vào buổi sáng. Vào mùa đông hanh khô hoặc ban đêm trong phòng máy lạnh, có thể thoa 2 lớp mỏng để làm mặt nạ ngủ phục hồi chuyên sâu.',
      precautions: 'Đậy chặt nắp sau khi dùng. Vệ sinh thìa bạc bằng khăn giấy sạch sau mỗi lần lấy kem.'
    },
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
      'Mặt nạ thạch sinh học Alps Hydro-Lifting Sheet Mask (Premium Hydrogel Sheet Mask - Intense Hydration & Firming) cao cấp ôm khít từng đường nét gương mặt. Tinh chất đậm đặc chứa Tremella Mushroom + Hyaluronic Acid phân tử siêu nhỏ và dịch chiết tảo tuyết Thụy Sĩ, mang đến hiệu ứng nâng cơ và căng mọng tức thì.',
    rating: 4.9,
    reviewCount: 0,
    soldCount: '780',
    price: 165000,
    originalPrice: 220000,
    note: 'Premium Hydrogel',
    image: hydroMaskImg,
    fallbackImage: '/facemask.jpg',
    keyIngredients: [
      'Màng thạch dừa sinh học Bio-Cellulose Thụy Sĩ',
      'Tremella Mushroom + Hyaluronic Acid (Nấm tuyết sinh học cấp ẩm gấp 500 lần)',
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
    detailedUsage: {
      timing: '2 - 3 lần mỗi tuần vào buổi tối hoặc trước các sự kiện quan trọng cần cấp cứu da căng bóng',
      amount: '1 miếng mặt nạ thạch sinh học Bio-Cellulose (chứa 29g tinh chất đậm đặc)',
      suitableFor: 'Mọi loại da, đặc biệt là da mệt mỏi, da đỏ rát cháy nắng, da mất nước nghiêm trọng',
      steps: [
        {
          step: 1,
          title: 'Làm sạch và cân bằng da',
          description: 'Rửa sạch mặt với sữa rửa mặt Alps và lau một lớp mỏng toner để mở đường dẫn truyền dưỡng chất.'
        },
        {
          step: 2,
          title: 'Gỡ lớp màng bảo vệ thứ nhất',
          description: 'Lấy miếng mặt nạ ra khỏi gói. Mặt nạ sinh học Bio-Cellulose nằm ở giữa 2 lớp màng lưới bảo vệ. Nhẹ nhàng gỡ bỏ một bên lớp màng lưới bảo vệ đầu tiên.'
        },
        {
          step: 3,
          title: 'Căn chỉnh & Ôm sát khuôn mặt',
          description: 'Đặt mặt thạch sinh học áp trực tiếp lên khuôn mặt, căn chỉnh vừa vặn vị trí mắt, mũi, miệng. Sau đó từ từ bóc nốt lớp màng lưới bảo vệ thứ hai ở bên ngoài ra. Dùng tay miết nhẹ để mặt nạ ôm khít 100% như làn da thứ hai.'
        },
        {
          step: 4,
          title: 'Thư giãn 20 - 30 phút & Tận dụng tinh chất',
          description: 'Nằm thư giãn trong 20-30 phút. Lấy phần tinh chất đậm đặc dồi dào còn lại trong gói thoa đều lên vùng cổ, khuỷu tay và bàn tay.'
        },
        {
          step: 5,
          title: 'Gỡ mặt nạ & Khóa dưỡng chất',
          description: 'Nhẹ nhàng bóc mặt nạ từ dưới cằm lên trên. Dùng các đầu ngón tay vỗ nhẹ cho tinh chất thẩm thấu hết vào da. Không cần rửa lại bằng nước. Có thể thoa thêm một lớp mỏng kem dưỡng Alps để khóa trọn dưỡng chất qua đêm.'
        }
      ],
      expertTip: 'Bảo quản mặt nạ trong ngăn mát tủ lạnh 15 phút trước khi đắp sẽ giúp hạ nhiệt độ da tức thì -4.5°C, giúp co nhỏ mao mạch và giảm sưng bọng mắt thần kỳ sau một ngày làm việc căng thẳng.',
      precautions: 'Mỗi miếng mặt nạ chỉ sử dụng một lần. Không đắp quá 40 phút hoặc để mặt nạ khô quắt trên mặt.'
    },
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
  { id: 'cream', label: 'KEM DƯỠNG' },
  { id: 'mask', label: 'MẶT NẠ' },
];

export const ROUTINE_STEPS = [
  {
    step: 1,
    title: 'Làm sạch & Thanh lọc',
    productId: 'cleanser-gentle-purifying',
    name: 'Alps Gentle Purifying Cleanser',
    product: 'Sữa Rửa Mặt Bọt Mịn Dịu Nhẹ',
    time: 'Sáng & Tối',
    desc: 'Làm sạch sâu bụi mịn PM2.5, bã nhờn dư thừa với lớp bọt micro-foam siêu mịn, giữ nguyên màng ẩm tự nhiên pH 5.5.',
    image: cleanserImg,
  },
  {
    step: 2,
    title: 'Cân bằng & Cấp ẩm',
    productId: 'toner-botanical',
    name: 'Alps Botanical Balancing Toner',
    product: 'Nước Cân Bằng Thảo Mộc',
    time: 'Sáng & Tối',
    desc: 'Phục hồi độ pH sinh học chuẩn 5.5, làm dịu da tức thì và se khít lỗ chân lông với nước khoáng sông băng Thụy Sĩ.',
    image: botanicalTonerImg,
  },
  {
    step: 3,
    title: 'Tái sinh & Dưỡng sáng',
    productId: 'serum-radiance',
    name: 'Alps Radiance Glow Serum',
    product: 'Serum Dưỡng Sáng Mờ Thâm',
    time: 'Sáng & Tối',
    desc: 'Đều màu da sau 14 ngày với chiết xuất bột ngọc trai hữu cơ, 10% Niacinamide tinh khiết và Tremella Mushroom + Hyaluronic Acid đa tầng.',
    image: glowSerumImg,
  },
  {
    step: 4,
    title: 'Khóa ẩm & Phục hồi',
    productId: 'cream-regenerating',
    name: 'Alps Regenerating Face Cream',
    product: 'Kem Dưỡng Tái Sinh 72H',
    time: 'Sáng & Tối',
    desc: 'Khóa chặt dưỡng chất với Ceramide Complex 3-6-9 sinh học và bơ hạt mỡ, bảo vệ và khóa ẩm liên tục 72 giờ.',
    image: faceCreamImg,
  },
  {
    step: 5,
    title: 'Nâng cơ chuyên sâu',
    productId: 'mask-hydro-lifting',
    name: 'Alps Hydro-Lifting Sheet Mask',
    product: 'Mặt Nạ Thạch Sinh Học',
    time: '2 - 3 lần/tuần',
    desc: 'Bổ sung dồi dào Tremella Mushroom + Hyaluronic Acid với mặt nạ thạch Premium Hydrogel, đem lại hiệu ứng căng mọng ngậm nước tức thì.',
    image: hydroMaskImg,
  },
];
