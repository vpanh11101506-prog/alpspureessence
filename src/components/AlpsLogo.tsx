import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
  iconColor?: string;
}

/**
 * Biểu tượng dãy núi Alps thương hiệu (Độ dày nét đậm rõ nét y hệt ảnh mẫu):
 * - Đỉnh núi tuyết băng hà trung tâm với nét đậm, rãnh nứt đá tuyết rõ ràng
 * - 2 ngọn núi màu trắng viền xanh lá đậm nét hai bên (liền khối, không cắt ở trong)
 * - 2 ngọn núi vàng cát Thụy Sĩ (#c89f65) nét dày dặn ở phía sau
 * - Các cây thông nhỏ đậm chất, ôm sát chân núi
 * - Mầm sống thảo mộc nở rộ và các đường gợn sóng hồ băng dày dặn
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-12 h-8',
  color,
  iconColor,
}) => {
  const customColor = iconColor || color;
  const isLight = customColor === '#fed8c9' || customColor === 'white';
  const goldColor = isLight ? '#fed8c9' : '#c89f65';
  const darkStroke = isLight ? '#ffffff' : (customColor || '#1c1c19');
  const glacierLeft = isLight ? 'rgba(255,255,255,0.25)' : '#d2dce2';
  const glacierRight = isLight ? 'rgba(255,255,255,0.45)' : '#f5f9fa';

  // Hai ngọn núi màu trắng viền xanh lá hai bên (nét dày, liền khối không cắt ở trong)
  const whiteMountainFill = isLight ? 'rgba(255,255,255,0.25)' : '#ffffff';
  const greenStroke = isLight ? '#62c48d' : '#173823';
  const treeFill = isLight ? '#fed8c9' : '#173823';
  const treeStroke = isLight ? 'none' : '#102819';

  return (
    <svg
      viewBox="0 0 160 84"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`object-contain inline-block select-none ${className}`}
    >
      {/* 1. HAI NGỌN NÚI VÀNG CÁT PHÍA SAU (NÉT DÀY RÕ DÁNG) */}
      <path d="M20 63 L42 24 L64 63" stroke={goldColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 24 L31 63" stroke={goldColor} strokeWidth="1.8" strokeLinecap="round" />

      <path d="M96 63 L118 24 L140 63" stroke={goldColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 24 L129 63" stroke={goldColor} strokeWidth="1.8" strokeLinecap="round" />

      {/* 2. HAI NGỌN NÚI TRẮNG VIỀN XANH LÁ HAI BÊN (NÉT VIỀN DÀY, LIỀN KHỐI KHÔNG CẮT TRONG) */}
      {/* Núi trắng viền xanh bên trái */}
      <polygon
        points="32,63 54,23 76,63"
        fill={whiteMountainFill}
        stroke={greenStroke}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Núi trắng viền xanh bên phải */}
      <polygon
        points="84,63 106,23 128,63"
        fill={whiteMountainFill}
        stroke={greenStroke}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* 3. ĐỈNH NÚI BĂNG HÀ TRUNG TÂM (NÉT DÀY, UY NGHIÊM) */}
      <path d="M80 10 L50 63 L80 63 Z" fill={glacierLeft} stroke={darkStroke} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M80 10 L80 63 L110 63 Z" fill={glacierRight} stroke={darkStroke} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M80 10 L80 63" stroke={darkStroke} strokeWidth="3.0" strokeLinecap="round" />

      {/* VÂN NÚI VÀ ĐƯỜNG NỨT BĂNG ĐỈNH GIỮA (NÉT ĐẬM VÀ RÕ) */}
      <path d="M67 43 L80 34" stroke={darkStroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M71 53 L80 47" stroke={darkStroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M93 41 L80 32" stroke={darkStroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M97 51 L80 45" stroke={darkStroke} strokeWidth="1.8" strokeLinecap="round" />

      {/* 4. RỪNG THÔNG BÁCH ĐẬM NÉT (DÀY, NỞ RỘ ÔM SÁT CHÂN NÚI) */}
      <g fill={treeFill} stroke={treeStroke} strokeWidth="0.6">
        {/* Nhóm cây bên trái */}
        <path d="M33 50 L37 55 L29 55 Z" />
        <path d="M33 53 L38 59 L28 59 Z" />
        <path d="M33 57 L40 64 L26 64 Z" />

        <path d="M41 46 L45 52 L37 52 Z" />
        <path d="M41 50 L46 57 L36 57 Z" />
        <path d="M41 55 L48 64 L34 64 Z" />

        <path d="M49 49 L53 55 L45 55 Z" />
        <path d="M49 53 L54 60 L44 60 Z" />
        <path d="M49 57 L55 64 L43 64 Z" />

        {/* Nhóm cây bên phải */}
        <path d="M111 49 L115 55 L107 55 Z" />
        <path d="M111 53 L116 60 L106 60 Z" />
        <path d="M111 57 L117 64 L105 64 Z" />

        <path d="M119 46 L123 52 L115 52 Z" />
        <path d="M119 50 L124 57 L114 57 Z" />
        <path d="M119 55 L126 64 L112 64 Z" />

        <path d="M127 50 L131 55 L123 55 Z" />
        <path d="M127 53 L132 59 L122 59 Z" />
        <path d="M127 57 L134 64 L120 64 Z" />
      </g>

      {/* 5. MẦM SỐNG THẢO MỘC TRUNG TÂM (LỚN VÀ ĐẬM NÉT Y ẢNH MẪU) */}
      <path d="M80 62 C73 59 71 52 77 49 C82 52 82 58 80 62 Z" fill={isLight ? '#fed8c9' : '#173823'} stroke={isLight ? '#fed8c9' : '#102819'} strokeWidth="1.0" />
      <path d="M80 62 C87 59 89 52 83 49 C78 52 78 58 80 62 Z" fill={isLight ? '#fed8c9' : '#173823'} stroke={isLight ? '#fed8c9' : '#102819'} strokeWidth="1.0" />
      <circle cx="80" cy="62" r="1.6" fill={isLight ? '#fed8c9' : '#74584d'} />

      {/* 6. GỢN SÓNG HỒ NƯỚC BĂNG & CHÂN TRỜI (NÉT DÀY UỐN LƯỢN NGHỆ THUẬT) */}
      <path d="M16 63.5 Q48 64.5 80 63.5 Q112 62.5 144 63.5" stroke={darkStroke} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M28 68.5 Q54 70.5 80 68.5 Q106 66.5 132 68.5" stroke={darkStroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M42 73.5 Q61 75 80 73.5 Q99 72 118 73.5" stroke={goldColor} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
};

interface AlpsLogoProps {
  variant?: 'full' | 'icon' | 'stacked' | 'image';
  className?: string;
  textColor?: string;
  iconColor?: string;
  subtitle?: string;
  useImage?: boolean;
}

/**
 * Logo ALPS (Độ đậm, dày dặn và phong thái sang trọng y hệt ảnh mẫu):
 * - Icon biểu tượng dãy núi nét dày, uy quyền, tinh tế
 * - Chữ ALPS font Serif đậm đà, quyền quý (Heavy Bold Serif)
 * - Dòng phụ đề PURE ESSENCE nét dày dặn, dãn chữ chuẩn quý phái
 */
export const AlpsLogo: React.FC<AlpsLogoProps> = ({
  variant = 'full',
  className = '',
  textColor = 'text-[#1c1c19]',
  iconColor,
  subtitle = 'PURE ESSENCE',
}) => {
  const isLight = textColor.includes('text-white') || textColor.includes('text-[#fed8c9]');

  if (variant === 'icon') {
    return <AlpsIcon className={className || 'w-12 h-8'} color={iconColor} />;
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      <AlpsIcon
        className="w-14 h-8 sm:w-16 sm:h-9 mb-1 transition-transform duration-300 group-hover:scale-105"
        color={iconColor}
      />
      <span
        className={`font-serif tracking-[0.32em] text-xl sm:text-2xl font-bold uppercase transition-colors ${textColor} leading-tight`}
        style={{ letterSpacing: '0.34em' }}
      >
        ALPS
      </span>
      {subtitle && (
        <span
          className={`text-[9px] sm:text-[10px] font-bold uppercase mt-0.5 tracking-[0.38em] ${
            isLight ? 'text-[#fed8c9]/95' : 'text-[#4a4742]'
          }`}
          style={{ letterSpacing: '0.38em' }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
