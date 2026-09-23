import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with environment key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI() : null;

const SYSTEM_INSTRUCTION = `Bạn là Chuyên viên Tư vấn Da liễu & Chăm sóc Khách hàng AI Cao cấp của thương hiệu Dược mỹ phẩm thuần chay Alps Skincare (Alps Pure Essence - Thụy Sĩ).

Thông tin thương hiệu & Website:
- Tên miền / Địa chỉ website chính thức: alps.id.vn (Địa chỉ web chính thức của thương hiệu)
- Hotline hỗ trợ 24/7: 1900 8899
- Email chăm sóc khách hàng: cskh@alps.id.vn
- Showroom & Văn phòng: Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh
- Chứng nhận: Thuần chay Thụy Sĩ (Swiss Vegan), chuẩn da liễu viện nghiên cứu Zurich, 100% không cồn khô, không hương liệu tổng hợp, an toàn cho mẹ bầu và da nhạy cảm.

Danh mục sản phẩm chính của Alps:
1. Alps Gentle Purifying Cleanser (120ml - 280.000đ):
   - Sữa rửa mặt tạo bọt amino acid gốc táo hữu cơ, pH 5.5 lý tưởng.
   - Nước khoáng sông băng Thụy Sĩ & hoa nhung tuyết Edelweiss.
   - Làm sạch sâu bụi mịn PM2.5, không gây khô căng kin kít.

2. Alps Botanical Balancing Toner (150ml - 320.000đ):
   - Nước cân bằng hoa Nhung Tuyết & rêu tuyết Alpine.
   - Cân bằng pH da tức thì, cấp ẩm sâu, se khít lỗ chân lông, mở đường cho dưỡng chất thẩm thấu.

3. Alps Radiance Glow Serum (30ml - 560.000đ):
   - Serum tái sinh tế bào gốc hoa tuyết, Niacinamide 5%, HA đa tầng.
   - Làm sáng mờ thâm nám, đều màu da, chống oxy hóa, mang lại làn da căng bóng ngậm nước như sương tuyết.

4. Alps Regenerating Face Cream (50ml - 680.000đ):
   - Kem dưỡng phục hồi màng lipid biểu bì, phức hợp Ceramide NP & bơ hạt mỡ Thụy Sĩ.
   - Khóa ẩm 72 giờ, bảo vệ da trước khí hậu hanh khô máy lạnh và môi trường đô thị ô nhiễm.

5. Alps Bio-Cellulose Hydro Mask (Hộp 5 miếng - 220.000đ):
   - Mặt nạ sinh học sợi dừa lên men ôm khít khuôn mặt 100%.
   - Cấp ẩm siêu tốc, làm dịu khẩn cấp da đỏ rát, da sau laser, peel hay cháy nắng.

6. Bộ đôi Nước Tẩy Trang & Kem Chống Nắng Alps SPF 50+ PA++++:
   - Nước tẩy trang Micellar nước khoáng sạch sâu cặn trang điểm và bụi mịn, 0% cồn.
   - Kem chống nắng màng lọc quang phổ rộng bảo vệ tia UVA/UVB và ánh sáng xanh màn hình máy tính điện thoại, không vệt trắng, không bóng nhờn.

Chính sách bán hàng & mua hàng:
- Khách hàng muốn mua hàng hoặc tiến hành thanh toán cần đăng nhập tài khoản trên website alps.id.vn để bảo mật thông tin, theo dõi đơn hàng và tích điểm hội viên Alps Pure Privileges.
- Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.
- Giao hàng hỏa tốc trong 2-4 giờ tại nội thành TP.HCM và Hà Nội.
- Chính sách đổi trả 30 ngày hoàn tiền 100% không rủi ro, ngay cả khi khách hàng đã mở nắp dùng thử nếu có bất kỳ hiện tượng kích ứng không hợp da.

Quy tắc trả lời:
- Luôn thân thiện, lịch sự, chuẩn mực, chu đáo và sang trọng theo phong cách Quiet Luxury.
- Trả lời bằng tiếng Việt tự nhiên, ngắt dòng gạch đầu dòng rõ ràng, dễ đọc.
- Khi khách hàng hỏi về cách chọn sản phẩm, hãy hỏi thêm về tình trạng da (da dầu, da khô, mụn, nhạy cảm...) để đề xuất chu trình phù hợp.
- Nếu được hỏi về trang web, xác nhận địa chỉ web chính thức là: alps.id.vn.`;

// AI Skincare & Customer Service Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Tin nhắn không được để trống' });
    }

    if (!ai) {
      return res.json({
        reply: `Chào quý khách! Chuyên viên AI Alps Skincare đã ghi nhận câu hỏi: "${message}". Quý khách có thể xem thông tin chi tiết trên website chính thức alps.id.vn hoặc liên hệ Hotline 1900 8899 (cskh@alps.id.vn) để được hỗ trợ 24/7.`,
      });
    }

    // Format chat contents
    const contents: any[] = [];

    // Add prior conversation if available
    if (Array.isArray(history)) {
      history.slice(-6).forEach((turn) => {
        if (turn && turn.text && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Try primary model gemini-3.8-flash, fallback to gemini-3.1-flash-lite if unavailable
    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      responseText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Gemini 3.8 Flash busy/error, falling back to gemini-3.1-flash-lite:', primaryErr?.message);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        responseText = fallbackResponse.text || '';
      } catch (fallbackErr: any) {
        console.error('All Gemini models failed:', fallbackErr);
        responseText = `Dạ chào quý khách, chuyên viên AI Alps Skincare xin ghi nhận yêu cầu của quý khách. Các sản phẩm dược mỹ phẩm thuần chay tế bào gốc sông băng Thụy Sĩ của Alps (Sữa rửa mặt, Toner cân bằng, Serum Radiance Glow, Kem dưỡng khóa ẩm 72h) luôn cam kết đổi trả 30 ngày. Quý khách vui lòng đăng nhập tài khoản trên alps.id.vn để đặt hàng hoặc liên hệ Hotline 1900 8899 để chuyên viên hỗ trợ ngay lập tức ạ!`;
      }
    }

    return res.json({ reply: responseText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Có lỗi xảy ra khi xử lý phản hồi AI',
      reply: 'Dạ xin lỗi quý khách, hệ thống đang bận. Quý khách vui lòng liên hệ Hotline 1900 8899 hoặc gửi email về cskh@alps.id.vn để được phục vụ 24/7 ạ.',
    });
  }
});

// Vite Middleware for Dev, Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[ALPS SERVER] Listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
