# BÁO CÁO KIỂM TRA HIỆN TRẠNG THIẾT KẾ GOOGLE STITCH (STITCH DESIGN AUDIT REPORT)

**Mã báo cáo:** `DOC-REP-20260927-V1.0`  
**Phiên bản:** v1.0  
**Ngày lập:** 27/09/2026  
**Người thực hiện:** Senior Software Engineer  
**Dự án:** Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI (`Lumina English`)  
**Tài liệu đối chiếu:** [PRD.md](file:///d:/demomcp/PRD.md), [PLAN.md](file:///d:/demomcp/PLAN.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md), [PHASE2_STITCH_IMPLEMENTATION_v2.0.md](file:///d:/demomcp/docs/PHASE2_STITCH_IMPLEMENTATION_v2.0.md)

---

## 1. MỤC TIÊU VÀ PHẠM VI KIỂM TRA

Theo yêu cầu từ người dùng: *"Kiểm tra thiết kế trên Stitch đã đầy đủ 76 trang chưa"*.  
Đội ngũ kỹ sư dự án đã tiến hành truy vấn trực tiếp qua Google Stitch MCP, kiểm tra toàn bộ workspace, dự án, các màn hình hiện có và đối chiếu với hệ thống tài liệu nền tảng ([PRD.md](file:///d:/demomcp/PRD.md) và [PLAN.md](file:///d:/demomcp/PLAN.md)).

---

## 2. KẾT QUẢ KIỂM TRA TRỰC TIẾP TRÊN GOOGLE STITCH

- **Dự án kiểm tra:** `Lumina English - AI Exam Prep Platform`
- **Stitch Project ID:** `12086767744907733135` (`projects/12086767744907733135`)
- **Design System Asset:** `assets/5502260407726081896` (`Lumina English Design System`)
- **Tổng số màn hình thực tế hiện có trên Stitch:** **11 màn hình** (screens/instances).

### Danh mục chi tiết 11 màn hình hiện có trên Google Stitch:

| STT | Mã Stitch Screen ID | Tên Màn Hình Trên Stitch | Ánh Xạ Mã Chuẩn (PRD/PLAN) | Trạng Thái Nghiệp Vụ |
|:---:|---|---|:---:|---|
| 1 | `d64069bfef5742188a3cc69fae23da87` | Lumina English - Landing Page | `STU-01` | Màn hình chính (Khám phá & Giới thiệu) |
| 2 | `c42d7bde4fe54952b91c230f159f8ce0` | Lumina English - Đăng nhập & Đăng ký | `STU-02` | Màn hình chính (Xác thực học viên) |
| 3 | `e68497af849243f58d1894b0e0bf646f` | Lumina English - Kho Đề Thi & Thư Viện Luyện Thi | `STU-04` | Màn hình chính (Catalog & Bộ lọc) |
| 4 | `e1c3143eda44413ab82ade3ac33e4052` | Lumina English - Phòng Thi Trực Tuyến IELTS CBT | `STU-06` | Màn hình chính (Split-view Exam Room) |
| 5 | `00271ad359fc47bba19195157c794726` | Lumina English - AI Pronunciation Lab | `STU-16` | Màn hình chính (Luyện phát âm AI) |
| 6 | `fbf43c8a39b645dd9a5dbc3a5bf78657` | Lumina English - Teacher & Admin Dashboard | `ADM-02` | Màn hình chính (Dashboard giáo viên) |
| 7 | `700c579e01254da6bf3802b1a2f57cf5` | Lumina English - Teacher Rubric Grading Room | `ADM-11` | Màn hình chính (Phòng chấm Writing Rubric) |
| 8 | `a9229aac474a4324ba1a146cb5b8962f` | Lumina English - Modal Tạo Đề Thi Mới | Sub-flow `ADM-04` | Modal Bước 1: Khởi tạo thông tin đề |
| 9 | `6fea90b08b904e72b35d6137dfd0d76b` | Lumina English - Modal Tạo Đề Thi Bước 2: AI Smart Generator | Sub-flow `ADM-04` | Modal Bước 2: Sinh đề bằng AI |
| 10 | `e720b505659a40db962c30ad95a50c5a` | Lumina English - Modal Tạo Đề Thi Bước 3: Cấu hình AI Co-Grader & Thang điểm | Sub-flow `ADM-04` / `ADM-05` | Modal Bước 3: Cấu hình AI & Thang điểm |
| 11 | `48d09bdd51694c5dbde04fb07ba27c72` | Lumina English - Modal Tạo Đề Thi Bước 4: Phân phối & Gán lớp học | Sub-flow `ADM-04` / `ADM-13` | Modal Bước 4: Gán lớp học & Phân quyền |

---

## 3. LÀM RÕ ĐỐI SOÁT VỚI HỆ THỐNG TÀI LIỆU DỰ ÁN

### 3.1 Quy định chuẩn trong [PRD.md](file:///d:/demomcp/PRD.md) và [PLAN.md](file:///d:/demomcp/PLAN.md)
Theo tài liệu kiến trúc kỹ thuật và yêu cầu sản phẩm đã được phê duyệt:
- Mục tiêu giai đoạn **Phase 2 (Design trên Google Stitch)** chuẩn hóa gồm **37 màn hình cốt lõi**:
  - **Phân hệ Học sinh (Student Experience):** **18 màn hình** (`STU-01` đến `STU-18`).
  - **Phân hệ Giáo viên & Admin (Teacher/Admin Experience):** **19 màn hình** (`ADM-01` đến `ADM-19`).
  - **Tổng cộng:** **37 màn hình**.

### 3.2 Phân tích về con số "76 trang" trong câu hỏi của người dùng
Con số **76** có thể xuất phát từ một trong các góc nhìn sau:
1. **Desktop + Mobile Responsive View:** Nếu tính mỗi màn hình bao gồm cả bản Desktop và bản Mobile (hoặc kèm các trạng thái State/Modal mở rộng): $37 \times 2 = 74$ views (+ 2 trạng thái đặc biệt) $\approx 76$ views.
2. **Tổng số đầu việc (Tasks) trong kế hoạch:** Trong [PLAN.md](file:///d:/demomcp/PLAN.md), toàn bộ dự án có **79 tasks** (gồm 5 tasks Planning, 39 tasks Design Stitch, 36 tasks Code & Test; trong đó Phase 2 + Phase 3 gồm $39 + 36 = 75$ tasks).
3. **Nhầm lẫn cơ học:** Người dùng có thể nhớ nhầm con số 37 thành 76 (hoặc đảo số).

---

## 4. KẾT LUẬN KIỂM TRA

> [!IMPORTANT]
> **KẾT LUẬN: THIẾT KẾ TRÊN GOOGLE STITCH HIỆN TẠI CHƯA ĐẦY ĐỦ.**
> 
> - **So với con số 76 trang:** Mới chỉ có **11 / 76** (đạt khoảng **14.5%**).
> - **So với 37 màn hình chuẩn theo [PRD.md](file:///d:/demomcp/PRD.md) & [PLAN.md](file:///d:/demomcp/PLAN.md):**
>   - Đã có **7 / 37 màn hình cốt lõi** và **4 modals mở rộng**.
>   - Còn **thiếu 30 / 37 màn hình chuẩn** cần tiếp tục thiết kế theo 5 Batches của Phase 2.

---

## 5. BẢNG HIỆN TRẠNG 37 MÀN HÌNH THEO CÁC BATCHES TRONG [PLAN.md](file:///d:/demomcp/PLAN.md)

| Batch | Tổng Số Màn Hình Chuẩn | Đã Có Trên Stitch | Còn Thiếu | Tỷ Lệ Hoàn Thành |
|---|:---:|:---:|:---:|:---:|
| **Batch 1:** Xác thực & Khám phá đề | 6 (`STU-01` -> `STU-05`, `ADM-01`) | 3 (`STU-01`, `STU-02`, `STU-04`) | 3 (`STU-03`, `STU-05`, `ADM-01`) | **50%** |
| **Batch 2:** Phòng thi & Builder cốt lõi | 6 (`STU-06` -> `STU-09`, `ADM-06`, `ADM-07`) | 1 (`STU-06`) | 5 (`STU-07`, `STU-08`, `STU-09`, `ADM-06`, `ADM-07`) | **16.7%** |
| **Batch 3:** Kỹ năng AI, Tra cứu & Hồ sơ | 6 (`STU-10` -> `STU-12`, `STU-14`, `STU-16`, `STU-18`) | 1 (`STU-16`) | 5 (`STU-10`, `STU-11`, `STU-12`, `STU-14`, `STU-18`) | **16.7%** |
| **Batch 4:** Quản trị & Công cụ nâng cao | 9 (`ADM-02` -> `ADM-05`, `ADM-08`, `ADM-09`, `ADM-16`, `ADM-17`, `ADM-19`) | 1 (`ADM-02`) *(+ 4 modals ADM-04)* | 8 (`ADM-03`, `ADM-04`, `ADM-05`, `ADM-08`, `ADM-09`, `ADM-16`, `ADM-17`, `ADM-19`) | **11.1%** |
| **Batch 5:** Chấm Rubric, Lớp & Tính năng phụ | 10 (`ADM-10` -> `ADM-15`, `ADM-18`, `STU-13`, `STU-15`, `STU-17`) | 1 (`ADM-11`) | 9 (`ADM-10`, `ADM-12` -> `ADM-15`, `ADM-18`, `STU-13`, `STU-15`, `STU-17`) | **10%** |
| **TỔNG CỘNG** | **37 Màn hình** | **7 Màn hình (+ 4 Modals)** | **30 Màn hình** | **18.9% (7/37)** |

---

## 6. ĐỀ XUẤT HÀNH ĐỘNG TIẾP THEO

1. Xác nhận với người dùng về phạm vi thiết kế (tiếp tục bám sát chuẩn **37 màn hình theo PRD.md & PLAN.md** hay bổ sung các biến thể Desktop/Mobile/Modal để đạt con số 76).
2. Tiến hành triển khai thiết kế các màn hình còn lại của **Batch 1** và **Batch 2** trên Google Stitch thông qua công cụ Stitch MCP (`generate_screen_from_text`).
