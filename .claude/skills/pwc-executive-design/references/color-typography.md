# Color Palette & Typography 상세 표준

## Color Palette (PwC 2025 Brand System)

### Primary Palette

| Role | Color Name | Hex | RGB | Usage |
|------|-----------|-----|-----|-------|
| Signature | PwC Orange | #D04A02 | 208, 74, 2 | Momentum Mark, Primary Accent, Key Messages |
| Warm | Tangerine | #EB8C00 | 235, 140, 0 | Secondary Accent, Hover/Active States |
| Gold | Amber | #FFB600 | 255, 182, 0 | Tertiary Highlights, Badge, Tag |
| Text Primary | Black | #000000 | 0, 0, 0 | Headlines, Primary Body Text |
| Text Secondary | Dark Gray | #2D2D2D | 45, 45, 45 | Sub-headlines, Secondary Text |
| Text Tertiary | Medium Gray | #464646 | 70, 70, 70 | Supporting Text, Description |
| Neutral | Light Gray | #7D7D7D | 125, 125, 125 | Captions, Metadata, Footnotes |
| Background | Off-White | #DEDEDE | 222, 222, 222 | Subtle Separators, Disabled States |
| Alert | Red | #E0301E | 224, 48, 30 | Risk Items, Critical Alerts, Blockers |
| Accent | Rose | #DB536A | 219, 83, 106 | Selective Emphasis, Secondary Alert |

### Background System

| Context | Color | Hex | Usage |
|---------|-------|-----|-------|
| Default | White | #FFFFFF | 모든 슬라이드/문서의 기본 배경 |
| Card/Section | Light Gray | #F5F5F5 | 영역 구분, Card Background, Bumper Box |
| Separator | Off-White | #EAEAEA | 얇은 구분선, Table Border |
| Subtle Alt | Near White | #FAFAFA | Alternating Table Row |
| Dark (Optional) | Near Black | #1A1A1A | Title/Conclusion Slide Only (요청 시) |

### Orange Accent 사용 규칙

Orange는 가장 강력한 시각 요소이므로 절제하여 사용한다.

허용 용도:
- Key Messages / Strategic Highlights
- Momentum Mark / Brand Element
- Bumper Statement Left Border
- Critical Decision Points
- Priority Indicators / Action Required
- Chart의 Key Data Point Highlight

금지 용도:
- 대면적 배경색
- 장식용 Bar/Stripe
- 일반 Body Text 색상
- 모든 Icon에 일괄 적용

### 절대 금지 Color 사용

- Rainbow Palette
- Excessive Gradients (2색 이상)
- Multi-color Table Cells
- 3D Effects / Drop Shadow
- Marketing-Style Neon Colors
- Cream/Beige Default Background (#F5F5DC, #FAF0E6 등)

---

## Typography 상세 표준

### Font System

PwC 공식 서체: **Georgia** (Header, Serif) + **Arial** (Body, Sans-serif)

| Element | Font | Size | Weight | Color | Align | Notes |
|---------|------|------|--------|-------|-------|-------|
| Slide Title (Action Title) | Georgia | 24-28pt | Bold | #000000 | Left | 완전한 문장, 1-2줄 |
| Slide Subtitle | Arial | 14pt | Regular | #464646 | Left | Context, Optional |
| Section Header | Arial | 18-20pt | Bold | #000000 | Left | 섹션 구분 |
| Body Text | Arial | 12-14pt | Regular | #2D2D2D | Left | 본문 |
| Bullet Text | Arial | 12-14pt | Regular | #2D2D2D | Left | 들여쓰기 일관 |
| Bumper Statement | Arial | 11-12pt | Bold | #000000 | Left | Takeaway Box 내부 |
| Data Label | Arial | 10-12pt | Regular | #464646 | Varies | Chart/Table 내 |
| Caption / Source | Arial | 9-10pt | Regular | #7D7D7D | Left | 출처, 각주 |
| Page Number | Arial | 8pt | Regular | #7D7D7D | Right | Footer, Optional |

### Typography Rules

1. 최대 2개 서체만 사용 (Georgia + Arial)
2. 장식용/Display 폰트 절대 금지
3. 본문은 항상 Left-Align
4. Center Align은 Slide Title만 허용 (선택적)
5. Bold는 강조 시에만 사용 (과도한 Bold 금지)
6. Italic은 인용, 강조 보조로만
7. ALL CAPS는 Section Label에만 제한적 사용
8. Font Size 일관성 유지 (같은 요소는 항상 같은 크기)
9. Line Spacing: Body Text 1.2-1.5배
10. Action Title은 반드시 1-2줄 (넘으면 메시지 단순화 또는 슬라이드 분리)

### PPTX Safe Font 참고

LibreOffice 환경에서 렌더링 신뢰도가 높은 폰트:
Arial, Calibri, Cambria, Times New Roman, Courier New, Bookman Old Style, Century Schoolbook

Georgia는 Header/Title에 사용 시 Safe하나, Body Text에서 긴 단락은 overflow 여유(~10%)를 두어야 한다.

### DOCX/Confluence 서체 적용

| Output | Header Font | Body Font | Notes |
|--------|------------|-----------|-------|
| PPTX | Georgia | Arial | Full Application |
| DOCX | Heading: Arial Bold | Body: Arial | Word에서 Georgia 대신 Arial Bold 사용 가능 |
| Confluence | H1-H3: Default Bold | Body: Default | 웹 폰트 한계로 시스템 폰트 사용 |
| draw.io | Label: Arial | Note: Arial | 다이어그램 텍스트 통일 |
