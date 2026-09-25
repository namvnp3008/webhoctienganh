# BÁO CÁO THIẾT KẾ GIAI ĐOẠN 2: GOOGLE STITCH & BÓC TÁCH REACT COMPONENTS

**Mã báo cáo:** `DOC-REP-20260924-V2.0`  
**Phiên bản:** v2.0  
**Ngày lập:** 24/09/2026  
**Người thực hiện:** Senior Software Engineer / Technical Architect  
**Dự án:** Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI (`Lumina English`)  
**Tài liệu liên kết:** [PLAN.md](file:///d:/demomcp/PLAN.md), [PRD.md](file:///d:/demomcp/PRD.md), [TECH_ARCHITECTURE.md](file:///d:/demomcp/TECH_ARCHITECTURE.md)

---

## 1. TỔNG QUAN TRIỂN KHAI GIAI ĐOẠN 2 (PHASE 2 IMPLEMENTATION)

Theo đúng yêu cầu nghiệp vụ và chỉ đạo của người dùng:
1. **Khởi tạo Project & Design System chuẩn hóa trên Google Stitch:**
   - **Tên dự án:** `Lumina English - AI Exam Prep Platform`
   - **Project ID:** `12086767744907733135` (`projects/12086767744907733135`)
   - **Design System Asset ID:** `assets/5502260407726081896` (`Lumina English Design System`)
   - **Tokens thiết kế:** Nền Dark Mode `#0F172A`, màu chủ đạo Indigo `#4F46E5`, màu nhấn hoàn thành Emerald `#10B981`, màu cảnh báo Amber `#F59E0B`, phông chữ `Plus Jakarta Sans` & `Inter`, bo góc `ROUND_EIGHT` (8px).
2. **Thiết kế hoàn thiện các màn hình đại diện cốt lõi (Core UX Pillars) trên Google Stitch:**
   - Đã sinh thành công các màn hình nền tảng, thu thập đầy đủ **Stitch Screen ID (IDF)**, **Screenshot Preview** và file **HTML/CSS**.
3. **Bóc tách cấu trúc React UI Components:**
   - Phân rã từng màn hình Stitch thành hệ thống Atomic Design (Atoms, Molecules, Organisms) và cập nhật trực tiếp vào [PLAN.md](file:///d:/demomcp/PLAN.md).

---

## 2. BẢNG TỔNG HỢP SCREEN ID (IDF) & ÁNH XẠ REACT COMPONENTS

| Screen ID | Tên Màn Hình & Vai Trò | Stitch Screen ID (IDF) | Đường Dẫn Xem Ảnh & Code | Thành Phần React UI Components Bóc Tách (Giai Đoạn 3) |
|---|---|---|---|---|
| `STU-01` | **Landing Page**<br>*(Cổng thông tin & Khám phá)* | `d64069bfef5742188a3cc69fae23da87` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1UrRHdLjzqU_UYWNGnMkzsLgZzCOpqMPGXGdryTi_IoGgUfPnvIWSMHqkaVBp2qUA_lVfxqacdVYu8K2beahQSN7oRgSTds3stofwBYiGXlctmLMYol6GJTKSvL_sdIxXMvnhdJG-inCfUhegQgA5F-NWpifTmvgqnMKVP9HDe5s_G6pnwEilnCrJCy1jHoL7_Vn0fbTbSA6iZpc6jdNZkELzNrByyMSKnRBZO2xoXoMbdo3SWmf-R3QDk1) | • `TopNavBar`: Sticky header, BrandLogo, NavLinks, SearchBar, AuthButtons<br>• `HeroSection`: HighImpactBadge, Headline, StatsCounterBar, LiveAICoachPreviewCard<br>• `FeaturedTestGrid`: CategoryFilterTabs, TestCardItem, DifficultyBadge<br>• `FeatureHighlightCard`: ExamRoomCard, PronunciationCard, SpeakingCard, WritingCard<br>• `TestimonialSection`, `LandingFooter` |
| `STU-02` | **Đăng ký & Đăng nhập**<br>*(Xác thực học viên)* | `c42d7bde4fe54952b91c230f159f8ce0` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1VDUIh_bLVMt76501ZePY_J1IaBIE5vKucpMiGFYW2wAePonqDIauEv4GtMXklbYiBlmOVT-FI35_iHOT0LnW8dO6uqOJjd6wLSqmfYx_5jnz14aHtSdv_NES2OeU-5ix20PfeaEt8NQ75eTn6wUpBdth2kr9Ar6MzGMuCobkZeYTaUzDu5VFkBlzIpg61vuIkEh0uX8_0lScF-b_K240wOiSWS00PkAlkPPOS_kQJ20M23bF2MlvosSW3q) | • `AuthTabSwitch`: Toggle Đăng nhập / Đăng ký<br>• `GoogleOAuthButton`: Nút đăng nhập Google một chạm<br>• `FormInput`: EmailInput, PasswordInput (eye icon toggle), NameInput<br>• `Checkbox`: RememberMe checkbox, TargetScoreSelect<br>• `Button`: Primary Indigo CTA button<br>• `AuthHeroBanner`: SocialProofCard, AI Band Badge |
| `STU-04` | **Kho Đề Thi (Catalog)**<br>*(Bộ lọc & Thư viện đề)* | `e68497af849243f58d1894b0e0bf646f` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1WIwYO13uJjZCE9mbTpNhVVUwN9Vz8ISFV92pG8L4ovnSjjK1U34BxMg6MwGFy74sHEZH0fe1bUJJN18FWQ4u61-yD0aD6zKn3AiQ5jIFNGLCxHq3yujBMIasrB2JrAlIBGcKJIlS43iEs0S7M34aGoVCAoldD1s11xk7m4fmr1OSK85hpANItuxvsgxs1MV8986qv3q6aZbKb2-3lQ-YWMboldpwlBb2bQGLbbIoDbMeOIO5RpEA-D7WSA) | • `FilterSidebar`: ExamTypeFilter, SkillCheckboxGroup, DifficultyFilter, YearCollectionFilter<br>• `CatalogToolbar`: ActiveFilterChips, ResultCounter, SortDropdown, ViewModeToggle<br>• `TestCardGrid`: TestCard (Thumbnail, Title, Tags, Meta, PersonalStatusBadge, ActionButton)<br>• `PaginationControls`: PageNumbers, PrevNextButtons |
| `STU-06` | **Phòng Thi Trực Tuyến**<br>*(IELTS CBT Exam Room)* | `e1c3143eda44413ab82ade3ac33e4052` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1VkMzqIpk8RldJ29UJ-OgUNPL1ejhZIY2CvhS53EYALbttfaXZYEmCkSkM4_UzPl0bEFkdB9hjKTBSdbHG8HWDOXDz_vNH82nKZxYSS_5enx5Lz3Kg-lUJ1tPq0Z_iTubEEVzWgC5NY0QSU_PsPCqAH4JulV3lVpAhsFuHegb3jPL83t3CrOtCcxozAaB4mNo95RsJDBmJ54v_wpPWpz00owkcp8wMqVXj26x9YlbiyK9M0pBJvoYKStu8) | • `ExamStickyHeader`: ExamTitleBadge, SectionNavTabs, CountdownTimer (mono), AutosaveBadge, FontSizeControl, SubmitButton<br>• `SplitViewLayout`: Resizable 2-column container<br>• `PassageViewer`: ReadingParagraphItem, TextHighlighterPopup, NoteTooltip<br>• `QuestionSheet`: MatchingQuestionItem, TrueFalseRadioGroup, FillBlankInput<br>• `StickyQuestionPalette`: QuestionGridPills (1-40), StatusSummary, PrevNextButtons |
| `STU-16` | **Phòng Luyện Phát Âm**<br>*(AI Pronunciation Lab)* | `00271ad359fc47bba19195157c794726` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1VeWfeLoaG9nJJsQ7wKMiTTTZgrz3pLF5Y2B_121d7k0MX12cMdx8iFGCHqYlZbPnikFNa9S8kWfUKvSDVtKpSWLWxXX2C6lx50wJmifZ01KX44w-8s8jlA1GQg3v1Ppg_okOSe4AuoFWSO5frJ90XSm3f1QVeZ3zy4-TZ_iOpToLCFAMTuogFzNavZC0D13BKk3zesRQ68ZPR0xUJEqdq4cWIwXAEiAPZEyLgPwWmlc2OvLaorZF0EQwY) | • `TargetSentenceCard`: ReferenceText, Clickable IPATranscription, USNativePlayer<br>• `DualWaveformConsole`: NativePitchContour vs LearnerWaveform, BigMicButton<br>• `RadialMetricGauges`: OverallScore (84/100), Accuracy, Fluency, Completeness, Prosody<br>• `WordFeedbackPills`: Từ tô màu xanh/vàng/đỏ kèm score tag<br>• `PhonemeDiagnosticCard`: So sánh âm sai (/θ/ vs /t/), hướng dẫn khẩu hình tiếng Việt<br>• `PracticeHistoryStrip`: Trend sparkline qua các lần thử |
| `ADM-02` | **Dashboard Giáo Viên**<br>*(Teacher & Admin Portal)* | `fbf43c8a39b645dd9a5dbc3a5bf78657` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1W24FNCCX9JzTgtrPJhc4bZ9V9MgATWHUYAw3Vnu0a41xeYxVvycxYWI_MZzbPTgLwTtfDqtc2gjlGDPjGjXL_vOfLSkSlENhROxk0zqNcdu6Pj40KWsDw9o5giGemO3tdWFVQdpgbKmG3xqRjfWhInmtzlVQxmzPtWjvwRL7nihSFZgmJUr2SaSS4GgiZ3FpkFN89Wo7YzRzyMSLkhwO7jXRwECyoVQougbONgy_USYwuVA2Sn2z0xZ7cl) | • `TeacherHeader`: TeacherPortalBadge, QuickSearch, CreateTestBtn, CreateClassBtn, ProfileDropdown<br>• `MetricKPICardGrid`: Tổng học sinh, Đề xuất bản, Lượt thi tháng, Bài chờ chấm (amber alert)<br>• `PendingGradingTable`: Danh sách bài Writing/Speaking, AI Draft status, ActionButton 'Chấm ngay'<br>• `ScoreDistributionChart`: Bar/Line chart phổ điểm trung bình các lớp<br>• `TopTestList`: Bảng xếp hạng đề thi hot, AnswerVisibilityBadge<br>• `MyClassCards`: Thẻ lớp học, JoinCode, Tiến độ buổi học |
| `ADM-11` | **Phòng Chấm Bài Writing**<br>*(Rubric + AI Co-grader)* | `700c579e01254da6bf3802b1a2f57cf5` | [Xem Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1W3g49MSeJn--wZuBXy3ftqx7sOF_d4QWAiE9xUc2L3dfXyXgvTMhn1roA3yE4ulWjSX8e45H-VSoLLSPMfm5qN5z3lebpUgPTCDmm9zwKzZQiD0R0Zg4b28CxdjzzREqDzje2qgzpjuE1lslCZK1-mECYx7dQcbf2Yd2MSoeGpfFHEby2hTk-U2hAjptdupaX6rRn010Nh33rwnmHVeQbA90diAj4y6d953eFS6785G4Kp9pQp1qz4msM) | • `TeacherGradingHeader`: StudentMeta, WordCount, ActionButtons ('Chấm bằng AI', 'Lưu nháp', 'Hoàn tất chấm')<br>• `EssayAnnotatedPaper`: Văn bản bài viết với gạch chân lỗi lượn sóng (ngữ pháp đỏ, từ vựng vàng) kèm hover popover sửa lỗi<br>• `OverallBandCalculator`: Tự động tính Band tổng từ 4 tiêu chí<br>• `RubricCriterionAccordion`: 4 tiêu chí TR, CC, LR, GRA (Band score selector + Teacher feedback textarea)<br>• `GeneralCommentBox`: Nhận xét chung, quyền hiển thị lỗi AI cho học sinh |

---

## 3. CÁC TÀI LIỆU ĐÃ ĐỒNG BỘ & CẬP NHẬT

1. 📄 **[PLAN.md](file:///d:/demomcp/PLAN.md)** (v2.1):
   - Cập nhật Project ID: `12086767744907733135`.
   - Cập nhật Asset Design System: `5502260407726081896`.
   - Bổ sung cột **Stitch Screen ID (IDF)**, link xem trước hình ảnh và bảng bóc tách **React UI Components** chi tiết cho toàn bộ các màn hình.
   - Đánh dấu hoàn thành các task: `TSK-P2-00`, `TSK-P2-01`, `TSK-P2-02`, `TSK-P2-04`, `TSK-P2-07`, `TSK-P2-17`, `TSK-P2-19`, `TSK-P2-29`.
2. 📄 **[docs/PHASE2_STITCH_IMPLEMENTATION_v2.0.md](file:///d:/demomcp/docs/PHASE2_STITCH_IMPLEMENTATION_v2.0.md)**:
   - Lưu trữ bản báo cáo kỹ thuật hoàn chỉnh về kết quả thiết kế Google Stitch và kiến trúc phân rã component cho đội ngũ phát triển.

---

## 4. KẾT LUẬN & SẴN SÀNG CHUYỂN GIAO SANG GIAI ĐOẠN CODE (PHASE 3)

Hệ thống đã có đầy đủ:
- Bộ token thiết kế `Lumina English Design System` đồng bộ.
- Các giao diện phức tạp nhất (Phòng thi Split-view, Phòng thu âm phát âm IPA, Phòng chấm Rubric AI Co-grader, Dashboard giáo viên, Kho đề thi, Trang đăng ký/đăng nhập, Landing page) đều đã có nguyên mẫu trực quan trên Google Stitch.
- Bản đồ ánh xạ component rõ ràng, sẵn sàng để lập trình viên chuyển đổi mã HTML/CSS thành các React component + TailwindCSS và kết nối API NestJS trong **Phase 3**.
