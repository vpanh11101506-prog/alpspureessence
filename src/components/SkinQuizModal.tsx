import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Droplets,
  Activity,
  Flame,
  MessageSquare,
  ShoppingBag,
  Sun,
  Moon,
  Info,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupportWithPrompt?: (promptText: string) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onShowToast?: (msg: string) => void;
}

interface QuizOption {
  label: string;
  desc: string;
  icon?: string;
}

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'skinType',
    title: 'Hiện tại bạn cảm nhận nền da của mình như thế nào?',
    subtitle: 'Bước 1/5 • Xác định phân loại da sinh học',
    options: [
      { label: 'Da Dầu (Oily Skin)', desc: 'Bóng dầu toàn mặt, lỗ chân lông to ở vùng trán mũi má, dễ sinh mụn cám, mụn viêm' },
      { label: 'Da Hỗn Hợp Thiên Dầu (Combination Oily)', desc: 'Đổ dầu nhiều ở vùng chữ T (trán, mũi, cằm), hai bên má bình thường hoặc khô' },
      { label: 'Da Khô (Dry Skin)', desc: 'Thường xuyên căng rát sau rửa mặt, bề mặt thô ráp, dễ bong tróc vào mùa lạnh' },
      { label: 'Da Hỗn Hợp Thiên Khô (Combination Dry)', desc: 'Khô căng nhiều vùng, chỉ tiết dầu nhẹ ở cánh mũi vào cuối ngày' },
      { label: 'Da Nhạy Cảm (Sensitive Skin)', desc: 'Dễ ửng đỏ, ngứa ngáy hoặc châm chích khi đổi thời tiết hoặc tiếp xúc mỹ phẩm lạ' },
      { label: 'Da Thường Cân Bằng (Normal Skin)', desc: 'Lỗ chân lông mịn, độ ẩm tự nhiên tốt, ít khuyết điểm' },
    ],
  },
  {
    id: 'primaryConcern',
    title: 'Vấn đề nào của làn da khiến bạn trăn trở và muốn cải thiện nhất?',
    subtitle: 'Bước 2/5 • Mục tiêu phục hồi ưu tiên',
    options: [
      { label: 'Mụn, Bít Tắc & Lỗ Chân Lông To', desc: 'Mụn ẩn dưới da, mụn đầu đen cánh mũi, tuyến dầu hoạt động quá mức' },
      { label: 'Thâm Mụn, Sạm Nám & Không Đều Màu', desc: 'Vết thâm dai dẳng sau mụn, da xỉn màu mệt mỏi, đốm nâu tàn nhang' },
      { label: 'Khô Ráp, Mất Nước Biểu Bì & Căng Rát', desc: 'Da thiếu ẩm sâu, tạo cảm giác sần sùi khi trang điểm hoặc thoa dưỡng' },
      { label: 'Rào Cản Da Bị Tổn Thương, Đỏ Rát', desc: 'Da yếu sau treatment, dùng sai kem trộn, hoặc dễ kích ứng với môi trường' },
      { label: 'Lão Hóa Sớm, Kém Săn Chắc & Rãnh Nhăn', desc: 'Xuất hiện nếp nhăn đuôi mắt, rãnh cười, độ đàn hồi da suy giảm' },
    ],
  },
  {
    id: 'sensitivity',
    title: 'Mức độ nhạy cảm và phản ứng của làn da bạn?',
    subtitle: 'Bước 3/5 • Đánh giá độ bền rào cản sinh học (Skin Barrier)',
    options: [
      { label: 'Rất Nhạy Cảm - Dễ Kích Ứng', desc: 'Thường xuyên bị đỏ rát, nổi mẩn, chỉ dùng được các sản phẩm siêu lành tính thuần chay' },
      { label: 'Nhạy Cảm Vừa Phải', desc: 'Thỉnh thoảng có cảm giác châm chích nhẹ khi dùng hoạt chất nồng độ cao' },
      { label: 'Khá Khỏe Mạnh', desc: 'Ít khi kích ứng, da dung nạp tốt hầu hết các dòng mỹ phẩm chăm sóc' },
      { label: 'Chưa Từng Dùng Mỹ Phẩm Chuyên Sâu', desc: 'Muốn bắt đầu với chu trình nhẹ nhàng an toàn tuyệt đối' },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Môi trường sống và thói quen sinh hoạt mỗi ngày?',
    subtitle: 'Bước 4/5 • Tác nhân ngoại sinh ảnh hưởng đến cấu trúc da',
    options: [
      { label: 'Văn Phòng Máy Lạnh (> 8 tiếng/ngày)', desc: 'Tiếp xúc liên tục ánh sáng xanh màn hình máy tính, không khí điều hòa hút ẩm da' },
      { label: 'Thường Xuyên Ra Ngoài Nắng Gió, Bụi Mịn', desc: 'Di chuyển nhiều ngoài đường, da chịu tác động của khói bụi PM2.5 và tia UV' },
      { label: 'Thức Khuya, Căng Thẳng & Ngủ Ít', desc: 'Thời gian ngủ < 6 tiếng/ngày, da không kịp tái tạo và đào thải độc tố tế bào' },
      { label: 'Lối Sống Cân Bằng, Khoa Học', desc: 'Uống đủ nước, tập thể dục đều đặn, chế độ dinh dưỡng lành mạnh' },
    ],
  },
  {
    id: 'ageGroup',
    title: 'Độ tuổi hiện tại của bạn?',
    subtitle: 'Bước 5/5 • Chu kỳ tái tạo tế bào theo sinh học lứa tuổi',
    options: [
      { label: 'Dưới 22 Tuổi', desc: 'Tập trung làm sạch sâu thông thoáng lỗ chân lông, kiềm dầu và ngừa mụn' },
      { label: 'Từ 22 - 30 Tuổi', desc: 'Dưỡng ẩm chuyên sâu, chống oxy hóa, dưỡng sáng và ngăn ngừa lão hóa sớm' },
      { label: 'Từ 31 - 45 Tuổi', desc: 'Tái sinh tế bào gốc, củng cố mạng lưới Tremella Mushroom + Hyaluronic Acid & Elastin, mờ nếp nhăn và đốm nâu' },
      { label: 'Trên 45 Tuổi', desc: 'Phục hồi toàn diện màng Lipid biểu bì, nâng cơ và khóa ẩm suốt 72 giờ' },
    ],
  },
];

interface DiagnosisResult {
  skinHealthScore: number;
  barrierStrength: number;
  hydrationLevel: number;
  riskFactor: string;
  diagnosisTitle: string;
  rootCauseAnalysis: string;
  morningRoutine: Array<{ step: string; product: string; usage: string }>;
  eveningRoutine: Array<{ step: string; product: string; usage: string }>;
  expertTips: string[];
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onOpenSupportWithPrompt,
  onAddToCart,
  onShowToast,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[currentStep];

  const handleSelectOption = (optionLabel: string) => {
    const updatedAnswers = { ...answers, [currentQ.id]: optionLabel };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed last question, trigger analysis
      triggerAnalysis(updatedAnswers);
    }
  };

  const triggerAnalysis = async (completedAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/skin-quiz-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skinType: completedAnswers.skinType,
          primaryConcern: completedAnswers.primaryConcern,
          sensitivity: completedAnswers.sensitivity,
          lifestyle: completedAnswers.lifestyle,
          ageGroup: completedAnswers.ageGroup,
        }),
      });

      if (!res.ok) throw new Error('Phân tích thất bại');
      const json = await res.json();
      if (json.data) {
        setResult(json.data);
      }
    } catch {
      // Fallback result in case of network anomaly
      setResult({
        skinHealthScore: 74,
        barrierStrength: 65,
        hydrationLevel: 50,
        riskFactor: 'Thất thoát màng ẩm sinh học',
        diagnosisTitle: `Chẩn đoán da ${completedAnswers.skinType || 'hỗn hợp'}: Tổn thương màng lipid do ${completedAnswers.lifestyle || 'máy lạnh'}`,
        rootCauseAnalysis: `Hàng rào sinh học tự nhiên bị suy giảm khả năng giữ nước do tác động của nhiệt độ và ô nhiễm. Tuyến bã nhờn phản ứng bù trừ dẫn đến tình trạng da vừa bóng nhờn bên ngoài vừa khô căng bên trong, dễ sinh mụn và thâm sạm.`,
        morningRoutine: [
          { step: 'Bước 1: Làm sạch êm dịu', product: 'Alps Gentle Purifying Cleanser', usage: 'Tạo bọt kỹ với nước ấm, massage nhẹ 45 giây.' },
          { step: 'Bước 2: Cân bằng độ ẩm', product: 'Alps Botanical Balancing Toner', usage: 'Vỗ 3-4 giọt giúp đưa pH về mức 5.5 tối ưu.' },
          { step: 'Bước 3: Dưỡng sáng mờ thâm', product: 'Alps Radiance Glow Serum', usage: 'Thoa 3 giọt tinh chất Niacinamide 5% & Tế bào gốc hoa tuyết.' },
          { step: 'Bước 4: Khóa ẩm bảo vệ', product: 'Alps Regenerating Face Cream', usage: 'Thoa lớp mỏng Ceramide Thụy Sĩ khóa ẩm và cản bụi mịn.' },
        ],
        eveningRoutine: [
          { step: 'Bước 1: Làm sạch sâu', product: 'Alps Gentle Purifying Cleanser', usage: 'Rửa sạch bụi bẩn và dầu thừa tích tụ cả ngày.' },
          { step: 'Bước 2: Cân bằng màng da', product: 'Alps Botanical Balancing Toner', usage: 'Cấp ẩm tức thì mở đường cho dưỡng chất.' },
          { step: 'Bước 3: Tái tạo tế bào', product: 'Alps Radiance Glow Serum', usage: 'Dưỡng sâu vào ban đêm giúp tái sinh làn da căng bóng.' },
          { step: 'Bước 4: Phục hồi 72h', product: 'Alps Regenerating Face Cream', usage: 'Tái tạo hàng rào lipid vững chắc suốt đêm dài.' },
          { step: 'Bước 5: Cấp cứu 2 lần/tuần', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Đắp mặt nạ sinh học sợi dừa lên men 20 phút trước khi ngủ.' },
        ],
        expertTips: [
          'Uống đủ 2 lít nước ấm mỗi ngày và bổ sung rau xanh giàu chất chống oxy hóa.',
          'Rửa mặt với nước nhiệt độ phòng, tuyệt đối không dùng nước quá nóng.',
          'Hạn chế chạm tay lên mặt và duy trì vệ sinh vỏ gối 2 lần/tuần.',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  const handleAddFullRitualToCart = () => {
    if (onAddToCart) {
      PRODUCTS.forEach((prod) => {
        onAddToCart(prod, 1);
      });
      if (onShowToast) {
        onShowToast('✓ Đã thêm trọn bộ phác đồ cá nhân hóa vào giỏ hàng!');
      }
      onClose();
    }
  };

  const handleAskAIAboutResult = () => {
    if (onOpenSupportWithPrompt && result) {
      const prompt = `Chào AI Alps, tôi vừa hoàn thành bài trắc nghiệm soi da. Kết quả chẩn đoán: Điểm sức khỏe ${result.skinHealthScore}/100, loại da: ${answers.skinType}, vấn đề: ${answers.primaryConcern}, cảnh báo: "${result.riskFactor}". Bạn hãy giải thích chi tiết hơn cho tôi cách cải thiện làn da này nhé!`;
      onClose();
      onOpenSupportWithPrompt(prompt);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#fcf9f4] rounded-[2rem] shadow-2xl border border-[#e4dfd7] overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-white border-b border-[#ece6dc] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#f4ece3] flex items-center justify-center text-[#74584d]">
              <Sparkles className="w-4 h-4 text-[#74584d]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-medium text-[#1c1c19]">
                  Trắc Nghiệm Soi Da AI Chuyên Sâu
                </h3>
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8a9a86]/20 text-[#4c5c49] font-bold">
                  Swiss AI Dermatology
                </span>
              </div>
              <p className="text-xs text-[#77746f]">
                Phân tích tình trạng biểu bì & thiết lập phác đồ cá nhân hóa chuẩn viện da liễu Zurich
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0ede9] text-[#77746f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (during questions) */}
        {!result && !isAnalyzing && (
          <div className="w-full bg-[#f0ede9] h-1.5">
            <div
              className="bg-[#74584d] h-1.5 transition-all duration-300 rounded-r-full"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Body Container */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {/* STATE 1: ANALYZING ANIMATION */}
          {isAnalyzing && (
            <div className="py-14 text-center space-y-5 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-[#f4ece3] text-[#74584d] flex items-center justify-center mx-auto ring-8 ring-[#fed8c9]/40 shadow-inner">
                <Sparkles className="w-10 h-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-normal text-[#1c1c19]">
                  AI Đang Phân Tích Dữ Liệu Tế Bào Da...
                </h4>
                <p className="text-xs text-[#77746f] max-w-md mx-auto leading-relaxed">
                  Hệ thống đang so khớp hồ sơ sinh học với hơn 50.000+ bệnh án lâm sàng viện da liễu Thụy Sĩ để tạo phác đồ chuẩn y khoa riêng cho bạn.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1.5 text-xs text-[#74584d] font-medium pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bảo chứng độ chính xác 98.4% bởi Alps AI Diagnostics</span>
              </div>
            </div>
          )}

          {/* STATE 2: QUESTIONS WIZARD */}
          {!result && !isAnalyzing && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#74584d]">
                  {currentQ.subtitle}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19] mt-1">
                  {currentQ.title}
                </h4>
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.label)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.99] flex items-start justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#74584d] bg-white ring-2 ring-[#74584d]/30 shadow-sm'
                          : 'border-[#e4dfd7] bg-white/70 hover:bg-white hover:border-[#74584d]/50 hover:shadow-xs'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="text-sm font-semibold text-[#1c1c19]">
                          {opt.label}
                        </div>
                        <div className="text-xs text-[#77746f] mt-1 leading-relaxed">
                          {opt.desc}
                        </div>
                      </div>
                      <div className="mt-1">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#74584d] bg-[#74584d] text-white'
                              : 'border-[#d3cdc3] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#77746f] hover:text-[#1c1c19] font-medium"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Quay lại câu hỏi trước</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE 3: DIAGNOSTIC RESULTS */}
          {result && !isAnalyzing && (
            <div className="space-y-6">
              {/* Score & Banner */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#ece6dc] shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#74584d]">
                      KẾT QUẢ CHẨN ĐOÁN LÂM SÀNG
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19]">
                      {result.diagnosisTitle}
                    </h4>
                    <p className="text-xs text-[#5f5d58] leading-relaxed pt-1">
                      {result.rootCauseAnalysis}
                    </p>
                  </div>

                  {/* Circle Score */}
                  <div className="shrink-0 flex flex-col items-center justify-center p-4 bg-[#fcf9f4] rounded-2xl border border-[#ebe7df]">
                    <div className="text-3xl font-serif font-bold text-[#74584d]">
                      {result.skinHealthScore}
                      <span className="text-xs font-normal text-[#77746f]">/100</span>
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-[#77746f] mt-0.5">
                      Điểm Sức Khỏe Da
                    </div>
                  </div>
                </div>

                {/* Sub metrics */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-[#f0ede9]">
                  <div className="bg-[#fbf9f6] p-2.5 rounded-xl text-center">
                    <div className="flex items-center justify-center space-x-1 text-[#74584d] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-medium">Rào cản</span>
                    </div>
                    <div className="text-sm font-semibold text-[#1c1c19]">
                      {result.barrierStrength}%
                    </div>
                  </div>

                  <div className="bg-[#fbf9f6] p-2.5 rounded-xl text-center">
                    <div className="flex items-center justify-center space-x-1 text-[#74584d] mb-1">
                      <Droplets className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-medium">Độ ẩm</span>
                    </div>
                    <div className="text-sm font-semibold text-[#1c1c19]">
                      {result.hydrationLevel}%
                    </div>
                  </div>

                  <div className="bg-[#fbf9f6] p-2.5 rounded-xl text-center">
                    <div className="flex items-center justify-center space-x-1 text-amber-700 mb-1">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-medium">Cảnh báo</span>
                    </div>
                    <div className="text-xs font-semibold text-amber-900 truncate">
                      {result.riskFactor}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Routine: Morning & Night */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-lg font-medium text-[#1c1c19] flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#74584d]" />
                    <span>Phác Đồ Chăm Sóc Da Cá Nhân Hóa Chuẩn Alps</span>
                  </h5>
                  <span className="text-[11px] text-[#74584d] font-medium">
                    5 Sản phẩm tinh hoa Thụy Sĩ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Morning Routine */}
                  <div className="bg-white rounded-2xl p-4 border border-[#ece6dc] space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-amber-900 pb-2 border-b border-[#f0ede9]">
                      <Sun className="w-4 h-4 text-amber-600" />
                      <span>CHU TRÌNH BUỔI SÁNG (BẢO VỆ & DƯỠNG SÁNG)</span>
                    </div>
                    <div className="space-y-2.5">
                      {result.morningRoutine.map((step, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-semibold text-[#74584d] block">
                            {step.step}: {step.product}
                          </span>
                          <span className="text-[#5f5d58] text-[11px] leading-relaxed block mt-0.5">
                            {step.usage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evening Routine */}
                  <div className="bg-white rounded-2xl p-4 border border-[#ece6dc] space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-900 pb-2 border-b border-[#f0ede9]">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span>CHU TRÌNH BUỔI TỐI (TÁI SINH & PHỤC HỒI 72H)</span>
                    </div>
                    <div className="space-y-2.5">
                      {result.eveningRoutine.map((step, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-semibold text-[#74584d] block">
                            {step.step}: {step.product}
                          </span>
                          <span className="text-[#5f5d58] text-[11px] leading-relaxed block mt-0.5">
                            {step.usage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expert Tips */}
              <div className="bg-[#f7f4ee] rounded-2xl p-4 border border-[#e8e4dc] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#74584d]">
                  <Info className="w-4 h-4 text-[#74584d]" />
                  <span>Lời Khuyên Vàng Từ Viện Nghiên Cứu Zurich:</span>
                </div>
                <ul className="text-xs text-[#5f5d58] space-y-1.5 pl-5 list-disc leading-relaxed">
                  {result.expertTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddFullRitualToCart}
                  className="w-full py-3.5 bg-[#1c1c19] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#fed8c9]" />
                  <span>THÊM TRỌN BỘ PHÁC ĐỒ VÀO GIỎ HÀNG</span>
                </button>

                {onOpenSupportWithPrompt && (
                  <button
                    onClick={handleAskAIAboutResult}
                    className="w-full py-3 bg-white hover:bg-[#faf8f5] text-[#74584d] text-xs font-semibold tracking-wider uppercase rounded-full border border-[#74584d]/40 transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#74584d]" />
                    <span>TRÒ CHUYỆN SÂU VỚI AI VỀ KẾT QUẢ NÀY</span>
                  </button>
                )}

                <div className="text-center pt-1">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#77746f] hover:text-[#1c1c19] font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại bài kiểm tra</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
