# Domain-Specific Presentation Standards

## 1. Agentic AI Presentation

### Agentic Capability Loop

Sense → Reason → Plan → Execute → Learn → Govern

### 필수 Highlight 영역

| Area | Description |
|------|-------------|
| Human in the Loop | 모든 결정에 인간 승인 필요 |
| Human on the Loop | 인간이 모니터링하되 자동 실행 허용 |
| Autonomous Boundary | 자율 운영 허용 범위 정의 |
| Policy Enforcement | 정책 기반 자동 제어 |
| Auditability | 모든 결정의 감사 추적 |
| Explainability | AI 결정의 설명 가능성 |

### AI Governance Framework

- Model Risk Management
- Bias Detection & Mitigation
- Data Lineage & Provenance
- Responsible AI Principles
- AI Ethics Board / Review Process

### AI Maturity Model

| Level | Stage | Characteristics |
|-------|-------|----------------|
| L1 | Rule-Based | 정적 규칙, 수동 실행 |
| L2 | ML-Assisted | 예측 모델, 인간 판단 보조 |
| L3 | AI-Augmented | 자동 추천, 인간 승인 후 실행 |
| L4 | Semi-Autonomous | 정책 범위 내 자율 실행, 예외 시 인간 개입 |
| L5 | Fully Autonomous | 자체 학습 및 최적화, 정책 기반 자율 운영 |

---

## 2. Platform Engineering Presentation

### Key Themes

| Theme | Description |
|-------|-------------|
| Developer Experience (DX) | 개발자 생산성과 만족도 중심 |
| Self-Service | 셀프서비스 인프라/서비스 프로비저닝 |
| Golden Path | 표준화된 개발/배포 경로 |
| Platform Product Thinking | 내부 플랫폼을 제품으로 관리 |
| Internal Developer Portal (IDP) | 통합 개발자 포털 |
| Standardization | 기술 스택/도구/프로세스 표준화 |
| Governance as Enablement | 거버넌스를 제약이 아닌 촉진제로 |

### Platform Maturity Model

| Level | Stage | Indicators |
|-------|-------|-----------|
| L1 | Provisioned | 수동 프로비저닝, 티켓 기반 |
| L2 | Managed | 일부 자동화, 템플릿 기반 |
| L3 | Self-Service | API/포털 기반 셀프서비스 |
| L4 | Product | KPI 기반 플랫폼 운영, 피드백 루프 |
| L5 | Ecosystem | 외부 확장, 마켓플레이스, 플러그인 |

---

## 3. DevOps / SDD Pipeline Presentation

### Pipeline Representation

```
Planning → Analysis → Design → Development → Testing → Build → Release → Deployment → Operation → Continuous Improvement
```

### Key Themes

| Theme | Description |
|-------|-------------|
| GitOps | Git을 Single Source of Truth로 |
| Infrastructure as Code | 인프라의 코드 관리 |
| Shift-Left Security | 보안을 개발 초기 단계로 이동 |
| Continuous Delivery | 자동화된 지속적 배포 |
| Observability-Driven | 관측성 기반 운영 |
| Feature Flags | 기능 단위 배포 제어 |
| Canary/Blue-Green | 무중단 배포 전략 |

### DevOps Maturity Model

| Level | Stage | Characteristics |
|-------|-------|----------------|
| L1 | Initial | 수동 빌드/배포, 사일로 조직 |
| L2 | Managed | CI 도입, 기본 자동화 |
| L3 | Defined | CI/CD 파이프라인, IaC |
| L4 | Measured | 메트릭 기반 (DORA), 자동 롤백 |
| L5 | Optimized | AIOps, 자가 치유, 지속 최적화 |

---

## 4. Governance Presentation

### Governance는 항상 가시적이어야 한다

모든 아키텍처/프로세스 다이어그램에 Governance Layer를 명시할 것.

### 필수 포함 영역

| Domain | Elements |
|--------|----------|
| Policy | Policy Definition, Enforcement, Exception Management |
| Risk | Risk Assessment, Mitigation, Acceptance, Register |
| Compliance | Regulatory Compliance, Audit Trail, Certification |
| Financial | Budget Control, Cost Allocation, ROI Tracking |
| Operational | SLA Management, Incident Response, Change Control |
| AI Governance | Model Risk, Bias Review, Explainability, Ethics |
| Data Governance | Classification, Lineage, Quality, Privacy |
| Security Governance | Access Control, Threat Management, Incident Response |

### Governance Maturity Model

| Level | Stage | Characteristics |
|-------|-------|----------------|
| L1 | Ad-hoc | 비정형, 반응적, 개인 의존 |
| L2 | Documented | 정책 문서화, 수동 준수 |
| L3 | Managed | 프로세스 정의, 정기 감사 |
| L4 | Measured | KPI 기반, 자동 모니터링 |
| L5 | Optimized | 자동 집행, 예측적 리스크 관리 |

---

## 5. Enterprise Architecture (TM Forum Alignment)

### Framework Mapping

| Domain | Standard | Application |
|--------|----------|------------|
| Application Architecture (AA) | TM Forum ODA | Component 분해 |
| Technical Architecture (TA) | — | 인프라/플랫폼 설계 |
| Data Architecture (DA) | TM Forum SID | 정보 모델 |
| Security Architecture (SA) | Zero Trust, SPIFFE/SPIRE | Identity/Access |
| Business Architecture | TM Forum eTOM | 프로세스 분해 |

### Architecture 문서 구조 (LLD/TA)

1. Architecture Overview (Conceptual)
2. Design Principles & Constraints
3. Logical Architecture
4. Component Design
5. Integration Design
6. Security Design
7. Deployment Architecture
8. Operational Model
9. Migration Strategy
10. Appendix (상세 스펙)
