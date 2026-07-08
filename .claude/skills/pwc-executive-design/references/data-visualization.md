# Data Visualization & Table 표준

## Chart Design

### Chart Type 선택 가이드

| Chart Type | Use Case | Max Items | Notes |
|-----------|----------|-----------|-------|
| Bar / Column | 항목 비교, 순위 | 7 | Horizontal Bar for 긴 레이블 |
| Stacked Bar | 구성 비교 | 5 stacks | 전체 대비 부분 비교 시 |
| Line | 시계열 추이 | 4 lines | 추세 강조 |
| Donut | 비율, 구성 | 5 segments | Pie 대신 Donut 사용 |
| Waterfall | 변동 분석 (증감) | — | 시작→변동→결과 |
| Heatmap | 성숙도, 우선순위 매트릭스 | — | 제한된 색상 스케일 (3-5) |
| Scatter | 상관관계, 분포 | — | 축 레이블 필수 |
| Bubble | 3차원 비교 | 15 | 크기=규모, 색상=카테고리 |
| Gantt / Timeline | 일정, 로드맵 | — | Capability 중심 (날짜 종속 최소화) |

### Chart Design Rules

1. **Action Title**: 차트 제목은 결론 진술 (BAD: "매출 추이" → GOOD: "Q3 매출이 전년 대비 15% 감소하여 전략 재검토가 필요하다")
2. **Source Attribution**: 모든 정량적 데이터에 출처 필수
3. **Color**:
   - Key Data Point: Orange (#D04A02) Highlight
   - 기본 데이터: Medium Gray (#7D7D7D) 또는 Dark Gray (#464646)
   - 비교 항목: Light Gray (#DEDEDE) 또는 Off-White (#EAEAEA)
4. **Gridline**: Light Gray (#EAEAEA), 최소한으로 (주요 축만)
5. **Legend**: 차트 내부 또는 바로 옆 배치
6. **3D 절대 금지**: 모든 차트는 2D Flat
7. **데이터 라벨**: 핵심 데이터 포인트에만 직접 표시
8. **축 라벨**: 명확한 단위 포함 (억원, %, 건수)
9. **White Space**: 차트 주변 충분한 여백

### Chart Color Palette (순서대로 사용)

```
1st: #D04A02 (PwC Orange) — Key/Primary
2nd: #464646 (Medium Gray) — Secondary
3rd: #EB8C00 (Tangerine) — Tertiary
4th: #7D7D7D (Light Gray) — Quaternary
5th: #FFB600 (Amber) — Fifth
Alert: #E0301E (Red) — Negative/Risk
```

---

## Table Design

### Standard Table Style

| Property | Value |
|----------|-------|
| Border | Thin 1px, #EAEAEA |
| Header Row BG | #F5F5F5 (Light Gray) |
| Header Text | Arial Bold, #000000 |
| Body Text | Arial Regular, #2D2D2D |
| Alternating Row | White (#FFFFFF) / Near White (#FAFAFA) |
| Highlight Row | Light Orange tint or Bold text (색상 아닌 구조로 강조) |
| Cell Padding | 적절한 내부 여백 (8-12px) |
| Alignment | 텍스트: Left, 숫자: Right, 헤더: Left |

### Table Anti-Patterns (금지)

- Heavy Shading / Dark Background Cells
- Multi-color Cells (3색 이상)
- Merged Cells 남용
- Visual Clutter (과도한 Border, Icon)
- 전체 행 Bold 처리

---

## Heatmap Design

### Color Scale

3-5단계 제한 색상 스케일 사용:

```
5-Level Scale:
□ #F5F5F5 — Not Started / N/A
□ #FFB600 — Initial / Low
□ #EB8C00 — Developing / Medium
□ #D04A02 — Established / High
□ #E0301E — Critical / Very High (Risk 용도)
```

```
3-Level Scale (Maturity):
□ #EAEAEA — Low
□ #EB8C00 — Medium
□ #D04A02 — High
```

### Heatmap Rules

- Strong Row/Column Labeling
- Clear Priority 표시
- Rainbow Palette 절대 금지
- Legend 항상 포함
- 색상만으로 정보 구분하지 말 것 (숫자/레이블 병행)

---

## Decision Matrix / Scoring Table

### 표준 형식

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| 기준 1 | 30% | Score | Score | Score |
| 기준 2 | 25% | Score | Score | Score |
| ... | ... | ... | ... | ... |
| **Weighted Total** | **100%** | **Total** | **Total** | **Total** |

- 최고 점수 항목: Orange (#D04A02) Bold 처리
- Score Range: 1-5 또는 1-10
- Weight 합계: 반드시 100%

---

## KPI Dashboard Layout

### Single KPI Card

```
┌─────────────────────┐
│  KPI Name           │  ← 10pt, Gray
│  247                │  ← 36-48pt, Bold, Black (or Orange if target met)
│  ▲ 12% vs LY       │  ← 10pt, Green/Red Arrow
│  Target: 250        │  ← 9pt, Gray
└─────────────────────┘
```

### KPI Card Rules

- Big Number 중심 (36pt 이상)
- 변화율 Arrow (▲▼) 포함
- Target 대비 현황 명시
- 카드당 1개 KPI만
- 3-4개 카드를 가로 배열
