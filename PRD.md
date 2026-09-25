# PRD — Nền Tảng Luyện Thi Tiếng Anh Trực Tuyến & Chấm Điểm AI (English Prep & AI Assessment Platform)

**Tài liệu:** Project Requirements Document (PRD)  
**Phiên bản:** 2.0 (Official Baseline)  
**Tác giả:** Project Manager & Business Analyst (PM & BA)  
**Trạng thái:** Approved  
**Ngày phê duyệt:** 24/09/2026  
**Quy trình triển khai:** Planning → Design (Google Stitch) → Code (Convert Stitch HTML/CSS sang React Components)

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

### 1.1 Mục Tiêu Sản Phẩm (Product Objectives)
Xây dựng một nền tảng Web Application edtech toàn diện (tham khảo mô hình chuyên nghiệp của STUDY4), phục vụ việc luyện thi chứng chỉ tiếng Anh (trọng tâm ban đầu: **IELTS** và **TOEIC**, hỗ trợ mở rộng **Khác/Tuỳ chỉnh** và **HSK**):
1. **Dành cho Học sinh (Student):**
   - Làm đề thi thử mô phỏng 100% môi trường thi thật (Listening, Reading, Writing, Speaking).
   - Tự luyện từng kỹ năng chuyên sâu: Luyện nghe chép chính tả (Dictation) giải thích lỗi tức thì; Luyện phát âm (Pronunciation) chi tiết đến từng từ/âm vị chuẩn giọng Anh-Mỹ (en-US).
   - Nhận phản hồi AI tham khảo ngay lập tức cho bài viết (Writing) và bài nói (Speaking).
   - Theo dõi tiến trình, thống kê điểm mạnh/yếu theo từng dạng câu hỏi.
2. **Dành cho Giáo viên & Admin (Teacher / Admin):**
   - Số hoá ngân hàng đề thi linh hoạt theo từng kiểu đề thi (IELTS, TOEIC, Khác).
   - Tổ chức và quản lý học sinh theo Lớp (Class) và Khoá học (Course) khép kín (bảo mật dữ liệu riêng biệt giữa các giáo viên).
   - Chấm bài Writing & Speaking theo bộ tiêu chí (Rubric) chính thức với sự trợ lý của AI (AI nháp điểm và chỉ lỗi, giáo viên kiểm duyệt và quyết định điểm chính thức).
   - Kiểm soát quyền xem đáp án linh hoạt (Ẩn mặc định, hiện ngay hoặc hẹn giờ).

### 1.2 Phạm Vi Sản Phẩm (Scope of Work)

#### Trong phạm vi (In-Scope - MVP & Phase 1):
- **Xác thực & Phân quyền:** 2 vai trò chính thức (Học sinh, Giáo viên/Admin) cùng cờ phân cấp `Admin chính (Owner)`.
- **Hệ thống Quản lý Đề & Kiểu Đề (Exam Types):**
  - Mẫu cấu trúc chuẩn cho IELTS (4 kỹ năng), TOEIC (Listening & Reading), Khác (Tuỳ chỉnh hoàn toàn công thức, rubric và dạng câu hỏi).
  - Trình biên soạn đề theo cấu trúc 4 tầng: Đề thi (Test) → Phần thi (Section) → Nhóm câu hỏi (Question Group) → Câu hỏi đơn lẻ (Question).
  - Hỗ trợ đầy đủ 7 dạng câu hỏi: Multiple Choice (1 đáp án), Multiple Choice (nhiều đáp án), Fill in the Blank, Matching, True/False/Not Given, Writing, Speaking.
- **Phòng Thi Trực Tuyến (Online Exam Room):**
  - Đồng hồ đếm ngược đồng bộ Server-side, cơ chế auto-save chống mất dữ liệu khi rớt mạng/reload.
  - Quản lý số lần làm bài (Attempt limit), tính lượt ngay khi bắt đầu làm; cơ chế giáo viên cấp thêm lượt khi gặp sự cố.
  - Quản lý chế độ xem đáp án: Mặc định **Ẩn** (chế độ ẩn giữ đúng/sai `keep_correctness`), hỗ trợ Hẹn giờ mở hoặc Mở thủ công.
- **Module Chấm Điểm & Tương Tác AI (AI Modules):**
  - **Luyện phát âm AI (Pronunciation Lab):** Đánh giá cấp độ âm vị (phoneme), từ, độ trôi chảy (fluency), độ đầy đủ (completeness) theo chuẩn Anh-Mỹ (en-US).
  - **Luyện nghe chép (Dictation Lab):** So khớp diff từ vựng tức thì + LLM giải thích lỗi đồng âm, ngữ pháp bằng tiếng Việt.
  - **Chấm Writing:** Chấm theo Rubric (4 tiêu chí IELTS / tuỳ biến); học sinh tự xin AI chấm tham khảo (mặc định bật, tối đa 2 lần/bài); giáo viên dùng AI nháp để chấm chính thức.
  - **Thi thử Speaking (3 Parts):** Giám khảo ảo điều phối Part 1, Part 2 (1 phút chuẩn bị + cue card), Part 3; thu âm từng câu, AI chấm theo Rubric 4 tiêu chí; giáo viên nghe lại và xác nhận điểm.
- **Quản lý Lớp & Khoá học:** Mã mời (Join code), link mời, phân quyền dữ liệu lớp học nghiêm ngặt.
- **Quản lý Bản ghi âm & Quyền riêng tư:** Lưu trữ trên S3/Cloud Storage, cơ chế tự động xoá sau 30 ngày.

#### Ngoài phạm vi (Out-of-Scope - Phase 2 & Giai đoạn sau):
- Cổng thanh toán trực tuyến tự động (VNPay/Momo/Stripe).
- Quản lý gói học thương mại chi tiết theo từng người dùng (Giai đoạn sau: gán gói theo lớp).
- Khoá học video streaming / LMS video player.
- Diễn đàn cộng đồng & mạng xã hội học tập.
- Giám khảo AI đàm thoại thời gian thực (Realtime streaming conversational voice bot).
- Ứng dụng di động Native iOS/Android (chỉ tập trung Web Responsive hoàn hảo).

---

## 2. VAI TRÒ NGƯỜI DÙNG & MA TRẬN PHÂN QUYỀN (RBAC)

### 2.1 Định Nghĩa Vai Trò
1. **Khách (Guest):** Người dùng vãng lai chưa đăng nhập. Xem được Landing page, thông tin công khai của các đề thi.
2. **Học sinh (Student):** Đăng ký tự do qua Email/Google. Chỉ có quyền truy cập dữ liệu cá nhân, đề công khai, và nội dung thuộc Lớp/Khoá học mình tham gia.
3. **Giáo viên (Teacher/Admin):** Tài khoản do Admin chính cấp (không mở đăng ký tự do). Có toàn quyền quản lý đề thi, bài luyện, lớp học và học sinh thuộc quyền quản lý của mình.
4. **Admin chính (System Owner):** Giáo viên có cờ `is_owner = true`. Có quyền quản trị hệ sinh thái: tạo/khoá tài khoản giáo viên, quản lý cấu hình hệ thống (hạn mức AI, thời gian xoá file ghi âm), xem báo cáo toàn hệ thống.

### 2.2 Ma Trận Quyền Chi Tiết (Permission Matrix)

| Chức Năng | Khách | Học Sinh | Giáo Viên | Admin Chính |
|---|:---:|:---:|:---:|:---:|
| Xem Landing Page, danh mục đề công khai | ✅ | ✅ | ✅ | ✅ |
| Đăng ký / Đăng nhập (Email, Google) | ✅ | ✅ | ❌ (Đăng nhập riêng) | ❌ (Đăng nhập riêng) |
| Làm bài thi thử (Full test / Từng phần) | ❌ | ✅ | ✅ (Chế độ preview) | ✅ (Chế độ preview) |
| Xem kết quả & lời giải (tuỳ cấu hình ẩn/hiện) | ❌ | ✅ (Cá nhân) | ✅ (Xem trước) | ✅ (Xem trước) |
| Tự xin AI chấm Writing/Speaking tham khảo | ❌ | ✅ (Giới hạn lượt) | ❌ | ❌ |
| Luyện nghe chép & Luyện phát âm AI | ❌ | ✅ | ✅ (Làm thử) | ✅ (Làm thử) |
| Xoá bản ghi âm của chính mình | ❌ | ✅ | ❌ | ✅ |
| Tham gia Lớp / Khoá học bằng mã mời | ❌ | ✅ | ❌ | ❌ |
| Tạo, sửa, xoá, xuất bản đề thi / bài luyện | ❌ | ❌ | ✅ | ✅ |
| Cấu hình kiểu đề, Rubric, bảng quy đổi điểm | ❌ | ❌ | ✅ | ✅ |
| Cấu hình chế độ hiển thị đáp án & số lần làm | ❌ | ❌ | ✅ | ✅ |
| Cấp thêm lượt làm bài (Grant Retake) cho học sinh | ❌ | ❌ | ✅ (Lớp của mình) | ✅ (Toàn hệ thống) |
| Chấm bài Writing & Speaking theo Rubric | ❌ | ❌ | ✅ (Lớp của mình) | ✅ (Toàn hệ thống) |
| Sử dụng AI chấm nháp cho giáo viên | ❌ | ❌ | ✅ | ✅ |
| Quản lý Lớp & Khoá học (thêm/bớt học sinh) | ❌ | ❌ | ✅ (Của mình tạo) | ✅ (Toàn hệ thống) |
| Xem kết quả, lịch sử của học sinh | ❌ | ❌ | ✅ (Lớp của mình) | ✅ (Toàn hệ thống) |
| Quản lý tài khoản giáo viên / Phân quyền Owner | ❌ | ❌ | ❌ | ✅ |
| Cấu hình tham số hệ thống (hạn mức AI, lưu trữ) | ❌ | ❌ | ❌ | ✅ |

---

## 3. YÊU CẦU CHỨC NĂNG CHI TIẾT (FUNCTIONAL REQUIREMENTS)

### 3.1 Phân Hệ Học Sinh (Student Experience)

#### HS-01: Quản lý Tài khoản & Định danh
- Đăng ký bằng Email + Mật khẩu (tối thiểu 8 ký tự, có xác thực định dạng).
- Đăng nhập qua Email/Password hoặc Google OAuth 2.0.
- Khôi phục mật khẩu qua link token gửi về email (thời hạn 15 phút).
- Quản lý Profile: Cập nhật họ tên, ảnh đại diện (avatar), mục tiêu điểm số (Target Score: IELTS band hoặc TOEIC point).

#### HS-02: Khám Phá & Tìm Kiếm Đề Thi
- Bộ lọc đa chiều:
  - Kiểu đề thi (IELTS Academic, IELTS General, TOEIC, Đề tuỳ chỉnh).
  - Kỹ năng (Full Test, Listening, Reading, Writing, Speaking).
  - Độ khó (Dễ, Trung bình, Khó) và Năm phát hành/Bộ đề (ví dụ Cam 18, Road to IELTS).
- Thẻ đề thi (Test Card) trực quan: Ảnh bìa, Tên đề, Thời gian làm bài, Số câu, Số lượt người đã làm, Trạng thái cá nhân (Chưa làm / Điểm cao nhất đạt được / Số lượt làm còn lại).

#### HS-03: Chi Tiết Đề & Lựa Chọn Chế Độ Làm Bài
- Hiển thị cấu trúc chi tiết: Danh sách phần thi (Sections), thời lượng, số câu hỏi.
- Chế độ làm bài:
  - **Full Test:** Làm toàn bộ các phần theo đúng thứ tự, tính giờ toàn bài.
  - **Practice Mode (Luyện từng phần):** Cho phép tích chọn 1 hoặc nhiều section cụ thể; tuỳ chọn bấm giờ hoặc không giới hạn thời gian.
- Kiểm tra số lượt làm bài còn lại. Nếu hết lượt, nút "Bắt đầu làm bài" bị vô hiệu hoá kèm thông báo liên hệ giáo viên.

#### HS-04: Phòng Thi Trực Tuyến (Online Exam Room)
- **Cơ chế tính giờ & Chống gian lận:**
  - Đồng hồ đếm ngược hiển thị cố định (Sticky Header).
  - Khi bắt đầu, Server ghi nhận `started_at` và tính toán `expires_at`. Hết giờ, hệ thống tự động khóa bài và kích hoạt nộp bài tự động (Force Submit).
  - Đóng trình duyệt hay reload trang không dừng đồng hồ server.
- **Cơ chế Lưu bài (Auto-save):**
  - Tự động lưu đáp án sau mỗi thao tác chọn/nhập (debounced 1000ms) lên Server.
  - Lưu trạng thái offline tại `localStorage` dự phòng khi mất kết nối mạng đột ngột.
- **Trải nghiệm làm bài (UX/UI):**
  - Layout chia 2 cột linh hoạt (Split view): Cột trái hiển thị bài đọc (Passage) hoặc Trình phát Audio; Cột phải hiển thị nhóm câu hỏi.
  - Công cụ hỗ trợ: Highlight văn bản bài đọc, ghi chú (Notes), phóng to/thu nhỏ cỡ chữ.
  - Audio Player: Thanh tiến trình, kiểm soát số lần nghe theo cấu hình đề thi.
  - Bảng điều hướng câu hỏi (Question Palette Grid): Đánh dấu câu đã làm (xanh), câu chưa làm (xám), câu gắn cờ xem lại (vàng Flagged).
  - Nộp bài: Modal cảnh báo liệt kê rõ số câu chưa điền trước khi người học bấm xác nhận nộp cuối cùng.

#### HS-05: Xem Kết Quả & Tra Cứu Lời Giải Chi Tiết
- **Màn hình tổng kết điểm:**
  - Điểm tổng số quy đổi chuẩn (IELTS Overall Band, TOEIC Total Score 10-990, hoặc Thang 10/100).
  - Phân tích chi tiết: Số câu đúng, sai, bỏ trống, thời gian hoàn thành.
  - Điểm thành phần từng kỹ năng (Listening / Reading / Writing / Speaking).
- **Quy tắc hiển thị đáp án:**
  - *Chế độ Ẩn (Mặc định `keep_correctness`):* Học sinh thấy được câu nào mình làm đúng/sai để biết kết quả, nhưng **hoàn toàn ẩn** đáp án đúng và nội dung giải thích chi tiết.
  - *Chế độ Hiện toàn bộ:* Hiển thị đáp án của học sinh, đáp án đúng chuẩn, bài đọc/audio kèm transcript và lời giải thích chi tiết của giáo viên.
  - *Chế độ Hẹn giờ:* Hiển thị đồng hồ đếm ngược đến thời điểm giáo viên mở đáp án công khai.

#### HS-06: Luyện Nghe Chép Chính Tả (Dictation Lab)
- Danh sách bài luyện nghe chia theo chủ đề và cấp độ CEFR (A2 đến C1).
- Trình phát audio đoạn ngắn (Sentence-level audio): Tua lùi 5s, lặp lại câu (Loop), chỉnh tốc độ (0.75x, 1.0x, 1.25x).
- Khung nhập văn bản nghe được kèm chức năng gợi ý phím tắt.
- **Phân tích lỗi tức thì:**
  - So khớp Diff trực quan: Màu đỏ (Từ sai), Màu vàng (Từ thiếu), Màu xám gạch ngang (Từ thừa).
  - Tuỳ chọn bỏ qua ký tự viết hoa và dấu câu.
  - Trợ lý AI (Gemini) phân tích chuyên sâu: Chỉ rõ nguyên nhân (nuốt âm cuối, nhầm từ đồng âm / homophone, sai dạng số ít/số nhiều) kèm giải thích tiếng Việt.

#### HS-07: Luyện Phát Âm Chuyên Sâu (Pronunciation Lab)
- Luyện theo 4 cấp độ: Từ đơn (Word) → Cụm từ (Phrase) → Câu (Sentence) → Đoạn văn (Paragraph).
- Audio mẫu giọng chuẩn Anh-Mỹ (en-US) kèm ký âm phiên âm quốc tế IPA.
- Thu âm trực tiếp qua Micro trình duyệt (yêu cầu cấp quyền HTTPS). Trình ghi âm có hiển thị sóng âm thanh (Audio Visualizer) và thanh âm lượng.
- **Phản hồi từ AI (Azure AI Speech Assessment):**
  - Điểm tổng quát (Overall Score 0-100), Độ chính xác (Accuracy), Độ trôi chảy (Fluency), Độ đầy đủ (Completeness).
  - Tô màu trực tiếp trên từng từ: Xanh lá (Chuẩn >80%), Vàng (Cần cải thiện 60-79%), Đỏ (Sai <60%).
  - Bấm vào từ bị lỗi để xem phân tích cấp độ âm vị (Phoneme error): Chỉ rõ âm sai, cách đặt lưỡi/môi chuẩn và audio đọc mẫu riêng cho âm đó.
- Giới hạn hạn mức gọi AI mỗi ngày (Quota counter).

#### HS-08: Thi Thử Speaking Đầy Đủ (Full Speaking Simulator)
- Mô phỏng quy trình phòng thi Speaking (chuẩn IELTS 3 Parts):
  - **Pre-check:** Kiểm tra Micro, ghi âm thử và nghe lại trước khi vào bài thi.
  - **Part 1 (Introduction & Interview):** Giám khảo ảo đọc câu hỏi qua Audio → Tự động kích hoạt bộ đếm thời gian và ghi âm câu trả lời.
  - **Part 2 (Cue Card / Long Turn):** Hiển thị đề tài và các gợi ý gợi mở → 1 phút chuẩn bị (có đồng hồ đếm ngược và khung gõ ghi chú nhanh) → 2 phút tự động thu âm bài nói.
  - **Part 3 (Two-way Discussion):** Các câu hỏi thảo luận học thuật chuyên sâu gắn liền với Part 2.
- Lưu trữ từng file âm thanh câu trả lời ngay khi nói xong để chống mất mát dữ liệu.
- Đánh giá AI tham khảo theo 4 tiêu chí: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation.

#### HS-09: Tự Xin AI Chấm Writing (AI Writing Evaluation)
- Sau khi nộp bài Writing, học sinh có nút "Nhờ AI chấm" (nếu giáo viên cho phép trong cấu hình đề thi).
- Trợ lý AI phân tích theo Rubric đề thi, trả về:
  - Điểm từng tiêu chí và điểm tổng quy đổi.
  - Đánh dấu inline trực tiếp các lỗi ngữ pháp, dùng từ, liên kết câu trên bài viết của học sinh kèm đề xuất sửa và giải thích.
  - Nhãn hiển thị bắt buộc: **"Đánh giá AI tham khảo — không phải điểm chính thức"**.
  - Nút "Báo AI chấm chưa đúng" kèm phản hồi để gửi đến giáo viên.

#### HS-10: Quản Lý Lớp & Khoá Học
- Nhập mã mời (Join Code: 6 ký tự) hoặc click link mời để tham gia lớp/khoá học.
- Xem danh sách bài tập, đề thi và bài luyện được giáo viên chỉ định trong khoá học.
- Đảm bảo tính riêng tư: Học sinh không xem được danh sách hay điểm số của các học sinh khác trong cùng lớp.

---

### 3.2 Phân Hệ Giáo Viên & Admin (Teacher & Admin Experience)

#### GV-01: Bảng Điều Khiển Tổng Quan (Teacher Dashboard)
- Số liệu thống kê trong phạm vi các Lớp/Khoá học của giáo viên: Tổng số học sinh, số lượt làm bài, điểm trung bình.
- Hàng đợi bài chờ chấm (Pending Grading Queue): Danh sách bài Writing & Speaking mới nộp cần giáo viên đánh giá.
- Biểu đồ phân bố điểm và các đề thi có lượt làm nhiều nhất.

#### GV-02: Quản Lý Đề Thi & Kiểu Đề (Test Management)
- Khởi tạo đề thi với 3 kiểu đề: **IELTS**, **TOEIC**, hoặc **Khác (Tuỳ chỉnh)**.
- Thiết lập thông tin chung: Tên đề, kỹ năng, thời lượng, độ khó, ảnh bìa.
- Cấu hình số lượt làm tối đa (Max Attempts): Nhập số cụ thể hoặc "Không giới hạn".
- Cấu hình phạm vi hiển thị (Visibility): Công khai (Public) hoặc Giới hạn trong Khoá học cụ thể (Restricted).
- Cấu hình AI: Cho phép học sinh tự nhờ AI chấm Writing/Speaking (Bật/Tắt, Mặc định: BẬT, Giới hạn 2 lần/bài).
- Cấu hình kiểm soát đáp án (Answer Visibility):
  - Chế độ: Ẩn (Mặc định), Hiện ngay sau khi nộp, Hẹn giờ mở.
  - Mức độ ẩn: Mặc định `keep_correctness` (học sinh biết câu đúng/sai, ẩn đáp án & giải thích).
- Quản lý trạng thái đề: Bản nháp (Draft) → Đã xuất bản (Published) → Ẩn (Hidden). Đề đã có học sinh làm bài không được xoá cứng mà chuyển sang trạng thái Ẩn để bảo toàn lịch sử.

#### GV-03: Trình Biên Soạn Đề Thi 4 Cấp (Test Builder UI)
- Quản lý cây phân cấp: Test → Sections → Question Groups → Questions.
- Hỗ trợ nhập liệu Rich-text cho bài đọc, tải lên file âm thanh MP3 cho phần Listening.
- Hỗ trợ công cụ Import đề thi hàng loạt từ file Excel/CSV theo template chuẩn hóa, có cơ chế validation báo lỗi từng dòng chi tiết.
- Chế độ xem trước & Làm thử đề thi (Teacher Preview Mode): Trải nghiệm giao diện giống hệt học sinh mà không ghi nhận kết quả vào thống kê.

#### GV-04: Phòng Chấm Bài Writing & Speaking Theo Rubric
- Giao diện chấm bài tập trung:
  - Cột trái: Đề bài, bài làm của học sinh (văn bản Writing hoặc Audio Player từng câu Speaking kèm transcript).
  - Cột phải: Bộ tiêu chí Rubric đánh giá chi tiết (điểm thành phần, trọng số, nhận xét từng tiêu chí, nhận xét chung).
- **Trợ lý AI hỗ trợ chấm nháp (AI Co-grader):**
  - Giáo viên click "Chấm bằng AI": AI phân tích và điền nháp điểm số cùng gợi ý sửa lỗi.
  - Nếu học sinh đã xin AI chấm tham khảo trước đó, hệ thống tái sử dụng kết quả đó làm bản nháp để tiết kiệm token và chi phí.
  - Giáo viên chỉnh sửa, ghi đè nhận xét, xoá các lỗi AI phát hiện sai.
  - Bấm "Hoàn tất chấm" (Finalize): Điểm chính thức được xác nhận, hệ thống bắn thông báo cho học sinh.

#### GV-05: Quản Lý Lớp & Khoá Học (Class & Course Management)
- Tạo và quản lý Lớp học (Class): Tên lớp, mô tả, tạo mã mời (Join code).
- Tạo Khoá học (Course): Tuyển tập các Đề thi, Bài luyện nghe, Bài luyện phát âm theo lộ trình học tập.
- Gắn Lớp vào Khoá học để cấp quyền tự động cho toàn bộ học sinh trong lớp.
- Quản lý thành viên: Thêm bằng email/Excel, xoá học sinh khỏi lớp (lịch sử làm bài của học sinh vẫn được lưu giữ độc lập).
- Cấp thêm lượt làm bài (Grant Retake): Giáo viên bấm cấp thêm lượt cho từng học sinh cụ thể khi có sự cố.

#### GV-06: Báo Cáo Thống Kê & Phân Tích Dữ Liệu
- Báo cáo theo đề thi: Điểm trung bình, phổ điểm (Score distribution), tỷ lệ trả lời đúng theo từng câu hỏi (phát hiện câu hỏi quá khó hoặc đáp án nhầm lẫn).
- Báo cáo theo học sinh: Lịch sử điểm số theo thời gian, tỷ lệ hoàn thành bài tập, các dạng câu hỏi hay mắc lỗi.
- Xuất dữ liệu báo cáo ra file Excel/CSV.

#### GV-07: Quản Trị Hệ Thống (System Admin - Chỉ Dành Cho Owner)
- Quản lý danh sách tài khoản giáo viên: Khởi tạo tài khoản giáo viên mới, khoá/mở khoá tài khoản.
- Cấu hình hạn mức AI toàn hệ thống: Hạn mức lượt gọi AI miễn phí mỗi ngày cho mỗi học sinh, ngưỡng cảnh báo ngân sách chi phí AI.
- Cấu hình thời gian lưu trữ bản ghi âm (mặc định: 30 ngày) và kích hoạt job dọn dẹp định kỳ.
- Nhật ký kiểm toán (Audit Logs): Ghi nhận các thao tác nhạy cảm (xuất bản đề, đổi điểm, xoá thành viên, thay đổi cấu hình đáp án).

---

## 4. DANH MỤC 37 MÀN HÌNH CẦN THIẾT KẾ TRÊN GOOGLE STITCH

Để thực hiện đúng cam kết quy trình **Planning → Design (Google Stitch) → Code (React Components)**, toàn bộ 37 màn hình được chuẩn hóa mã định danh (Screen ID) và phân bổ rõ ràng cho 2 phân hệ:

### 4.1 Danh Mục Màn Hình Học Sinh (18 Screens)

| STT | Screen ID | Tên Màn Hình | Mục Tiêu & Mô Tả Chi Tiết Giao Diện |
|---|---|---|---|
| 1 | `STU-01` | Landing Page (Trang chủ) | Hero banner hiện đại, giới thiệu tính năng luyện thi & AI, danh sách đề nổi bật, CTA Đăng ký |
| 2 | `STU-02` | Đăng ký & Đăng nhập | Form đăng ký/đăng nhập sạch sẽ, nút đăng nhập nhanh bằng Google, link quên mật khẩu |
| 3 | `STU-03` | Quên & Đặt lại mật khẩu | Form nhập email nhận OTP/Link khôi phục và form thiết lập mật khẩu mới |
| 4 | `STU-04` | Danh sách đề thi (Catalog) | Bộ lọc kỹ năng, kiểu đề, độ khó; thanh tìm kiếm; lưới card đề thi kèm thông tin lượt làm |
| 5 | `STU-05` | Chi tiết đề thi | Thông tin tổng quan đề, cấu trúc các phần, lịch sử làm của bản thân, nút chọn chế độ làm bài |
| 6 | `STU-06` | Phòng thi Trực tuyến (Exam Room) | Split-view: bài đọc/audio bên trái, câu hỏi trắc nghiệm/điền từ bên phải; palette câu hỏi, timer |
| 7 | `STU-07` | Phòng thi Writing | Giao diện viết bài: đề bài, khung soạn thảo có bộ đếm từ (Word counter), timer đếm ngược |
| 8 | `STU-08` | Phòng thi Speaking: Setup & Mic Check | Màn hình kiểm tra micro, xin quyền HTTPS, thu âm thử 5s, nghe lại sóng âm thanh |
| 9 | `STU-09` | Phòng thi Speaking: Interactive Room | Giám khảo ảo: Audio câu hỏi, bộ đếm thời gian chuẩn bị & nói, cue card Part 2, nút chuyển câu |
| 10 | `STU-10` | Kết quả bài thi tổng quan | Bảng điểm tổng, điểm từng kỹ năng, số câu đúng/sai, biểu đồ radar phân tích năng lực |
| 11 | `STU-11` | Tra cứu đáp án chi tiết | Xem từng câu hỏi: đáp án đã chọn, đáp án đúng (tuỳ cấu hình ẩn/hiện), transcript & lời giải |
| 12 | `STU-12` | Kết quả & Nhận xét Writing/Speaking | Điểm Rubric chính thức của giáo viên + Kết quả tham khảo của AI (phân tách rõ ràng bằng nhãn) |
| 13 | `STU-13` | Danh sách bài Luyện Nghe (Dictation) | Lọc bài luyện nghe theo trình độ A2-C1, chủ đề; thanh tiến độ hoàn thành các bài |
| 14 | `STU-14` | Phòng Luyện Nghe Chép Chính Tả | Audio player tua lặp câu, khung nhập văn bản, hiển thị so khớp diff màu sắc và giải thích lỗi AI |
| 15 | `STU-15` | Danh sách bài Luyện Phát Âm | Lọc theo âm mục tiêu IPA (/θ/, /s/...), cấp độ (từ/câu/đoạn); card bài luyện hiển thị điểm cao nhất |
| 16 | `STU-16` | Phòng Luyện Phát Âm (Pronunciation Lab) | Audio mẫu en-US, micro thu âm sóng âm thanh, bảng kết quả điểm từng từ tô màu và phoneme errors |
| 17 | `STU-17` | Lớp học & Khoá học của tôi | Danh sách lớp/khoá học đã tham gia, modal nhập mã mời (Join Code), bài tập được giao |
| 18 | `STU-18` | Hồ sơ cá nhân & Thống kê | Cài đặt profile cá nhân, hạn mức AI còn lại trong ngày, biểu đồ tiến bộ điểm số theo thời gian |

### 4.2 Danh Mục Màn Hình Giáo Viên & Quản Trị (19 Screens)

| STT | Screen ID | Tên Màn Hình | Mục Tiêu & Mô Tả Chi Tiết Giao Diện |
|---|---|---|---|
| 19 | `ADM-01` | Đăng nhập Admin/Giáo viên | Cổng đăng nhập bảo mật riêng tại `/admin` dành cho giáo viên và quản trị viên |
| 20 | `ADM-02` | Dashboard Tổng quan | Thống kê số học sinh, đề thi, số lượt thi, hàng đợi bài Writing/Speaking cần chấm gấp |
| 21 | `ADM-03` | Quản lý danh sách Đề thi | Bảng danh sách đề, trạng thái xuất bản, chế độ đáp án, các nút thao tác nhân bản/sửa/ẩn |
| 22 | `ADM-04` | Tạo/Sửa thông tin chung Đề thi | Form nhập tên đề, kiểu đề (IELTS/TOEIC/Khác), thời lượng, số lần làm, quyền gọi AI |
| 23 | `ADM-05` | Cấu hình Hiển thị đáp án | Cài đặt chế độ ẩn/hiện, mức độ ẩn (giữ đúng/sai), cấu hình lịch hẹn giờ mở đáp án |
| 24 | `ADM-06` | Trình soạn cấu trúc Đề (Section & Group) | Quản lý cây thư mục các Sections, thêm Audio cho Listening, văn bản bài đọc Reading |
| 25 | `ADM-07` | Trình soạn Câu hỏi chi tiết | Form tạo các dạng câu hỏi: Multiple choice, matching, fill blank, true/false, lời giải thích |
| 26 | `ADM-08` | Soạn đề Speaking chuyên biệt | Tạo 3 parts Speaking, upload/sinh audio câu hỏi, thiết lập cue card và thời gian chuẩn bị |
| 27 | `ADM-09` | Import đề thi hàng loạt | Upload file Excel/CSV, bảng preview dữ liệu, thông báo lỗi validation chi tiết theo dòng |
| 28 | `ADM-10` | Danh sách bài nộp chờ chấm | Lọc bài nộp Writing/Speaking theo lớp, đề thi, ngày nộp, học sinh; trạng thái chấm |
| 29 | `ADM-11` | Màn hình chấm bài Writing (Rubric + AI) | Cột trái xem bài viết; Cột phải chấm theo 4 tiêu chí; nút Chấm AI nháp, công bố điểm |
| 30 | `ADM-12` | Màn hình chấm bài Speaking | Nghe lại audio từng câu của học sinh, xem transcript & AI metrics, chấm Rubric chính thức |
| 31 | `ADM-13` | Quản lý Lớp học (Classes) | Danh sách lớp, tạo lớp mới, lấy mã mời (Join code), xem danh sách học sinh thuộc lớp |
| 32 | `ADM-14` | Quản lý Khoá học (Courses) | Tạo khoá học, kéo thả sắp xếp các đề thi và bài luyện vào khoá học, gắn lớp học vào khoá |
| 33 | `ADM-15` | Quản lý Học sinh & Cấp lượt thi | Danh sách học sinh trong lớp, xem lịch sử làm bài, nút "Cấp thêm lượt làm bài" (Grant Retake) |
| 34 | `ADM-16` | Báo cáo Thống kê Đề thi | Phổ điểm của đề, tỷ lệ đúng theo từng câu hỏi, thống kê các câu học sinh sai nhiều nhất |
| 35 | `ADM-17` | Quản lý Bài luyện Nghe & Phát âm | Danh sách và trình tạo bài luyện nghe chép (transcript timeline) và bài luyện phát âm |
| 36 | `ADM-18` | Quản lý Tài khoản Giáo viên (Owner only) | Danh sách giáo viên, tạo tài khoản giáo viên mới, phân quyền Admin chính, khoá tài khoản |
| 37 | `ADM-19` | Cài đặt Hệ thống & Hạn mức AI (Owner) | Cấu hình hạn mức AI mặc định/ngày, thời gian lưu audio (30 ngày), xem Audit Logs hệ thống |

---

## 5. MÔ HÌNH DỮ LIỆU ĐỀ XUẤT (DATA SCHEMA SPECIFICATION)

Cơ sở dữ liệu quan hệ PostgreSQL chuẩn hóa, sử dụng kiểu dữ liệu JSONB cho các cấu trúc động (Options, Rubric Criteria, Error Annotations, Audio Metrics).

```
                      +-------------------+
                      |       users       |
                      +-------------------+
                                | 1
                                |
             +------------------+------------------+
             | n                                   | n
      +---------------+                     +-----------------+
      |    classes    |                     |     courses     |
      +---------------+                     +-----------------+
             | 1                                   | 1
             |                                     |
             +------------------+------------------+
                                | n
                        +---------------+
                        |     tests     |
                        +---------------+
                                | 1
                                | n
                        +---------------+
                        |   sections    |
                        +---------------+
                                | 1
                                | n
                        +---------------+
                        |question_groups|
                        +---------------+
                                | 1
                                | n
                        +---------------+
                        |   questions   |
                        +---------------+
                                |
                                | (referenced by)
                                v
+----------------+      +---------------+      +----------------+
|    attempts    | 1--n |attempt_answers| 1--1 |    reviews     |
+----------------+      +---------------+      +----------------+
                                | 1                    | 1
                                | n                    | n
                        +---------------+      +----------------+
                        | speaking_resp |      | review_scores  |
                        +---------------+      +----------------+
                                | 1
                                | 1
                        +---------------+
                        | ai_evaluation |
                        +---------------+
```

### 5.1 Các Bảng Thực Thể Cốt Lõi

1. **`users`**
   - `id`: UUID (Primary Key)
   - `email`: VARCHAR(255) UNIQUE NOT NULL
   - `password_hash`: VARCHAR(255) NULL (nếu đăng nhập Google)
   - `full_name`: VARCHAR(100) NOT NULL
   - `avatar_url`: TEXT NULL
   - `role`: VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin'))
   - `status`: VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'locked'))
   - `is_owner`: BOOLEAN NOT NULL DEFAULT false
   - `daily_ai_quota`: INT NOT NULL DEFAULT 20
   - `created_at`, `updated_at`: TIMESTAMPTZ NOT NULL

2. **`exam_types`**
   - `id`: VARCHAR(50) PRIMARY KEY ('ielts', 'toeic', 'custom')
   - `name`: VARCHAR(100) NOT NULL
   - `allowed_question_types`: JSONB NOT NULL
   - `default_structure`: JSONB NOT NULL
   - `scoring_rules`: JSONB NOT NULL (Thang điểm và bảng quy đổi)
   - `default_writing_rubric_id`, `default_speaking_rubric_id`: UUID NULL

3. **`tests`**
   - `id`: UUID PRIMARY KEY
   - `title`: VARCHAR(255) NOT NULL
   - `description`: TEXT NULL
   - `exam_type_id`: VARCHAR(50) REFERENCES exam_types(id)
   - `scoring_config`: JSONB NULL (dùng cho kiểu 'custom')
   - `writing_rubric_id`, `speaking_rubric_id`: UUID NULL
   - `max_attempts`: INT NULL (NULL = không giới hạn)
   - `visibility`: VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'restricted'))
   - `allow_student_ai_grading`: BOOLEAN DEFAULT true
   - `max_ai_gradings_per_answer`: INT DEFAULT 2
   - `skill`: VARCHAR(30) NOT NULL ('full', 'listening', 'reading', 'writing', 'speaking')
   - `difficulty`: VARCHAR(20) DEFAULT 'medium'
   - `duration_minutes`: INT NOT NULL
   - `cover_url`: TEXT NULL
   - `status`: VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden'))
   - `answer_visibility`: VARCHAR(30) DEFAULT 'hidden' CHECK (answer_visibility IN ('show_after_submit', 'hidden', 'scheduled'))
   - `answer_hide_level`: VARCHAR(30) DEFAULT 'keep_correctness' CHECK (answer_hide_level IN ('keep_correctness', 'score_only'))
   - `answer_release_at`: TIMESTAMPTZ NULL
   - `created_by`: UUID REFERENCES users(id)
   - `created_at`, `updated_at`: TIMESTAMPTZ NOT NULL

4. **`sections`**
   - `id`: UUID PRIMARY KEY
   - `test_id`: UUID REFERENCES tests(id) ON DELETE CASCADE
   - `title`: VARCHAR(255) NOT NULL
   - `instruction`: TEXT NULL
   - `order_index`: INT NOT NULL
   - `duration_minutes`: INT NULL
   - `passage_text`: TEXT NULL
   - `audio_url`: TEXT NULL

5. **`question_groups`**
   - `id`: UUID PRIMARY KEY
   - `section_id`: UUID REFERENCES sections(id) ON DELETE CASCADE
   - `instruction`: TEXT NULL
   - `passage_text`: TEXT NULL
   - `audio_url`: TEXT NULL
   - `image_url`: TEXT NULL
   - `order_index`: INT NOT NULL

6. **`questions`**
   - `id`: UUID PRIMARY KEY
   - `group_id`: UUID REFERENCES question_groups(id) ON DELETE CASCADE
   - `type`: VARCHAR(30) NOT NULL ('single_choice', 'multiple_choice', 'fill_blank', 'matching', 'true_false_ng', 'writing', 'speaking')
   - `content`: TEXT NOT NULL
   - `options`: JSONB NULL
   - `correct_answers`: JSONB NULL
   - `points`: NUMERIC(5,2) DEFAULT 1.0
   - `explanation`: TEXT NULL
   - `order_index`: INT NOT NULL

7. **`attempts`**
   - `id`: UUID PRIMARY KEY
   - `user_id`: UUID REFERENCES users(id)
   - `test_id`: UUID REFERENCES tests(id)
   - `attempt_no`: INT NOT NULL
   - `mode`: VARCHAR(20) NOT NULL ('full_test', 'practice')
   - `started_at`: TIMESTAMPTZ NOT NULL
   - `expires_at`: TIMESTAMPTZ NOT NULL
   - `submitted_at`: TIMESTAMPTZ NULL
   - `status`: VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'graded'))
   - `total_score`: NUMERIC(6,2) NULL

8. **`attempt_answers`**
   - `id`: UUID PRIMARY KEY
   - `attempt_id`: UUID REFERENCES attempts(id) ON DELETE CASCADE
   - `question_id`: UUID REFERENCES questions(id)
   - `answer`: JSONB NULL
   - `is_correct`: BOOLEAN NULL
   - `score`: NUMERIC(5,2) NULL
   - `flagged`: BOOLEAN DEFAULT false
   - `ai_gradings_used`: INT DEFAULT 0

9. **`speaking_responses`**
   - `id`: UUID PRIMARY KEY
   - `attempt_answer_id`: UUID REFERENCES attempt_answers(id) ON DELETE CASCADE
   - `question_id`: UUID REFERENCES questions(id)
   - `audio_url`: TEXT NOT NULL
   - `transcript`: TEXT NULL
   - `duration_sec`: NUMERIC(6,2) NOT NULL
   - `prep_used_sec`: NUMERIC(6,2) NULL
   - `delete_after`: TIMESTAMPTZ NOT NULL (mặc định created_at + 30 days)
   - `created_at`: TIMESTAMPTZ NOT NULL

10. **`ai_evaluations`**
    - `id`: UUID PRIMARY KEY
    - `attempt_answer_id`: UUID REFERENCES attempt_answers(id) ON DELETE CASCADE
    - `skill`: VARCHAR(20) NOT NULL ('writing', 'speaking')
    - `requested_by`: VARCHAR(20) NOT NULL ('student', 'teacher')
    - `rubric_id`: UUID NULL
    - `criterion_scores`: JSONB NOT NULL
    - `total_score`: NUMERIC(5,2) NOT NULL
    - `feedback`: TEXT NOT NULL
    - `annotations`: JSONB NULL (Lỗi ngữ pháp, loại lỗi, gợi ý sửa)
    - `metrics`: JSONB NULL (WPM, pause count, fluency score)
    - `reported_wrong`: BOOLEAN DEFAULT false
    - `report_notes`: TEXT NULL
    - `status`: VARCHAR(20) DEFAULT 'completed'
    - `created_at`: TIMESTAMPTZ NOT NULL

11. **`reviews` (Điểm chính thức do giáo viên chốt)**
    - `id`: UUID PRIMARY KEY
    - `attempt_answer_id`: UUID REFERENCES attempt_answers(id) ON DELETE CASCADE
    - `skill`: VARCHAR(20) NOT NULL ('writing', 'speaking')
    - `reviewer_id`: UUID REFERENCES users(id)
    - `total_score`: NUMERIC(5,2) NOT NULL
    - `feedback`: TEXT NULL
    - `status`: VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'final'))
    - `ai_evaluation_id`: UUID REFERENCES ai_evaluations(id) NULL
    - `show_ai_errors`: BOOLEAN DEFAULT true
    - `reviewed_at`: TIMESTAMPTZ NOT NULL

12. **`listening_exercises` & `listening_attempts`**
    - Lưu trữ bài luyện nghe, timeline câu/đoạn `listening_segments`, và bài làm so khớp diff chính tả.

13. **`pronunciation_exercises` & `pronunciation_attempts`**
    - Lưu trữ bài luyện phát âm, audio mẫu en-US, và kết quả đánh giá Azure Speech: `accuracy`, `fluency`, `completeness`, `word_results` (JSON), `phoneme_errors` (JSON), `delete_after` (30 days).

14. **`classes`, `courses`, `class_members`, `course_items`**
    - Quản lý mã mời (Join code), quan hệ nhiều - nhiều giữa học sinh, lớp, và khoá học.

---

## 6. QUY TẮC NGHIỆP VỤ CỐT LÕI (CORE BUSINESS RULES)

1. **Quy tắc Tính Lượt Làm Bài (Attempt Counting Rule):**
   - Lượt làm bài được ghi nhận và trừ ngay tại thời điểm học sinh bấm "Bắt đầu làm bài" (`started_at`).
   - Mục đích: Chống gian lận xem trước đề thi rồi thoát trang.
   - Cơ chế dự phòng sự cố: Giáo viên phụ trách có quyền bấm **"Cấp thêm lượt" (Grant Retake)** trong trang quản lý học sinh để học sinh có thể làm lại.
2. **Quy tắc Ẩn/Hiện Đáp Án (Answer Visibility Rule):**
   - Đề thi mới tạo mặc định ở trạng thái `hidden`.
   - Mức độ ẩn mặc định là `keep_correctness`: Học sinh biết mình đúng/sai câu nào và điểm tổng quan, nhưng tuyệt đối không nhận được đáp án đúng (`correct_answers`) và giải thích (`explanation`) trong dữ liệu API trả về.
3. **Quy tắc AI Chấm Tham Khảo (AI Advisory Rule):**
   - Cho phép học sinh tự xin AI chấm Writing/Speaking: Mặc định **BẬT** khi tạo đề mới, tối đa 2 lần/bài. Giáo viên có thể tắt tuỳ chọn này đối với các bài thi đánh giá định kỳ chính thức.
   - Điểm số và nhận xét từ AI luôn gắn nhãn cảnh báo: **"Đánh giá AI tham khảo"**, hoàn toàn tách biệt và không tự ý ghi đè lên bảng điểm chính thức.
4. **Quy tắc Phân Lập Dữ Liệu Giáo Viên (Multi-tenant Teacher Scope):**
   - Giáo viên A chỉ được quyền xem, sửa, chấm điểm học sinh và bài thi thuộc các Lớp/Khoá học do chính Giáo viên A tạo ra.
   - Quyền hạn truy cập được kiểm soát ở tầng Backend API / Database Query, ngăn chặn hoàn toàn việc IDOR (Insecure Direct Object References).
5. **Quy tắc Bảo Vệ Quyền Riêng Tư & Lưu Trữ Âm Thanh:**
   - Mọi bản ghi âm phát âm và bài thi Speaking chỉ lưu trữ tạm thời với hạn mức mặc định là **30 ngày** (`delete_after = NOW() + INTERVAL '30 days'`). Job dọn dẹp hàng đêm sẽ tự động xoá file trên Cloud Storage và cập nhật trạng thái trong database.

---

## 7. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA / DEFINITION OF DONE)

- [ ] **Hoàn tất Thiết kế Stitch:** Thiết kế hoàn chỉnh 37/37 màn hình trên Google Stitch với Design System đồng nhất trước khi chuyển giao lập trình.
- [ ] **Xác thực & Bảo mật:** Học sinh không thể truy cập bất kỳ route nào thuộc `/admin`; Giáo viên không thể truy vấn dữ liệu lớp của giáo viên khác.
- [ ] **Làm bài & Tự lưu:** Trong phòng thi, học sinh reload trang hoặc mất kết nối mạng dưới 5 phút quay lại vẫn tiếp tục làm bài bình thường với thời gian còn lại chính xác.
- [ ] **Bảo vệ Đáp án:** Khi đề ở chế độ Ẩn, kiểm tra Network tab của trình duyệt hoàn toàn không thấy trường `correct_answers` và `explanation`.
- [ ] **Chấm Phát âm AI:** Chấm phát âm câu tiếng Anh en-US trả về điểm tổng, điểm từng từ và lỗi phoneme trong thời gian dưới 7 giây.
- [ ] **Chấm Writing/Speaking AI:** Sinh kết quả đánh giá Rubric cho bài viết 350 từ trong thời gian dưới 25 giây; gắn nhãn tham khảo rõ ràng.
- [ ] **Chấm điểm của Giáo viên:** Giáo viên dùng AI chấm nháp, chỉnh sửa điểm/nhận xét và Hoàn tất chấm thành công; học sinh nhận được thông báo tức thì.
- [ ] **Tự động dọn dẹp âm thanh:** Sau 30 ngày, các bản ghi âm Speaking/Pronunciation được tự động xoá theo đúng lịch trình.
