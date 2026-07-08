---
name: pwc-executive-design
description: "PwC Executive Design & Consulting Standard (v5.0). 모든 Executive 산출물(PPTX, DOCX, Confluence, draw.io 등)에 PwC 2025 브랜드 시스템과 Tier-1 컨설팅 슬라이드 표준을 적용한다. 다음 상황에서 반드시 이 스킬을 사용할 것: 프레젠테이션/슬라이드 작성 시, Executive Summary 또는 Board-Level 문서 작성 시, 아키텍처 다이어그램(draw.io/Mermaid) 생성 시, 컨설팅 스타일 보고서/LLD/TA 문서 작성 시, Roadmap/Maturity Model/Heatmap 생성 시, AI Native/Platform Engineering/DevOps 관련 산출물 작성 시. PwC 스타일, 컨설팅 슬라이드, Executive 보고서, Board 프레젠테이션, 아키텍처 문서, 거버넌스 산출물이 언급되면 이 스킬을 트리거한다."
---

# PwC Executive Design & Consulting Standard v5.0

PwC 2025 Global Brand Refresh ("So You Can", April 2025) 반영.
EXECUTIVE_PWC_DESIGN_SKILL_v4.1 + EXECUTIVE_CONSULTING_SKILL_v4.1 통합본.

## Quick Reference

| 상세 영역 | 참조 파일 |
|-----------|----------|
| Color Palette & Typography 상세 | [references/color-typography.md](references/color-typography.md) |
| Architecture & Diagram 표준 | [references/architecture.md](references/architecture.md) |
| Domain별 표준 (AI, Platform, DevOps, Governance) | [references/domain-standards.md](references/domain-standards.md) |
| Data Visualization & Table 표준 | [references/data-visualization.md](references/data-visualization.md) |
| Quality Checklist & Tests | [references/quality-checklist.md](references/quality-checklist.md) |
| Slide Type Templates | [references/slide-templates.md](references/slide-templates.md) |

---

## 1. Design Philosophy

Design is a communication system, not decoration.

Every page must communicate:

- One Primary Message (what is happening)
- One Supporting Narrative (why it matters)
- One Decision Implication (what should be done)
- One Expected Outcome (what will result)

### PwC 2025 Brand Personality

- **Bold** — 명확하고 자신감 있는 메시지
- **Collaborative** — 고객 중심의 파트너십 톤
- **Optimistic** — 미래 지향적이고 가능성 중심

### Core Characteristics

Ultra Minimal, Text-Centric, Executive Summary Driven, Strong Grid Alignment,
Wide Whitespace, Digital-First, Flat Design, Thin Dividers, Message First,
Board-Level Readability, Human Outcome Focused.

---

## 2. Color System (Quick)

상세: [references/color-typography.md](references/color-typography.md)

| Role | Hex | Usage |
|------|-----|-------|
| Signature Orange | #D04A02 | Primary Accent, Key Messages |
| Tangerine | #EB8C00 | Secondary Accent |
| Amber | #FFB600 | Tertiary Highlights |
| Black | #000000 | Headlines, Body |
| Dark Gray | #2D2D2D | Sub-headlines |
| Medium Gray | #464646 | Supporting Text |
| Light Gray | #7D7D7D | Captions |
| Off-White | #DEDEDE | Separators |
| Alert Red | #E0301E | Risk, Critical |
| Rose | #DB536A | Selective Emphasis |

### Background

White (#FFFFFF) default. Light Gray (#F5F5F5) for card/section. Off-White (#EAEAEA) for dividers.

### Orange Accent 용도 제한

Key Messages, Momentum Mark, Critical Decision Points, Priority Indicators, Action Required Items.

### 금지

Rainbow Palette, Excessive Gradients, Multi-color Cells, 3D Effects, Marketing-Style Blocks.

---

## 3. Typography (Quick)

상세: [references/color-typography.md](references/color-typography.md)

PwC Official Pair: **Georgia** (Header) + **Arial** (Body). 최대 2개 서체.

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Action Title | Georgia | 24-28pt | Bold |
| Section Header | Arial | 18-20pt | Bold |
| Body Text | Arial | 12-14pt | Regular |
| Bumper Statement | Arial | 11-12pt | Bold |
| Caption / Source | Arial | 9-10pt | Regular, #7D7D7D |

본문 항상 Left-Align. Center는 Title만. 장식용 폰트 금지.

---

## 4. Slide Anatomy (Consulting Standard)

모든 슬라이드는 다음 3단 구조를 따른다:

```
┌──────────────────────────────────────────────┐
│  ACTION TITLE (Key Takeaway as Sentence)     │  ← Georgia 24-28pt Bold
│  Subtitle (Context, Optional)                │  ← Arial 14pt Gray
├──────────────────────────────────────────────┤
│                                              │
│              CONTENT BODY                    │  ← Action Title을 증명하는 근거
│     (Chart / Diagram / Structured Text)      │
│                                              │
├──────────────────────────────────────────────┤
│  ▌BUMPER STATEMENT (So What / Takeaway)      │  ← Orange Left Border, Bold
├──────────────────────────────────────────────┤
│  Source: [Attribution] | Confidential        │  ← 9pt Gray
└──────────────────────────────────────────────┘
```

### Action Title Rules

Action Title은 슬라이드의 핵심 결론을 **완전한 문장**으로 진술한다.

- BAD: "시장 동향" (Topic Title)
- GOOD: "국내 BSS 시장은 2026년까지 연 12% 성장하며 클라우드 전환이 가속화된다"

**Storyline Test**: 모든 Action Title만 순서대로 읽어서 완전한 논리적 스토리가 전개되어야 한다.

### Bumper Statement Rules

- Orange Left Border (#D04A02) + Light Gray BG (#F5F5F5)
- "So What" 질문에 대한 답변
- 1-2문장, 의사결정 Implication

---

## 5. Communication Style

### Writing Rules

1. **Conclusion First** (Pyramid Principle)
2. **MECE Structure** (상호배타적, 전체포괄적)
3. Short and Strong Statements
4. Action-Oriented Wording
5. Executive Summary Before Details
6. **SCR Framework** (Situation → Complication → Resolution)

### Preferred Messaging

| Category | Terms |
|----------|-------|
| Strategy | Unified Operating Model, Governed Autonomy, Policy Driven Operation |
| AI | AI Assisted Decision Making, Runtime Intelligence, Autonomous Operation |
| Platform | Platform as Product, Developer Experience, Golden Path |
| Governance | Governance by Design, Compliance by Default, Audit-Ready |
| Outcome | Business Outcome Focused, Human Outcome Centered, Value in Motion |
| Transformation | Momentum, Capability Evolution, Digital Reinvention |

### Anti-Patterns

Tool-Centric, Technology-First, Vendor-Centric Messaging, Excessive Jargon 금지.

---

## 6. Document Structure

### Standard Executive Structure

1. **Executive Summary**: Situation, Challenges, Direction, Outcomes
2. **Business Drivers**: Why Change, Risks, Cost/Competitive/Technology Drivers
3. **Current State Assessment**: As-Is Architecture, Capability Maturity, Gap Analysis
4. **Target State**: Future Operating/Capability/Governance/Architecture Model
5. **Transformation Roadmap**: Capability-Driven Phases
6. **Investment & Risk**: Cost-Benefit, Risk Assessment, Decision Matrix
7. **Governance & Next Steps**: Structure, Decisions Required, Actions

### Phase Models

| Pattern | P1 | P2 | P3 | P4 |
|---------|----|----|----|----|
| Maturity | Foundation | Expansion | Optimization | Autonomous |
| Delivery | Define | Validate | Build | Scale |
| State | Current | Transition | Target | Future |
| AI | Manual | Assisted | Automated | Autonomous |

### Visual Hierarchy (역순 금지)

1. Key Message → 2. Business Outcome → 3. Governance Implication → 4. Evidence → 5. Architecture Detail → 6. Technical Detail

---

## 7. Layout Principles

- **16:9** Aspect Ratio
- **0.5"** Minimum Margins
- **0.3-0.5"** Between Content Blocks
- **No-Fly Zone**: 하단 0.5" = Source/Footer 전용
- Whitespace는 디자인 요소. 빈 공간을 채우지 않는다.

---

## 8. Architecture Presentation (Quick)

상세: [references/architecture.md](references/architecture.md)

### Layer Model

Business → Governance → Experience → Runtime → Platform → Execution → Infrastructure

### Diagram Rules

Focus: Responsibilities, Relationships, Control Points, Business Outcomes.
Avoid: Excessive Logos, Dense Implementation, Decorative Elements.
Style: White BG, Light Gray Structure, Orange Highlights, Thin Separators.

---

## 9. Data Visualization (Quick)

상세: [references/data-visualization.md](references/data-visualization.md)

- 모든 데이터에 Source Attribution 필수
- Chart Title = Action Title (결론 진술)
- Highlight: Orange (#D04A02) for Key Data Point
- 3D 차트 금지, Gridline은 #EAEAEA 최소한으로
- Table: Thin Borders, Light Gray Header, Alternating Rows

---

## 10. Quality Standard (Quick)

상세: [references/quality-checklist.md](references/quality-checklist.md)

### 5가지 필수 Test

1. **Readability Test**: 10-15초 이내 이해 가능한가?
2. **So What Test**: 모든 요소가 Action Title을 증명하는가?
3. **Storyline Test**: Action Title만으로 스토리가 전달되는가?
4. **Credibility Test**: 모든 데이터에 Source가 있는가?
5. **Quality Checklist**: Executive-Friendly, Board-Level Readable, Governance-Oriented, Consulting-Grade

---

## 11. AI-Generated Slide Detection (반드시 회피)

- Title 아래 Accent Line/Underline
- Header/Footer Color Bar/Stripe
- Card의 Single-Side Border
- Generic Blue Color Scheme
- Clip Art/Stock Icon 남용
- 모든 슬라이드 동일 Layout
- Cream/Beige Default Background

---

## 12. Icon & Imagery Policy

- Icon은 선택사항. Text가 항상 우선.
- 사용 시: Line Icon, Monochrome, Consistent Size.
- Photography: Naturally Lit, Authentic Scenes (PwC 2025).
- 다양성/포용성 반영. Stock Photo 느낌 최소화.

---

## 13. Multi-Format 적용 가이드

| Output | Design 적용 |
|--------|------------|
| PPTX | Full Application (Slide Anatomy, Color, Typography 전체) |
| DOCX (LLD/TA) | Color, Typography, Table Style, Heading Hierarchy |
| Confluence | Color, Table, Heading Hierarchy |
| draw.io | Color Palette, Architecture Layer, Diagram Rules |
| Excel | Table Style, Chart Rules |

---

## Appendix: Version Info

- **Version**: 5.0
- **Base**: EXECUTIVE_PWC_DESIGN_SKILL_v4.1 + EXECUTIVE_CONSULTING_SKILL_v4.1
- **Brand Reference**: PwC 2025 Global Brand Refresh (April 2025, "So You Can")
- **Font Pair**: Georgia (Header) + Arial (Body)
- **Signature Color**: Orange #D04A02
