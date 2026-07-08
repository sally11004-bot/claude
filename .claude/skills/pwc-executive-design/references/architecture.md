# Architecture & Diagram 표준

## Architecture Layer Model

```
┌─────────────────────────────────┐
│       BUSINESS LAYER            │  Strategy, Capability, Value Stream, KPI
├─────────────────────────────────┤
│       GOVERNANCE LAYER          │  Policy, Risk, Compliance, Audit, AI Governance
├─────────────────────────────────┤
│       EXPERIENCE LAYER          │  Channel, UX, API Gateway, Portal
├─────────────────────────────────┤
│       RUNTIME LAYER             │  Service Mesh, mTLS, Observability, Tracing
├─────────────────────────────────┤
│       PLATFORM LAYER            │  OCP, ROSA, Container Runtime, Registry
├─────────────────────────────────┤
│       EXECUTION LAYER           │  CI/CD, GitOps, IaC, Automation Pipeline
├─────────────────────────────────┤
│       INFRASTRUCTURE LAYER      │  Compute, Network, Storage, Cloud, On-Prem
└─────────────────────────────────┘
```

각 Layer에 표시해야 할 것:
- Ownership (누가 책임지는가)
- Accountability (누가 승인하는가)
- Control Points (어디서 통제하는가)
- Business Outcomes (어떤 비즈니스 가치를 만드는가)

---

## Architecture Diagram Design Rules

### Focus On

- Responsibilities & Accountability
- Relationships & Information Flow
- Control Points & Governance Boundaries
- Business Outcomes & Value Delivery

### Avoid

- Excessive Technology Logos (로고 대신 텍스트 레이블)
- Dense Implementation Details (상세는 별도 문서)
- Decorative Elements (그림자, 3D, 그라데이션)
- Complex Flow Arrows (3개 이상 교차 금지)
- Small Font Labels (최소 10pt)

### Visual Style

| Element | Style |
|---------|-------|
| Background | White (#FFFFFF) |
| Box/Container | Light Gray (#F5F5F5) Border |
| Border | Thin 1px (#EAEAEA) |
| Highlight Box | Orange Border (#D04A02) |
| Arrow/Flow | Dark Gray (#464646), 1-2px |
| Label Text | Arial 10-12pt |
| Layer Header | Arial Bold 14pt |
| Grouping | Light Gray Background + Thin Border |

### Diagram Sizing

- 16:9 슬라이드에 맞출 때: 전체 슬라이드 Content Area 사용
- Confluence 삽입 시: 최소 900px 너비
- draw.io 생성 시: A4 Landscape 또는 16:9 기준

---

## Architecture Diagram Types

### 1. Conceptual Architecture

- 최상위 레벨 (Business → Infrastructure)
- 5-7개 주요 컴포넌트
- Board Meeting용
- 관계와 흐름 중심

### 2. Logical Architecture

- Layer별 주요 컴포넌트
- 10-15개 컴포넌트
- 기술 리더 대상
- 인터페이스와 데이터 흐름

### 3. Deployment Architecture

- 물리적/논리적 배포 구성
- 클러스터, 네트워크, 스토리지
- 운영팀 대상
- 구체적 제품/버전 포함 가능

### 4. Security Architecture

- Trust Boundary 명시
- 인증/인가 흐름
- 암호화 구간 표시
- Governance Control Point 강조

---

## Architecture Principles (모든 다이어그램에 적용)

항상 다음 관점을 포함:

1. **Business Capability** — 비즈니스 기능 단위 분해
2. **Governance & Compliance** — 정책, 감사, 규제 준수
3. **Operating Model** — 운영 모델과 책임 체계
4. **Platform Capability** — 플랫폼 서비스 제공 범위
5. **Runtime Capability** — 런타임 보안, 관측, 통신
6. **Automation Capability** — 자동화 범위와 수준
7. **AI Capability** — AI 활용 범위와 거버넌스
8. **Observability** — 모니터링, 로깅, 추적
9. **Security** — Zero Trust, mTLS, Identity
10. **Compliance** — 규제, 인증, 감사 추적

---

## draw.io / Mermaid 생성 시 적용 규칙

### draw.io Color Mapping

```xml
<!-- PwC Orange Accent -->
<mxCell style="fillColor=#D04A02;fontColor=#FFFFFF;strokeColor=#D04A02;" />

<!-- Light Gray Container -->
<mxCell style="fillColor=#F5F5F5;fontColor=#2D2D2D;strokeColor=#EAEAEA;" />

<!-- White Box -->
<mxCell style="fillColor=#FFFFFF;fontColor=#000000;strokeColor=#EAEAEA;" />

<!-- Highlight Box -->
<mxCell style="fillColor=#FFFFFF;fontColor=#000000;strokeColor=#D04A02;strokeWidth=2;" />

<!-- Alert/Risk -->
<mxCell style="fillColor=#E0301E;fontColor=#FFFFFF;strokeColor=#E0301E;" />
```

### Mermaid Theme Config

```
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#F5F5F5',
    'primaryTextColor': '#000000',
    'primaryBorderColor': '#EAEAEA',
    'lineColor': '#464646',
    'secondaryColor': '#FFFFFF',
    'tertiaryColor': '#D04A02',
    'fontSize': '14px',
    'fontFamily': 'Arial'
  }
}}%%
```

### Confluence 삽입 표준

- 해상도: 최소 150 DPI
- 너비: 900px 이상
- Format: PNG (투명 배경) 또는 SVG
- draw.io 매크로 사용 시: 원본 편집 가능 유지
