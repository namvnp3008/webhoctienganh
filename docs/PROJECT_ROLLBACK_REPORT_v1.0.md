# BÁO CÁO CÔNG VIỆC: ROLLBACK DỰ ÁN VỀ TRẠNG THÁI KHỞI TẠO BAN ĐẦU

**Mã báo cáo:** `DOC-REP-20260925-V4.0`  
**Phiên bản:** v1.0  
**Ngày lập:** 25/09/2026  
**Người thực hiện:** Senior Software Engineer  
**Dự án:** Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI (`Lumina English`)  
**Tài liệu liên kết:** [PLAN.md](file:///d:/demomcp/PLAN.md), [PRD.md](file:///d:/demomcp/PRD.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md)

---

## 1. MỤC TIÊU VÀ YÊU CẦU THỰC HIỆN

Thực hiện yêu cầu xác nhận từ người dùng:
- Thu hồi và xóa toàn bộ mã nguồn ứng dụng (Full-stack code bao gồm `frontend/`, `backend/`, cấu hình build, và các artifacts đã sinh trong chu trình phát triển).
- Đưa toàn bộ workspace dự án quay trở về commit ban đầu **`bebe5ac`** (`feat: initial commit - project documentation, architecture, plans and design specs`).
- Giữ lại nguyên vẹn toàn bộ hệ thống tài liệu nền tảng cốt lõi: [PLAN.md](file:///d:/demomcp/PLAN.md), [PRD.md](file:///d:/demomcp/PRD.md), [PRD-website-luyen-thi.md](file:///d:/demomcp/PRD-website-luyen-thi.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md), cùng các tài liệu trong thư mục [docs/](file:///d:/demomcp/docs).

---

## 2. CÁC THAO TÁC KỸ THUẬT ĐÃ THỰC HIỆN

1. **Kiểm tra an toàn dữ liệu:**
   - Dừng và xác nhận không có tiến trình ngầm (background tasks/dev servers) nào đang chạy.
   - Kiểm tra lịch sử Git commit để định vị chính xác commit gốc `bebe5ac`.
2. **Thực thi Rollback Git:**
   - Lệnh thực thi: `git reset --hard bebe5ac`
   - Lệnh dọn dẹp các thư mục untracked: `git clean -fd`
3. **Các thành phần mã nguồn đã được xóa sạch:**
   - Thư mục mã nguồn Backend NestJS: `backend/`
   - Thư mục mã nguồn Frontend React Vite: `frontend/`
   - Thư mục artifact build và trung gian: `.agents/app_build/`, `.agents/production_artifacts/`
   - File cấu hình gốc: `package.json`, `package-lock.json`
4. **Kiểm tra trạng thái sau thao tác:**
   - `git status` trả về: `nothing to commit, working tree clean`.

---

## 3. DANH MỤC TÀI NGUYÊN HIỆN CÒN LƯU GIỮ

Sau khi hoàn tất rollback, dự án chỉ còn lại hệ thống tài liệu kiến trúc kỹ thuật và kế hoạch:

| STT | Tên File / Thư mục | Vai Trò | Trạng Thái |
|:---:|---|---|:---:|
| 1 | [PLAN.md](file:///d:/demomcp/PLAN.md) | Kế hoạch triển khai tổng thể 79 tasks | Đã reset Phase 3 về `Chưa bắt đầu` |
| 2 | [PRD.md](file:///d:/demomcp/PRD.md) | Tài liệu yêu cầu sản phẩm v2.0 | Giữ nguyên vẹn |
| 3 | [PRD-website-luyen-thi.md](file:///d:/demomcp/PRD-website-luyen-thi.md) | Bản đặc tả nghiệp vụ chi tiết | Giữ nguyên vẹn |
| 4 | [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md) | Bản thiết kế kiến trúc kỹ thuật hệ thống | Giữ nguyên vẹn |
| 5 | [.agents/rules/agent-rule.md](file:///d:/demomcp/.agents/rules/agent-rule.md) | Quy tắc làm việc nghiêm ngặt của Senior Engineer | Giữ nguyên vẹn |
| 6 | [docs/](file:///d:/demomcp/docs) | Thư mục tài liệu báo cáo các giai đoạn | Giữ nguyên vẹn |

---

## 4. KẾT LUẬN

Hệ thống đã được đưa về trạng thái khởi tạo an toàn và sẵn sàng cho các chỉ đạo hoặc định hướng triển khai mới từ người dùng.
