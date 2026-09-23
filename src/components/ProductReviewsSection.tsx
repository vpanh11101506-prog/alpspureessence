import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  User,
} from 'lucide-react';
import { Product, ProductReview, UserProfile } from '../types';
import { INITIAL_REVIEWS } from '../data/initialReviews';

interface ProductReviewsSectionProps {
  product: Product;
  user: UserProfile | null;
  onShowToast?: (msg: string) => void;
}

const SKIN_TYPES = [
  'Da nhạy cảm, dễ kích ứng',
  'Da hỗn hợp thiên dầu',
  'Da khô thiếu nước',
  'Da dầu mụn',
  'Da lão hóa, nếp nhăn',
  'Da thường',
];

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  user,
  onShowToast,
}) => {
  // All reviews state combining initial reviews + local custom reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('alps_product_reviews');
      if (saved) {
        const parsed: ProductReview[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_REVIEWS;
  });

  // Helpful clicks state
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('alps_liked_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Filter state
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');

  // Review Form toggle & fields
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorNameInput, setAuthorNameInput] = useState(user?.name || '');
  const [skinTypeInput, setSkinTypeInput] = useState(SKIN_TYPES[0]);
  const [titleInput, setTitleInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Sync author name if user logs in
  useEffect(() => {
    if (user?.name && !authorNameInput) {
      setAuthorNameInput(user.name);
    }
  }, [user]);

  // Persist reviews
  const saveReviews = (newReviews: ProductReview[]) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('alps_product_reviews', JSON.stringify(newReviews));
    } catch {}
  };

  // Persist helpful likes
  const handleToggleHelpful = (reviewId: string) => {
    const isCurrentlyLiked = !!likedReviews[reviewId];
    const newLiked = { ...likedReviews, [reviewId]: !isCurrentlyLiked };
    setLikedReviews(newLiked);
    try {
      localStorage.setItem('alps_liked_reviews', JSON.stringify(newLiked));
    } catch {}

    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        return {
          ...r,
          helpfulCount: isCurrentlyLiked ? Math.max(0, r.helpfulCount - 1) : r.helpfulCount + 1,
        };
      }
      return r;
    });
    saveReviews(updated);
  };

  // Submit Review Handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const name = authorNameInput.trim();
    const comment = commentInput.trim();

    if (!name) {
      setFormError('Vui lòng nhập tên của bạn để hiển thị đánh giá.');
      return;
    }
    if (!comment || comment.length < 10) {
      setFormError('Nhận xét của bạn cần ít nhất 10 ký tự để chia sẻ trải nghiệm hữu ích.');
      return;
    }

    const newReview: ProductReview = {
      id: `rev-custom-${Date.now()}`,
      productId: product.id,
      authorName: name,
      rating: ratingInput,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      isVerifiedBuyer: true,
      skinType: skinTypeInput,
      title: titleInput.trim() || undefined,
      comment: comment,
      helpfulCount: 0,
      responseFromBrand:
        ratingInput >= 4
          ? `Alps chân thành cảm ơn quý khách ${name} đã tin tưởng và đồng hành cùng dược mỹ phẩm tế bào gốc Thụy Sĩ!`
          : `Alps rất trân trọng đóng góp của quý khách ${name} và sẽ liên hệ hỗ trợ thêm qua chuyên viên CSKH ạ!`,
    };

    saveReviews([newReview, ...reviews]);
    setTitleInput('');
    setCommentInput('');
    setIsFormOpen(false);

    if (onShowToast) {
      onShowToast('Cảm ơn bạn! Đánh giá sản phẩm đã được đăng tải thành công.');
    }
  };

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Statistics calculation
  const totalCount = productReviews.length;
  const averageRating =
    totalCount > 0
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
      : product.rating.toFixed(1);

  // Star breakdown counts
  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });

  // Filtered reviews to display
  const displayedReviews =
    selectedRatingFilter === 'all'
      ? productReviews
      : productReviews.filter((r) => r.rating === selectedRatingFilter);

  const ratingDescriptions: Record<number, string> = {
    1: '1 sao: Rất thất vọng',
    2: '2 sao: Chưa hài lòng',
    3: '3 sao: Bình thường',
    4: '4 sao: Hài lòng & Tốt',
    5: '5 sao: Tuyệt vời, rất khuyên dùng!',
  };

  return (
    <div className="space-y-6 pt-1">
      {/* 1. RATING SUMMARY OVERVIEW BOX */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-[#202022]/8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Average Rating Score */}
          <div className="md:col-span-4 text-center md:text-left md:border-r md:border-[#202022]/8 md:pr-6">
            <div className="text-[11px] uppercase tracking-wider text-[#74584d] font-semibold">
              ĐÁNH GIÁ CHUNG
            </div>
            <div className="flex items-baseline justify-center md:justify-start space-x-2 mt-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1c19]">
                {averageRating}
              </span>
              <span className="text-[#77767b] text-base font-light">/ 5.0</span>
            </div>

            {/* Stars row */}
            <div className="flex items-center justify-center md:justify-start space-x-1 mt-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(Number(averageRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-[#e5e2dd]'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs text-[#77767b] mt-2">
              Dựa trên <strong>{totalCount}</strong> lượt đánh giá thực tế
            </div>

            <div className="mt-3 flex items-center justify-center md:justify-start space-x-1 text-[11px] text-[#8a9a86] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Khách hàng đã mua hàng chính hãng</span>
            </div>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="md:col-span-5 space-y-1.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars] || 0;
              const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
              const isSelected = selectedRatingFilter === stars;

              return (
                <button
                  key={stars}
                  type="button"
                  onClick={() =>
                    setSelectedRatingFilter(selectedRatingFilter === stars ? 'all' : stars)
                  }
                  className={`w-full flex items-center space-x-2 text-xs py-0.5 px-1.5 rounded-lg transition-colors group ${
                    isSelected ? 'bg-[#fed8c9]/25 font-bold text-[#74584d]' : 'hover:bg-[#f6f3ee]'
                  }`}
                >
                  <div className="flex items-center space-x-1 w-12 shrink-0">
                    <span className="font-medium text-[#1c1c19] group-hover:text-[#74584d]">
                      {stars}
                    </span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>

                  <div className="flex-grow h-2 bg-[#f0ede9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="text-[11px] text-[#77767b] w-9 text-right shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Call-to-action button to write review */}
          <div className="md:col-span-3 text-center md:text-right flex flex-col justify-center items-center md:items-end">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider bg-[#1c1c19] hover:bg-black text-white transition-all shadow-sm active:scale-98 flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>{isFormOpen ? 'ĐÓNG KHUNG ĐÁNH GIÁ' : 'VIẾT ĐÁNH GIÁ'}</span>
              {isFormOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="text-[10px] text-[#77767b] mt-1.5">
              Nhận ngay 20 điểm Alps Pure Privileges
            </span>
          </div>
        </div>
      </div>

      {/* 2. EXPANDABLE REVIEW SUBMISSION FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmitReview}
          className="p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#74584d]/30 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#202022]/8">
            <h3 className="font-serif text-base font-semibold text-[#1c1c19] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#74584d]" />
              <span>Gửi đánh giá cho {product.name}</span>
            </h3>
            <span className="text-xs text-[#77767b]">Trải nghiệm thực tế</span>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-xs">
              {formError}
            </div>
          )}

          {/* Interactive Star Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#74584d] mb-1.5">
              1. Bạn đánh giá sản phẩm này mấy sao? *
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-[#fcf9f4] p-2 rounded-2xl border border-[#ebe8e3]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRatingInput(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    title={`${star} sao`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating || ratingInput)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#d6d4cf]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-medium text-[#1c1c19] ml-2">
                {ratingDescriptions[hoverRating || ratingInput]}
              </span>
            </div>
          </div>

          {/* Name & Skin Type row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#74584d] mb-1">
                2. Tên hiển thị người đánh giá *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                  placeholder="Ví dụ: Hoàng Mai, Minh Anh..."
                  className="w-full text-xs p-3 pl-9 rounded-xl border border-[#202022]/15 bg-[#fdfcf9] focus:outline-none focus:border-[#74584d]"
                />
                <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#74584d] mb-1">
                3. Tình trạng / Loại da của bạn
              </label>
              <select
                value={skinTypeInput}
                onChange={(e) => setSkinTypeInput(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#202022]/15 bg-[#fdfcf9] focus:outline-none focus:border-[#74584d]"
              >
                {SKIN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#74584d] mb-1">
              4. Tiêu đề nhận xét ngắn gọn (Tùy chọn)
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Ví dụ: Cấp ẩm cực tốt, bọt mịn không gây khô da..."
              className="w-full text-xs p-3 rounded-xl border border-[#202022]/15 bg-[#fdfcf9] focus:outline-none focus:border-[#74584d]"
            />
          </div>

          {/* Detailed comment */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#74584d] mb-1">
              5. Nội dung nhận xét chi tiết *
            </label>
            <textarea
              required
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Hãy chia sẻ cảm nhận thực tế của bạn về chất kem, khả năng thẩm thấu, mùi hương và hiệu quả sau thời gian sử dụng..."
              className="w-full text-xs p-3 rounded-xl border border-[#202022]/15 bg-[#fdfcf9] focus:outline-none focus:border-[#74584d] leading-relaxed resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2.5 rounded-full text-xs font-medium text-[#77767b] hover:text-[#1c1c19] hover:bg-[#f6f3ee] transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider bg-[#74584d] hover:bg-[#5b4339] text-white transition-all shadow-xs flex items-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>GỬI ĐÁNH GIÁ CỦA BẠN</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. FILTER TABS ROW */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedRatingFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedRatingFilter === 'all'
                ? 'bg-[#1c1c19] text-white shadow-xs'
                : 'bg-white hover:bg-[#f6f3ee] text-[#46464a] border border-[#202022]/10'
            }`}
          >
            Tất cả ({totalCount})
          </button>

          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedRatingFilter(star)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
                selectedRatingFilter === star
                  ? 'bg-[#1c1c19] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f6f3ee] text-[#46464a] border border-[#202022]/10'
              }`}
            >
              <span>{star}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>({starCounts[star] || 0})</span>
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#77767b]">
          Hiển thị <strong>{displayedReviews.length}</strong> nhận xét
        </span>
      </div>

      {/* 4. REVIEWS LIST */}
      <div className="space-y-3.5">
        {displayedReviews.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl text-center border border-[#202022]/6 space-y-2">
            <MessageSquare className="w-8 h-8 text-[#77767b] mx-auto opacity-50" />
            <p className="text-xs text-[#77767b]">
              Chưa có đánh giá nào cho mức lọc {selectedRatingFilter} sao này.
            </p>
            <button
              type="button"
              onClick={() => setSelectedRatingFilter('all')}
              className="text-xs text-[#74584d] font-semibold underline"
            >
              Xem tất cả đánh giá
            </button>
          </div>
        ) : (
          displayedReviews.map((review) => {
            const isLiked = !!likedReviews[review.id];
            const initials =
              review.authorName
                .trim()
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(-2)
                .toUpperCase() || 'KH';

            return (
              <div
                key={review.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#202022]/6 shadow-2xs space-y-3 transition-shadow hover:shadow-xs"
              >
                {/* Header: Author, Rating, Date */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Avatar Initials */}
                    <div className="w-9 h-9 rounded-full bg-[#f0ede9] text-[#74584d] flex items-center justify-center font-serif font-bold text-xs shrink-0 border border-[#202022]/5">
                      {initials}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-[#1c1c19]">
                          {review.authorName}
                        </span>
                        {review.isVerifiedBuyer && (
                          <span className="inline-flex items-center space-x-1 text-[10px] text-[#8a9a86] bg-[#8a9a86]/10 px-2 py-0.5 rounded-full font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Đã mua chính hãng</span>
                          </span>
                        )}
                      </div>

                      {/* Stars & Skin type badge */}
                      <div className="flex items-center space-x-2 mt-1 flex-wrap gap-y-1">
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-[#e5e2dd]'
                              }`}
                            />
                          ))}
                        </div>

                        {review.skinType && (
                          <span className="text-[10.5px] text-[#77767b] bg-[#fcf9f4] px-2 py-0.5 rounded-md border border-[#202022]/5">
                            {review.skinType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#77767b] font-light shrink-0">
                    {review.date}
                  </span>
                </div>

                {/* Title & Comment text */}
                <div className="space-y-1 pl-12">
                  {review.title && (
                    <h4 className="font-semibold text-xs text-[#1c1c19]">
                      {review.title}
                    </h4>
                  )}
                  <p className="text-xs sm:text-[13px] text-[#46464a] leading-relaxed font-light">
                    {review.comment}
                  </p>
                </div>

                {/* Brand Reply Box */}
                {review.responseFromBrand && (
                  <div className="ml-12 p-3 bg-[#fcf9f4] rounded-xl border border-[#fed8c9]/40 text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Phản hồi từ Dược sĩ Alps Zurich:</span>
                    </div>
                    <p className="text-[11.5px] text-[#46464a] leading-relaxed italic">
                      {review.responseFromBrand}
                    </p>
                  </div>
                )}

                {/* Helpful footer */}
                <div className="pt-2 pl-12 flex items-center justify-between border-t border-[#202022]/5 text-xs">
                  <span className="text-[11px] text-[#77767b]">
                    Đánh giá này có hữu ích với bạn?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(review.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isLiked
                        ? 'bg-[#74584d] text-white shadow-xs'
                        : 'bg-[#f6f3ee] text-[#77767b] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>Hữu ích ({review.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
