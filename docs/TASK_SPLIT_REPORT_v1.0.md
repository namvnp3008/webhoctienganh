# BÁO CÁO CÔNG VIỆC: PHÂN RÃ CHI TIẾT CÁC NHIỆM VỤ THEO GIAI ĐOẠN (TASK BREAKDOWN REPORT)

**Mã báo cáo:** `DOC-REP-20260924-V1.0`  
**Phiên bản:** v1.0  
**Ngày lập:** 24/09/2026  
**Người thực hiện:** Senior Software Engineer / PM & BA  
**Dự án:** Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI  
**Tài liệu liên kết:** [PLAN.md](file:///d:/demomcp/PLAN.md), [PRD.md](file:///d:/demomcp/PRD.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md)

---

## 1. MỤC TIÊU BÁO CÁO

Báo cáo này ghi nhận việc thực hiện yêu cầu phân rã chi tiết toàn bộ các nhiệm vụ (Task Breakdown) cho từng giai đoạn (Phase) trong dự án theo đúng quy trình chuẩn hóa:
$$\text{Phase 1: Planning} \longrightarrow \text{Phase 2: Design (Google Stitch)} \longrightarrow \text{Phase 3: Code (React + NestJS)}$$

---

## 2. NỘI DUNG VÀ CHI TIẾT CÁC THAY ĐỔI TRONG `PLAN.md`

Tài liệu [PLAN.md](file:///d:/demomcp/PLAN.md) đã được nâng cấp lên **Phiên bản 2.1**, bổ sung hệ thống mã định danh Task ID duy nhất, mô tả chi tiết, tiêu chí nghiệm thu và trạng thái thực hiện cho từng giai đoạn:

### 2.1 Phase 1: Planning & Foundation (4 Tasks — 100% Hoàn Tất)
- `TSK-P1-01`: Phân tích Yêu cầu Nghiệp vụ (BA Analysis) — *Đã hoàn tất [x]*
- `TSK-P1-02`: Biên soạn Tài liệu Yêu cầu Sản phẩm ([PRD.md](file:///d:/demomcp/PRD.md)) — *Đã hoàn tất [x]*
- `TSK-P1-03`: Thiết kế Kiến trúc Kỹ thuật ([TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md)) — *Đã hoàn tất [x]*
- `TSK-P1-04`: Lập Kế hoạch Triển khai ([PLAN.md](file:///d:/demomcp/PLAN.md)) — *Đã hoàn tất [x]*

### 2.2 Phase 2: Design Trọn Vẹn 37 Màn Hình Trên Google Stitch (39 Tasks)
Phân rã thành 5 Batches thiết kế logic theo đúng quyết định đã thống nhất:
- **Bước Nền Tảng:** `TSK-P2-00` — Khởi tạo Project Stitch & Thiết lập Design System `Lumina English Design System`.
- **Batch 1 (6 screens):** `TSK-P2-01` đến `TSK-P2-06` (`STU-01` đến `STU-05`, `ADM-01`) — Trang chủ, Đăng ký/Đăng nhập, Quên mật khẩu, Danh mục đề thi, Chi tiết đề thi, Đăng nhập Admin.
- **Batch 2 (6 screens):** `TSK-P2-07` đến `TSK-P2-12` (`STU-06` đến `STU-09`, `ADM-06`, `ADM-07`) — Phòng thi Trực tuyến Split-view, Phòng thi Writing, Phòng thi Speaking Mic Check & Simulator, Trình soạn cấu trúc đề và câu hỏi chi tiết.
- **Batch 3 (6 screens):** `TSK-P2-13` đến `TSK-P2-18` (`STU-10` đến `STU-12`, `STU-14`, `STU-16`, `STU-18`) — Bảng điểm tổng quan, Tra cứu đáp án chi tiết (chế độ ẩn/hiện), Kết quả chấm Writing/Speaking Rubric & AI, Dictation Lab, Pronunciation Lab, Hồ sơ cá nhân.
- **Batch 4 (9 screens):** `TSK-P2-19` đến `TSK-P2-27` (`ADM-02` đến `ADM-05`, `ADM-08`, `ADM-09`, `ADM-16`, `ADM-17`, `ADM-19`) — Dashboard Giáo viên, Quản lý đề thi, Cấu hình hiển thị đáp án, Soạn đề Speaking chuyên biệt, Import Excel hàng loạt, Thống kê phổ điểm đề thi, Quản lý bài luyện, Cài đặt hệ thống & Hạn mức AI.
- **Batch 5 (10 screens):** `TSK-P2-28` đến `TSK-P2-37` (`ADM-10` đến `ADM-15`, `ADM-18`, `STU-13`, `STU-15`, `STU-17`) — Hàng đợi bài chờ chấm, Phòng chấm Writing Rubric, Phòng chấm Speaking Rubric, Quản lý Lớp & Khoá học, Quản lý học sinh & Cấp lượt thi, Quản lý tài khoản giáo viên, Danh mục bài luyện nghe & phát âm, Lớp học của tôi.
- **Cổng Nghiệm Thu:** `TSK-P2-38` — Audit toàn diện 37/37 màn hình Stitch trước khi chuyển sang Code.

### 2.3 Phase 3: Code — Chuyển Đổi Design Sang React Components & NestJS Backend (36 Tasks)
Phân rã thành 7 chặng phát triển chuyên sâu:
- **Stage 3.1: Nền tảng Frontend & Tokens (4 tasks):** `TSK-P3-01` đến `TSK-P3-04` (Khởi tạo Vite SPA, trích xuất Tokens vào `tailwind.config.js`, xây dựng thư viện React UI Base Atoms, Audio & Waveform Visualizer components).
- **Stage 3.2: Hạ tầng Backend & Auth (4 tasks):** `TSK-P3-05` đến `TSK-P3-08` (Docker compose, Prisma schema & migrations, Auth module JWT/Google OAuth, RBAC & `TeacherScopeGuard`).
- **Stage 3.3: Phân hệ Đề thi & Phòng thi (6 tasks):** `TSK-P3-09` đến `TSK-P3-14` (Test Management API, Import Excel, Exam Attempt Engine, `AnswerSanitizerInterceptor`, React Exam Room, React Result View).
- **Stage 3.4: Chấm Writing & Speaking với AI (7 tasks):** `TSK-P3-15` đến `TSK-P3-21` (Redis BullMQ, S3 Presigned URL, Speaking Simulator React, Gemini Writing prompt, Speaking background worker, Chấm AI tham khảo cho học sinh, Phòng chấm Rubric cho giáo viên).
- **Stage 3.5: Luyện Phát âm & Nghe chép AI (6 tasks):** `TSK-P3-22` đến `TSK-P3-27` (Diff engine Dictation, Gemini giải thích lỗi nghe, Dictation Lab UI, Azure Speech Pronunciation Assessment SDK, Pronunciation Lab UI, Quản lý daily AI quota).
- **Stage 3.6: Quản lý Lớp học, Cấp lượt thi & Tự động hoá (5 tasks):** `TSK-P3-28` đến `TSK-P3-32` (Quản lý Lớp & Khoá học, Cấp thêm lượt thi Grant Retake, Cron job dọn dẹp file âm thanh 30 ngày, Thống kê phổ điểm đề thi, Quản trị Owner).
- **Stage 3.7: Kiểm thử & Triển khai Release (4 tasks):** `TSK-P3-33` đến `TSK-P3-36` (Kiểm thử tải 500 CCU, Kiểm thử bảo mật IDOR, E2E testing toàn luồng, CI/CD pipeline).

---

## 3. TỔNG HỢP CÁC CHỈ SỐ KẾ HOẠCH

| Giai Đoạn | Số Lượng Tasks | Tỷ Lệ Hoàn Thành | Cột Mốc Bàn Giao Kế Tiếp |
|---|:---:|:---:|---|
| **Phase 1: Planning** | 4 tasks | **100%** (`4/4`) | Đã hoàn tất phê duyệt tài liệu nền tảng. |
| **Phase 2: Design (Stitch)** | 39 tasks | **0%** (`0/39`) | Bắt đầu khởi tạo `TSK-P2-00` (Setup Stitch Project & Design System). |
| **Phase 3: Code** | 36 tasks | **0%** (`0/36`) | Sẵn sàng triển khai ngay khi Phase 2 được nghiệm thu. |
| **Toàn bộ dự án** | **79 tasks** | **5.1%** (`4/79`) | — |

---

## 4. BƯỚC HÀNH ĐỘNG TIẾP THEO

Theo lộ trình đã được duyệt, bước tiếp theo là thực thi **Task `TSK-P2-00`**:
1. Sử dụng Google Stitch MCP để tạo dự án thiết kế mới (`create_project`).
2. Khởi tạo Design System tokens (`create_design_system`) theo bảng màu `Lumina English Design System`.
3. Tiến hành thiết kế các màn hình thuộc **Batch 1** (`TSK-P2-01` đến `TSK-P2-06`).
