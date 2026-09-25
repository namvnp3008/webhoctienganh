# PLAN — Kế Hoạch Triển Khai Toàn Diện Dự Án Luyện Thi Tiếng Anh & Chấm Điểm AI

**Tài liệu:** Project Implementation Plan (PLAN)  
**Phiên bản:** 2.1 (Detailed Task Breakdown)  
**Vai trò phụ trách:** Project Manager & Senior Software Engineer  
**Quy trình chuẩn hóa:** **Phase 1: Planning → Phase 2: Design (Google Stitch) → Phase 3: Code (Convert Design sang React Components + NestJS Backend)**

---

## 1. TỔNG QUAN CHIẾN LƯỢC VÀ LỘ TRÌNH (STRATEGY & ROADMAP)

Dự án được triển khai theo quy trình 3 giai đoạn nghiêm ngặt:

```mermaid
flowchart LR
    subgraph P1 ["Phase 1: PLANNING"]
        D1["PRD.md & Business Rules"]
        D2["TECH_ARCHITECTURE.md"]
        D3["PLAN.md & Task Breakdown"]
    end

    subgraph P2 ["Phase 2: DESIGN (Google Stitch)"]
        S0["Design System Setup"]
        S1["Batch 1: Auth & Catalog (6 screens)"]
        S2["Batch 2: Exam & Practice Rooms (6 screens)"]
        S3["Batch 3: Skills, Results & Profile (6 screens)"]
        S4["Batch 4: Builder & Admin Core (9 screens)"]
        S5["Batch 5: Grading & Class Mgmt (10 screens)"]
        S_Review["Audit 37/37 Stitch Screens"]
    end

    subgraph P3 ["Phase 3: CODE (React + NestJS)"]
        C1["Tokens & React UI Library"]
        C2["Backend Core & Exam Engine"]
        C3["AI Modules (Azure + Gemini)"]
        C4["Teacher Portal & Class Mgmt"]
        C5["Integration & E2E Testing"]
    end

    P1 --> P2 --> P3
```

---

## 2. PHÂN RÃ TASK CHI TIẾT THEO TỪNG GIAI ĐOẠN (DETAILED TASK BREAKDOWN)

### 📌 PHASE 1: PLANNING & FOUNDATION (ĐÃ HOÀN TẤT)

| Task ID | Tên Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra (Deliverables) | Trạng Thái |
|---|---|---|:---:|
| `TSK-P1-01` | Phân tích Yêu cầu Nghiệp vụ (BA Analysis) | Rà soát toàn bộ tài liệu nghiệp vụ mẫu, phân loại yêu cầu in-scope/out-scope, ma trận quyền RBAC, chốt các câu hỏi logic nghiệp vụ còn mở. | [x] Hoàn tất |
| `TSK-P1-02` | Biên soạn Tài liệu Yêu cầu Sản phẩm (`PRD.md`) | Xuất bản `PRD.md` v2.0 đầy đủ 37 màn hình, quy tắc tính lượt làm bài, quy tắc ẩn/hiện đáp án (`keep_correctness`), quy tắc chấm AI tham khảo. | [x] Hoàn tất |
| `TSK-P1-03` | Thiết kế Kiến trúc Kỹ thuật (`TECH_ARCHITECTURE.md`) | Xuất bản `TECH_ARCHITECTURE.md` chi tiết kiến trúc NestJS + React Vite, PostgreSQL Prisma schema DDL, S3 Storage, Redis BullMQ, Audio Pipeline (Azure Speech + Gemini 2.5), Interceptor chống lộ đáp án. | [x] Hoàn tất |
| `TSK-P1-04` | Lập Kế hoạch Triển khai (`PLAN.md`) | Xuất bản `PLAN.md` với lộ trình 3 Phase chuẩn hóa, bảng phân rã chi tiết 37 màn hình Google Stitch thành 5 Batches và kế hoạch 6 Sprints. | [x] Hoàn tất |
| `TSK-P1-05` | Khởi tạo Repository GitHub (`webhoctienganh`) | Tạo GitHub repository `namvnp3008/webhoctienganh`, cấu hình remote origin và đẩy toàn bộ tài liệu, kiến trúc, kế hoạch dự án lên GitHub. | [x] Hoàn tất |
| `TSK-P1-06` | Khởi động Chu trình /startcycle & Đặc tả Kỹ thuật | Xuất bản `Technical_Specification.md` v1.0, tích hợp mục tiêu triển khai Database trên Supabase và Backend trên Render qua MCP. | [x] Hoàn tất |

---

### 🎨 PHASE 2: DESIGN TRỌN VẸN 37 MÀN HÌNH TRÊN GOOGLE STITCH

*Quy tắc: Thiết kế hoàn chỉnh toàn bộ 37 màn hình trên Google Stitch, lưu trữ Stitch Screen ID (IDF), hình ảnh xem trước và đặc tả các thành phần React UI Components bóc tách tương ứng.*

**Thông Tin Dự Án Trên GitHub & Google Stitch:**
- **GitHub Repository:** `https://github.com/namvnp3008/webhoctienganh` (Owner: `namvnp3008`, Default Branch: `main`)
- **Stitch Project Name:** `projects/12086767744907733135` (Title: `Lumina English - AI Exam Prep Platform`)
- **Stitch Project ID:** `12086767744907733135`
- **Design System Asset:** `assets/5502260407726081896` (`Lumina English Design System` - Primary: `#4F46E5`, Neutral: `#0F172A`, Roundness: `ROUND_EIGHT`, Dark Mode)

---

#### 2.0 Bước Nền Tảng: Thiết Lập Design System Trên Google Stitch
| Task ID | Nhiệm Vụ | Stitch Screen ID (IDF) | Thành Phần Tokens / Components Bóc Tách | Trạng Thái |
|---|---|---|---|:---:|
| `TSK-P2-00` | Setup Design System `Lumina English` | Asset: `5502260407726081896` | Color Palette (`#4F46E5`, `#10B981`, `#F59E0B`, `#0F172A`), Typography (`Plus Jakarta Sans`, `Inter`), Spacing 4px grid, Shadows & Glows. | [x] Hoàn tất |

---

#### 2.1 Batch 1: Xác Thực, Trang Chủ & Khám Phá Đề Thi (6 Màn Hình)
| Task ID | Screen ID | Tên Màn Hình | Stitch Screen ID (IDF) & Preview | Thành Phần React UI Components Bóc Tách (Atoms / Molecules / Organisms) | Trạng Thái |
|---|---|---|---|---|:---:|
| `TSK-P2-01` | `STU-01` | **Landing Page** | `d64069bfef5742188a3cc69fae23da87`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1UrRHdLjzqU_UYWNGnMkzsLgZzCOpqMPGXGdryTi_IoGgUfPnvIWSMHqkaVBp2qUA_lVfxqacdVYu8K2beahQSN7oRgSTds3stofwBYiGXlctmLMYol6GJTKSvL_sdIxXMvnhdJG-inCfUhegQgA5F-NWpifTmvgqnMKVP9HDe5s_G6pnwEilnCrJCy1jHoL7_Vn0fbTbSA6iZpc6jdNZkELzNrByyMSKnRBZO2xoXoMbdo3SWmf-R3QDk1) | • `TopNavBar`: Sticky header, BrandLogo, NavLinks, SearchBar, AuthButtons<br>• `HeroSection`: HighImpactBadge, Headline, StatsCounterBar, LiveAICoachPreviewCard<br>• `FeaturedTestGrid`: CategoryFilterTabs, TestCardItem, DifficultyBadge<br>• `FeatureHighlightCard`: ExamRoomCard, PronunciationCard, SpeakingCard, WritingCard<br>• `TestimonialSection`, `LandingFooter` | [x] Hoàn tất |
| `TSK-P2-02` | `STU-02` | **Đăng ký & Đăng nhập** | `c42d7bde4fe54952b91c230f159f8ce0`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1VDUIh_bLVMt76501ZePY_J1IaBIE5vKucpMiGFYW2wAePonqDIauEv4GtMXklbYiBlmOVT-FI35_iHOT0LnW8dO6uqOJjd6wLSqmfYx_5jnz14aHtSdv_NES2OeU-5ix20PfeaEt8NQ75eTn6wUpBdth2kr9Ar6MzGMuCobkZeYTaUzDu5VFkBlzIpg61vuIkEh0uX8_0lScF-b_K240wOiSWS00PkAlkPPOS_kQJ20M23bF2MlvosSW3q) | • `AuthTabSwitch`: Toggle Đăng nhập / Đăng ký<br>• `GoogleOAuthButton`: Single-click auth button<br>• `FormInput`: EmailInput, PasswordInput (kèm eye icon toggle), NameInput<br>• `Checkbox`: RememberMe checkbox, TargetScoreSelect<br>• `Button`: Primary Indigo CTA button<br>• `AuthHeroBanner`: SocialProofCard, AI Band Badge | [x] Hoàn tất |
| `TSK-P2-03` | `STU-03` | **Quên & Đặt lại mật khẩu** | `planned_batch_1` | • `ForgotStepWizard`: Multi-step form container<br>• `OTPCodeInput`: 6-digit verification code input<br>• `PasswordStrengthMeter`: Visual indicator<br>• `CountdownResendButton`: Đếm ngược gửi lại email | [ ] Chưa bắt đầu |
| `TSK-P2-04` | `STU-04` | **Danh mục Đề thi (Catalog)** | `e68497af849243f58d1894b0e0bf646f`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1WIwYO13uJjZCE9mbTpNhVVUwN9Vz8ISFV92pG8L4ovnSjjK1U34BxMg6MwGFy74sHEZH0fe1bUJJN18FWQ4u61-yD0aD6zKn3AiQ5jIFNGLCxHq3yujBMIasrB2JrAlIBGcKJIlS43iEs0S7M34aGoVCAoldD1s11xk7m4fmr1OSK85hpANItuxvsgxs1MV8986qv3q6aZbKb2-3lQ-YWMboldpwlBb2bQGLbbIoDbMeOIO5RpEA-D7WSA) | • `FilterSidebar`: ExamTypeFilter, SkillCheckboxGroup, DifficultyFilter, YearCollectionFilter<br>• `CatalogToolbar`: ActiveFilterChips, ResultCounter, SortDropdown, ViewModeToggle<br>• `TestCardGrid`: TestCard (Thumbnail, Title, Tags, Meta, PersonalStatusBadge, ActionButton)<br>• `PaginationControls`: PageNumbers, PrevNextButtons | [x] Hoàn tất |
| `TSK-P2-05` | `STU-05` | **Chi tiết Đề thi** | `planned_batch_1` | • `TestDetailBanner`: Title, Description, SkillBadges, CoverImage<br>• `SectionStructureAccordion`: Danh sách sections, thời gian, số câu<br>• `PersonalAttemptHistoryTable`: Lịch sử các lần làm, điểm số, lượt còn lại<br>• `StartExamModal`: Chọn chế độ Full Test hoặc Luyện từng phần | [ ] Chưa bắt đầu |
| `TSK-P2-06` | `ADM-01` | **Đăng nhập Quản trị & Giáo viên** | `planned_batch_1` | • `AdminLoginForm`: Form đăng nhập bảo mật Slate-900 chuyên nghiệp<br>• `AdminBrandBadge`: Nhãn bảo mật hệ thống quản trị nội bộ | [ ] Chưa bắt đầu |

---

#### 2.2 Batch 2: Phòng Thi Trực Tuyến & Phòng Luyện Tập Cốt Lõi (6 Màn Hình)
| Task ID | Screen ID | Tên Màn Hình | Stitch Screen ID (IDF) & Preview | Thành Phần React UI Components Bóc Tách (Atoms / Molecules / Organisms) | Trạng Thái |
|---|---|---|---|---|:---:|
| `TSK-P2-07` | `STU-06` | **Phòng thi Trực tuyến (Exam Room)** | `e1c3143eda44413ab82ade3ac33e4052`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1VkMzqIpk8RldJ29UJ-OgUNPL1ejhZIY2CvhS53EYALbttfaXZYEmCkSkM4_UzPl0bEFkdB9hjKTBSdbHG8HWDOXDz_vNH82nKZxYSS_5enx5Lz3Kg-lUJ1tPq0Z_iTubEEVzWgC5NY0QSU_PsPCqAH4JulV3lVpAhsFuHegb3jPL83t3CrOtCcxozAaB4mNo95RsJDBmJ54v_wpPWpz00owkcp8wMqVXj26x9YlbiyK9M0pBJvoYKStu8) | • `ExamStickyHeader`: ExamTitleBadge, SectionNavTabs, CountdownTimer (mono), AutosaveBadge, FontSizeControl, SubmitButton<br>• `SplitViewLayout`: Resizable 2-column container<br>• `PassageViewer`: ReadingParagraphItem, TextHighlighterPopup, NoteTooltip<br>• `QuestionSheet`: MatchingQuestionItem, TrueFalseRadioGroup, FillBlankInput<br>• `StickyQuestionPalette`: QuestionGridPills (1-40), StatusSummary, PrevNextButtons | [x] Hoàn tất |
| `TSK-P2-08` | `STU-07` | **Phòng thi Writing** | `planned_batch_2` | • `WritingPromptViewer`: Topic Prompt Card, Task 1/Task 2 tab<br>• `RichWritingEditor`: Textarea, LiveWordCounter, AutoSaveIndicator<br>• `WritingTimer`: Countdown timer chuyên biệt cho bài viết | [ ] Chưa bắt đầu |
| `TSK-P2-09` | `STU-08` | **Phòng thi Speaking: Mic Check** | `planned_batch_2` | • `MicPermissionCard`: Hướng dẫn cấp quyền HTTPS<br>• `MicAudioVisualizer`: Thanh sóng âm đo cường độ giọng nói<br>• `VoiceTestPlayback`: Nút nghe lại 5s thu thử, xác nhận thiết bị sẵn sàng | [ ] Chưa bắt đầu |
| `TSK-P2-10` | `STU-09` | **Phòng thi Speaking: Simulator** | `planned_batch_2` | • `VirtualExaminerBox`: Avatar/Audio câu hỏi theo từng Part<br>• `CueCardModal`: Thẻ chủ đề Part 2, Đồng hồ đếm 1 phút chuẩn bị, Ghi chú nhanh<br>• `SpeakingRecorder`: Đồng hồ 2 phút nói, sóng âm thu âm, nút Chuyển câu | [ ] Chưa bắt đầu |
| `TSK-P2-11` | `ADM-06` | **Trình soạn Cấu trúc Đề (Builder)** | `planned_batch_2` | • `TestStructureTreeView`: Kéo thả Sections → Question Groups<br>• `MediaUploadZone`: Tải lên audio MP3 Listening và rich-text bài đọc Reading | [ ] Chưa bắt đầu |
| `TSK-P2-12` | `ADM-07` | **Trình soạn Câu hỏi chi tiết** | `planned_batch_2` | • `QuestionTypeSelector`: 7 dạng câu hỏi (Multiple choice, matching, blanks...)<br>• `AnswerOptionList`: Nhập lựa chọn, đáp án đúng, điểm số, lời giải thích | [ ] Chưa bắt đầu |

---

#### 2.3 Batch 3: Luyện Kỹ Năng AI, Tra Cứu Kết Quả & Hồ Sơ (6 Màn Hình)
| Task ID | Screen ID | Tên Màn Hình | Stitch Screen ID (IDF) & Preview | Thành Phần React UI Components Bóc Tách (Atoms / Molecules / Organisms) | Trạng Thái |
|---|---|---|---|---|:---:|
| `TSK-P2-13` | `STU-10` | **Bảng điểm & Kết quả Tổng quan** | `planned_batch_3` | • `ScoreSummaryCard`: Overall Band Score / TOEIC Score quy đổi<br>• `SkillScoreRadar`: Biểu đồ kỹ năng Listening, Reading, Writing, Speaking<br>• `AnswerStatisticBar`: Tỷ lệ đúng/sai/bỏ qua, thời gian làm bài | [ ] Chưa bắt đầu |
| `TSK-P2-14` | `STU-11` | **Tra cứu Đáp án Chi tiết** | `planned_batch_3` | • `AnswerReviewList`: Danh sách câu hỏi kèm đáp án đã chọn<br>• `HiddenAnswerAlert`: Cảnh báo "Đáp án chi tiết đang được ẩn theo cấu hình của giáo viên"<br>• `ExplanationViewer`: Lời giải thích và transcript bài đọc/nghe | [ ] Chưa bắt đầu |
| `TSK-P2-15` | `STU-12` | **Kết quả Đánh giá Writing & Speaking** | `planned_batch_3` | • `ReviewDualTab`: Tab Điểm chính thức Giáo viên vs Tab Đánh giá AI tham khảo<br>• `RubricScoreCard`: Điểm từng tiêu chí (TR, CC, LR, GRA)<br>• `InlineAnnotatedViewer`: Hiển thị lỗi sửa trực tiếp trên bài viết của học sinh | [ ] Chưa bắt đầu |
| `TSK-P2-16` | `STU-14` | **Phòng Luyện Nghe Chép (Dictation)** | `planned_batch_3` | • `SentenceAudioPlayer`: Tua 5s, lặp câu, tốc độ 0.75x/1.0x/1.25x<br>• `DictationInputArea`: Khung gõ chính tả kèm phím tắt<br>• `DiffViewer`: So khớp từ thiếu (vàng), thừa (gạch ngang), sai (đỏ)<br>• `AIErrorExplanationCard`: Giải thích lỗi đồng âm, ngữ pháp tiếng Việt | [ ] Chưa bắt đầu |
| `TSK-P2-17` | `STU-16` | **Phòng Luyện Phát Âm (Pronunciation)** | `00271ad359fc47bba19195157c794726`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1VeWfeLoaG9nJJsQ7wKMiTTTZgrz3pLF5Y2B_121d7k0MX12cMdx8iFGCHqYlZbPnikFNa9S8kWfUKvSDVtKpSWLWxXX2C6lx50wJmifZ01KX44w-8s8jlA1GQg3v1Ppg_okOSe4AuoFWSO5frJ90XSm3f1QVeZ3zy4-TZ_iOpToLCFAMTuogFzNavZC0D13BKk3zesRQ68ZPR0xUJEqdq4cWIwXAEiAPZEyLgPwWmlc2OvLaorZF0EQwY) | • `TargetSentenceCard`: ReferenceText, Clickable IPATranscription, USNativePlayer<br>• `DualWaveformConsole`: NativePitchContour vs LearnerWaveform, BigMicButton<br>• `RadialMetricGauges`: OverallScore (84/100), Accuracy, Fluency, Completeness, Prosody<br>• `WordFeedbackPills`: Từ tô màu xanh/vàng/đỏ kèm score tag<br>• `PhonemeDiagnosticCard`: So sánh âm sai (/θ/ vs /t/), hướng dẫn khẩu hình tiếng Việt<br>• `PracticeHistoryStrip`: Trend sparkline qua các lần thử | [x] Hoàn tất |
| `TSK-P2-18` | `STU-18` | **Hồ sơ Cá nhân & Thống kê** | `planned_batch_3` | • `ProfileSettingsCard`: Thông tin học viên, đổi mật khẩu, mục tiêu điểm<br>• `AIQuotaCounter`: Hạn mức gọi AI còn lại trong ngày (`daily_ai_quota`)<br>• `ProgressChart`: Biểu đồ điểm số theo thời gian qua các tuần | [ ] Chưa bắt đầu |

---

#### 2.4 Batch 4: Quản Trị Giáo Viên & Công Cụ Biên Soạn Nâng Cao (9 Màn Hình)
| Task ID | Screen ID | Tên Màn Hình | Stitch Screen ID (IDF) & Preview | Thành Phần React UI Components Bóc Tách (Atoms / Molecules / Organisms) | Trạng Thái |
|---|---|---|---|---|:---:|
| `TSK-P2-19` | `ADM-02` | **Dashboard Giáo viên** | `fbf43c8a39b645dd9a5dbc3a5bf78657`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1W24FNCCX9JzTgtrPJhc4bZ9V9MgATWHUYAw3Vnu0a41xeYxVvycxYWI_MZzbPTgLwTtfDqtc2gjlGDPjGjXL_vOfLSkSlENhROxk0zqNcdu6Pj40KWsDw9o5giGemO3tdWFVQdpgbKmG3xqRjfWhInmtzlVQxmzPtWjvwRL7nihSFZgmJUr2SaSS4GgiZ3FpkFN89Wo7YzRzyMSLkhwO7jXRwECyoVQougbONgy_USYwuVA2Sn2z0xZ7cl) | • `TeacherHeader`: TeacherPortalBadge, QuickSearch, CreateTestBtn, CreateClassBtn, ProfileDropdown<br>• `MetricKPICardGrid`: Tổng học sinh, Đề xuất bản, Lượt thi tháng, Bài chờ chấm (amber alert)<br>• `PendingGradingTable`: Danh sách bài Writing/Speaking, AI Draft status, ActionButton 'Chấm ngay'<br>• `ScoreDistributionChart`: Bar/Line chart phổ điểm trung bình các lớp<br>• `TopTestList`: Bảng xếp hạng đề thi hot, AnswerVisibilityBadge<br>• `MyClassCards`: Thẻ lớp học, JoinCode, Tiến độ buổi học | [x] Hoàn tất |
| `TSK-P2-20` | `ADM-03` | **Quản lý Danh sách Đề thi** | `planned_batch_4` | • `TestTableList`: Bảng danh sách đề thi, trạng thái (Nháp/Xuất bản/Ẩn)<br>• `AnswerVisibilityQuickSwitch`: Đổi nhanh chế độ Ẩn/Hiện đáp án trực tiếp<br>• `TestActions`: Nhân bản, chỉnh sửa, ẩn đề | [ ] Chưa bắt đầu |
| `TSK-P2-21` | `ADM-04` | **Tạo/Sửa Thông tin chung Đề thi** | `planned_batch_4` | • `ExamTypePicker`: Chọn IELTS / TOEIC / Khác<br>• `TestConfigForm`: Thời gian, số lần làm tối đa, phạm vi hiển thị (Public/Restricted)<br>• `AIGradingToggle`: Bật/tắt cho học sinh nhờ AI chấm tham khảo | [ ] Chưa bắt đầu |
| `TSK-P2-22` | `ADM-05` | **Cấu hình Hiển thị Đáp án** | `planned_batch_4` | • `AnswerVisibilityModal`: Lựa chọn 3 chế độ (Hiện ngay, Ẩn giữ đúng/sai, Hẹn giờ mở)<br>• `ScheduleDateTimePicker`: Chọn ngày giờ tự động công bố đáp án | [ ] Chưa bắt đầu |
| `TSK-P2-23` | `ADM-08` | **Soạn Đề thi Speaking Chuyên Biệt** | `planned_batch_4` | • `SpeakingPartEditor`: Soạn 3 Parts Speaking<br>• `QuestionAudioRecorder`: Thu âm hoặc upload audio câu hỏi giám khảo<br>• `CueCardConfig`: Soạn thảo Cue card Part 2 kèm thời gian chuẩn bị | [ ] Chưa bắt đầu |
| `TSK-P2-24` | `ADM-09` | **Import Đề thi Hàng loạt** | `planned_batch_4` | • `ExcelDropzone`: Kéo thả file Excel/CSV theo template chuẩn<br>• `ImportPreviewTable`: Xem trước câu hỏi và cấu trúc<br>• `ValidationErrorAlert`: Báo lỗi chi tiết theo từng dòng sai định dạng | [ ] Chưa bắt đầu |
| `TSK-P2-25` | `ADM-16` | **Báo cáo Thống kê Đề thi** | `planned_batch_4` | • `ScoreHistogramChart`: Phổ điểm tổng quát của cả lớp<br>• `QuestionAccuracyRankingTable`: Bảng xếp hạng câu hỏi khó nhất dựa trên tỷ lệ sai<br>• `ExportExcelButton`: Xuất báo cáo điểm số học viên | [ ] Chưa bắt đầu |
| `TSK-P2-26` | `ADM-17` | **Quản lý Bài luyện Nghe & Phát âm** | `planned_batch_4` | • `ExerciseTable`: Danh mục bài nghe chép và bài phát âm IPA<br>• `TimelineTranscriptEditor`: Soạn timeline chia câu audio cho bài luyện nghe | [ ] Chưa bắt đầu |
| `TSK-P2-27` | `ADM-19` | **Cài đặt Hệ thống & Hạn mức AI (Owner)** | `planned_batch_4` | • `SystemQuotaConfig`: Thiết lập hạn mức AI miễn phí mỗi ngày cho học sinh<br>• `RetentionPolicyConfig`: Cài đặt thời gian tự xoá file ghi âm (30 ngày)<br>• `AuditLogViewer`: Nhật ký kiểm toán các thao tác nhạy cảm | [ ] Chưa bắt đầu |

---

#### 2.5 Batch 5: Chấm Bài Rubric, Quản Lý Lớp Học & Tính Năng Bổ Trợ (10 Màn Hình)
| Task ID | Screen ID | Tên Màn Hình | Stitch Screen ID (IDF) & Preview | Thành Phần React UI Components Bóc Tách (Atoms / Molecules / Organisms) | Trạng Thái |
|---|---|---|---|---|:---:|
| `TSK-P2-28` | `ADM-10` | **Danh sách Bài nộp Chờ chấm** | `planned_batch_5` | • `GradingQueueTable`: Lọc bài Writing/Speaking theo lớp, đề thi, ngày nộp<br>• `AIDraftIndicatorBadge`: Huy hiệu nhận biết bài đã có bản nháp từ AI | [ ] Chưa bắt đầu |
| `TSK-P2-29` | `ADM-11` | **Phòng Chấm Bài Writing theo Rubric** | `700c579e01254da6bf3802b1a2f57cf5`<br>[Xem ảnh Stitch](https://lh3.googleusercontent.com/aida/AEtjO1W3g49MSeJn--wZuBXy3ftqx7sOF_d4QWAiE9xUc2L3dfXyXgvTMhn1roA3yE4ulWjSX8e45H-VSoLLSPMfm5qN5z3lebpUgPTCDmm9zwKzZQiD0R0Zg4b28CxdjzzREqDzje2qgzpjuE1lslCZK1-mECYx7dQcbf2Yd2MSoeGpfFHEby2hTk-U2hAjptdupaX6rRn010Nh33rwnmHVeQbA90diAj4y6d953eFS6785G4Kp9pQp1qz4msM) | • `TeacherGradingHeader`: StudentMeta, WordCount, ActionButtons ('Chấm bằng AI', 'Lưu nháp', 'Hoàn tất chấm')<br>• `EssayAnnotatedPaper`: Văn bản bài viết với gạch chân lỗi lượn sóng (ngữ pháp đỏ, từ vựng vàng) kèm hover popover sửa lỗi<br>• `OverallBandCalculator`: Tự động tính Band tổng từ 4 tiêu chí<br>• `RubricCriterionAccordion`: 4 tiêu chí TR, CC, LR, GRA (Band score selector + Teacher feedback textarea)<br>• `GeneralCommentBox`: Nhận xét chung, quyền hiển thị lỗi AI cho học sinh | [x] Hoàn tất |
| `TSK-P2-30` | `ADM-12` | **Phòng Chấm Bài Speaking theo Rubric** | `planned_batch_5` | • `SpeakingAudioReviewPlayer`: Nghe lại audio từng câu của thí sinh kèm transcript<br>• `SpeakingRubricPanel`: Chấm 4 tiêu chí Fluency, Lexical, Grammar, Pronunciation | [ ] Chưa bắt đầu |
| `TSK-P2-31` | `ADM-13` | **Quản lý Lớp học (Classes)** | `planned_batch_5` | • `ClassGrid`: Danh sách lớp học do giáo viên tạo<br>• `CreateClassModal`: Form tạo lớp mới<br>• `JoinCodeShareModal`: Hiển thị Mã mời (Join Code 6 ký tự) và link mời | [ ] Chưa bắt đầu |
| `TSK-P2-32` | `ADM-14` | **Quản lý Khoá học (Courses)** | `planned_batch_5` | • `CourseBuilder`: Giao diện kéo thả sắp xếp các Đề thi và Bài luyện thành khoá học<br>• `ClassAttachmentModal`: Gán lớp học vào khoá học để cấp quyền tự động | [ ] Chưa bắt đầu |
| `TSK-P2-33` | `ADM-15` | **Quản lý Học sinh & Cấp lượt thi** | `planned_batch_5` | • `StudentRosterTable`: Danh sách học sinh trong lớp, lịch sử làm bài<br>• `GrantRetakeButton`: Nút cấp thêm lượt thi cho học sinh gặp sự cố mạng | [ ] Chưa bắt đầu |
| `TSK-P2-34` | `ADM-18` | **Quản lý Tài khoản Giáo viên (Owner)** | `planned_batch_5` | • `TeacherAccountTable`: Danh sách giáo viên trong hệ thống<br>• `CreateTeacherModal`: Cấp tài khoản giáo viên mới, khoá/mở tài khoản | [ ] Chưa bắt đầu |
| `TSK-P2-35` | `STU-13` | **Danh sách Bài Luyện Nghe (Catalog)** | `planned_batch_5` | • `DictationCatalogGrid`: Duyệt bài nghe chép chính tả theo chủ đề, cấp độ CEFR A2-C1<br>• `ProgressBar`: Thanh % hoàn thành các câu trong bài | [ ] Chưa bắt đầu |
| `TSK-P2-36` | `STU-15` | **Danh sách Bài Luyện Phát Âm (Catalog)** | `planned_batch_5` | • `PronunciationCatalogGrid`: Duyệt bài phát âm theo âm mục tiêu IPA (/θ/, /s/...)<br>• `HighestScoreBadge`: Hiển thị điểm số cao nhất từng đạt | [ ] Chưa bắt đầu |
| `TSK-P2-37` | `STU-17` | **Lớp học & Khoá học của tôi** | `planned_batch_5` | • `MyEnrolledClassesList`: Danh sách lớp học và khoá học đã tham gia<br>• `JoinClassModal`: Modal nhập mã mời (Join Code) để vào lớp mới | [ ] Chưa bắt đầu |
| `TSK-P2-38` | — | **Nghiệm Thu Toàn Diện 37 Màn Hình Stitch** | `audit_gate` | • Audit tính nhất quán Design System trên toàn bộ các màn hình<br>• Kiểm tra đầy đủ trạng thái tương tác và responsive<br>• Sẵn sàng chuyển giao các file HTML/CSS cho Phase 3 | [ ] Chưa bắt đầu |

---

### 💻 PHASE 3: CODE (CONVERT DESIGN SANG REACT COMPONENTS & BACKEND API)

#### Stage 3.1: Nền Tảng Frontend & Design Tokens Conversion
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-01` | Khởi tạo Dự án Frontend (React + Vite + TailwindCSS) | Cấu hình Vite SPA, TypeScript, React Router v6, Lucide React Icons. | [ ] Chưa bắt đầu |
| `TSK-P3-02` | Đồng bộ Tokens Stitch vào `tailwind.config.js` | Ánh xạ toàn bộ mã màu, phông chữ, khoảng cách từ Design System Stitch vào Tailwind config. | [ ] Chưa bắt đầu |
| `TSK-P3-03` | Xây dựng Thư viện React UI Atoms (Base Components) | Chuyển đổi mã Stitch HTML/CSS thành các component: `Button`, `Input`, `Badge`, `Modal`, `Tabs`, `Card`, `Switch`. | [ ] Chưa bắt đầu |
| `TSK-P3-04` | Xây dựng Audio & Multimedia Components | Xây dựng `AudioPlayer` (tua, lặp, đổi tốc độ), `AudioRecorder` (HTML5 MediaRecorder), `WaveformVisualizer`. | [ ] Chưa bắt đầu |

#### Stage 3.2: Hạ Tầng Backend & Phân Hệ Xác Thực (Auth & RBAC)
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-05` | Khởi tạo Backend NestJS & Docker Environment | Khởi tạo NestJS monorepo, Docker Compose (PostgreSQL 16, Redis 7, MinIO/Localstack S3). | [ ] Chưa bắt đầu |
| `TSK-P3-06` | Khởi tạo Prisma ORM & Supabase Database Migration | Viết schema Prisma đầy đủ theo `TECH_ARCHITECTURE.md`, khởi tạo PostgreSQL trên Supabase qua MCP, áp dụng migration DDL khởi tạo toàn bộ 13 bảng quan hệ. | [ ] Chưa bắt đầu |
| `TSK-P3-07` | Module Xác thực (Auth Module) | Đăng ký, đăng nhập JWT (Access + Refresh token), Google OAuth2, Password Hashing với bcrypt. | [ ] Chưa bắt đầu |
| `TSK-P3-08` | Phân quyền RBAC & `TeacherScopeGuard` | Viết Guards phân quyền Học sinh vs Giáo viên; viết `TeacherScopeGuard` đảm bảo giáo viên chỉ truy cập dữ liệu lớp của mình. | [ ] Chưa bắt đầu |

#### Stage 3.3: Lập Trình Phân Hệ Đề Thi & Phòng Thi (Exam Taking Engine)
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-09` | Backend Test Management API | API tạo đề, sửa cấu trúc 4 cấp (Test → Section → Group → Question), hỗ trợ 3 kiểu đề (IELTS, TOEIC, Khác). | [ ] Chưa bắt đầu |
| `TSK-P3-10` | API Import Đề thi từ Excel | Dịch vụ đọc file Excel/CSV, validate dữ liệu từng dòng, lưu hàng loạt vào DB có transaction. | [ ] Chưa bắt đầu |
| `TSK-P3-11` | Backend Exam Attempt Engine | API `POST /attempts/start` (trừ lượt, set timer server), API `POST /attempts/:id/auto-save`, API `POST /attempts/:id/submit`. | [ ] Chưa bắt đầu |
| `TSK-P3-12` | Bộ Lọc Bảo Vệ Đáp Án (`AnswerSanitizerInterceptor`) | Loại bỏ `correct_answers` và `explanation` khi đề ở chế độ Ẩn (`keep_correctness` hoặc `score_only`). | [ ] Chưa bắt đầu |
| `TSK-P3-13` | Ghép Giao diện Phòng Thi React (`STU-06`, `STU-07`) | Tích hợp layout Split-view, bộ đếm ngược, Palette câu hỏi, auto-save hook, cảnh báo nộp bài. | [ ] Chưa bắt đầu |
| `TSK-P3-14` | Ghép Giao diện Xem Kết quả & Đáp án (`STU-10`, `STU-11`) | Hiển thị điểm quy đổi chuẩn, xem lại câu hỏi đúng/sai tuỳ theo cấu hình ẩn/hiện của giáo viên. | [ ] Chưa bắt đầu |

#### Stage 3.4: Chấm Điểm Writing & Thi Thử Speaking (AI Assisted)
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-15` | Cấu hình Redis BullMQ Background Queue | Thiết lập Queue & Worker xử lý tác vụ âm thanh và chấm AI nền không chặn luồng chính. | [ ] Chưa bắt đầu |
| `TSK-P3-16` | Tích hợp S3 Presigned URL Upload | Cơ chế client upload trực tiếp file ghi âm lên S3/R2 với presigned URL, tiết kiệm băng thông backend. | [ ] Chưa bắt đầu |
| `TSK-P3-17` | Phòng Thi Speaking Simulator React (`STU-08`, `STU-09`) | Lập trình luồng 3 Parts Speaking: Mic check, tự động phát câu hỏi audio, đồng hồ chuẩn bị Part 2, thu âm từng câu. | [ ] Chưa bắt đầu |
| `TSK-P3-18` | Module Chấm Writing với Gemini 2.5 API | Prompt chấm theo Rubric 4 tiêu chí, trả về JSON điểm từng tiêu chí và mảng `annotations` lỗi inline. | [ ] Chưa bắt đầu |
| `TSK-P3-19` | Module Chấm Speaking Background Worker | Worker kết hợp Azure STT + Pronunciation Assessment + Gemini LLM chấm 4 tiêu chí Speaking, lưu `ai_evaluations`. | [ ] Chưa bắt đầu |
| `TSK-P3-20` | Tính năng Học sinh Tự Xin AI Chấm Tham Khảo | Nút "Nhờ AI chấm" sau khi nộp Writing/Speaking; hiển thị nhãn "Đánh giá AI tham khảo" tách bạch (`STU-12`). | [ ] Chưa bắt đầu |
| `TSK-P3-21` | Phòng Chấm Rubric Giáo Viên (`ADM-10`, `ADM-11`, `ADM-12`) | Giao diện chấm bài Writing & Speaking: load bản nháp AI, sửa điểm/nhận xét, Hoàn tất chấm chính thức. | [ ] Chưa bắt đầu |

#### Stage 3.5: Luyện Phát Âm (Pronunciation Lab) & Nghe Chép (Dictation Lab)
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-22` | Thuật toán So khớp Diff Nghe Chép | Thuật toán đối chiếu văn bản học sinh chép với transcript chuẩn: gắn tag thiếu, thừa, sai từ tức thì. | [ ] Chưa bắt đầu |
| `TSK-P3-23` | Tích hợp Gemini Giải thích Lỗi Nghe Chép | LLM nhận kết quả diff, phân loại nguyên nhân lỗi (đồng âm, số ít/nhiều, nuốt âm) và giải thích tiếng Việt. | [ ] Chưa bắt đầu |
| `TSK-P3-24` | Ghép Giao diện Dictation Lab (`STU-13`, `STU-14`) | Hoàn thiện trải nghiệm nghe lặp câu, gõ chính tả và xem kết quả giải thích lỗi trực quan. | [ ] Chưa bắt đầu |
| `TSK-P3-25` | Tích hợp Azure AI Speech Pronunciation Assessment SDK | Cấu hình chấm en-US cấp độ phoneme/word; lấy chỉ số Accuracy, Fluency, Completeness. | [ ] Chưa bắt đầu |
| `TSK-P3-26` | Ghép Giao diện Pronunciation Lab (`STU-15`, `STU-16`) | Thu âm phát âm qua micro, hiển thị từ tô màu xanh/vàng/đỏ, popup phân tích âm vị lỗi và hướng dẫn sửa. | [ ] Chưa bắt đầu |
| `TSK-P3-27` | Quản lý Hạn Mức Sử Dụng AI (`daily_ai_quota`) | Cơ chế kiểm tra và trừ lượt gọi AI; chặn gọi khi hết hạn mức và hiển thị thông báo làm mới. | [ ] Chưa bắt đầu |

#### Stage 3.6: Quản Lý Lớp Học, Cấp Lượt Thi & Tự Động Hoá Dọn Dẹp
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-28` | Module Quản lý Lớp & Khoá học (`ADM-13`, `ADM-14`, `STU-17`) | CRUD Lớp học, tạo mã mời (Join Code 6 ký tự), học sinh nhập mã vào lớp, gán đề thi vào khoá học. | [ ] Chưa bắt đầu |
| `TSK-P3-29` | Tính năng Giáo viên Cấp thêm Lượt thi (Grant Retake) | Giao diện và API cho phép giáo viên cấp thêm lượt thi cụ thể cho học sinh khi có sự cố (`ADM-15`). | [ ] Chưa bắt đầu |
| `TSK-P3-30` | Lập lịch Dọn dẹp File Âm thanh 30 ngày (Cron Job) | Viết NestJS `@Cron('0 2 * * *')` quét bản ghi âm có `delete_after <= NOW()`, tự động xoá trên S3. | [ ] Chưa bắt đầu |
| `TSK-P3-31` | Báo cáo Thống kê & Phân tích Đề thi (`ADM-16`) | Biểu đồ phổ điểm của lớp, thống kê tỷ lệ đúng theo từng câu hỏi, xuất báo cáo Excel/CSV. | [ ] Chưa bắt đầu |
| `TSK-P3-32` | Phân hệ Quản trị Chủ sở hữu (Owner Settings) (`ADM-18`, `ADM-19`) | Tạo tài khoản giáo viên mới, khoá tài khoản, cài đặt hạn mức AI mặc định, xem nhật ký Audit Logs. | [ ] Chưa bắt đầu |

#### Stage 3.7: Kiểm Thử, Tối Ưu & Đóng Gói Triển Khai
| Task ID | Nhiệm Vụ | Mô Tả Chi Tiết & Đầu Ra | Trạng Thái |
|---|---|---|:---:|
| `TSK-P3-33` | Kiểm thử Tải & Hiệu năng Phòng thi | Kịch bản mô phỏng 500 thí sinh làm bài đồng thời với công cụ k6 / Artillery, tối ưu query PostgreSQL. | [ ] Chưa bắt đầu |
| `TSK-P3-34` | Kiểm thử Bảo mật & IDOR Prevention | Rà soát kiểm tra rò rỉ đáp án, kiểm tra chéo quyền hạn truy cập dữ liệu giữa các giáo viên khác nhau. | [ ] Chưa bắt đầu |
| `TSK-P3-35` | Kiểm thử E2E Toàn bộ Luồng Người dùng | Viết kiểm thử tự động Cypress/Playwright cho luồng: Đăng nhập → Thi thử → AI chấm nháp → Giáo viên xác nhận. | [ ] Chưa bắt đầu |
| `TSK-P3-36` | Triển Khai Backend lên Render (Render MCP) | Khởi tạo Web Service trên Render qua MCP liên kết với repo `namvnp3008/webhoctienganh`, cấu hình biến môi trường kết nối Supabase và deploy release. | [ ] Chưa bắt đầu |

---

## 3. KẾ HOẠCH TRIỂN KHAI SPRINT (SPRINT MAPPING)

| Sprint | Thời Lượng | Trọng Tâm Nhiệm Vụ | Mục Tiêu & Cột Mốc Bàn Giao (Milestone) |
|---|:---:|---|---|
| **Sprint 1** | 2 tuần | `TSK-P1-01` -> `TSK-P1-04`<br>`TSK-P2-00` -> `TSK-P2-12` | Hoàn tất Planning; Tạo Design System Stitch; Hoàn thành thiết kế Batch 1 & Batch 2 trên Google Stitch (12 màn hình cốt lõi). |
| **Sprint 2** | 2 tuần | `TSK-P2-13` -> `TSK-P2-38`<br>`TSK-P3-01` -> `TSK-P3-04` | Hoàn thành trọn vẹn 37/37 màn hình trên Google Stitch; Thiết lập xong thư viện React UI Components & Design Tokens. |
| **Sprint 3** | 2 tuần | `TSK-P3-05` -> `TSK-P3-14` | Xong Backend NestJS Auth, Prisma DB, Exam Attempt Engine; Ghép giao diện Phòng thi trực tuyến React (Exam Room). |
| **Sprint 4** | 2 tuần | `TSK-P3-15` -> `TSK-P3-21` | Hoàn thiện BullMQ, Azure Speech STT, Gemini Rubric; Ghép Phòng thi Speaking & Phòng chấm bài Rubric của giáo viên. |
| **Sprint 5** | 2 tuần | `TSK-P3-22` -> `TSK-P3-27` | Hoàn thiện Phòng Luyện phát âm (Pronunciation Lab) & Nghe chép (Dictation Lab); Kiểm soát hạn mức AI mỗi ngày. |
| **Sprint 6** | 2 tuần | `TSK-P3-28` -> `TSK-P3-36` | Hoàn thiện Quản lý Lớp học, cấp lượt thi, Cron job xoá audio 30 ngày, Kiểm thử tải 500 CCU, UAT và đóng gói release. |

---

## 4. TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE - DOD)

Mỗi Task trong kế hoạch chỉ được đánh dấu hoàn thành `[x]` khi thoả mãn:
1. **Design Gate (Stitch):** Màn hình đã được generate và review trên Google Stitch, đúng design tokens, có đủ trạng thái hover/active/error/empty.
2. **Code Parity Gate:** Component React khớp 100% về layout và visual so với Stitch design; tái sử dụng đúng class TailwindCSS.
3. **Backend & Security Gate:** Các API đi kèm được bảo vệ bởi JwtGuard, TeacherScopeGuard (nếu là tài nguyên lớp học), và AnswerSanitizerInterceptor (nếu là kết quả thi).
4. **Testing Gate:** Unit test và Integration test của task đã pass, không có lỗi console hoặc TypeScript type-check warning.
