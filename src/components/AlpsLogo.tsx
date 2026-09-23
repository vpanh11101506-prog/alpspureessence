import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
  iconColor?: string;
}

/**
 * Biểu tượng nguyên bản đỉnh Alps (Alpine Mountain & Pure Essence Emblem):
 * - Đỉnh Matterhorn / Alps hùng vĩ ở trung tâm với sườn tuyết băng hà phân chia sống núi (summit ridge)
 * - Các dãy núi vệ tinh phía sau sắc nét ánh vàng kim cát Thụy Sĩ (#c4a572)
 * - Rừng thông bách xanh đại ngàn (#2d4a36) hai bên sườn núi
 * - Mầm sống thảo mộc thực vật thuần chay (botanical seedling) đâm chồi ở chân núi
 * - Mặt hồ băng tuyết êm đềm với hai gợn sóng phản chiếu (#c4a572)
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-10 h-7',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size * 0.5 } : undefined}
    >
      {/* 1. DÃY NÚI ÁNH KIM PHÍA SAU (GOLDEN ALPINE RIDGES) */}
      {/* Sườn núi vàng xa bên trái */}
      <path
        d="M20 62 L32 44 L44 62"
        stroke="#c4a572"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Đỉnh núi vàng trung bên trái */}
      <path
        d="M30 62 L50 28 L70 62"
        stroke="#c4a572"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 28 L40 62"
        stroke="#c4a572"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Đỉnh núi vàng trung bên phải */}
      <path
        d="M90 62 L110 28 L130 62"
        stroke="#c4a572"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110 28 L120 62"
        stroke="#c4a572"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Sườn núi vàng xa bên phải */}
      <path
        d="M116 62 L128 44 L140 62"
        stroke="#c4a572"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. ĐỈNH NÚI CHÍNH BĂNG HÀ (CENTRAL MAJESTIC PEAK) */}
      {/* Sườn núi bên trái - Màu lam xám băng hà (Glacial Slate) */}
      <path
        d="M80 12 L52 62 L80 62 Z"
        fill="#cad5dc"
        stroke="#23211f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Sườn núi bên phải - Màu tuyết trắng băng tuyết (Crisp Alpine Snow) */}
      <path
        d="M80 12 L80 62 L108 62 Z"
        fill="#f0f5f7"
        stroke="#23211f"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Sống núi nhọn trung tâm (Summit Ridge) */}
      <path
        d="M80 12 L80 62"
        stroke="#23211f"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Các vết nứt tuyết và đường vân khối trên sườn núi */}
      <path
        d="M68 44 L80 36"
        stroke="#23211f"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M72 54 L80 48"
        stroke="#23211f"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M92 42 L80 34"
        stroke="#23211f"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M96 52 L80 46"
        stroke="#23211f"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* 3. RỪNG THÔNG BÁCH XANH SƯỜN NÚI (EVERGREEN ALPINE PINES) */}
      {/* Cụm thông bên trái */}
      <g fill="#2d4a36" stroke="#1d3325" strokeWidth="0.5">
        {/* Cây thông 1 */}
        <path d="M26 50 L29 55 L23 55 Z" />
        <path d="M26 53 L30 59 L22 59 Z" />
        <path d="M26 57 L31 63 L21 63 Z" />
        {/* Cây thông 2 */}
        <path d="M34 46 L37 51 L31 51 Z" />
        <path d="M34 49 L38 56 L30 56 Z" />
        <path d="M34 54 L39 63 L29 63 Z" />
        {/* Cây thông 3 */}
        <path d="M42 51 L45 56 L39 56 Z" />
        <path d="M42 54 L46 62 L38 62 Z" />
      </g>

      {/* Cụm thông bên phải */}
      <g fill="#2d4a36" stroke="#1d3325" strokeWidth="0.5">
        {/* Cây thông 4 */}
        <path d="M118 51 L121 56 L115 56 Z" />
        <path d="M118 54 L122 62 L114 62 Z" />
        {/* Cây thông 5 */}
        <path d="M126 46 L129 51 L123 51 Z" />
        <path d="M126 49 L130 56 L122 56 Z" />
        <path d="M126 54 L131 63 L121 63 Z" />
        {/* Cây thông 6 */}
        <path d="M134 50 L137 55 L131 55 Z" />
        <path d="M134 53 L138 59 L130 59 Z" />
        <path d="M134 57 L139 63 L129 63 Z" />
      </g>

      {/* 4. MẦM SỐNG THẢO MỘC THUẦN CHAY Ở CHÂN NÚI (CENTRAL BOTANICAL SPROUT) */}
      {/* Lá mầm trái */}
      <path
        d="M80 62 C75 59 73 54 78 52 C81 54 81 59 80 62 Z"
        fill="#4d5f49"
        stroke="#2d402d"
        strokeWidth="0.9"
      />
      {/* Lá mầm phải */}
      <path
        d="M80 62 C85 59 87 54 82 52 C79 54 79 59 80 62 Z"
        fill="#4d5f49"
        stroke="#2d402d"
        strokeWidth="0.9"
      />
      {/* Nhụy hạt mầm */}
      <circle cx="80" cy="62" r="1.2" fill="#74584d" />

      {/* 5. ĐƯỜNG CHÂN NÚI VÀ GỢN SÓNG HỒ NƯỚC BĂNG (BASE & LAKE RIPPLES) */}
      <path
        d="M20 63.5 L140 63.5"
        stroke="#c4a572"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Gợn sóng phản chiếu 1 */}
      <path
        d="M32 67.5 Q56 69 80 67.5 Q104 66 128 67.5"
        stroke="#c4a572"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Gợn sóng phản chiếu 2 */}
      <path
        d="M44 71.5 Q62 73 80 71.5 Q98 70 116 71.5"
        stroke="#c4a572"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
};

interface AlpsLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  className?: string;
  textColor?: string;
  iconColor?: string;
  subtitle?: string;
}

export const AlpsLogo: React.FC<AlpsLogoProps> = ({
  variant = 'full',
  className = '',
  textColor = 'text-[#1c1c19]',
  subtitle = 'PURE ESSENCE',
}) => {
  if (variant === 'icon') {
    return <AlpsIcon className={className || 'w-10 h-6'} />;
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Biểu tượng ngọn núi, rừng thông và mầm sống Alps */}
      <AlpsIcon className="w-16 h-8 sm:w-20 sm:h-9 transition-transform duration-300 group-hover:scale-105" />

      {/* Tên thương hiệu ALPS - Font serif sắc sảo và khoảng cách chữ rộng quý phái */}
      <div
        className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.34em] ${textColor} leading-tight mt-0.5 pl-1.5`}
        style={{ fontFamily: "'Noto Serif', Didot, 'Playfair Display', serif" }}
      >
        ALPS
      </div>

      {/* Dòng định vị thương hiệu PURE ESSENCE màu đồng ánh ấm */}
      {subtitle && (
        <span
          className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-[#74584d] font-semibold uppercase mt-0.5 pl-0.5"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
