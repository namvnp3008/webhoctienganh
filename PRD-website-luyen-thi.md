# PRD — Website luyện thi tiếng Anh online

**Phiên bản:** 1.4 (bản nháp) — bổ sung: thi thử Speaking đầy đủ; học sinh tự nhờ AI chấm Writing/Speaking (đánh giá tham khảo)
**Ngày:** 24/09/2026
**Loại sản phẩm:** Web app luyện thi trực tuyến (tham khảo mô hình chức năng của STUDY4)

---

## 1. Tổng quan

### 1.1 Mục tiêu sản phẩm
Xây dựng website cho phép **học sinh** làm đề thi thử trực tuyến, được chấm điểm và xem kết quả ngay; đồng thời cho phép **giáo viên/admin** quản lý toàn bộ đề thi, câu hỏi, học sinh và chấm bài tự luận.

### 1.2 Vấn đề cần giải quyết
- Học sinh cần nơi luyện đề có tính giờ, có đáp án và thống kê tiến bộ.
- Giáo viên cần công cụ nhập đề nhanh, theo dõi kết quả học sinh và chấm bài viết mà không phải dùng giấy hoặc Excel.

### 1.3 Phạm vi (In scope)
- Đăng ký, đăng nhập, phân quyền theo 2 vai trò.
- Ngân hàng đề thi theo **kiểu đề** (IELTS, TOEIC, Khác — giáo viên tự tuỳ chỉnh cách chấm), làm bài có tính giờ, chấm tự động, giới hạn số lần làm.
- Lớp và khóa học do giáo viên tạo; giáo viên quản lý và xem kết quả học sinh trong lớp/khóa học của mình.
- Chấm bài tự luận (Writing) theo bộ tiêu chí (ví dụ 4 tiêu chí IELTS) bởi giáo viên, có AI hỗ trợ chấm nháp và chỉ lỗi.
- Học sinh tự nhờ AI chấm bài Writing của mình (kết quả tham khảo, tách biệt với điểm chính thức của giáo viên).
- Thi thử Speaking đầy đủ (ví dụ IELTS Part 1-2-3) với AI đánh giá theo tiêu chí; giáo viên có thể chấm và xác nhận.
- Lịch sử và thống kê kết quả.
- Trang quản trị dành cho giáo viên/admin.
- Giáo viên kiểm soát việc hiển thị đáp án cho học sinh.
- Luyện nghe (nghe chép chính tả, nghe trả lời câu hỏi) với AI phát hiện và giải thích lỗi.
- Luyện phát âm với AI phát hiện lỗi phát âm và hướng dẫn sửa, theo chuẩn giọng Anh-Mỹ.
- Hạn mức sử dụng AI mặc định cho mọi học sinh (bản đầu). Quản lý gói học chi tiết thêm ở giai đoạn sau.

### 1.4 Ngoài phạm vi (Out of scope — bản đầu)
- Thanh toán trực tuyến và quản lý gói học chi tiết (GV-17) — thêm ở giai đoạn sau.
- Khoá học video.
- Diễn đàn cộng đồng và bình luận.
- Giám khảo AI trò chuyện trực tiếp, tự hỏi tiếp theo câu trả lời (Speaking bản đầu dùng bộ câu hỏi soạn sẵn do giáo viên nhập).
- Kiểu đề HSK (thêm sau; hệ thống thiết kế để bổ sung kiểu đề mới bằng cấu hình).
- Ứng dụng di động native (chỉ cần web responsive).

### 1.5 Thuật ngữ
| Thuật ngữ | Ý nghĩa |
|---|---|
| Đề thi (Test) | Một bộ đề hoàn chỉnh, gồm nhiều phần |
| Phần (Section) | Một phần của đề (ví dụ: Listening Part 1, Reading Passage 1) |
| Nhóm câu hỏi (Question Group) | Nhóm câu dùng chung một đoạn văn/audio/hướng dẫn |
| Câu hỏi (Question) | Một câu hỏi đơn lẻ có đáp án |
| Lượt làm bài (Attempt) | Một lần học sinh làm một đề |
| Bài luyện nghe | Bài luyện ngắn theo từng đoạn audio, khác với phần Listening trong đề thi |
| Bài luyện phát âm | Bài yêu cầu học sinh đọc to một từ/câu/đoạn và nhận phản hồi từ AI |
| Chế độ hiển thị đáp án | Cấu hình quyết định lúc nào và ở mức độ nào học sinh được xem đáp án |
| Gói học (Plan) | Mức hạn mức sử dụng các chức năng AI mà học sinh được hưởng (giai đoạn sau) |
| Kiểu đề thi (Exam type) | Mẫu đề quyết định dạng câu hỏi được dùng, cấu trúc phần và cách tính điểm (IELTS, TOEIC, Khác; HSK thêm sau) |
| Lớp (Class) | Nhóm học sinh do một giáo viên tạo và quản lý |
| Khóa học (Course) | Tập hợp đề thi và bài luyện do giáo viên tạo, học sinh tham gia học |
| Bộ tiêu chí chấm (Rubric) | Danh sách tiêu chí chấm bài Writing/Speaking, mỗi tiêu chí có điểm tối đa và trọng số |
| Đánh giá AI tham khảo | Kết quả AI chấm Writing/Speaking cho học sinh, chỉ mang tính tham khảo, khác với điểm chính thức do giáo viên xác nhận |

---

## 2. Vai trò người dùng và ma trận quyền

Hệ thống có **đúng 2 vai trò**:

| Vai trò | Mô tả |
|---|---|
| **Học sinh (Student)** | Người học. Đăng ký tự do. Chỉ thao tác với dữ liệu của chính mình. |
| **Giáo viên/Admin (Admin)** | Tạo và quản lý đề thi, bài luyện, lớp, khóa học; chỉ xem học sinh thuộc lớp/khóa học của mình. Tài khoản do Admin chính cấp, **không cho đăng ký tự do**. |

**Admin chính (owner):** một hoặc vài tài khoản giáo viên/admin được đánh dấu là Admin chính. Ngoài quyền của giáo viên, Admin chính tạo tài khoản giáo viên khác, xem toàn bộ học sinh trong hệ thống, khoá/mở khoá tài khoản và cấu hình hệ thống. Giáo viên thường chỉ xem và quản lý học sinh thuộc lớp/khóa học do mình tạo.

### 2.1 Ma trận quyền

| Chức năng | Khách (chưa đăng nhập) | Học sinh | Giáo viên/Admin |
|---|:---:|:---:|:---:|
| Xem trang chủ, danh sách đề công khai | ✅ | ✅ | ✅ |
| Xem chi tiết đề (mô tả, số câu, thời gian) | ✅ | ✅ | ✅ |
| Đăng ký / đăng nhập | ✅ | — | — |
| Làm bài thi | ❌ | ✅ | ✅ (xem thử) |
| Xem kết quả và đáp án của mình (tuỳ chế độ ẩn/hiện đáp án) | ❌ | ✅ | — |
| Xem lịch sử và thống kê cá nhân | ❌ | ✅ | — |
| Đánh dấu/lưu đề yêu thích | ❌ | ✅ | — |
| Sửa hồ sơ cá nhân, đổi mật khẩu | ❌ | ✅ | ✅ |
| Tạo/sửa/xoá đề thi, phần, câu hỏi | ❌ | ❌ | ✅ |
| Upload audio, hình ảnh | ❌ | ❌ | ✅ |
| Xuất bản / ẩn đề thi | ❌ | ❌ | ✅ |
| Xem danh sách và kết quả học sinh thuộc lớp/khóa học của mình | ❌ | ❌ | ✅ |
| Xem toàn bộ học sinh trong hệ thống | ❌ | ❌ | ✅ (chỉ Admin chính) |
| Chấm và nhận xét bài Writing | ❌ | ❌ | ✅ |
| Khoá/mở khoá tài khoản học sinh | ❌ | ❌ | ✅ (chỉ Admin chính) |
| Tạo tài khoản giáo viên/admin khác | ❌ | ❌ | ✅ (chỉ Admin chính) |
| Xem báo cáo tổng quan hệ thống | ❌ | ❌ | ✅ |
| Cấu hình ẩn/hiện đáp án cho từng đề | ❌ | ❌ | ✅ |
| Chọn kiểu đề thi, tuỳ chỉnh cách chấm điểm, đặt giới hạn số lần làm | ❌ | ❌ | ✅ |
| Tạo/sửa lớp và khóa học của mình, thêm/xoá học sinh trong lớp/khóa | ❌ | ❌ | ✅ |
| Tham gia lớp/khóa học bằng mã mời | ❌ | ✅ | — |
| Dùng AI để chấm nháp và chỉ lỗi bài Writing/Speaking | ❌ | ❌ | ✅ |
| Nhờ AI chấm bài Writing của mình (đánh giá tham khảo) | ❌ | ✅ | — |
| Làm bài thi thử Speaking (ghi âm) và xem đánh giá AI | ❌ | ✅ | — |
| Soạn phần Speaking; nghe, chấm và xác nhận bài Speaking của học sinh | ❌ | ❌ | ✅ |
| Luyện nghe và xem phản hồi lỗi nghe | ❌ | ✅ | — |
| Luyện phát âm và xem phản hồi AI | ❌ | ✅ | — |
| Xoá bản ghi âm của chính mình | ❌ | ✅ | — |
| Tạo/sửa/xuất bản bài luyện nghe và luyện phát âm | ❌ | ❌ | ✅ |
| Nghe lại bản ghi âm, xem kết quả AI và nhận xét cho học sinh | ❌ | ❌ | ✅ |
| Quản lý gói học và gán gói cho lớp (giai đoạn sau) | ❌ | ❌ | ✅ |
| Cấu hình thời gian lưu bản ghi âm và hạn mức AI mặc định | ❌ | ❌ | ✅ (chỉ Admin chính) |
| Xem số lượt AI còn lại của mình (và gói học, khi có) | ❌ | ✅ | — |

---

## 3. Yêu cầu chức năng — Học sinh

### HS-01. Đăng ký và đăng nhập
**Là học sinh, tôi muốn tạo tài khoản và đăng nhập để lưu lại tiến độ học.**
- Đăng ký bằng email + mật khẩu; có thể đăng nhập bằng Google.
- Mật khẩu tối thiểu 8 ký tự.
- Có chức năng quên mật khẩu (gửi link đặt lại qua email).
- Sau khi đăng nhập được chuyển về trang trước đó hoặc trang chủ.

**Tiêu chí nghiệm thu**
- Email đã tồn tại thì báo lỗi rõ ràng.
- Tài khoản bị khoá không đăng nhập được và thấy thông báo phù hợp.

### HS-02. Duyệt và tìm kiếm đề thi
**Là học sinh, tôi muốn tìm được đề phù hợp với nhu cầu.**
- Xem danh sách đề dạng lưới/thẻ, có phân trang.
- Học sinh thấy các đề **công khai** và các đề thuộc khóa học/lớp mà mình tham gia.
- Lọc theo: loại kỳ thi, kỹ năng (Listening/Reading/Writing/Full test), độ khó, năm/bộ đề.
- Tìm kiếm theo tên đề.
- Mỗi thẻ đề hiển thị: tên, số câu, thời gian, số lượt làm, trạng thái của tôi (chưa làm / đã làm + điểm cao nhất).

### HS-03. Xem chi tiết đề
- Xem mô tả, cấu trúc các phần, số câu, thời gian, độ khó.
- Xem lịch sử các lần làm của tôi với đề này và **số lượt làm còn lại** (nếu giáo viên có giới hạn).
- Nút **Bắt đầu làm bài** (bị vô hiệu hoá kèm thông báo khi đã hết lượt).

### HS-04. Chọn chế độ làm bài
- **Thi thật (full test):** làm tất cả các phần, tính giờ toàn bài.
- **Luyện từng phần:** chọn một hoặc nhiều phần, thời gian tự chọn hoặc không giới hạn.

### HS-05. Làm bài thi
**Là học sinh, tôi muốn làm bài trong môi trường giống thi thật.**
- Đồng hồ đếm ngược luôn hiển thị; hết giờ tự động nộp bài.
- Hỗ trợ các dạng câu hỏi:
  - Trắc nghiệm một đáp án
  - Trắc nghiệm nhiều đáp án
  - Điền từ vào chỗ trống
  - Nối (matching)
  - Đúng / Sai / Không có thông tin (True/False/Not Given)
  - Tự luận viết (Writing) — nhập văn bản, có đếm số từ
  - Nói (Speaking) — ghi âm câu trả lời, có thời gian chuẩn bị và thời gian nói (xem HS-15)
- Hiển thị đoạn văn, hình ảnh hoặc trình phát audio đi kèm nhóm câu hỏi.
- Bảng điều hướng câu hỏi: nhảy đến câu bất kỳ, thấy câu đã làm/chưa làm.
- Đánh dấu câu cần xem lại.
- **Tự động lưu** đáp án; nếu mất kết nối hoặc tải lại trang, học sinh làm tiếp được từ chỗ cũ với thời gian còn lại chính xác.
- Nút **Nộp bài** có bước xác nhận (nhắc số câu chưa làm).

**Tiêu chí nghiệm thu**
- Thời gian còn lại tính theo giờ của server, không bị gian lận bằng cách sửa giờ máy.
- Mỗi lượt làm bài chỉ nộp được một lần.

### HS-06. Xem kết quả
- Sau khi nộp: xem tổng điểm, số câu đúng/sai/bỏ trống, thời gian làm bài.
- Điểm theo từng phần/kỹ năng, tính theo kiểu đề của bài (ví dụ band IELTS, thang điểm TOEIC, hoặc cách tính do giáo viên tự đặt).
- Bài trắc nghiệm được chấm tự động ngay.
- Bài Writing hiển thị trạng thái **"Chờ giáo viên chấm"** cho đến khi được chấm; trong lúc chờ, học sinh có thể nhờ AI chấm tham khảo (xem HS-16). Bài Speaking xem HS-15.

### HS-07. Xem đáp án chi tiết
- Những gì học sinh được xem phụ thuộc vào **chế độ hiển thị đáp án** do giáo viên cấu hình cho đề (xem GV-13).
- Khi đáp án được mở: với từng câu thấy đáp án của tôi, đáp án đúng, giải thích (nếu giáo viên có nhập).
- Khi đáp án đang bị ẩn: học sinh vẫn thấy điểm và bài làm của mình, phần bị ẩn hiển thị thông báo "Giáo viên chưa mở đáp án" (kèm thời điểm mở nếu có hẹn giờ).
- Lọc xem: tất cả / câu sai / câu bỏ trống / câu đã đánh dấu (lọc theo đúng/sai chỉ khả dụng khi đề cho phép xem đúng/sai).
- Xem lại đoạn văn/audio gắn với câu đó.

### HS-08. Xem nhận xét bài Writing
- Nhận được thông báo (trong web, và email nếu bật) khi giáo viên chấm xong.
- Xem điểm **theo từng tiêu chí** (ví dụ 4 tiêu chí IELTS Writing) và điểm tổng.
- Xem nhận xét của giáo viên bên cạnh bài viết của mình.
- Xem các **lỗi được chỉ ra** ngay trên bài viết (loại lỗi, gợi ý sửa, giải thích) nếu giáo viên duyệt và công bố phần này.
- Nếu học sinh đã nhờ AI chấm tham khảo, kết quả AI và điểm chính thức của giáo viên được hiển thị tách biệt, có nhãn rõ ràng.

### HS-09. Lịch sử và thống kê cá nhân
- Danh sách tất cả các lượt làm bài, sắp xếp theo thời gian.
- Biểu đồ điểm theo thời gian.
- Thống kê độ chính xác theo dạng câu hỏi/kỹ năng để biết điểm yếu.
- Có thể làm lại đề đã làm (tạo lượt làm mới, không ghi đè lượt cũ) nếu chưa vượt giới hạn số lần làm do giáo viên đặt cho đề.

### HS-10. Lưu đề yêu thích
- Đánh dấu/bỏ đánh dấu đề; xem danh sách đề đã lưu.

### HS-11. Quản lý hồ sơ
- Sửa tên hiển thị, ảnh đại diện, mục tiêu điểm (tuỳ chọn).
- Đổi mật khẩu.
- Học sinh **không** được xem dữ liệu của học sinh khác.

### HS-12. Luyện nghe
**Là học sinh, tôi muốn luyện nghe từng đoạn ngắn và biết mình nghe sai ở đâu.**
- Duyệt danh sách bài luyện nghe, lọc theo trình độ, chủ đề, dạng bài.
- Hai dạng bài:
  - **Nghe chép chính tả (dictation):** nghe từng câu/đoạn ngắn rồi gõ lại nội dung nghe được.
  - **Nghe trả lời câu hỏi:** nghe đoạn audio rồi trả lời câu hỏi trắc nghiệm/điền từ.
- Trình phát audio: phát/tạm dừng, tua lại 5 giây, lặp lại câu, chọn tốc độ 0.75x / 1x / 1.25x; giới hạn số lần nghe nếu giáo viên có cài đặt.
- Sau khi nộp, **AI phát hiện lỗi nghe** bằng cách đối chiếu bài chép của học sinh với transcript chuẩn:
  - Đánh dấu bằng màu khác nhau: từ thiếu, từ thừa, từ sai, sai chính tả.
  - Phân loại nguyên nhân khi có thể (ví dụ: nghe nhầm từ đồng âm/gần âm, bỏ sót mạo từ hoặc từ nối, không nghe ra âm cuối, sai thì hoặc số ít/số nhiều).
  - Giải thích ngắn bằng tiếng Việt và cho nghe lại đúng đoạn có lỗi.
  - Hiển thị **bản chép đã sửa** cạnh transcript chuẩn.
- Xem điểm chính xác (% từ đúng) và transcript đầy đủ (tuỳ cấu hình ẩn/hiện của giáo viên, xem GV-13).
- Lưu lịch sử và thống kê các loại lỗi nghe hay gặp.

**Tiêu chí nghiệm thu**
- Việc đối chiếu từ (thiếu/thừa/sai) luôn chạy được kể cả khi dịch vụ AI gặp sự cố; AI chỉ bổ sung phần phân loại nguyên nhân và giải thích.
- Có tuỳ chọn bỏ qua khác biệt chữ hoa/thường và dấu câu khi đối chiếu.

### HS-13. Luyện phát âm với AI
**Là học sinh, tôi muốn đọc to và biết mình phát âm sai ở đâu, sửa như thế nào.**
- Duyệt bài luyện phát âm theo cấp độ (từ → cụm từ → câu → đoạn ngắn), chủ đề hoặc âm mục tiêu (ví dụ /θ/, /ð/, âm cuối /s/, /t/).
- Với mỗi bài: xem văn bản, phiên âm IPA chuẩn Anh-Mỹ (nếu có), nghe **audio mẫu giọng Anh-Mỹ** ở tốc độ chậm và bình thường. Hệ thống chấm theo chuẩn phát âm Anh-Mỹ (en-US).
- Ghi âm bằng micro của thiết bị: có xin quyền micro, chỉ báo mức âm thanh, nghe lại bản ghi trước khi gửi, ghi lại nếu muốn.
- Sau khi gửi, AI trả về:
  - Điểm tổng và các điểm thành phần: độ chính xác (accuracy), độ trôi chảy (fluency), độ đầy đủ (completeness).
  - Kết quả theo **từng từ** (đúng / cần cải thiện / sai) hiển thị bằng màu.
  - Với từ sai: chỉ ra **âm (phoneme) bị phát âm sai**, cách phát âm đúng (IPA, mô tả vị trí lưỡi/môi bằng tiếng Việt, so sánh với âm tiếng Việt gần nhất nếu có).
  - Từ bị bỏ sót hoặc đọc thêm.
  - Gợi ý sửa ngắn gọn bằng tiếng Việt.
- Nghe lại audio mẫu của từ/âm sai và **thử lại** ngay; xem so sánh điểm giữa các lần thử.
- Lịch sử luyện tập, biểu đồ tiến bộ, thống kê **các âm hay sai** kèm gợi ý bài luyện phù hợp.
- Quyền riêng tư: hiển thị thông báo và xin đồng ý trước lần ghi âm đầu tiên; học sinh tự xoá được bản ghi âm của mình.
- Mỗi học sinh có hạn mức lượt chấm AI mỗi ngày (mặc định chung do Admin chính cấu hình; sau này theo gói học, xem GV-17). Học sinh xem được số lượt còn lại; hết hạn mức thì hệ thống báo rõ và cho biết khi nào được làm mới.

**Tiêu chí nghiệm thu**
- Kết quả cho một câu tối đa 20 từ được trả về trong khoảng 5–8 giây.
- Ghi âm quá ngắn, không có tiếng hoặc quá nhiều tiếng ồn thì báo lỗi rõ ràng và **không trừ** lượt chấm.
- Dịch vụ AI gặp sự cố thì báo lỗi, cho thử lại và không trừ lượt chấm.

### HS-14. Tham gia lớp và khóa học
**Là học sinh, tôi muốn vào lớp/khóa học của giáo viên để làm đề và bài luyện được giao.**
- Tham gia bằng **mã mời** hoặc **link mời** do giáo viên gửi, hoặc nhận lời mời qua email.
- Xem danh sách lớp và khóa học của tôi; mở khóa học để thấy các đề thi và bài luyện (nghe, phát âm) bên trong.
- Rời lớp/khóa học: sau khi rời, học sinh không còn vào được nội dung chỉ dành cho lớp/khóa đó, nhưng lịch sử làm bài của mình vẫn được giữ.
- Học sinh không xem được danh sách hay dữ liệu của học sinh khác trong lớp.

### HS-15. Thi thử Speaking
**Là học sinh, tôi muốn làm một bài thi Speaking mô phỏng thi thật và nhận đánh giá chi tiết.**
- Speaking là một phần của đề (thuộc kiểu đề). Với IELTS gồm **Part 1, Part 2, Part 3**; với kiểu Khác, giáo viên tự cấu hình các phần và số câu (GV-20). Có thể nằm trong đề Full test hoặc là đề Speaking riêng.
- **Kiểm tra micro** trước khi bắt đầu: xin quyền micro, ghi thử vài giây và nghe lại; báo lỗi nếu không thu được tiếng.
- Hệ thống đóng vai giám khảo: phát **audio câu hỏi** (kèm chữ, giáo viên có thể ẩn chữ) rồi tự động bật ghi âm.
  - **Part 1:** các câu hỏi ngắn về chủ đề quen thuộc, mỗi câu có thời gian trả lời tối đa.
  - **Part 2:** hiển thị thẻ chủ đề (cue card), **1 phút chuẩn bị** có đồng hồ và khung ghi chú, sau đó nói khoảng 1–2 phút.
  - **Part 3:** các câu hỏi thảo luận sâu liên quan chủ đề Part 2.
- Đồng hồ và giới hạn thời gian theo cấu hình của từng câu. Hết thời gian thì tự chuyển câu, hoặc học sinh bấm **Tiếp** khi nói xong. Ở chế độ thi thật không quay lại hay ghi lại câu trước; ở chế độ luyện được ghi lại câu trả lời.
- Mỗi câu trả lời được **lưu ngay khi ghi xong**; mất mạng thì tải lên lại khi có mạng, các câu đã ghi không bị mất.
- Sau khi nộp, AI đánh giá **theo bộ tiêu chí của đề** (IELTS: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation): điểm từng tiêu chí và điểm tổng theo cách tính của kiểu đề. Việc chấm chạy nền, có thông báo khi xong.
- Kết quả gồm:
  - Transcript từng câu trả lời và bản ghi âm để nghe lại.
  - Nhận xét theo từng tiêu chí.
  - Các lỗi ngữ pháp/từ vựng được chỉ ra kèm câu gợi ý sửa.
  - Các lỗi phát âm nổi bật (dùng lại giải pháp ở HS-13, chuẩn Anh-Mỹ).
  - Số liệu như tốc độ nói và mức ngập ngừng.
- Kết quả AI gắn nhãn **"Đánh giá AI tham khảo"**. Nếu giáo viên chấm/xác nhận thì hiển thị thêm điểm và nhận xét của giáo viên, tách biệt, nhãn "Giáo viên đã chấm".
- Mỗi lần AI đánh giá tính vào hạn mức AI của học sinh (bài Speaking gồm nhiều câu nên số lượt tính cho mỗi bài cấu hình được). Hết hạn mức thì báo rõ; bài vẫn được lưu để nhờ AI chấm khi có lượt mới hoặc chờ giáo viên chấm.
- Bản ghi âm áp dụng cùng quy định quyền riêng tư và thời gian lưu (mặc định 30 ngày) như HS-13.

**Tiêu chí nghiệm thu**
- Giám khảo ảo phát câu hỏi và đồng hồ chạy đúng quy trình Part 1-2-3; thời gian chuẩn bị và thời gian nói tuân theo cấu hình.
- Sự cố mạng hoặc tải lại trang không làm mất các câu đã ghi; lượt AI không bị trừ khi dịch vụ lỗi.

### HS-16. Tự nhờ AI chấm Writing
**Là học sinh, tôi muốn nhận phản hồi ngay cho bài viết mà không phải chờ giáo viên.**
- Sau khi nộp bài Writing (trong đề thi hoặc bài luyện), học sinh thấy nút **Nhờ AI chấm** nếu giáo viên bật tính năng cho đề đó (GV-03).
- AI trả về theo bộ tiêu chí của đề: điểm từng tiêu chí, điểm tổng theo cách tính của kiểu đề, nhận xét từng tiêu chí, **lỗi được đánh dấu trực tiếp trên bài viết** (loại lỗi, gợi ý sửa, giải thích) và gợi ý cải thiện.
- Kết quả gắn nhãn **"Đánh giá AI tham khảo — không phải điểm chính thức"** và hiển thị tách biệt với điểm giáo viên chấm. Điểm AI không được tính vào bảng điểm chính thức của đề cho đến khi giáo viên xác nhận.
- Mỗi bài chỉ nhờ AI chấm tối đa N lần (giáo viên đặt trong GV-03, mặc định 2) và mỗi lần tính vào hạn mức AI của học sinh; hết hạn mức thì báo rõ.
- Học sinh có nút **Báo AI chấm chưa đúng** (kèm ghi chú); giáo viên xem được các báo cáo này (GV-20).
- Nếu học sinh đã nhờ AI chấm, giáo viên khi chấm thấy kết quả đó và dùng làm bản nháp (GV-11), tránh tốn thêm lượt AI.
- Khi giáo viên tắt tính năng cho đề thì nút không hiển thị.

**Tiêu chí nghiệm thu**
- Kết quả trả về trong khoảng 30 giây với bài đến khoảng 400 từ.
- Nếu AI lỗi thì báo lỗi, cho thử lại và không trừ lượt.

---

## 4. Yêu cầu chức năng — Giáo viên/Admin

### GV-01. Đăng nhập trang quản trị
- Đăng nhập bằng email + mật khẩu tại khu vực quản trị riêng (`/admin`).
- Học sinh truy cập `/admin` bị từ chối (403).

### GV-02. Bảng điều khiển tổng quan
- Số học sinh, số đề đã xuất bản, số lượt làm bài (hôm nay / 7 ngày / 30 ngày) trong phạm vi lớp/khóa học của giáo viên (Admin chính xem toàn hệ thống).
- Danh sách bài Writing đang chờ chấm.
- Các đề được làm nhiều nhất.

### GV-03. Quản lý đề thi
**Là giáo viên, tôi muốn tạo và chỉnh sửa đề thi dễ dàng.**
- Tạo, sửa, nhân bản, xoá đề thi.
- Khi tạo đề, giáo viên **chọn kiểu đề thi** (IELTS / TOEIC / Khác). Kiểu đề quyết định dạng câu hỏi được dùng, cấu trúc phần mặc định và cách tính điểm (xem GV-18).
- Thông tin đề: tên, mô tả, kỹ năng, độ khó, thời gian, ảnh bìa, nguồn.
- **Giới hạn số lần làm** cho mỗi học sinh: chọn "không giới hạn" hoặc nhập số lần tối đa. Lượt được tính khi học sinh bắt đầu làm (kể cả tự nộp do hết giờ); lượt lỗi do hệ thống không bị tính. Giáo viên có thể cấp thêm lượt cho từng học sinh.
- **Phạm vi hiển thị:** công khai cho mọi học sinh, hoặc chỉ học sinh thuộc các khóa học được chọn (lớp được gắn vào khóa học cũng được tính).
- Đề mới tạo có chế độ hiển thị đáp án mặc định là **Ẩn** (xem GV-13).
- **Cho phép học sinh nhờ AI chấm** phần Writing và Speaking của đề (bật/tắt, mặc định bật; nên tắt với bài kiểm tra chính thức) và số lần nhờ AI chấm tối đa cho mỗi bài (mặc định 2).
- Trạng thái đề: **Nháp / Đã xuất bản / Đã ẩn**. Học sinh chỉ thấy đề *Đã xuất bản*.
- Xoá đề đã có học sinh làm bài thì chỉ được **ẩn** (không xoá cứng) để giữ lịch sử.

### GV-04. Quản lý phần và nhóm câu hỏi
- Thêm/sửa/xoá/sắp xếp lại các phần trong đề.
- Mỗi phần có: tiêu đề, hướng dẫn, thời gian riêng (tuỳ chọn), đoạn văn hoặc audio.
- Nhóm câu hỏi dùng chung một hướng dẫn/đoạn văn/audio/hình ảnh.

### GV-05. Quản lý câu hỏi
- Tạo, sửa, xoá, sắp xếp câu hỏi trong nhóm.
- Chọn dạng câu hỏi, nhập nội dung, các lựa chọn, đáp án đúng, điểm, giải thích.
- Với điền từ: cho phép nhiều đáp án chấp nhận (ví dụ `color` / `colour`), có tuỳ chọn phân biệt hoa/thường.
- Xem trước câu hỏi đúng như học sinh sẽ thấy.

### GV-06. Nhập đề hàng loạt
- Import câu hỏi từ file Excel/CSV theo mẫu có sẵn.
- Báo lỗi theo từng dòng nếu dữ liệu sai định dạng; không import một phần âm thầm.

### GV-07. Upload tệp
- Upload audio (mp3), hình ảnh (jpg, png) và gắn vào phần/nhóm câu hỏi.
- Giới hạn dung lượng và định dạng; báo lỗi rõ ràng.

### GV-08. Xem trước và làm thử đề
- Làm thử đề ở chế độ xem trước trước khi xuất bản; lượt làm thử **không** tính vào thống kê.

### GV-09. Quản lý học sinh
- Danh sách học sinh **thuộc lớp/khóa học của giáo viên**: tìm kiếm theo tên/email, lọc theo lớp/khóa học và trạng thái.
- Xem hồ sơ học sinh và toàn bộ lịch sử làm bài của học sinh đó.
- Giáo viên xoá học sinh khỏi lớp/khóa học của mình; khoá / mở khoá tài khoản học sinh do Admin chính thực hiện.
- Gửi email đặt lại mật khẩu cho học sinh.

### GV-10. Xem kết quả làm bài
- Xem danh sách lượt làm bài theo đề, theo học sinh, theo lớp hoặc khóa học (trong phạm vi học sinh của mình).
- Xem chi tiết từng lượt: đáp án đã chọn, đúng/sai, thời gian.
- Thống kê theo đề: điểm trung bình, phân bố điểm, **tỷ lệ đúng theo từng câu** (để phát hiện câu quá khó hoặc sai đáp án).
- Xuất báo cáo ra Excel/CSV.

### GV-11. Chấm bài Writing
- Danh sách bài chờ chấm (chỉ bài của học sinh trong lớp/khóa học của mình), lọc theo đề/lớp/học sinh/ngày nộp.
- Chấm theo **bộ tiêu chí (rubric)** của đề: nhập điểm cho từng tiêu chí (ví dụ 4 tiêu chí IELTS Writing: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy), kèm nhận xét chung và nhận xét theo tiêu chí. Điểm tổng được tự tính theo cách tính của kiểu đề.
- **Chấm nháp bằng AI:** bấm "Chấm bằng AI" để AI đề xuất điểm cho từng tiêu chí, nhận xét và **chỉ lỗi** trên bài viết (ngữ pháp, từ vựng, mạch lạc, cấu trúc): vị trí lỗi, loại lỗi, gợi ý sửa, giải thích.
- Kết quả AI luôn là **bản nháp**: giáo viên xem, sửa điểm/nhận xét, xoá lỗi AI chỉ sai, rồi mới bấm **Hoàn tất chấm**. Học sinh chỉ thấy **điểm chính thức** sau khi giáo viên hoàn tất (khác với đánh giá AI tham khảo mà học sinh tự nhờ, xem HS-16); giáo viên chọn có công bố phần "lỗi AI chỉ ra" cho học sinh hay không.
- Có thể chấm hoàn toàn thủ công, không dùng AI.
- Nếu học sinh đã nhờ AI chấm tham khảo, giáo viên thấy kết quả đó và có thể dùng làm bản nháp (không tốn thêm lượt AI), sau đó sửa và xác nhận thành điểm chính thức.
- Lưu nháp và **Hoàn tất chấm** — khi hoàn tất, học sinh được thông báo.
- Sau khi chấm, có thể sửa điểm/nhận xét; hệ thống ghi lại thời điểm sửa.
- Mỗi lần dùng AI chấm được tính vào hạn mức AI và thống kê sử dụng.

**Tiêu chí nghiệm thu**
- Điểm tổng được tính đúng từ điểm các tiêu chí theo cách tính của kiểu đề.
- Bản nháp AI do giáo viên tạo không hiển thị cho học sinh cho đến khi giáo viên hoàn tất chấm.

### GV-12. Quản lý tài khoản quản trị
- **Admin chính (owner)** tạo tài khoản giáo viên/admin mới, khoá hoặc xoá tài khoản, chỉ định tài khoản nào là Admin chính.
- Không được tự xoá hoặc tự khoá chính mình.

### GV-13. Kiểm soát hiển thị đáp án
**Là giáo viên, tôi muốn quyết định lúc nào và mức độ nào học sinh được xem đáp án.**
- Cấu hình cho từng đề thi và từng bài luyện nghe. Đề mới tạo mặc định ở chế độ **Ẩn**, giáo viên đổi sang chế độ khác khi cần.
- Ba chế độ:
  1. **Hiện ngay sau khi nộp**.
  2. **Ẩn đáp án** (**mặc định khi tạo đề mới**), chọn một trong hai mức (mặc định là mức đầu):
     - Ẩn đáp án đúng và giải thích, vẫn cho học sinh xem câu nào đúng/sai.
     - Ẩn toàn bộ chi tiết, học sinh chỉ thấy điểm tổng.
  3. **Hẹn giờ mở** — đáp án tự động hiện vào ngày giờ giáo viên chọn (ví dụ sau hạn nộp bài của cả lớp).
- Nút **Mở đáp án ngay** và **Ẩn lại** dùng được bất kỳ lúc nào; thay đổi có hiệu lực với cả các lượt làm đã nộp trước đó.
- Giáo viên luôn xem được đầy đủ đáp án trong trang quản trị và khi xem trước.
- Điểm và nhận xét bài Writing do giáo viên chấm không bị ảnh hưởng bởi chế độ này.
- Ghi log ai đổi cấu hình, vào lúc nào.

**Tiêu chí nghiệm thu**
- Khi đáp án bị ẩn, dữ liệu đáp án đúng và giải thích **không được trả về** trong phản hồi API cho học sinh (không chỉ ẩn ở giao diện).
- Học sinh làm lại đề vẫn tuân theo cấu hình hiện tại của đề.
- Hẹn giờ mở hoạt động đúng giờ mà không cần giáo viên thao tác thêm.

### GV-14. Quản lý bài luyện nghe
- Tạo, sửa, xoá, xuất bản/ẩn bài luyện nghe (trạng thái Nháp / Đã xuất bản / Đã ẩn).
- Hệ thống không có kho bài dựng sẵn: toàn bộ bài luyện do giáo viên tự soạn và đăng tải; có thể gắn bài vào khóa học hoặc để công khai.
- Thông tin bài: tên, trình độ, chủ đề, dạng bài (chép chính tả / trả lời câu hỏi), file audio.
- Nhập **transcript chuẩn**, chia theo câu/đoạn kèm mốc thời gian để học sinh nghe lặp từng câu.
- Có thể tạo transcript nháp từ audio bằng AI; giáo viên bắt buộc duyệt và sửa trước khi xuất bản.
- Cài đặt: giới hạn số lần nghe, cho phép đổi tốc độ phát hay không, có hiển thị transcript sau khi làm hay không (theo GV-13).
- Với dạng trả lời câu hỏi: soạn câu hỏi như GV-05.
- Xem trước và làm thử; xem thống kê số lượt làm, điểm trung bình, các từ/câu bị sai nhiều nhất.

### GV-15. Quản lý bài luyện phát âm
- Tạo, sửa, xoá, xuất bản/ẩn bài luyện phát âm. Bài do giáo viên tự soạn và đăng tải; có thể gắn vào khóa học hoặc để công khai.
- Thông tin bài: tiêu đề, cấp độ (từ / cụm từ / câu / đoạn), chủ đề, âm mục tiêu, văn bản cần đọc (bắt buộc), IPA (tuỳ chọn).
- Audio mẫu: upload giọng người thật hoặc tạo bằng giọng đọc tổng hợp.
- Giọng chuẩn tham chiếu là **Anh-Mỹ (en-US)** cho toàn hệ thống; audio mẫu và IPA theo chuẩn Anh-Mỹ.
- Cài đặt ngưỡng điểm "đạt" và số lần thử tối đa (tuỳ chọn).
- Import danh sách từ/câu từ Excel/CSV.
- Xem trước và làm thử.

### GV-16. Theo dõi kết quả luyện nghe và phát âm
- Xem danh sách lượt luyện của học sinh trong lớp/khóa học của mình, lọc theo bài, học sinh, thời gian.
- Với phát âm: **nghe lại bản ghi âm** của học sinh, xem điểm và phản hồi AI theo từng từ/âm.
- Thêm **nhận xét của giáo viên**, hiển thị cho học sinh cùng phản hồi của AI.
- Đánh dấu "AI phản hồi chưa đúng" để xem xét và cải thiện sau này.
- Thống kê: các âm cả lớp hay sai nhất, học sinh lâu chưa luyện, tiến bộ theo thời gian.
- Thời gian lưu bản ghi âm do Admin chính cấu hình, **mặc định 30 ngày**, sau đó tự xoá.

### GV-17. Quản lý gói học và hạn mức AI *(giai đoạn sau — chưa làm ở bản đầu)*
**Là admin, tôi muốn kiểm soát chi phí AI bằng cách chia học sinh theo gói.**
- Tạo, sửa, ẩn gói học (ví dụ Miễn phí, Cơ bản, Nâng cao). Mỗi gói cấu hình: số lượt chấm phát âm và số lượt phân tích lỗi nghe bằng AI, tính theo ngày hoặc theo tháng; thời hạn gói (tuỳ chọn).
- Đặt **gói mặc định** cho học sinh mới đăng ký.
- Gói được **giáo viên gán theo lớp**, hoặc **học sinh tự đăng ký** các gói được mở cho đăng ký; có thể đặt ngày hết hạn, hết hạn thì tự về gói mặc định.
- Xem thống kê mức sử dụng AI theo học sinh, theo gói, theo ngày/tháng, kèm ước tính chi phí.
- Đặt **ngân sách AI tối đa mỗi tháng** cho toàn hệ thống: khi gần chạm ngưỡng thì cảnh báo admin, khi vượt ngưỡng thì tạm dừng chấm AI (các chức năng khác vẫn hoạt động).
- Trong khi chưa có tính năng này, mọi học sinh dùng chung một hạn mức AI mặc định do Admin chính cấu hình. Chi tiết gói (tên gói, số lượt, ngân sách AI tối đa mỗi tháng) sẽ chốt khi làm giai đoạn này; thanh toán trực tuyến nếu cần sẽ tách riêng.

**Tiêu chí nghiệm thu**
- Học sinh dùng hết hạn mức của gói thì không gọi AI thêm và thấy thông báo rõ ràng.
- Đổi gói có hiệu lực ngay; hạn mức tự làm mới theo ngày/tháng.
- Lượt lỗi do hệ thống (AI hỏng, ghi âm không hợp lệ) không bị trừ khỏi hạn mức.

### GV-18. Kiểu đề thi, cách tính điểm và bộ tiêu chí Writing
**Là giáo viên, tôi muốn chọn kiểu đề phù hợp kỳ thi để cấu trúc và cách tính điểm được thiết lập sẵn.**
- Hệ thống cung cấp sẵn các mẫu kiểu đề: **IELTS**, **TOEIC** và **Khác (tuỳ chỉnh)**. **HSK** bổ sung sau; kiến trúc cho phép thêm kiểu đề mới bằng cấu hình mà không phải sửa lõi hệ thống.
- Mỗi kiểu đề định nghĩa:
  - **Cấu trúc phần mặc định** và thời gian gợi ý (ví dụ IELTS: Listening / Reading / Writing / Speaking; TOEIC: Listening / Reading).
  - **Dạng câu hỏi được phép dùng** (trong danh sách ở HS-05); trình soạn đề chỉ hiện các dạng phù hợp với kiểu đề.
  - **Cách tính điểm**: thang điểm và bảng quy đổi từ số câu đúng sang điểm (ví dụ band 0–9 của IELTS, thang điểm TOEIC theo từng phần và tổng). Bảng quy đổi mặc định chỉ để tham khảo; giáo viên xem và chỉnh được.
  - **Bộ tiêu chí Writing và Speaking** mặc định (ví dụ IELTS Writing và IELTS Speaking, mỗi phần gồm 4 tiêu chí).
- Kiểu **Khác (tuỳ chỉnh)**: giáo viên tự đặt:
  - Các phần và dạng câu hỏi được dùng.
  - Điểm cho từng câu/từng phần và thang điểm tổng (ví dụ 10, 100 hoặc thang riêng).
  - Bảng quy đổi số câu đúng sang điểm (tuỳ chọn) hoặc công thức cộng điểm đơn giản.
  - Điểm đạt (tuỳ chọn) và cách làm tròn.
  - Bộ tiêu chí Writing/Speaking riêng: thêm/sửa/xoá tiêu chí, điểm tối đa và trọng số từng tiêu chí, mô tả các mức điểm.
- Giáo viên lưu cấu hình tuỳ chỉnh thành **mẫu** để dùng lại cho đề khác.
- Điểm của mỗi lượt làm được lưu kèm phiên bản cách tính tại thời điểm chấm. Thay đổi cách tính sau đó chỉ áp dụng cho lượt mới, trừ khi giáo viên chọn "Tính lại điểm" (có ghi log).

**Tiêu chí nghiệm thu**
- Chọn kiểu IELTS thì trình soạn đề gợi ý đúng cấu trúc, chỉ hiện các dạng câu phù hợp, và điểm hiển thị theo thang IELTS.
- Kiểu Khác chấm và ra điểm đúng theo cấu hình giáo viên đặt.
- Thêm kiểu đề mới (như HSK) chỉ cần thêm cấu hình mẫu, không phải sửa mã lõi.

### GV-19. Quản lý lớp và khóa học
**Là giáo viên, tôi muốn tổ chức học sinh thành lớp và khóa học để dễ theo dõi.**
- Tạo, sửa, lưu trữ **lớp**: tên lớp, mô tả, năm/kỳ.
- Tạo, sửa, lưu trữ **khóa học**: tên, mô tả, ảnh bìa, danh sách đề thi và bài luyện (nghe, phát âm) thuộc khóa học, sắp xếp thứ tự.
- Thêm học sinh vào lớp/khóa học bằng mã mời, link mời, nhập email hoặc import danh sách từ Excel; học sinh chưa có tài khoản nhận lời mời đăng ký. Xoá học sinh khỏi lớp/khóa học.
- Gắn một lớp vào khóa học để toàn bộ học sinh của lớp tự có quyền vào khóa học đó.
- Giáo viên **xem tất cả học sinh trong lớp hoặc khóa học do mình tạo**, kèm tiến độ và kết quả (điểm trung bình, số đề đã làm, bài Writing chờ chấm).
- Giáo viên chỉ thấy học sinh và dữ liệu thuộc lớp/khóa học của mình; Admin chính thấy toàn hệ thống.
- *(Giai đoạn sau)* Gán gói học cho cả lớp (GV-17).

**Tiêu chí nghiệm thu**
- Giáo viên A không xem và không truy cập được học sinh, kết quả, bản ghi âm thuộc lớp/khóa học của giáo viên B (kiểm tra ở server, không chỉ ở giao diện).
- Học sinh rời lớp thì mất quyền vào nội dung chỉ dành cho lớp đó, lịch sử làm bài vẫn được giữ.

### GV-20. Soạn đề Speaking và chấm bài Speaking
**Là giáo viên, tôi muốn soạn đề Speaking mô phỏng thi thật và chấm bài của học sinh.**
- Thêm phần Speaking vào đề theo kiểu đề: IELTS có sẵn khung Part 1, Part 2, Part 3; kiểu Khác tự đặt các phần.
- Mỗi câu hỏi có nội dung chữ và **audio câu hỏi** (upload hoặc giọng đọc tổng hợp); Part 2 có **cue card** (chủ đề và các gợi ý ý cần nói).
- Cấu hình: số câu mỗi phần; **thời gian chuẩn bị** và **thời gian nói tối đa** cho từng câu/phần (mặc định theo kiểu đề); ẩn/hiện chữ câu hỏi; cho phép ghi lại câu trả lời hay không; cho học sinh nhờ AI chấm hay không (GV-03).
- Xem bài Speaking của học sinh trong lớp/khóa học của mình: nghe từng câu, xem transcript và đánh giá AI.
- Chấm theo bộ tiêu chí Speaking như GV-11: chấm thủ công, hoặc lấy đánh giá AI làm bản nháp rồi sửa và **Hoàn tất chấm**; học sinh được thông báo.
- Xem các đánh giá AI bị học sinh báo chưa đúng (cả Speaking và Writing) để xử lý và cải thiện.
- Thống kê: điểm trung bình theo tiêu chí, các lỗi thường gặp của lớp.

**Tiêu chí nghiệm thu**
- Soạn được một đề Speaking IELTS đủ 3 phần và học sinh làm bài đúng theo thời gian đã cấu hình.
- Giáo viên nghe lại, chấm theo tiêu chí và xác nhận được điểm chính thức.

---

## 5. Luồng chính

**Luồng 1 — Học sinh làm bài:**
Đăng nhập → Duyệt đề → Xem chi tiết đề → Chọn chế độ → Làm bài (tự lưu) → Nộp bài → Xem kết quả → Xem đáp án chi tiết → (nếu có Writing) chờ giáo viên chấm → Nhận thông báo và xem nhận xét.

**Luồng 2 — Giáo viên tạo đề:**
Đăng nhập admin → Tạo đề (Nháp) → **Chọn kiểu đề (IELTS / TOEIC / Khác)** → Đặt giới hạn số lần làm và phạm vi hiển thị → Thêm phần → Thêm nhóm câu hỏi (kèm audio/đoạn văn) → Thêm câu hỏi (hoặc import Excel) → Xem trước/làm thử → Xuất bản (đáp án mặc định ẩn).

**Luồng 3 — Giáo viên chấm Writing:**
Dashboard → Danh sách bài chờ chấm → Mở bài → (tuỳ chọn) Chấm bằng AI để có bản nháp điểm theo tiêu chí và lỗi → Xem lại, sửa điểm/nhận xét/lỗi → Hoàn tất → Học sinh nhận thông báo.

**Luồng 4 — Giáo viên kiểm soát đáp án:**
Mở cấu hình đề → Chọn chế độ (hiện ngay / ẩn / hẹn giờ) → Lưu → Khi cần bấm **Mở đáp án ngay** → Học sinh thấy đáp án trong lượt làm của mình.

**Luồng 5 — Học sinh luyện nghe:**
Chọn bài luyện nghe → Nghe từng câu (tua, lặp, đổi tốc độ) → Gõ lại nội dung → Nộp → Xem lỗi được đánh dấu kèm giải thích → Nghe lại câu sai.

**Luồng 6 — Học sinh luyện phát âm:**
Chọn bài → Nghe audio mẫu → Ghi âm → Gửi → AI trả điểm và lỗi theo từ/âm → Nghe lại phần sai → Thử lại → Xem tiến bộ.

**Luồng 7 — Giáo viên tổ chức lớp/khóa học:**
Tạo lớp/khóa học → Thêm học sinh (mã mời / email / Excel) → Gắn đề và bài luyện vào khóa học → Theo dõi tiến độ và kết quả của lớp.

**Luồng 8 — Học sinh tham gia lớp/khóa học:**
Đăng ký hoặc đăng nhập → Nhập mã mời → Vào lớp/khóa học → Làm đề và bài luyện được giao (theo giới hạn số lần làm).

**Luồng 9 — Học sinh thi thử Speaking:**
Chọn đề Speaking → Kiểm tra micro → Part 1 (nghe câu hỏi, ghi âm) → Part 2 (xem cue card, chuẩn bị 1 phút, nói) → Part 3 → Nộp → AI đánh giá chạy nền → Thông báo khi xong → Xem transcript, điểm theo tiêu chí, lỗi và nghe lại → (nếu có) Giáo viên chấm và xác nhận.

**Luồng 10 — Học sinh tự nhờ AI chấm Writing:**
Nộp bài Writing → Bấm "Nhờ AI chấm" → Nhận điểm theo tiêu chí và lỗi đánh dấu trên bài (nhãn "Đánh giá AI tham khảo") → Sửa bài ở lần làm sau hoặc chờ giáo viên chấm điểm chính thức.

---

## 6. Mô hình dữ liệu (đề xuất)

| Bảng | Trường chính |
|---|---|
| **users** | id, email, password_hash, full_name, avatar_url, role (`student` / `admin`), status (`active` / `locked`), is_owner, plan_id (giai đoạn sau), plan_expires_at (giai đoạn sau), created_at |
| **tests** | id, title, description, exam_type_id, scoring_config (JSON, dùng cho kiểu "Khác"), writing_rubric_id, speaking_rubric_id, max_attempts (null = không giới hạn), visibility (`public` / `restricted`), allow_student_ai_grading, max_ai_gradings_per_answer, skill, difficulty, duration_minutes, cover_url, status (`draft` / `published` / `hidden`), **answer_visibility** (`show_after_submit` / `hidden` / `scheduled`, mặc định `hidden`), **answer_hide_level** (`keep_correctness` / `score_only`), **answer_release_at**, created_by, created_at |
| **sections** | id, test_id, title, instruction, order_index, duration_minutes, passage_text, audio_url |
| **question_groups** | id, section_id, instruction, passage_text, audio_url, image_url, order_index |
| **questions** | id, group_id, type, content, options (JSON), correct_answers (JSON), points, explanation, order_index |
| **attempts** | id, user_id, test_id, attempt_no, mode, started_at, submitted_at, expires_at, status (`in_progress` / `submitted` / `graded`), total_score |
| **attempt_answers** | id, attempt_id, question_id, answer (JSON), is_correct, score, flagged |
| **reviews** | id, attempt_answer_id, skill (`writing` / `speaking`), reviewer_id, total_score, feedback, status (`draft` / `final`), ai_evaluation_id (bản nháp AI dùng làm cơ sở), show_ai_errors, reviewed_at |
| **favorites** | user_id, test_id |
| **notifications** | id, user_id, type, content, is_read, created_at |
| **listening_exercises** | id, title, level, topic, type (`dictation` / `quiz`), audio_url, max_plays, allow_speed_change, answer_visibility, status, created_by, created_at |
| **listening_segments** | id, exercise_id, order_index, start_ms, end_ms, transcript_text |
| **listening_attempts** | id, user_id, exercise_id, user_text (JSON theo từng đoạn), score, error_analysis (JSON), created_at |
| **pronunciation_exercises** | id, title, level (`word` / `phrase` / `sentence` / `paragraph`), topic, target_sounds, reference_text, ipa, sample_audio_url, accent (cố định `en-US`), pass_score, max_tries, status, created_by |
| **pronunciation_attempts** | id, user_id, exercise_id, audio_url, overall_score, accuracy, fluency, completeness, word_results (JSON), phoneme_errors (JSON), ai_feedback, flagged_wrong, created_at, delete_after |
| **teacher_comments** | id, target_type, target_id, teacher_id, content, created_at |
| **plans** *(giai đoạn sau)* | id, name, pronunciation_quota, listening_ai_quota, quota_period (`day` / `month`), duration_days, is_default, allow_self_enroll, status |
| **class_plans** *(giai đoạn sau)* | class_id, plan_id |
| **ai_usage** | id, user_id, feature (`pronunciation` / `listening` / `writing` / `speaking`), used_at, cost_estimate, is_refunded |
| **system_settings** | key, value (hạn mức AI mặc định mỗi học sinh mỗi ngày, số ngày lưu bản ghi âm = 30, chế độ hiển thị đáp án mặc định = `hidden`...) |
| **audit_logs** | id, actor_id, action, target_type, target_id, created_at |
| **exam_types** | id, code (`ielts` / `toeic` / `custom` / ...), name, allowed_question_types (JSON), default_structure (JSON), scoring_rules (JSON: thang điểm, bảng quy đổi), default_writing_rubric_id, default_speaking_rubric_id, is_system |
| **rubrics** | id, name, owner_id, is_system |
| **rubric_criteria** | id, rubric_id, name, description, max_score, weight, order_index |
| **review_scores** | id, review_id, criterion_id, score, comment |
| **classes** | id, teacher_id, name, description, join_code, status |
| **courses** | id, teacher_id, name, description, cover_url, join_code, status |
| **class_members** | class_id, user_id, joined_at |
| **course_members** | course_id, user_id, joined_at |
| **class_courses** | class_id, course_id |
| **course_items** | id, course_id, item_type (`test` / `listening` / `pronunciation`), item_id, order_index |
| **speaking_responses** | id, attempt_answer_id, question_id, audio_url, transcript, duration_sec, prep_used_sec, delete_after, created_at |
| **ai_evaluations** | id, attempt_answer_id, skill (`writing` / `speaking`), requested_by (`student` / `teacher`), rubric_id, criterion_scores (JSON), total_score, feedback, annotations (JSON: lỗi, loại lỗi, gợi ý sửa), metrics (JSON: tốc độ nói, mức ngập ngừng...), reported_wrong, status, created_at |

---

## 7. Danh sách màn hình

**Khách / Học sinh**
1. Trang chủ
2. Đăng ký / Đăng nhập / Quên mật khẩu
3. Danh sách đề thi (lọc, tìm kiếm)
4. Chi tiết đề thi
5. Màn hình làm bài
6. Màn hình kết quả
7. Xem đáp án chi tiết
8. Lịch sử và thống kê cá nhân
9. Đề yêu thích
10. Hồ sơ cá nhân
11. Thông báo
12. Danh sách bài luyện nghe, màn hình luyện nghe, kết quả lỗi nghe
13. Danh sách bài luyện phát âm, màn hình ghi âm, kết quả phản hồi AI
14. Thống kê lỗi nghe và các âm hay sai
15. Số lượt AI còn lại của tôi (và gói học, khi có)
16. Tham gia lớp/khóa học bằng mã mời; danh sách lớp và khóa học của tôi
17. Thi thử Speaking: kiểm tra micro, màn hình ghi âm từng câu (kèm cue card và đồng hồ chuẩn bị), kết quả và đánh giá AI
18. Nút "Nhờ AI chấm" và màn hình kết quả AI tham khảo cho Writing

**Giáo viên/Admin**
1. Đăng nhập admin
2. Dashboard
3. Danh sách đề thi
4. Trình soạn đề (đề → phần → nhóm câu hỏi → câu hỏi)
5. Import Excel
6. Danh sách học sinh + chi tiết học sinh
7. Danh sách lượt làm bài + chi tiết
8. Thống kê theo đề
9. Danh sách bài chờ chấm + màn hình chấm bài theo tiêu chí (có nút Chấm bằng AI)
10. Quản lý tài khoản quản trị
11. Cấu hình hiển thị đáp án (trong trình soạn đề)
12. Quản lý bài luyện nghe
13. Quản lý bài luyện phát âm
14. Kết quả luyện nghe/phát âm, nghe lại bản ghi âm, nhận xét
15. Quản lý lớp và khóa học (danh sách học sinh, tiến độ, mã mời)
16. Chọn kiểu đề, cấu hình cách tính điểm và bộ tiêu chí Writing
17. Quản lý gói học, gán gói cho lớp, thống kê sử dụng AI (giai đoạn sau)
18. Cài đặt hệ thống (hạn mức AI mặc định, thời gian lưu bản ghi âm)
19. Soạn phần Speaking; xem, chấm và xác nhận bài Speaking; xem báo cáo AI chấm chưa đúng

---

## 8. Yêu cầu phi chức năng

| Nhóm | Yêu cầu |
|---|---|
| **Bảo mật** | Mật khẩu băm (bcrypt/argon2); phân quyền kiểm tra ở **server** cho mọi API (kể cả phạm vi dữ liệu: giáo viên chỉ truy cập học sinh thuộc lớp/khóa học của mình); đáp án đúng không được gửi xuống trình duyệt khi học sinh đang làm bài hoặc khi giáo viên đang ẩn đáp án; chống brute-force đăng nhập; HTTPS. |
| **Hiệu năng** | Trang danh sách tải dưới 2 giây; lưu đáp án không làm gián đoạn thao tác; hỗ trợ tối thiểu 500 học sinh làm bài đồng thời. |
| **Độ tin cậy** | Tự lưu đáp án định kỳ; khôi phục bài làm dở khi tải lại trang; sao lưu cơ sở dữ liệu hằng ngày. |
| **Tương thích** | Chrome, Edge, Firefox, Safari bản mới; giao diện responsive cho điện thoại và máy tính bảng. |
| **Khả dụng** | Giao diện tiếng Việt; thao tác làm bài bằng bàn phím cơ bản. |
| **Kiểm toán** | Ghi log các thao tác quản trị quan trọng (xuất bản/ẩn đề, đổi chế độ hiển thị đáp án, sửa điểm, khoá tài khoản). |
| **AI và âm thanh** | Kết quả chấm phát âm cho câu tối đa 20 từ trả về trong khoảng 5–8 giây; phân tích lỗi nghe trong tối đa 10 giây; luôn có phương án dự phòng khi dịch vụ AI lỗi; giới hạn thời lượng mỗi lần ghi âm theo cấu hình của từng câu và dung lượng file. |
| **Speaking và Writing AI** | Đánh giá AI cho một bài Writing (đến khoảng 400 từ) trả về trong khoảng 30 giây; đánh giá một bài Speaking nhiều câu chạy nền (học sinh nộp xong có thể thoát, kết quả hiện khi xong và có thông báo); mỗi câu trả lời Speaking được tải lên và lưu ngay khi ghi xong để không mất bài khi mất mạng. |
| **Quyền riêng tư** | Bản ghi âm là dữ liệu cá nhân: xin đồng ý trước khi ghi, chỉ chính học sinh và giáo viên/admin được nghe, tự xoá sau thời gian lưu trữ quy định, học sinh có quyền xoá; bắt buộc HTTPS (trình duyệt chỉ cấp quyền micro trên HTTPS). Cần rà soát điều khoản của nhà cung cấp AI về việc lưu và sử dụng dữ liệu âm thanh. |
| **Chi phí** | Giới hạn số lượt gọi AI theo hạn mức mặc định của từng học sinh và giáo viên (sau này theo gói học, GV-17) và theo ngân sách tối đa mỗi tháng của toàn hệ thống (khi có); theo dõi mức sử dụng; cảnh báo admin khi gần chạm ngưỡng và tạm dừng chấm AI khi vượt ngưỡng. |

### Ghi chú giải pháp AI (đề xuất kỹ thuật, cần thử nghiệm trước khi chốt)

| Chức năng | Hướng tiếp cận |
|---|---|
| Chấm phát âm | Dùng dịch vụ **đánh giá phát âm chuyên dụng** cho điểm theo từng từ/âm (ví dụ Azure AI Speech – Pronunciation Assessment hoặc dịch vụ tương đương), đặt chuẩn phát âm Anh-Mỹ (en-US). Không nên chỉ dùng nhận dạng giọng nói thông thường (speech-to-text): các mô hình này hay tự đoán và "sửa" từ bị phát âm sai nên khó phát hiện lỗi. |
| Giải thích lỗi phát âm | Đưa kết quả từ dịch vụ trên (từ, âm sai, điểm) vào một mô hình ngôn ngữ (LLM) để sinh lời khuyên ngắn bằng tiếng Việt. LLM chỉ giải thích, **không** tự chấm âm thanh. |
| Lỗi nghe chép | Đối chiếu từng từ với transcript bằng thuật toán so khớp (diff): chạy tức thì, không cần AI. Sau đó dùng LLM phân loại nguyên nhân và giải thích. |
| Transcript nháp | Dùng speech-to-text tạo bản nháp từ audio, giáo viên duyệt lại. |
| Chấm Writing và chỉ lỗi | Dùng mô hình ngôn ngữ (LLM) nhận bài viết, đề bài và bộ tiêu chí (rubric) của đề, trả về dữ liệu có cấu trúc gồm điểm từng tiêu chí, nhận xét và danh sách lỗi (vị trí, loại lỗi, gợi ý sửa, giải thích). Với giáo viên, kết quả là bản nháp để duyệt. Với học sinh tự nhờ AI chấm, kết quả được gắn nhãn "đánh giá AI tham khảo" và tách khỏi điểm chính thức, vì điểm AI có thể lệch so với giám khảo thật. |
| Chấm Speaking | Ghi âm từng câu, chuyển thành văn bản (speech-to-text) để có transcript. Tiêu chí Pronunciation dùng dịch vụ đánh giá phát âm chuyên dụng (dùng lại giải pháp của HS-13, chuẩn Anh-Mỹ). Các tiêu chí Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy do LLM đánh giá dựa trên transcript, kèm số liệu như tốc độ nói và mức ngập ngừng. Lưu ý: transcript có thể bỏ sót hoặc tự sửa lỗi của người nói nên điểm Speaking bằng AI kém chắc chắn hơn Writing; cần thử nghiệm với giọng học sinh Việt trước khi công bố tính năng. |
| Audio mẫu | Ưu tiên giọng người thật; hoặc giọng đọc tổng hợp (TTS). |

Lưu ý: AI có thể chấm sai, nhất là với giọng người Việt và từ khó. Vì vậy hệ thống có nút "báo lỗi AI" (GV-16) và nhận xét của giáo viên. Cần thử nghiệm với vài giọng học sinh thật và kiểm tra chi phí, điều khoản hiện hành của nhà cung cấp trước khi chọn.

---

## 9. Lộ trình đề xuất

| Giai đoạn | Nội dung | Kết quả |
|---|---|---|
| **1. Nền tảng** | Đăng ký/đăng nhập, phân quyền 2 vai trò (kèm Admin chính), lớp và khóa học (GV-19, HS-14), khung giao diện | Đăng nhập được, giáo viên tạo lớp/khóa học và thêm học sinh |
| **2. Soạn đề** | GV-03 đến GV-08, GV-18 (quản lý đề, kiểu đề IELTS/TOEIC/Khác và cách tính điểm, phần, câu hỏi, upload, xem trước, giới hạn số lần làm) | Giáo viên tạo và xuất bản được một đề hoàn chỉnh đúng kiểu đề |
| **3. Làm bài** | HS-02 đến HS-07, GV-13 (duyệt đề, làm bài, chấm tự động, xem đáp án, ẩn/hiện đáp án) | Học sinh làm và xem kết quả trọn vẹn, giáo viên kiểm soát được việc xem đáp án |
| **4. Chấm & thống kê** | HS-08, HS-09, GV-09 đến GV-11 | Chấm Writing theo tiêu chí có AI hỗ trợ, thống kê học sinh và đề |
| **5. Luyện nghe** | HS-12, GV-14 | Nghe chép chính tả và nghe trả lời câu hỏi, AI giải thích lỗi nghe; hạn mức AI mặc định |
| **6. Luyện phát âm AI** | HS-13, GV-15, GV-16 | Ghi âm, chấm và hướng dẫn sửa phát âm bằng AI theo chuẩn Anh-Mỹ |
| **7. Speaking & AI chấm Writing cho học sinh** | HS-15, HS-16, GV-20 | Thi thử Speaking đầy đủ có AI đánh giá; học sinh tự nhờ AI chấm Writing |
| **8. Hoàn thiện** | Thông báo, import Excel, log kiểm toán, tối ưu, kiểm thử | Sẵn sàng đưa vào sử dụng |
| **9. Gói học (sau MVP)** | GV-17 | Gói học theo lớp hoặc tự đăng ký, ngân sách AI theo gói |
| **10. Kiểu đề HSK (sau MVP)** | Thêm mẫu kiểu đề HSK theo GV-18 | Hỗ trợ đề HSK |

> Khuyến nghị: thử nghiệm sớm (từ giai đoạn 3) dịch vụ chấm phát âm với vài giọng học sinh Việt để chọn nhà cung cấp trước khi bắt đầu giai đoạn 6 và 7 (Speaking cũng dùng dịch vụ này), vì đây là phần rủi ro kỹ thuật và chi phí cao nhất.

---

## 10. Tiêu chí nghiệm thu MVP

- [ ] Giáo viên tạo được một đề gồm ít nhất 2 phần với đủ các dạng câu hỏi ở mục HS-05 và xuất bản được.
- [ ] Học sinh đăng ký, làm bài có tính giờ, nộp bài và thấy điểm cùng đáp án chi tiết.
- [ ] Tải lại trang giữa chừng không mất bài làm.
- [ ] Bài Writing được giáo viên chấm và học sinh xem được nhận xét.
- [ ] Học sinh không truy cập được trang quản trị và không xem được dữ liệu của người khác.
- [ ] Giáo viên xem được kết quả toàn bộ học sinh và xuất báo cáo.
- [ ] Giáo viên ẩn đáp án của một đề thì học sinh chỉ thấy phần được phép; dữ liệu đáp án bị ẩn không có trong phản hồi API; mở đáp án (ngay hoặc hẹn giờ) có hiệu lực đúng lúc.
- [ ] Học sinh làm được một bài nghe chép chính tả và thấy từ sai/thiếu/thừa được đánh dấu kèm giải thích.
- [ ] Học sinh ghi âm một câu, nhận điểm và lỗi theo từng từ/âm kèm cách sửa, rồi thử lại và thấy điểm thay đổi.
- [ ] Giáo viên nghe lại bản ghi âm, xem phản hồi AI và thêm nhận xét cho học sinh.
- [ ] Khi dịch vụ AI gặp sự cố, hệ thống báo rõ và không mất bài làm hay trừ lượt luyện của học sinh.
- [ ] Bài luyện phát âm được chấm theo chuẩn Anh-Mỹ và audio mẫu là giọng Anh-Mỹ.
- [ ] Mỗi học sinh có hạn mức lượt chấm AI mặc định mỗi ngày; dùng hết thì không được chấm thêm và thấy thông báo rõ (gói học: giai đoạn sau).
- [ ] Giáo viên tạo được đề IELTS, TOEIC và Khác; điểm tính đúng theo kiểu đề, kiểu Khác chấm đúng theo cách giáo viên tự đặt.
- [ ] Đề mới tạo có đáp án mặc định ở chế độ ẩn.
- [ ] Giáo viên đặt giới hạn số lần làm (hoặc không giới hạn); học sinh hết lượt không bắt đầu được lượt mới nhưng vẫn xem được kết quả cũ.
- [ ] Giáo viên tạo lớp/khóa học, thêm học sinh và chỉ xem được học sinh thuộc lớp/khóa học của mình; giáo viên khác không truy cập được.
- [ ] Giáo viên chấm Writing theo từng tiêu chí, dùng AI tạo bản nháp điểm và chỉ lỗi, chỉnh sửa rồi mới công bố cho học sinh.
- [ ] Bản ghi âm tự xoá sau 30 ngày (mặc định).
- [ ] Học sinh làm được một bài thi thử Speaking đủ Part 1-2-3 (kiểm tra micro, thời gian chuẩn bị Part 2, ghi âm từng câu) và nhận điểm theo 4 tiêu chí kèm transcript và nhận xét.
- [ ] Học sinh nhờ AI chấm bài Writing của mình và nhận kết quả có nhãn "đánh giá AI tham khảo", tách khỏi điểm chính thức của giáo viên.
- [ ] Giáo viên tắt tính năng nhờ AI chấm cho một đề thì học sinh không thấy nút "Nhờ AI chấm" ở đề đó.
- [ ] Mất mạng giữa bài Speaking không làm mất các câu đã ghi.

---

## 11. Quyết định đã chốt và câu hỏi còn mở

### 11.1 Đã chốt
1. **Kiểu đề thi:** hỗ trợ IELTS, TOEIC; HSK bổ sung sau; kiểu **Khác** cho giáo viên tự tuỳ chỉnh cách chấm và ra điểm (GV-18).
2. **Chế độ hiển thị đáp án mặc định** khi tạo đề mới là **Ẩn** (GV-13).
3. **Phạm vi giáo viên:** giáo viên xem tất cả học sinh trong lớp hoặc khóa học do mình tạo (GV-19).
4. **Giới hạn số lần làm:** giáo viên đặt số lần tối đa hoặc không giới hạn khi tạo đề (GV-03).
5. **Writing:** chấm theo bộ tiêu chí riêng (ví dụ 4 tiêu chí IELTS); giáo viên có thể dùng AI để chấm nháp và chỉ lỗi (GV-11).
6. **Gói học:** làm ở giai đoạn sau; gói được giáo viên gán theo lớp hoặc học sinh tự đăng ký (GV-17).
7. **Bản ghi âm:** lưu mặc định **30 ngày**.
8. **Bài luyện nghe và phát âm:** do giáo viên tự soạn và đăng tải, không có kho bài dựng sẵn.
9. **Giọng chuẩn:** Anh-Mỹ.
10. **Speaking:** thi thử Speaking đầy đủ (ví dụ IELTS Part 1-2-3), AI đánh giá theo tiêu chí (HS-15, GV-20).
11. **Writing:** học sinh được tự nhờ AI chấm bài của mình (HS-16).

### 11.2 Còn mở (PRD đang tạm giả định như ghi chú)
1. Khi đề ở chế độ Ẩn, mức ẩn mặc định là gì? *(Đang giả định: ẩn đáp án đúng và giải thích, vẫn cho xem câu đúng/sai.)*
2. Lượt làm bài tính khi học sinh **bắt đầu** làm hay khi **nộp bài**? Giới hạn có áp dụng cho chế độ luyện từng phần không? *(Đang giả định: tính khi bắt đầu, áp dụng cho mọi lượt làm đề.)*
3. Giáo viên thường có được khoá tài khoản học sinh không? *(Đang giả định: chỉ Admin chính; giáo viên chỉ xoá học sinh khỏi lớp/khóa học của mình.)*
4. Lớp và khóa học khác nhau thế nào trong thực tế của bạn? *(Đang giả định: lớp là nhóm học sinh, khóa học là tập hợp đề và bài luyện; một lớp có thể gắn vào khóa học.)*
5. Tính năng học sinh tự nhờ AI chấm Writing/Speaking mặc định **bật** hay **tắt** khi tạo đề? *(Đang giả định: bật, giáo viên tắt với bài kiểm tra chính thức.)*
6. Bảng quy đổi điểm mặc định cho IELTS (Academic hay General Training) và TOEIC: dùng bảng nào làm mẫu?
7. Speaking bản đầu dùng bộ câu hỏi soạn sẵn phát tự động. Có cần giám khảo AI trò chuyện trực tiếp, tự hỏi tiếp theo câu trả lời, ở giai đoạn sau không?
8. Điểm AI (tham khảo) có được tính vào bảng điểm chính thức không? *(Đang giả định: không, cho đến khi giáo viên xác nhận.)*
