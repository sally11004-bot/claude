# Quality Checklist & Tests

## 5가지 필수 Test

### Test 1: Executive Readability Test

모든 페이지/슬라이드는 **10-15초 이내에 이해 가능**해야 한다.

체크 항목:
- [ ] Key Message가 즉시 보이는가?
- [ ] 핵심 데이터/결론이 스캔 가능한가?
- [ ] Board Meeting에서 프로젝터로 읽을 수 있는가?
- [ ] 불필요한 디테일이 핵심 메시지를 가리지 않는가?

### Test 2: Slide-Level "So What" Test

모든 슬라이드의 모든 요소에 대해:

> "이 요소가 Action Title을 증명하는가?"

- Yes → 유지
- No → **삭제**

모든 데이터 포인트, 차트, 텍스트 블록, 아이콘에 적용.

### Test 3: Deck-Level Storyline Test

모든 Action Title만 순서대로 읽어서:

> "완전한 논리적 스토리가 전개되는가?"

- Yes → 통과
- No → 슬라이드 순서 또는 Action Title 재구성

Ideal Flow:
Situation → Challenge → Analysis → Options → Recommendation → Roadmap → Next Steps

### Test 4: Data Credibility Test

- [ ] 모든 정량적 주장에 Source가 있는가?
- [ ] Source가 신뢰할 수 있는 출처인가? (1차 자료 우선)
- [ ] 데이터가 최신인가? (1년 이내 권장)
- [ ] 차트/표에 단위가 명시되어 있는가?
- [ ] 비교 기준(Base)이 명확한가?

### Test 5: Brand & Design Compliance

- [ ] Color Palette 준수 (PwC 2025 System)
- [ ] Typography 준수 (Georgia + Arial)
- [ ] Slide Anatomy 준수 (Action Title + Body + Bumper)
- [ ] Layout Grid 일관성
- [ ] AI-Generated Slide 패턴 회피
- [ ] Icon/Image Policy 준수

---

## Output Quality Checklist (최종 점검)

모든 산출물은 다음을 충족해야 한다:

### Content Quality

- [ ] **Executive-Friendly**: C-Level이 이해할 수 있는가?
- [ ] **Board-Level Readable**: 이사회 보고용으로 적합한가?
- [ ] **Governance-Oriented**: 거버넌스 관점이 포함되어 있는가?
- [ ] **Business Outcome Driven**: 비즈니스 성과와 연결되어 있는가?
- [ ] **Architecture Aligned**: 아키텍처 원칙과 정합되는가?
- [ ] **Transformation Focused**: 변혁 관점이 반영되어 있는가?
- [ ] **Minimal yet Informative**: 필요한 정보만 포함하고 있는가?
- [ ] **Consulting-Grade Quality**: 컨설팅 펌 수준의 품질인가?

### Structure Quality

- [ ] **Action Title Applied**: 모든 슬라이드에 Action Title이 있는가?
- [ ] **Bumper Statement Applied**: 핵심 슬라이드에 Bumper가 있는가?
- [ ] **Source Attributed**: 모든 데이터에 출처가 있는가?
- [ ] **MECE Structure**: 구조가 MECE한가?
- [ ] **Conclusion First**: 결론이 먼저 제시되는가?
- [ ] **Visual Hierarchy**: 시각적 우선순위가 올바른가?

### Design Quality

- [ ] **PwC 2025 Brand Compliant**: 브랜드 시스템 준수
- [ ] **Consistent Layout**: 일관된 레이아웃
- [ ] **Proper Margins**: 0.5" 이상 여백
- [ ] **No Text Overflow**: 텍스트가 상자를 넘지 않음
- [ ] **No AI-Generated Patterns**: AI 생성 패턴 없음
- [ ] **Accessible**: 색상 대비, 폰트 크기 적절

---

## AI-Generated Slide Detection Checklist

다음 패턴이 발견되면 반드시 수정:

| Pattern | Problem | Fix |
|---------|---------|-----|
| Title 아래 Accent Line | AI 생성 전형 | Whitespace 또는 BG Color로 대체 |
| Header/Footer Color Bar | 장식용 필러 | 제거 |
| Card Single-Side Border | AI 생성 전형 | Subtle BG Tint 또는 Drop Shadow |
| Generic Blue (#4472C4) | 기본 템플릿 | PwC Orange Palette 적용 |
| Clip Art / Stock Icon 남용 | 비전문적 | 텍스트 우선, 필요 시 Line Icon만 |
| 모든 슬라이드 동일 Layout | 단조로움 | Layout 변형 (2-col, Grid, Callout 등) |
| Cream/Beige Background | AI 기본값 | White (#FFFFFF) |
| ALL CAPS Body Text | 가독성 저하 | Sentence Case |

---

## Accessibility Checklist

- [ ] Color Contrast: WCAG 2.2 AA 이상 (4.5:1 for text)
- [ ] Font Size: 최소 12pt Body Text
- [ ] 색상만으로 정보 구분하지 않음 (Pattern/Label 병행)
- [ ] Alt Text 포함 (PPTX Image/Chart)
- [ ] 순서가 있는 콘텐츠는 번호 사용
- [ ] 링크 텍스트가 의미를 전달 ("여기 클릭" 금지)
