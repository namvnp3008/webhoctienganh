# TECHNICAL SPECIFICATION: LUMINA ENGLISH PLATFORM

**Tài liệu:** Bảng Đặc Tả Kỹ Thuật & Kế Hoạch Triển Khai Toàn Diện  
**Phiên bản:** v1.0 (Official Specification Baseline)  
**Quy trình:** Autonomous AI Developer Pipeline (`/startcycle`)  
**Tác giả:** Senior Software Engineer & Product Manager  
**Dự án:** Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI (`Lumina English`)  
**Repository GitHub:** [https://github.com/namvnp3008/webhoctienganh](https://github.com/namvnp3008/webhoctienganh)  
**Tài liệu nền tảng:** [PRD.md](file:///d:/demomcp/PRD.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md), [PLAN.md](file:///d:/demomcp/PLAN.md)  

---

## 1. TỔNG QUAN HỆ THỐNG VÀ MỤC TIÊU DỰ ÁN

Hệ thống **Lumina English** là nền tảng luyện thi chứng chỉ tiếng Anh trực tuyến (IELTS & TOEIC) mô phỏng tiêu chuẩn phòng thi máy tính quốc tế (Computer-based Test - CBT) kết hợp công nghệ Trí tuệ Nhân tạo đa phương thức:
1. **Phòng thi trực tuyến (Split-view Exam Room):** Đọc bài đọc/nghe audio song song làm câu hỏi, đồng hồ đếm ngược server-side, tự động lưu câu trả lời (auto-save), bảo vệ đáp án tuyệt đối (`AnswerSanitizerInterceptor`).
2. **Trợ lý AI chấm Writing & Speaking:**
   - **Writing:** Đánh giá 4 tiêu chí IELTS Rubric (TR, CC, LR, GRA) bằng Google Gemini 2.5 Flash, chỉ rõ lỗi ngữ pháp/từ vựng kèm đề xuất sửa đổi và giải thích tiếng Việt.
   - **Speaking:** Mô phỏng 3 phần thi với Giám khảo ảo, thu âm câu trả lời, phân tích độ trôi chảy, phát âm bằng Azure AI Speech SDK kết hợp Gemini Rubric.
3. **Phòng Luyện Kỹ Năng (AI Labs):**
   - **Dictation Lab:** Luyện nghe chép chính tả từng câu, đối chiếu diff trực quan (thiếu/thừa/sai), Gemini giải thích lỗi đồng âm, nuốt âm.
   - **Pronunciation Lab:** Đánh giá phát âm chuẩn giọng Anh - Mỹ (en-US) đến từng âm vị (phoneme), hiển thị khẩu hình và mẹo phát âm tiếng Việt.
4. **Cổng Quản Trị Giáo Viên & Lớp Học:**
   - Soạn đề thi 4 cấp (Test → Section → Question Group → Question), import đề từ Excel.
   - Quản lý học sinh theo Lớp (Class) và Khoá học (Course) bằng mã mời (Join Code 6 ký tự), phân lập dữ liệu nghiêm ngặt (`TeacherScopeGuard`).
   - Phòng chấm bài theo Rubric: Nạp kết quả AI chấm nháp để giáo viên kiểm duyệt, chỉnh sửa và công bố điểm chính thức.

---

## 2. KIẾN TRÚC KỸ THUẬT & HẠ TẦNG TRIỂN KHAI (TECH STACK & CLOUD)

### 2.1 Tech Stack Tiêu Chuẩn
- **Frontend SPA:** React 18 + Vite + TypeScript + TailwindCSS.
  - Design Tokens: `Lumina English Design System` (Dark mode `#0F172A`, Primary Indigo `#4F46E5`, Success Emerald `#10B981`, Warning Amber `#F59E0B`, Bo góc 8px).
  - Icons: `lucide-react`.
  - State Management: `zustand` (lưu phiên thi client-side + localStorage backup) + `@tanstack/react-query`.
- **Backend API:** NestJS (TypeScript) kiến trúc Modular Monolith.
  - ORM: Prisma ORM v5+.
  - Bảo mật: JWT Access Token (15m) + Refresh Token (7d), Bcrypt password hashing.
  - Phân quyền: `JwtAuthGuard`, `RolesGuard`, `TeacherScopeGuard`.
  - Bảo vệ đáp án: `AnswerSanitizerInterceptor` (triệt tiêu `correct_answers` và `explanation` khi đề ở trạng thái Ẩn).
- **Hàng đợi & Tác vụ nền:** Redis BullMQ xử lý tác vụ chấm âm thanh và dọn dẹp file ghi âm sau 30 ngày (`@Cron('0 2 * * *')`).

### 2.2 Hạ Tầng Triển Khai Đám Mây (Cloud Deployment via MCP)
Theo yêu cầu bắt buộc của dự án, toàn bộ hạ tầng được khởi tạo và cấu hình tự động thông qua giao thức MCP (Model Context Protocol):

| Thành Phần | Nhà Cung Cấp | Cơ Chế Cấu Hình & Triển Khai | Thông Số Cấu Hình |
|---|---|---|---|
| **Cơ sở dữ liệu (Database)** | **Supabase** (PostgreSQL 16) | MCP Server `supabase`<br>• `create_project`<br>• `execute_sql` / `apply_migration` | • **Organization:** `namvnp3008's Org` (`dybhwhimskifqjpeilqb`)<br>• **Project Name:** `lumina-english-db`<br>• **Region:** `ap-southeast-1` (Singapore)<br>• Khởi tạo toàn bộ DDL lược đồ bảng quan hệ Prisma |
| **Máy chủ Ứng dụng (Backend API)** | **Render** | MCP Server `render`<br>• `create_web_service` | • **Workspace:** `tea-daqekvgu01pc73ft0js0`<br>• **Service Name:** `lumina-english-api`<br>• **Runtime:** `node`<br>• **Repo:** `https://github.com/namvnp3008/webhoctienganh`<br>• **Branch:** `main`<br>• **Region:** `singapore`<br>• **Build:** `cd backend && npm install && npx prisma generate && npm run build`<br>• **Start:** `cd backend && npm run start:prod`<br>• **Env Vars:** `DATABASE_URL` (Supabase connection string), `JWT_SECRET`, `PORT=3000` |
| **Giao diện Người dùng (Frontend)** | **Localhost / Static Host** | Build bundle Vite SPA | Sẵn sàng host local (`npm run dev`) và triển khai Static Site trên Render khi có yêu cầu. |

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU CHI TIẾT (PRISMA SCHEMA DDL)

Cơ sở dữ liệu trên Supabase bao gồm 13 bảng quan hệ chặt chẽ:
1. `users`: Tài khoản người dùng (Học sinh, Giáo viên, Admin Owner), hạn mức `daily_ai_quota`.
2. `exam_types`: Cấu hình kiểu đề chuẩn (IELTS, TOEIC, Khác) và bảng quy đổi điểm.
3. `tests`: Ngân hàng đề thi, thời lượng, số lần làm tối đa, cấu hình hiển thị đáp án (`show_after_submit`, `hidden`, `scheduled`).
4. `sections`: Các phần thi của đề (Section 1-4 Listening, Passage 1-3 Reading, Task 1-2 Writing, Part 1-3 Speaking).
5. `question_groups`: Nhóm câu hỏi có chung đoạn văn bản, hình ảnh hoặc audio nghe.
6. `questions`: Câu hỏi chi tiết (7 dạng: single_choice, multiple_choice, fill_blank, matching, true_false_ng, writing, speaking).
7. `attempts`: Lượt làm bài của học sinh, ghi nhận `started_at`, `expires_at`, `submitted_at`, điểm tổng.
8. `attempt_answers`: Chi tiết câu trả lời từng câu, điểm số, cờ xem lại (`flagged`).
9. `speaking_responses`: File ghi âm câu trả lời Speaking của thí sinh, hạn xoá file (`delete_after` = 30 ngày).
10. `ai_evaluations`: Bản đánh giá chi tiết từ AI (điểm tiêu chí, mảng sửa lỗi inline annotations, nhận xét tiếng Việt).
11. `reviews` & `review_scores`: Bản chấm điểm chính thức của giáo viên theo Rubric.
12. `classes` & `class_members`: Quản lý lớp học khép kín và mã mời `join_code`.
13. `courses` & `course_items`: Khoá học bao gồm danh mục đề thi và bài luyện.

---

## 4. MA TRẬN API ENDPOINTS CHÍNH (RESTFUL API SPEC)

### 4.1 Authentication & Profile
- `POST /api/auth/register`: Đăng ký tài khoản học sinh.
- `POST /api/auth/login`: Đăng nhập, trả về Access Token + Refresh Token + Profile.
- `GET /api/users/me`: Lấy thông tin cá nhân và số lượt AI còn lại trong ngày.

### 4.2 Tests & Catalog
- `GET /api/tests`: Danh sách đề thi có phân trang, bộ lọc kỹ năng, kiểu đề, độ khó.
- `GET /api/tests/:id`: Chi tiết đề thi (đã lọc bỏ đáp án nếu người dùng là học sinh).
- `POST /api/admin/tests`: Giáo viên tạo đề thi mới.
- `PUT /api/admin/tests/:id/answer-visibility`: Đổi chế độ ẩn/hiện đáp án.

### 4.3 Exam Taking Engine & Results
- `POST /api/attempts/start`: Bắt đầu lượt làm bài, khởi tạo đồng hồ server `expires_at`.
- `POST /api/attempts/:id/auto-save`: Lưu tạm thời mảng câu trả lời khi đang làm bài.
- `POST /api/attempts/:id/submit`: Nộp bài thi, tự động tính điểm trắc nghiệm tức thì.
- `GET /api/attempts/:id/result`: Xem kết quả bài làm (được bọc bởi `AnswerSanitizerInterceptor`).

### 4.4 AI Evaluation & Practice Labs
- `POST /api/evaluations/writing`: Học sinh yêu cầu AI chấm bài viết Writing.
- `POST /api/dictation/evaluate`: So khớp diff từ vựng và giải thích lỗi nghe chép chính tả.
- `POST /api/pronunciation/evaluate`: Chấm phát âm en-US và đưa ra hướng dẫn khẩu hình.
- `POST /api/admin/reviews`: Giáo viên lưu nháp / hoàn tất chấm bài Rubric.

### 4.5 Class Management
- `POST /api/classes`: Giáo viên tạo lớp học mới, sinh mã mời 6 ký tự ngẫu nhiên.
- `POST /api/classes/join`: Học sinh nhập mã mời tham gia lớp học.
- `POST /api/admin/students/:userId/grant-retake`: Giáo viên cấp thêm lượt làm bài cho học sinh.

---

## 5. KẾ HOẠCH TRIỂN KHAI THEO CHU TRÌNH AUTONOMOUS PIPELINE

Theo đúng quy trình `/startcycle`:
1. **Bước 1: Product Manager Spec Approval (Hiện tại):**
   - Trình bày đặc tả kỹ thuật `Technical_Specification.md`.
   - Chờ người dùng phê duyệt xác nhận ("Approved").
2. **Bước 2: Full-Stack Engineer (`generate_code.md`):**
   - Khởi tạo cấu trúc dự án chuẩn (`backend/` với NestJS + Prisma, `frontend/` với React + Vite + TailwindCSS).
   - Lập trình trọn vẹn Database Schema, Business Logic Services, Controllers, Guards, Interceptors, và UI Components.
3. **Bước 3: QA Engineer (`audit_code.md`):**
   - Kiểm tra chất lượng mã nguồn: Type checking (`tsc --noEmit`), build test, kiểm tra chống rò rỉ đáp án, kiểm tra đa người dùng Teacher Scope.
4. **Bước 4: DevOps Master (`deploy_app.md`):**
   - Khởi tạo Database trên **Supabase** bằng MCP Tool `create_project`.
   - Áp dụng migration DDL vào Supabase Database bằng `execute_sql`.
   - Khởi tạo Web Service trên **Render** bằng MCP Tool `create_web_service` gắn với GitHub repository `namvnp3008/webhoctienganh`.
   - Cấu hình Environment Variables (`DATABASE_URL`, `JWT_SECRET`, v.v.).
   - Khởi chạy frontend và bàn giao link hoạt động cho người dùng.

---

## 6. ĐIỀU KIỆN CHẤP THUẬN (APPROVAL CRITERIA)

Vui lòng rà soát tài liệu đặc tả trên. Khi bạn hài lòng với cấu trúc và kế hoạch triển khai, vui lòng gõ **"Approved"** (hoặc phản hồi góp ý điều chỉnh) để hệ thống kích hoạt tự động sang **Bước 2: Lập trình toàn diện (Full-Stack Engineer)**.
